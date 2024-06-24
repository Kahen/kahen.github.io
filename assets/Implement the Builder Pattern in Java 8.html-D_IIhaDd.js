import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DtXEV2Vi.js";const e={},p=t('<h1 id="java-8中实现建造者模式-baeldung" tabindex="-1"><a class="header-anchor" href="#java-8中实现建造者模式-baeldung"><span>Java 8中实现建造者模式 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在软件开发的旅程中，我们经常遇到创建具有众多属性的对象的场景，这可能令人生畏。构造函数的混乱使得我们的代码可读性降低。这正是建造者模式大放异彩的地方。<strong>建造者模式是一种创建型设计模式，它将复杂对象的构建与其表示分离，提供了一种更干净、更灵活的对象创建方法。</strong></p><h2 id="_2-建造者模式的优势" tabindex="-1"><a class="header-anchor" href="#_2-建造者模式的优势"><span>2. 建造者模式的优势</span></a></h2><p>在我们深入编码之前，让我们快速回顾一下使用建造者模式的优势：</p><ul><li>灵活性 - 通过将构建过程与实际对象表示解耦，建造者模式允许我们以不同的配置创建对象，而不会在我们的代码库中充斥着多个构造函数或设置器</li><li>可读性 - 建造者模式提供了流畅的接口，使我们的代码更易于阅读；这使我们和其他开发人员能够一目了然地理解复杂对象的构建过程</li><li>不可变性 - 建造者可以通过在构建完成后创建不可变对象来强制执行不可变性；这确保了线程安全性并防止了意外的修改</li></ul><p>现在，让我们挽起袖子深入代码。</p><h2 id="_3-经典建造者模式" tabindex="-1"><a class="header-anchor" href="#_3-经典建造者模式"><span>3. <strong>经典建造者模式</strong></span></a></h2><p><strong>在建造者模式的经典实现中，我们创建了一个单独的_Builder_内部类。</strong> 这个内部类包含设置被构建对象每个属性的方法。这种结构化的方法促进了顺序配置过程，确保了清晰度和易用性。此外，它增强了代码组织和可读性，使其更易于理解和维护：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Post</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> text<span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> category<span class="token punctuation">;</span>\n\n    <span class="token class-name">Post</span><span class="token punctuation">(</span><span class="token class-name">Builder</span> builder<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>title <span class="token operator">=</span> builder<span class="token punctuation">.</span>title<span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>text <span class="token operator">=</span> builder<span class="token punctuation">.</span>text<span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>category <span class="token operator">=</span> builder<span class="token punctuation">.</span>category<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getTitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> title<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getText</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> text<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getCategory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> category<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Builder</span> <span class="token punctuation">{</span>\n        <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>\n        <span class="token keyword">private</span> <span class="token class-name">String</span> text<span class="token punctuation">;</span>\n        <span class="token keyword">private</span> <span class="token class-name">String</span> category<span class="token punctuation">;</span>\n\n        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">title</span><span class="token punctuation">(</span><span class="token class-name">String</span> title<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>title <span class="token operator">=</span> title<span class="token punctuation">;</span>\n            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">text</span><span class="token punctuation">(</span><span class="token class-name">String</span> text<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>text <span class="token operator">=</span> text<span class="token punctuation">;</span>\n            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">category</span><span class="token punctuation">(</span><span class="token class-name">String</span> category<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>category <span class="token operator">=</span> category<span class="token punctuation">;</span>\n            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token keyword">public</span> <span class="token class-name">Post</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Post</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在建造者类中，我们声明了与外部类相同的字段集。_Builder_类提供了流畅的方法来设置Post的每个属性。<strong>此外，它还包括一个_build()_方法来创建_Post_实例。</strong></p><p>现在，我们可以使用_Builder_来创建一个新对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Post</span> post <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Post<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">title</span><span class="token punctuation">(</span><span class="token string">&quot;Java Builder Pattern&quot;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token string">&quot;Explaining how to implement the Builder Pattern in Java&quot;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">category</span><span class="token punctuation">(</span><span class="token string">&quot;Programming&quot;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-通用建造者模式" tabindex="-1"><a class="header-anchor" href="#_4-通用建造者模式"><span>4. 通用建造者模式</span></a></h2><p>在Java 8中，lambda表达式和方法引用开启了新的可能性，包括建造者模式的更通用形式。我们的实现引入了一个_GenericBuilder_类，它可以通过利用泛型来构建各种类型的对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GenericBuilder</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>``````` <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Supplier</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>``````` supplier<span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">GenericBuilder</span><span class="token punctuation">(</span><span class="token class-name">Supplier</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>``````` supplier<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>supplier <span class="token operator">=</span> supplier<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> ```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>``````` <span class="token class-name">GenericBuilder</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>``````` <span class="token function">of</span><span class="token punctuation">(</span><span class="token class-name">Supplier</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>``````` supplier<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">GenericBuilder</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>supplier<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> `<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">P</span><span class="token punctuation">&gt;</span></span>` <span class="token class-name">GenericBuilder</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>``````` <span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">BiConsumer</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token class-name">P</span><span class="token punctuation">&gt;</span></span>` consumer<span class="token punctuation">,</span> <span class="token class-name">P</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">GenericBuilder</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n            <span class="token class-name">T</span> object <span class="token operator">=</span> supplier<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            consumer<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span>object<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">return</span> object<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> supplier<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个类遵循流畅的接口，从_of()_方法开始创建初始对象实例。然后，_with()_方法使用lambda表达式或方法引用设置对象属性。</p><p><strong>_GenericBuilder_提供了灵活性和可读性，允许我们简洁地构建每个对象，同时确保类型安全。</strong> 这种模式展示了Java 8的表达力，并为复杂的构建任务提供了优雅的解决方案。</p><p>然而，一个很大的缺点是这个解决方案基于类设置器。<strong>这意味着我们的属性不再像前一个例子那样是final的，因此失去了建造者模式提供的不可变性。</strong></p><p>对于我们的下一个例子，我们将创建一个新的_GenericPost_类，包括一个默认的无参数构造函数、getters和setters：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GenericPost</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">String</span> text<span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">String</span> category<span class="token punctuation">;</span>\n\n    <span class="token comment">// getters and setters</span>\n\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以使用我们的_GenericBuilder_来创建一个_GenericPost_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Post</span> post <span class="token operator">=</span> <span class="token class-name">GenericBuilder</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token class-name">GenericPost</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">GenericPost</span><span class="token operator">::</span><span class="token function">setTitle</span><span class="token punctuation">,</span> <span class="token string">&quot;Java Builder Pattern&quot;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">GenericPost</span><span class="token operator">::</span><span class="token function">setText</span><span class="token punctuation">,</span> <span class="token string">&quot;Explaining how to implement the Builder Pattern in Java&quot;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">GenericPost</span><span class="token operator">::</span><span class="token function">setCategory</span><span class="token punctuation">,</span> <span class="token string">&quot;Programming&quot;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-lombok建造者" tabindex="-1"><a class="header-anchor" href="#_5-lombok建造者"><span>5. Lombok建造者</span></a></h2><p>Lombok是一个通过自动生成诸如getters、setters、equals、hashCode甚至构造函数等常用方法来简化Java代码的库。</p><p>Lombok最受赞赏的功能之一是其对建造者模式的支持。<strong>通过使用_@Builder_注解一个类，Lombok会生成一个带有流畅方法设置属性的建造者类。</strong> 这个注解消除了手动建造者类实现的需要，显著减少了冗余代码。</p><p>要使用Lombok，我们需要从Maven中央仓库导入依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`org.projectlombok`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`lombok`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`1.18.32`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以使用_@Builder_注解创建一个新的_LombokPost_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Builder</span>\n<span class="token annotation punctuation">@Getter</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LombokPost</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> text<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> category<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还使用了_@Setter_和_@Getter_注解来避免样板代码。然后我们可以立即使用建造者模式创建新对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">LombokPost</span> lombokPost <span class="token operator">=</span> <span class="token class-name">LombokPost</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">title</span><span class="token punctuation">(</span><span class="token string">&quot;Java Builder Pattern&quot;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token string">&quot;Explaining how to implement the Builder Pattern in Java&quot;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">category</span><span class="token punctuation">(</span><span class="token string">&quot;Programming&quot;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>Java 8中的建造者模式提供了简化的对象构建和提高的代码可读性。通过经典、通用和Lombok建造者模式等变体，我们可以针对特定需求定制我们的方法。通过采用这种模式并利用Lombok等工具，我们可以编写更干净、更高效的代码，推动软件开发中的创新和成功。</p><p>如常，完整的代码片段可在GitHub上找到。</p><p>发布帖子后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>',36),c=[p];function l(o,i){return a(),s("div",null,c)}const k=n(e,[["render",l],["__file","Implement the Builder Pattern in Java 8.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Implement%20the%20Builder%20Pattern%20in%20Java%208.html","title":"Java 8中实现建造者模式 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-18T00:00:00.000Z","category":["Java","设计模式"],"tag":["Builder模式","Java 8"],"head":[["meta",{"name":"keywords","content":"Java Builder模式, 设计模式, Java 8, 构建器模式"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Implement%20the%20Builder%20Pattern%20in%20Java%208.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 8中实现建造者模式 | Baeldung"}],["meta",{"property":"og:description","content":"Java 8中实现建造者模式 | Baeldung 1. 引言 在软件开发的旅程中，我们经常遇到创建具有众多属性的对象的场景，这可能令人生畏。构造函数的混乱使得我们的代码可读性降低。这正是建造者模式大放异彩的地方。建造者模式是一种创建型设计模式，它将复杂对象的构建与其表示分离，提供了一种更干净、更灵活的对象创建方法。 2. 建造者模式的优势 在我们深入..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Builder模式"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:published_time","content":"2024-06-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 8中实现建造者模式 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 8中实现建造者模式 | Baeldung 1. 引言 在软件开发的旅程中，我们经常遇到创建具有众多属性的对象的场景，这可能令人生畏。构造函数的混乱使得我们的代码可读性降低。这正是建造者模式大放异彩的地方。建造者模式是一种创建型设计模式，它将复杂对象的构建与其表示分离，提供了一种更干净、更灵活的对象创建方法。 2. 建造者模式的优势 在我们深入..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 建造者模式的优势","slug":"_2-建造者模式的优势","link":"#_2-建造者模式的优势","children":[]},{"level":2,"title":"3. 经典建造者模式","slug":"_3-经典建造者模式","link":"#_3-经典建造者模式","children":[]},{"level":2,"title":"4. 通用建造者模式","slug":"_4-通用建造者模式","link":"#_4-通用建造者模式","children":[]},{"level":2,"title":"5. Lombok建造者","slug":"_5-lombok建造者","link":"#_5-lombok建造者","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.94,"words":1481},"filePathRelative":"posts/baeldung/Archive/Implement the Builder Pattern in Java 8.md","localizedDate":"2024年6月18日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在软件开发的旅程中，我们经常遇到创建具有众多属性的对象的场景，这可能令人生畏。构造函数的混乱使得我们的代码可读性降低。这正是建造者模式大放异彩的地方。<strong>建造者模式是一种创建型设计模式，它将复杂对象的构建与其表示分离，提供了一种更干净、更灵活的对象创建方法。</strong></p>\\n<h2>2. 建造者模式的优势</h2>\\n<p>在我们深入编码之前，让我们快速回顾一下使用建造者模式的优势：</p>\\n<ul>\\n<li>灵活性 - 通过将构建过程与实际对象表示解耦，建造者模式允许我们以不同的配置创建对象，而不会在我们的代码库中充斥着多个构造函数或设置器</li>\\n<li>可读性 - 建造者模式提供了流畅的接口，使我们的代码更易于阅读；这使我们和其他开发人员能够一目了然地理解复杂对象的构建过程</li>\\n<li>不可变性 - 建造者可以通过在构建完成后创建不可变对象来强制执行不可变性；这确保了线程安全性并防止了意外的修改</li>\\n</ul>","autoDesc":true}');export{k as comp,d as data};
