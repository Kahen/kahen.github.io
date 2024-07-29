import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BUAgDejY.js";const e={},p=t(`<hr><h1 id="在构造函数中抛出异常" tabindex="-1"><a class="header-anchor" href="#在构造函数中抛出异常"><span>在构造函数中抛出异常</span></a></h1><p>异常提供了将错误处理代码与应用程序的正常流程分离的功能。在对象实例化期间抛出异常并不罕见。</p><p>在本文中，我们将检查有关在构造函数中抛出异常的所有细节。</p><p>构造函数是用于创建对象的特殊类型的方法。在以下部分中，我们将探讨如何抛出异常，应该抛出哪些异常，以及为什么我们会在构造函数中抛出异常。</p><h3 id="_2-1-如何抛出异常" tabindex="-1"><a class="header-anchor" href="#_2-1-如何抛出异常"><span>2.1. 如何抛出异常？</span></a></h3><p>在构造函数中抛出异常与在其他任何方法中抛出异常没有区别。让我们首先创建一个具有无参构造函数的_Animal_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Animal</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InstantiationException</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">InstantiationException</span><span class="token punctuation">(</span><span class="token string">&quot;Cannot be instantiated&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们抛出了_InstantiationException_，这是一个受检查的异常。</p><h3 id="_2-2-应该抛出哪些异常" tabindex="-1"><a class="header-anchor" href="#_2-2-应该抛出哪些异常"><span>2.2. 应该抛出哪些异常？</span></a></h3><p>尽管允许抛出任何类型的异常，但让我们建立一些最佳实践。</p><p>首先，我们不应该抛出“<em>java.lang.Exception</em>”。这是因为调用者无法确定是哪种异常，因此无法处理它。</p><p>其次，如果调用者必须强制处理它，我们应该抛出一个受检查的异常。</p><p>第三，如果调用者无法从异常中恢复，我们应该抛出一个不受检查的异常。</p><p>重要的是要注意，这些实践同样适用于方法和构造函数。</p><h3 id="_2-3-为什么要在构造函数中抛出异常" tabindex="-1"><a class="header-anchor" href="#_2-3-为什么要在构造函数中抛出异常"><span>2.3. 为什么要在构造函数中抛出异常？</span></a></h3><p>在本节中，让我们理解为什么我们可能想要在构造函数中抛出异常。</p><p><strong>参数验证是构造函数中抛出异常的常见用例。</strong> 构造函数主要用于为变量赋值。如果传递给构造函数的参数无效，我们可以抛出异常。让我们考虑一个快速示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Animal</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>id <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token string">&quot;Id cannot be null&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>age <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Age cannot be negative&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，我们在初始化对象之前执行参数验证。这有助于确保我们只创建有效的对象。</p><p>在这里，如果传递给_Animal_对象的_id_是_null_，我们可以抛出_NullPointerException_。对于非空但仍然无效的参数，例如_age_的负值，我们可以抛出_IllegalArgumentException_。</p><p><strong>安全检查是构造函数中抛出异常的另一个常见用例。</strong> 有些对象在创建期间需要进行安全检查。如果构造函数执行的可能是不安全或敏感的操作，我们可以抛出异常。</p><p>让我们考虑我们的_Animal_类从用户输入文件中加载属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Animal</span><span class="token punctuation">(</span><span class="token class-name">File</span> file<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SecurityException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">isAbsolute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">SecurityException</span><span class="token punctuation">(</span><span class="token string">&quot;Traversal attempt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>file<span class="token punctuation">.</span><span class="token function">getCanonicalPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">getAbsolutePath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">SecurityException</span><span class="token punctuation">(</span><span class="token string">&quot;Traversal attempt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，我们阻止了路径遍历攻击。这是通过不允许绝对路径和目录遍历来实现的。例如，考虑文件“a/../b.txt”。在这里，规范路径和绝对路径是不同的，这可能是潜在的目录遍历攻击。</p><h2 id="_3-构造函数中的继承异常" tabindex="-1"><a class="header-anchor" href="#_3-构造函数中的继承异常"><span>3. 构造函数中的继承异常</span></a></h2><p>现在，让我们讨论在构造函数中处理超类异常。</p><p>让我们创建一个扩展我们的_Animal_类的子类_Bird_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Bird</span> <span class="token keyword">extends</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">Bird</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ReflectiveOperationException</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">Bird</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> age<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于_super()_必须是构造函数的第一行，我们不能简单地插入一个_try-catch_块来处理超类抛出的受检查的异常。</p><p>由于我们的父类_Animal_抛出受检查的异常_InstantiationException_，我们不能在_Bird_构造函数中处理异常。<strong>相反，我们可以传播相同的异常或其父异常。</strong></p><p>重要的是要注意，方法重写中的异常处理规则是不同的。在方法重写中，如果超类方法声明了异常，子类重写的方法可以声明相同的异常、子类异常或不声明异常，但不能声明父类异常。</p><p>另一方面，不受检查的异常不需要声明，也不能在子类构造函数内处理。</p><h2 id="_4-安全问题" tabindex="-1"><a class="header-anchor" href="#_4-安全问题"><span>4. 安全问题</span></a></h2><p>在构造函数中抛出异常可能导致部分初始化的对象。正如Java安全编码指南7.3条所述，非最终类的未完全初始化对象容易受到称为终结器攻击的安全问题。</p><p>简而言之，终结器攻击是通过子类化部分初始化的对象并覆盖其_finalize()_方法来引发的，尝试创建该子类的实例。这可能会绕过子类构造函数中执行的安全检查。</p><p>覆盖_finalize()_方法并将其标记为_final_可以防止这种攻击。</p><p>然而，_finalize()_方法在Java 9中已被弃用，从而防止了这种类型的攻击。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们学习了在构造函数中抛出异常，以及相关的益处和安全问题。我们还查看了在构造函数中抛出异常的一些最佳实践。</p><p>如常，本教程中使用的源代码可在GitHub上获得。</p>`,41),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-27-Throwing Exceptions in Constructors.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-27/2024-07-27-Throwing%20Exceptions%20in%20Constructors.html","title":"在构造函数中抛出异常","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Exception Handling"],"tag":["Java","Constructors","Exceptions"],"head":[["meta",{"name":"keywords","content":"Java, Constructors, Exceptions, Error Handling"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-27/2024-07-27-Throwing%20Exceptions%20in%20Constructors.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在构造函数中抛出异常"}],["meta",{"property":"og:description","content":"在构造函数中抛出异常 异常提供了将错误处理代码与应用程序的正常流程分离的功能。在对象实例化期间抛出异常并不罕见。 在本文中，我们将检查有关在构造函数中抛出异常的所有细节。 构造函数是用于创建对象的特殊类型的方法。在以下部分中，我们将探讨如何抛出异常，应该抛出哪些异常，以及为什么我们会在构造函数中抛出异常。 2.1. 如何抛出异常？ 在构造函数中抛出异常..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-27T02:22:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Constructors"}],["meta",{"property":"article:tag","content":"Exceptions"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-27T02:22:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在构造函数中抛出异常\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-27T02:22:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在构造函数中抛出异常 异常提供了将错误处理代码与应用程序的正常流程分离的功能。在对象实例化期间抛出异常并不罕见。 在本文中，我们将检查有关在构造函数中抛出异常的所有细节。 构造函数是用于创建对象的特殊类型的方法。在以下部分中，我们将探讨如何抛出异常，应该抛出哪些异常，以及为什么我们会在构造函数中抛出异常。 2.1. 如何抛出异常？ 在构造函数中抛出异常..."},"headers":[{"level":3,"title":"2.1. 如何抛出异常？","slug":"_2-1-如何抛出异常","link":"#_2-1-如何抛出异常","children":[]},{"level":3,"title":"2.2. 应该抛出哪些异常？","slug":"_2-2-应该抛出哪些异常","link":"#_2-2-应该抛出哪些异常","children":[]},{"level":3,"title":"2.3. 为什么要在构造函数中抛出异常？","slug":"_2-3-为什么要在构造函数中抛出异常","link":"#_2-3-为什么要在构造函数中抛出异常","children":[]},{"level":2,"title":"3. 构造函数中的继承异常","slug":"_3-构造函数中的继承异常","link":"#_3-构造函数中的继承异常","children":[]},{"level":2,"title":"4. 安全问题","slug":"_4-安全问题","link":"#_4-安全问题","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1722046926000,"updatedTime":1722046926000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.42,"words":1326},"filePathRelative":"posts/baeldung/2024-07-27/2024-07-27-Throwing Exceptions in Constructors.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>在构造函数中抛出异常</h1>\\n<p>异常提供了将错误处理代码与应用程序的正常流程分离的功能。在对象实例化期间抛出异常并不罕见。</p>\\n<p>在本文中，我们将检查有关在构造函数中抛出异常的所有细节。</p>\\n<p>构造函数是用于创建对象的特殊类型的方法。在以下部分中，我们将探讨如何抛出异常，应该抛出哪些异常，以及为什么我们会在构造函数中抛出异常。</p>\\n<h3>2.1. 如何抛出异常？</h3>\\n<p>在构造函数中抛出异常与在其他任何方法中抛出异常没有区别。让我们首先创建一个具有无参构造函数的_Animal_类：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">Animal</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">throws</span> <span class=\\"token class-name\\">InstantiationException</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">throw</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">InstantiationException</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Cannot be instantiated\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
