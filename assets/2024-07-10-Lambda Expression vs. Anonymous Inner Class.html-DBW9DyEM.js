import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-CBerKIce.js";const p={},e=t(`<h1 id="lambda表达式与匿名内部类的比较" tabindex="-1"><a class="header-anchor" href="#lambda表达式与匿名内部类的比较"><span>Lambda表达式与匿名内部类的比较</span></a></h1><p>匿名类是像嵌套类一样但没有名称的类。Lambda表达式是在Java 8中引入的，以促进函数式编程。在某些用例中，它们被用作匿名类的替代品。在本文中，我们将探讨匿名类和Lambda表达式之间的区别。</p><p>匿名类实现了接口和抽象类，而无需创建额外的子类。此外，匿名类没有名称，并且<strong>同时提供类定义并实例化它</strong>。</p><p>现在让我们看一个实现_Runnable_接口的匿名类的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AnonymousClassExample</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">Thread</span> t1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Thread: &quot;</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; started&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t1<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，我们创建了一个名为_AnonymousClassExample_的类，并使用匿名类提供了_Runnable_接口的实现。我们没有创建任何单独的类来实现_Runnable_接口。</p><h3 id="_3-lambda表达式" tabindex="-1"><a class="header-anchor" href="#_3-lambda表达式"><span>3. Lambda表达式</span></a></h3><p>Lambda表达式实现了函数式接口，这些接口具有单个未实现的方法。Lambda表达式本质上是不带名称的方法定义。它使代码更简洁、更易读。<strong>它还提供了将函数作为方法参数传递的方式</strong>。</p><p>现在让我们看一个实现_Runnable_接口的Lambda表达式的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LambdaExpressionExample</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">Thread</span> t1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Thread: &quot;</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; started&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t1<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用了匿名方法。这将解析为_Runnable_接口的_run()_方法。</p><p>即使在函数式接口的情况下，我们也可以互换使用匿名类和Lambda表达式。但它们之间存在一些差异。现在让我们深入探讨这些差异。</p><h3 id="_4-匿名类与lambda表达式的比较" tabindex="-1"><a class="header-anchor" href="#_4-匿名类与lambda表达式的比较"><span>4. 匿名类与Lambda表达式的比较</span></a></h3><p>如前所述，匿名类用于接口和抽象类，而Lambda表达式仅用于函数式接口。让我们看看它们之间的一些额外差异。</p><h4 id="_4-1-语法" tabindex="-1"><a class="header-anchor" href="#_4-1-语法"><span>4.1. 语法</span></a></h4><p>匿名类同时提供类定义并实例化它。我们使用_new_关键字和我们正在实现的类或接口的名称。这就像调用构造函数，但我们还提供了方法实现并声明状态变量。<strong>匿名类是一个表达式，分配给它实现的类或接口的引用变量。</strong> 因此，我们也在末尾加上分号。</p><p>另一方面，Lambda表达式是一个没有名称的方法。我们在函数式接口中提供了未实现方法的签名，但没有名称。我们也不需要提及方法参数的数据类型。该方法在运行时解析。</p><h4 id="_4-2-this-关键字和变量的作用域" tabindex="-1"><a class="header-anchor" href="#_4-2-this-关键字和变量的作用域"><span>4.2. _this_关键字和变量的作用域</span></a></h4><p>在匿名类中，_this_关键字指的是匿名类本身。但在Lambda表达式的情况下，_this_指的是其封闭类。</p><p>我们还可以在匿名类中声明成员变量，这在Lambda表达式中是不可能的。因此，匿名类可以有状态。Lambda表达式内部声明的变量作为局部变量。不过，它们都可以访问封闭类的成员变量。</p><h4 id="_4-3-编译" tabindex="-1"><a class="header-anchor" href="#_4-3-编译"><span>4.3. 编译</span></a></h4><p>在编译时，每个匿名类都会生成一个单独的类文件。类文件的格式是类名后跟一个美元符号和一个数字。例如，如果我们在名为_TestClass_的类中定义了一个匿名类，那么编译后，将创建一个额外的文件_TestClass$1.class_。</p><p>另一方面，在Lambda表达式的情况下，类文件中添加了_invokedynamic_指令。<strong>这个操作码指令有助于找出要调用的函数式接口方法。</strong></p><p><strong>当我们编译Lambda表达式时，一个等效的私有静态或非静态方法被添加到字节码中。</strong> 这个方法的签名与函数式接口方法匹配。</p><p>此外，如果Lambda表达式使用了捕获参数，它们也会在方法参数列表中前置。还添加了一个额外的_indy_调用点。它具有调用Lambda表达式生成的私有方法所需的所有信息。在运行时，调用点被引导，并且调用链接的私有方法。</p><h4 id="_4-4-性能" tabindex="-1"><a class="header-anchor" href="#_4-4-性能"><span>4.4. 性能</span></a></h4><p>现在让我们看看匿名类和Lambda表达式在高层次性能影响方面的比较。在性能方面，Lambda表达式比匿名类更好。这是因为匿名类在编译时会导致额外的类文件，这在运行时的类加载和验证期间需要额外的时间。</p><p>Lambda表达式的性能更好，因为_invokedynamic_指令将Lambda表达式延迟绑定到函数式接口方法。Lambda表达式的第一个调用较慢。后续调用更快。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了Lambda表达式和匿名内部类之间的区别。我们了解了它们在语法、编译过程和性能方面的差异。</p><p>像往常一样，示例的源代码可以在GitHub上找到。</p>`,31),o=[e];function c(l,i){return s(),n("div",null,o)}const d=a(p,[["render",c],["__file","2024-07-10-Lambda Expression vs. Anonymous Inner Class.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Lambda%20Expression%20vs.%20Anonymous%20Inner%20Class.html","title":"Lambda表达式与匿名内部类的比较","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Lambda Expression","Anonymous Class"],"head":[["meta",{"name":"keywords","content":"Java, Lambda Expression, Anonymous Class, Functional Programming"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Lambda%20Expression%20vs.%20Anonymous%20Inner%20Class.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Lambda表达式与匿名内部类的比较"}],["meta",{"property":"og:description","content":"Lambda表达式与匿名内部类的比较 匿名类是像嵌套类一样但没有名称的类。Lambda表达式是在Java 8中引入的，以促进函数式编程。在某些用例中，它们被用作匿名类的替代品。在本文中，我们将探讨匿名类和Lambda表达式之间的区别。 匿名类实现了接口和抽象类，而无需创建额外的子类。此外，匿名类没有名称，并且同时提供类定义并实例化它。 现在让我们看一个..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T13:40:55.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Lambda Expression"}],["meta",{"property":"article:tag","content":"Anonymous Class"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T13:40:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Lambda表达式与匿名内部类的比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T13:40:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Lambda表达式与匿名内部类的比较 匿名类是像嵌套类一样但没有名称的类。Lambda表达式是在Java 8中引入的，以促进函数式编程。在某些用例中，它们被用作匿名类的替代品。在本文中，我们将探讨匿名类和Lambda表达式之间的区别。 匿名类实现了接口和抽象类，而无需创建额外的子类。此外，匿名类没有名称，并且同时提供类定义并实例化它。 现在让我们看一个..."},"headers":[{"level":3,"title":"3. Lambda表达式","slug":"_3-lambda表达式","link":"#_3-lambda表达式","children":[]},{"level":3,"title":"4. 匿名类与Lambda表达式的比较","slug":"_4-匿名类与lambda表达式的比较","link":"#_4-匿名类与lambda表达式的比较","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720618855000,"updatedTime":1720618855000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.24,"words":1271},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Lambda Expression vs. Anonymous Inner Class.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>匿名类是像嵌套类一样但没有名称的类。Lambda表达式是在Java 8中引入的，以促进函数式编程。在某些用例中，它们被用作匿名类的替代品。在本文中，我们将探讨匿名类和Lambda表达式之间的区别。</p>\\n<p>匿名类实现了接口和抽象类，而无需创建额外的子类。此外，匿名类没有名称，并且<strong>同时提供类定义并实例化它</strong>。</p>\\n<p>现在让我们看一个实现_Runnable_接口的匿名类的示例：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">AnonymousClassExample</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> args<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token class-name\\">Thread</span> t1 <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Thread</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Runnable</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n            <span class=\\"token annotation punctuation\\">@Override</span>\\n            <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">run</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n                <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Thread: \\"</span> <span class=\\"token operator\\">+</span> <span class=\\"token class-name\\">Thread</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">currentThread</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getName</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">+</span> <span class=\\"token string\\">\\" started\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n            <span class=\\"token punctuation\\">}</span>\\n        <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        t1<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">start</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
