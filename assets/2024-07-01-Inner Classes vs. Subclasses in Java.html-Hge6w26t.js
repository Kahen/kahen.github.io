import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-BaAI5AMv.js";const t={},p=e(`<h1 id="java中的内部类与子类" tabindex="-1"><a class="header-anchor" href="#java中的内部类与子类"><span>Java中的内部类与子类</span></a></h1><p>在本教程中，我们将更仔细地研究Java中的两个重要构造：内部类和子类。Java中编写类的两种不同方式，它们的使用方式也有所不同。</p><p>面向对象编程的一个核心原则是继承。它引入了一个类继承另一个类，即父类的属性和行为的概念。<strong>继承和子类的使用促进了代码的可重用性和类的层次结构组织。</strong></p><p>子类定义了与父类的“是一个”关系，即子类的对象也是其父类的对象。这支持了多态性的概念，并通过允许我们通过共同的父类与不同子类的实例一起工作，促进了更通用的编码。</p><p>定义和使用子类还允许我们创建高度专业化的类，这些类可以扩展和覆盖其父类的具体功能。<strong>这支持了SOLID原则中的开放封闭原则。</strong></p><h2 id="_3-java中的内部类" tabindex="-1"><a class="header-anchor" href="#_3-java中的内部类"><span>3. Java中的内部类</span></a></h2><p>内部类是Java中嵌套类的一种形式，它们在另一个宿主类的边界内定义。</p><p>Java中有多种类型的内部类，例如嵌套内部类、静态内部类、方法局部内部类和匿名内部类。虽然这些内部类彼此略有不同，但内部类的核心思想保持不变。这种安排促进了更紧密的封装，并提高了可读性，因为如果内部类在外部类之外没有使用，这种内部类就没有意义。因此，这种方法提供了一种改进的类分组方法。</p><p>内部类始终与外部类保持在同一文件中。<strong>除非我们定义了一个静态内部类，否则我们不能在不使用外部类的实例的情况下实例化内部类。</strong></p><h2 id="_4-子类的需求" tabindex="-1"><a class="header-anchor" href="#_4-子类的需求"><span>4. 子类的需求</span></a></h2><p>在这一部分，我们将通过一个通知系统的例子来演示子类的属性。通知模块的主要组件是一个_Notifier_类，其目的是发送通知：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Notifier</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">notify</span><span class="token punctuation">(</span><span class="token class-name">Message</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 通过电子邮件发送消息的实现细节</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_Message_类封装了要传递的消息的相关内容。</p><p>这个_Notifier_类太通用了，没有定义发送不同类型的通知的方法。如果我们的系统只能发送电子邮件，这个类就很好。然而，如果我们想扩展系统的功能到其他通信渠道，比如短信或电话，就达到了它的极限。</p><p>实现这一点的一种方法是在这个类内部定义多个方法，并将每个方法分配给通过特定渠道发送通知的责任：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Notifier</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">notifyViaEmail</span><span class="token punctuation">(</span><span class="token class-name">Message</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 通过电子邮件发送消息的实现细节</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">notifyViaText</span><span class="token punctuation">(</span><span class="token class-name">Message</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 通过短信发送消息的实现细节</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">notifyViaCall</span><span class="token punctuation">(</span><span class="token class-name">Message</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 进行外拨电话</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法有很多缺点：</p><ul><li>_Notifier_类有太多的责任，对不同渠道了解得太多</li><li>每增加一个新的渠道，类的体积就会成倍增加</li><li>这种设计没有考虑到某些通信渠道本身的不同实现需求，比如RCS、SMS/MMS</li></ul><p>为了解决这些问题，我们采用面向对象编程中的继承范式，并进行重构。</p><p>我们将_Notifier_类作为系统的基类或父类，并使其_抽象化_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Notifier</span> <span class="token punctuation">{</span>
    <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">notify</span><span class="token punctuation">(</span><span class="token class-name">Message</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了这个改变，<em>Notifier_类就不知道通知逻辑或渠道了。它依赖于其子类来定义行为。我们所有的通信渠道都与_Notifier_表现出_是一个_关系，例如_EmailNotifier_是一个_Notifier</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmailNotifier</span> <span class="token keyword">extends</span> <span class="token class-name">Notifier</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">void</span> <span class="token function">notify</span><span class="token punctuation">(</span><span class="token class-name">Message</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 在这里提供电子邮件特定的实现</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TextMessageNotifier</span> <span class="token keyword">extends</span> <span class="token class-name">Notifier</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">void</span> <span class="token function">notify</span><span class="token punctuation">(</span><span class="token class-name">Message</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 在这里提供短信特定的实现</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CallNotifier</span> <span class="token keyword">extends</span> <span class="token class-name">Notifier</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">void</span> <span class="token function">notify</span><span class="token punctuation">(</span><span class="token class-name">Message</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 在这里提供电话呼叫特定的实现</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这种方法，我们可以按需要扩展我们的系统到任意多的特定渠道实现。我们可以按需要定义特定子类实现的实例，并使用它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">notifyMessages</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 发送短信</span>
    <span class="token class-name">Message</span> textMessage <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Message</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Notifier</span> textNotifier <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TextMessageNotifier</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    textNotifier<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span>textMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 发送电子邮件消息</span>
    <span class="token class-name">Message</span> emailMessage <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Message</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Notifier</span> emailNotifier <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EmailNotifier</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    emailNotifier<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span>emailMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在Java JDK中发现继承和子类的使用非常丰富。以Java的_Collection_ API为例。我们有一个_AbstractList_类，在Collections API中，它被具体实现如_LinkedList_、_ArrayList_和_Vector_等子类所扩展。</p><h2 id="_5-内部类的需求" tabindex="-1"><a class="header-anchor" href="#_5-内部类的需求"><span>5. 内部类的需求</span></a></h2><p><strong>内部类有助于在仍然以类的形式封装的同时，定位重要的代码构造。</strong> 在我们之前的例子中，通知器使用不同的底层通知逻辑，这些逻辑可能彼此非常不同。</p><p><strong>例如，电子邮件通知器可能需要有关SMTP服务器的信息和其他逻辑来发送电子邮件。另一方面，短信通知器可能需要一个电话号码来发送短信。在所有这些通知器中，共享的代码很少。它们也只在它们自己的通知器上下文中有用。</strong></p><p>我们的_EmailNotifier_实现将需要有关SMTP服务器的信息和访问权限，以发送电子邮件。我们可以将与连接和发送电子邮件相关的样板代码作为内部类编写：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">EmailNotifier</span> <span class="token keyword">extends</span> <span class="token class-name">Notifier</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">void</span> <span class="token function">notify</span><span class="token punctuation">(</span><span class="token class-name">Message</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// notify方法实现</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 用于电子邮件连接的内部类</span>
    <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">EmailConnector</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> emailHost<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span> emailPort<span class="token punctuation">;</span>
        <span class="token comment">// Getter Setters</span>

        <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 连接到smtp服务器</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们随后可以在外部类的_notify()_方法中使用内部类来发送电子邮件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">void</span> <span class="token function">notify</span><span class="token punctuation">(</span><span class="token class-name">Message</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 连接到电子邮件连接器并发送电子邮件</span>
    <span class="token class-name">EmailConnector</span> emailConnector <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EmailConnector</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    emailConnector<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 发送电子邮件</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Java JDK中内部类的使用可以在_List_接口的_LinkedList_实现中找到。</strong> _Node_类被创建为静态内部类，因为它在_LinkedList_之外的使用毫无意义且不必要。类似的方法在_HashMap_类的设计与实现中也被采用，它使用_Entry_作为内部类。</p><h2 id="_6-子类和内部类之间的差异" tabindex="-1"><a class="header-anchor" href="#_6-子类和内部类之间的差异"><span>6. 子类和内部类之间的差异</span></a></h2><p>我们可以将Java中子类和内部类之间的差异总结如下：</p><ul><li>内部类总是与外部类保持在同一个文件中，而子类可以是独立的</li><li>一般来说，内部类不能访问其外部类的成员变量或方法，而子类可以从其父类访问</li><li>我们不能直接实例化内部类（除非它们是静态内部类），而子类可以</li><li>我们主要创建内部类作为小型辅助类；然而，子类有助于覆盖父类的功能性</li></ul><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们讨论了子类、内部类以及它们在编写模块化面向对象代码中的作用。我们还查看了它们之间的区别以及何时选择一个而不是另一个。</p><p>如常，本教程的完整实现可以在GitHub上找到。</p>`,40),i=[p];function l(o,c){return a(),s("div",null,i)}const r=n(t,[["render",l],["__file","2024-07-01-Inner Classes vs. Subclasses in Java.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Inner%20Classes%20vs.%20Subclasses%20in%20Java.html","title":"Java中的内部类与子类","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Inner Classes","Subclasses"],"tag":["Java","Inner Classes","Subclasses"],"head":[["meta",{"name":"keywords","content":"Java, Inner Classes, Subclasses, 继承, 封装, 多态"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Inner%20Classes%20vs.%20Subclasses%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的内部类与子类"}],["meta",{"property":"og:description","content":"Java中的内部类与子类 在本教程中，我们将更仔细地研究Java中的两个重要构造：内部类和子类。Java中编写类的两种不同方式，它们的使用方式也有所不同。 面向对象编程的一个核心原则是继承。它引入了一个类继承另一个类，即父类的属性和行为的概念。继承和子类的使用促进了代码的可重用性和类的层次结构组织。 子类定义了与父类的“是一个”关系，即子类的对象也是其..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T14:33:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Inner Classes"}],["meta",{"property":"article:tag","content":"Subclasses"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T14:33:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的内部类与子类\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T14:33:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的内部类与子类 在本教程中，我们将更仔细地研究Java中的两个重要构造：内部类和子类。Java中编写类的两种不同方式，它们的使用方式也有所不同。 面向对象编程的一个核心原则是继承。它引入了一个类继承另一个类，即父类的属性和行为的概念。继承和子类的使用促进了代码的可重用性和类的层次结构组织。 子类定义了与父类的“是一个”关系，即子类的对象也是其..."},"headers":[{"level":2,"title":"3. Java中的内部类","slug":"_3-java中的内部类","link":"#_3-java中的内部类","children":[]},{"level":2,"title":"4. 子类的需求","slug":"_4-子类的需求","link":"#_4-子类的需求","children":[]},{"level":2,"title":"5. 内部类的需求","slug":"_5-内部类的需求","link":"#_5-内部类的需求","children":[]},{"level":2,"title":"6. 子类和内部类之间的差异","slug":"_6-子类和内部类之间的差异","link":"#_6-子类和内部类之间的差异","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719844418000,"updatedTime":1719844418000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.16,"words":1848},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Inner Classes vs. Subclasses in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将更仔细地研究Java中的两个重要构造：内部类和子类。Java中编写类的两种不同方式，它们的使用方式也有所不同。</p>\\n<p>面向对象编程的一个核心原则是继承。它引入了一个类继承另一个类，即父类的属性和行为的概念。<strong>继承和子类的使用促进了代码的可重用性和类的层次结构组织。</strong></p>\\n<p>子类定义了与父类的“是一个”关系，即子类的对象也是其父类的对象。这支持了多态性的概念，并通过允许我们通过共同的父类与不同子类的实例一起工作，促进了更通用的编码。</p>\\n<p>定义和使用子类还允许我们创建高度专业化的类，这些类可以扩展和覆盖其父类的具体功能。<strong>这支持了SOLID原则中的开放封闭原则。</strong></p>","autoDesc":true}');export{r as comp,v as data};
