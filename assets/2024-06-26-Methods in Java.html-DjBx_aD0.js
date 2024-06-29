import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-DI0Ohe7a.js";const t={},p=e(`<hr><h1 id="java-中的方法-baeldung" tabindex="-1"><a class="header-anchor" href="#java-中的方法-baeldung"><span>Java 中的方法 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在Java中，方法是我们定义应用程序业务逻辑的地方。它们定义了封装在对象中的数据之间的交互。</p><p>在本教程中，我们将介绍Java方法的语法，方法签名的定义，以及如何调用和重载方法。</p><h2 id="_2-方法语法" tabindex="-1"><a class="header-anchor" href="#_2-方法语法"><span>2. 方法语法</span></a></h2><p>首先，一个方法由六部分组成：</p><ul><li><strong>访问修饰符：</strong> 可选择性地指定代码中哪些地方可以访问该方法</li><li><strong>返回类型：</strong> 方法返回的值的类型，如果有的话</li><li><strong>方法标识符：</strong> 我们给方法的命名</li><li><strong>参数列表：</strong> 可选的，用逗号分隔的方法输入列表</li><li><strong>异常列表：</strong> 方法可能抛出的异常列表</li><li><strong>主体：</strong> 逻辑定义（可以为空）</li></ul><p>让我们看一个例子：</p><h3 id="_2-1-访问修饰符" tabindex="-1"><a class="header-anchor" href="#_2-1-访问修饰符"><span>2.1. 访问修饰符</span></a></h3><p>访问修饰符允许我们指定哪些对象可以访问该方法。有四种可能的访问修饰符：<em>public, protected, private</em> 和默认（也称为 <em>package-private</em>）。</p><p>一个方法<strong>也可以在访问修饰符之前或之后包含 <em>static</em> 关键字</strong>。这意味着该方法属于类而不是实例，因此我们可以在不创建类的实例的情况下调用该方法。没有 <em>static</em> 关键字的方法称为实例方法，只能在类的实例上调用。</p><p>关于性能，静态方法将在类加载期间只加载一次，因此更节省内存。</p><h3 id="_2-2-返回类型" tabindex="-1"><a class="header-anchor" href="#_2-2-返回类型"><span>2.2. 返回类型</span></a></h3><p>方法可以返回数据到调用它们的地方。<strong>一个方法可以返回一个原始值或对象引用，或者如果使用 <em>void</em> 关键字作为返回类型，它可以不返回任何内容</strong>。</p><p>让我们看一个 <em>void</em> 方法的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printFullName</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">,</span> <span class="token class-name">String</span> lastName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>firstName <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> lastName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如果我们声明了一个返回类型，那么我们必须在方法主体中指定一个 <em>return</em> 语句。</strong> 一旦执行了 <em>return</em> 语句，方法主体的执行将完成，如果有更多语句，这些将不会被处理。</p><p>另一方面，一个 <em>void</em> 方法不返回任何值，因此没有 <em>return</em> 语句。</p><h3 id="_2-3-方法标识符" tabindex="-1"><a class="header-anchor" href="#_2-3-方法标识符"><span>2.3. 方法标识符</span></a></h3><p>方法标识符是我们分配给方法规范的名称。使用有信息量且描述性的名称是一个好习惯。值得一提的是，方法标识符最多可以有 65536 个字符（一个长名称）。</p><h3 id="_2-4-参数列表" tabindex="-1"><a class="header-anchor" href="#_2-4-参数列表"><span>2.4. 参数列表</span></a></h3><p>我们可以<strong>在参数列表中为方法指定输入值</strong>，它用括号括起来。一个方法可以有0到255个参数，这些参数由逗号分隔。一个参数可以是对象、原始类型或枚举。我们可以使用Java注解在方法参数级别（例如Spring注解 <em>@RequestParam</em>）。</p><h3 id="_2-5-异常列表" tabindex="-1"><a class="header-anchor" href="#_2-5-异常列表"><span>2.5. 异常列表</span></a></h3><p>我们可以通过使用 <em>throws</em> 子句来指定方法抛出的异常。在检查异常的情况下，我们必须将代码用 <em>try-catch</em> 子句包围起来，或者我们必须在方法签名中提供 <em>throws</em> 子句。</p><p>那么，让我们看看我们之前方法的一个更复杂的变体，它抛出了一个检查异常：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">writeName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">PrintWriter</span> out <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintWriter</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span><span class="token string">&quot;OutFile.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Name: &quot;</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    out<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-方法主体" tabindex="-1"><a class="header-anchor" href="#_2-6-方法主体"><span>2.6. 方法主体</span></a></h3><p><strong>Java方法的最后一部分是方法主体，它包含我们想要执行的逻辑。</strong> 在方法主体中，我们可以写任意多行代码——或者在静态方法的情况下，一行也不写。如果我们的方法声明了一个返回类型，那么方法主体必须包含一个返回语句。</p><h2 id="_3-方法签名" tabindex="-1"><a class="header-anchor" href="#_3-方法签名"><span>3. 方法签名</span></a></h2><p>根据其定义，方法签名仅由两个组成部分——<strong>方法的名称和参数列表</strong>。</p><p>那么，让我们写一个简单的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">,</span> <span class="token class-name">String</span> lastName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> firstName <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> middleName <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> lastName<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法的签名是 <em>getName(String firstName, String lastName)</em>。</p><p>方法标识符可以是任何标识符。然而，如果我们遵循常见的Java编码约定，方法标识符应该是一个以小写字母开头的动词，后面可以跟形容词和/或名词。</p><h2 id="_4-调用方法" tabindex="-1"><a class="header-anchor" href="#_4-调用方法"><span>4. 调用方法</span></a></h2><p>现在，让我们探索<strong>如何在Java中调用方法</strong>。按照前面的例子，假设这些方法被包含在一个名为 <em>PersonName</em> 的Java类中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PersonName</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">,</span> <span class="token class-name">String</span> lastName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> firstName <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> middleName <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> lastName<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们的 <em>getName</em> 方法是一个实例方法而不是一个 <em>static</em> 方法，为了调用 <em>getName</em> 方法，我们需要<strong>创建类 <em>PersonName</em> 的一个实例</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">PersonName</span> personName <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PersonName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> fullName <span class="token operator">=</span> personName<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token string">&quot;Alan&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Turing&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们使用创建的对象来调用 <em>getName</em> 方法。</p><p>最后，让我们看看<strong>如何调用一个静态方法</strong>。在静态方法的情况下，我们不需要类实例来调用。相反，我们使用类名前缀的方法名来调用它。</p><p>让我们用前面例子的一个变体来演示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PersonName</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">,</span> <span class="token class-name">String</span> lastName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> firstName <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> middleName <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> lastName<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，方法调用是：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> fullName <span class="token operator">=</span> <span class="token class-name">PersonName</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token string">&quot;Alan&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Turing&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-方法重载" tabindex="-1"><a class="header-anchor" href="#_5-方法重载"><span>5. 方法重载</span></a></h2><p>Java允许我们拥有<strong>具有相同标识符但不同参数列表的两个或多个方法——不同的方法签名</strong>。在这种情况下，我们说<strong>方法是重载的</strong>。让我们以一个例子为例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">,</span> <span class="token class-name">String</span> lastName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">getName</span><span class="token punctuation">(</span>firstName<span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> lastName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">,</span> <span class="token class-name">String</span> middleName<span class="token punctuation">,</span> <span class="token class-name">String</span> lastName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>middleName<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> firstName <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> lastName<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> firstName <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> middleName <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> lastName<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法重载对于像示例中的情况非常有用，我们可以有一个实现相同功能简化版本的方法是有用的。</p><p>最后，一个好的设计习惯是确保重载的方法以类似的方式行为。否则，如果具有相同标识符的方法以不同的方式行为，代码将会变得混乱。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本教程中，我们探讨了在Java中指定方法时涉及的Java语法部分。</p><p>特别是，我们经历了访问修饰符、返回类型、方法标识符、参数列表、异常列表和方法主体。然后我们看到了方法签名的定义，如何调用一个方法，以及如何重载一个方法。</p><p>像往常一样，这里看到的代码可以在GitHub上找到。</p>`,55),o=[p];function l(c,i){return s(),n("div",null,o)}const d=a(t,[["render",l],["__file","2024-06-26-Methods in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Methods%20in%20Java.html","title":"Java 中的方法 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","编程"],"tag":["方法","教程"],"head":[["meta",{"name":"keywords","content":"Java 方法, Java 方法教程, Baeldung"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Methods%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 中的方法 | Baeldung"}],["meta",{"property":"og:description","content":"Java 中的方法 | Baeldung 1. 引言 在Java中，方法是我们定义应用程序业务逻辑的地方。它们定义了封装在对象中的数据之间的交互。 在本教程中，我们将介绍Java方法的语法，方法签名的定义，以及如何调用和重载方法。 2. 方法语法 首先，一个方法由六部分组成： 访问修饰符： 可选择性地指定代码中哪些地方可以访问该方法 返回类型： 方法返..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T16:34:31.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"方法"}],["meta",{"property":"article:tag","content":"教程"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T16:34:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 中的方法 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T16:34:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 中的方法 | Baeldung 1. 引言 在Java中，方法是我们定义应用程序业务逻辑的地方。它们定义了封装在对象中的数据之间的交互。 在本教程中，我们将介绍Java方法的语法，方法签名的定义，以及如何调用和重载方法。 2. 方法语法 首先，一个方法由六部分组成： 访问修饰符： 可选择性地指定代码中哪些地方可以访问该方法 返回类型： 方法返..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 方法语法","slug":"_2-方法语法","link":"#_2-方法语法","children":[{"level":3,"title":"2.1. 访问修饰符","slug":"_2-1-访问修饰符","link":"#_2-1-访问修饰符","children":[]},{"level":3,"title":"2.2. 返回类型","slug":"_2-2-返回类型","link":"#_2-2-返回类型","children":[]},{"level":3,"title":"2.3. 方法标识符","slug":"_2-3-方法标识符","link":"#_2-3-方法标识符","children":[]},{"level":3,"title":"2.4. 参数列表","slug":"_2-4-参数列表","link":"#_2-4-参数列表","children":[]},{"level":3,"title":"2.5. 异常列表","slug":"_2-5-异常列表","link":"#_2-5-异常列表","children":[]},{"level":3,"title":"2.6. 方法主体","slug":"_2-6-方法主体","link":"#_2-6-方法主体","children":[]}]},{"level":2,"title":"3. 方法签名","slug":"_3-方法签名","link":"#_3-方法签名","children":[]},{"level":2,"title":"4. 调用方法","slug":"_4-调用方法","link":"#_4-调用方法","children":[]},{"level":2,"title":"5. 方法重载","slug":"_5-方法重载","link":"#_5-方法重载","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719419671000,"updatedTime":1719419671000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.44,"words":1631},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Methods in Java.md","localizedDate":"2024年6月27日","excerpt":"<hr>\\n<h1>Java 中的方法 | Baeldung</h1>\\n<h2>1. 引言</h2>\\n<p>在Java中，方法是我们定义应用程序业务逻辑的地方。它们定义了封装在对象中的数据之间的交互。</p>\\n<p>在本教程中，我们将介绍Java方法的语法，方法签名的定义，以及如何调用和重载方法。</p>\\n<h2>2. 方法语法</h2>\\n<p>首先，一个方法由六部分组成：</p>\\n<ul>\\n<li><strong>访问修饰符：</strong> 可选择性地指定代码中哪些地方可以访问该方法</li>\\n<li><strong>返回类型：</strong> 方法返回的值的类型，如果有的话</li>\\n<li><strong>方法标识符：</strong> 我们给方法的命名</li>\\n<li><strong>参数列表：</strong> 可选的，用逗号分隔的方法输入列表</li>\\n<li><strong>异常列表：</strong> 方法可能抛出的异常列表</li>\\n<li><strong>主体：</strong> 逻辑定义（可以为空）</li>\\n</ul>","autoDesc":true}');export{d as comp,m as data};
