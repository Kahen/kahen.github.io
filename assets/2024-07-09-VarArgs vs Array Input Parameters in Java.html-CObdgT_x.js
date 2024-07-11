import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-Ckd2YV4o.js";const e={},p=t(`<hr><h1 id="java中可变参数与数组输入参数的比较" tabindex="-1"><a class="header-anchor" href="#java中可变参数与数组输入参数的比较"><span>Java中可变参数与数组输入参数的比较</span></a></h1><p>在这个教程中，我们将探讨Java中<code>method(String… args)</code>和<code>method(String[] args)</code>之间的区别。在此过程中，我们将检查如何将数组或可变长度参数列表传递给方法。</p><h2 id="_2-向方法传递数组" tabindex="-1"><a class="header-anchor" href="#_2-向方法传递数组"><span>2. 向方法传递数组</span></a></h2><p>在这一部分，我们将展示如何声明一个类型为<code>String</code>的数组作为方法的参数，以及如何在方法调用期间传递相同类型的数组作为参数。</p><p>Java是一种静态类型编程语言，这意味着变量类型在编译时已知。程序员必须声明一个变量类型，无论是基本类型还是引用类型。在定义带有数组参数的方法时，<strong>我们期望在方法调用期间声明我们要作为参数传递的数组类型</strong>。</p><p>让我们看看在方法头中定义一个<code>String</code>数组参数的语法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">capitalizeNames</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们分解上述方法头中声明的参数：</p><ul><li><code>String[]</code> – 类型名称</li><li><code>args</code> – 参数名称</li></ul><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">capitalizeNames</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> args<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
       args<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> args<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上述代码中，<code>capitalizeNames()</code>方法有一个<code>String</code>数组参数<code>args</code>。方法头指定，当调用该方法时，它只接收一个<code>java.lang.String[]</code>类型的数组引用。</p><p>本质上，当我们在方法头中遇到<code>(String[] args)</code>时，我们应该理解为当调用该方法时，它将接收一个类型为<code>String</code>的单一数组作为参数。</p><p>让我们看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenCheckingArgumentClassName_thenNameShouldBeStringArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> names <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;john&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ade&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;kofi&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;imo&quot;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>names<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;java.lang.String[]&quot;</span><span class="token punctuation">,</span> names<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTypeName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">capitalizeNames</span><span class="token punctuation">(</span>names<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们检查<code>capitalizeNames()</code>方法参数<code>names</code>的类名时，我们得到<code>java.lang.String[]</code>，这与方法定义中的参数匹配。<strong>如果我们尝试将不同类型的参数传递给方法，我们将得到编译错误</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenCheckingArgumentClassName_thenNameShouldBeStringArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> evenNumbers <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token function">capitalizeNames</span><span class="token punctuation">(</span>evenNumbers<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码片段将在控制台上输出编译错误消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>incompatible types<span class="token operator">:</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> cannot be converted <span class="token keyword">to</span> <span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-可变长度参数列表" tabindex="-1"><a class="header-anchor" href="#_3-可变长度参数列表"><span>3. 可变长度参数列表</span></a></h2><p>可变长度参数列表，也称为Java中的_varargs_，允许我们在方法调用期间传递任意数量的相同类型参数。</p><p>方法中可变长度参数列表的语法如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">firstLetterOfWords</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们分解上述方法头中声明的参数：</p><ul><li><code>String…</code> – 带省略号的类型名称</li><li><code>args</code> – 参数名称</li></ul><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">firstLetterOfWords</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> firstLetter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span>args<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> args<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        firstLetter<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> firstLetter<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在方法签名中声明参数类型，然后是省略号 (…) 和参数名称。</p><p>使用可变长度参数列表，<strong>我们可以向方法添加任意数量的相同类型参数，因为Java将给定的参数作为数组中的元素来处理</strong>。当将_varargs_作为方法参数的一部分时，请确保类型、省略号和参数名称是最后一个。</p><p>例如，这将是不正确的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">someMethod</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">,</span> <span class="token keyword">int</span> number<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以通过交换参数的顺序，将_varargs_参数放在最后来轻松修复这个问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">someMethod</span><span class="token punctuation">(</span><span class="token keyword">int</span> number<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们测试我们上面编写的<code>firstLetterOfWords</code>方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenCheckingReturnedObjectClass_thenClassShouldBeStringArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token function">firstLetterOfWords</span><span class="token punctuation">(</span><span class="token string">&quot;football&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;basketball&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;volleyball&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token function">firstLetterOfWords</span><span class="token punctuation">(</span><span class="token string">&quot;football&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;basketball&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;volleyball&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们知道<code>_firstLetterOfWords()</code>方法接受类型为<code>String</code>的可变长度参数列表，因为有了省略号，我们以相同的方式传递参数。测试显示，当我们访问其<code>getClass()</code>属性时，该方法返回一个数组。我们还可以通过访问数组的长度属性得到3，这与传递给方法的参数数量相匹配。</p><h2 id="_4-string-args-与-string-args" tabindex="-1"><a class="header-anchor" href="#_4-string-args-与-string-args"><span>4. <code>(String[] args)</code>与<code>(String… args)</code></span></a></h2><p><code>(String[] args)</code>表示Java方法参数中的<code>String</code>类型数组。<strong>它通常作为Java类中main方法的数组参数找到</strong>。main方法中的<code>String[]</code> _args_参数从命令行参数形成<code>String</code>数组。<strong>当使用<code>(String[] args)</code>调用方法时，必须作为参数传递一个<code>String</code>数组</strong>。</p><p><strong>在定义方法时，我们只能有一个可变长度参数列表</strong>。_varargs_不仅限于<code>java.lang.String</code>类型。我们可以有其他类型，如<code>(int… args)</code>、<code>(double… args)</code>等。在幕后，Java将调用方法时传递的所有参数制成数组。然而，我们可以在没有参数的情况下调用具有_varargs_参数的方法，在这种情况下，它将被视为空数组。</p><p><strong>记住，将<code>args</code>作为变量名只是一个约定</strong> —— 可以使用任何其他适当的名称。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这个教程中，我们检查了<code>method(String[] args)</code>和<code>method(String… args)</code>之间的区别。前者是一个带有<code>String</code>数组参数的方法，而后者是一个带有可变长度参数列表（<em>varargs</em>）的方法。</p><p>_varargs_总是作为方法参数列表中的最后一个参数放置，因此一个方法可以声明只有一个_varargs_参数。</p><p>本教程的代码可以在GitHub上找到。</p>`,43),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-09-VarArgs vs Array Input Parameters in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-VarArgs%20vs%20Array%20Input%20Parameters%20in%20Java.html","title":"Java中可变参数与数组输入参数的比较","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["varargs","array","method parameters"],"head":[["meta",{"name":"keywords","content":"Java, varargs, array, method parameters"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-VarArgs%20vs%20Array%20Input%20Parameters%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中可变参数与数组输入参数的比较"}],["meta",{"property":"og:description","content":"Java中可变参数与数组输入参数的比较 在这个教程中，我们将探讨Java中method(String… args)和method(String[] args)之间的区别。在此过程中，我们将检查如何将数组或可变长度参数列表传递给方法。 2. 向方法传递数组 在这一部分，我们将展示如何声明一个类型为String的数组作为方法的参数，以及如何在方法调用期间传..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T04:00:30.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"varargs"}],["meta",{"property":"article:tag","content":"array"}],["meta",{"property":"article:tag","content":"method parameters"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T04:00:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中可变参数与数组输入参数的比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T04:00:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中可变参数与数组输入参数的比较 在这个教程中，我们将探讨Java中method(String… args)和method(String[] args)之间的区别。在此过程中，我们将检查如何将数组或可变长度参数列表传递给方法。 2. 向方法传递数组 在这一部分，我们将展示如何声明一个类型为String的数组作为方法的参数，以及如何在方法调用期间传..."},"headers":[{"level":2,"title":"2. 向方法传递数组","slug":"_2-向方法传递数组","link":"#_2-向方法传递数组","children":[]},{"level":2,"title":"3. 可变长度参数列表","slug":"_3-可变长度参数列表","link":"#_3-可变长度参数列表","children":[]},{"level":2,"title":"4. (String[] args)与(String… args)","slug":"_4-string-args-与-string-args","link":"#_4-string-args-与-string-args","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720497630000,"updatedTime":1720497630000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.28,"words":1284},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-VarArgs vs Array Input Parameters in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中可变参数与数组输入参数的比较</h1>\\n<p>在这个教程中，我们将探讨Java中<code>method(String… args)</code>和<code>method(String[] args)</code>之间的区别。在此过程中，我们将检查如何将数组或可变长度参数列表传递给方法。</p>\\n<h2>2. 向方法传递数组</h2>\\n<p>在这一部分，我们将展示如何声明一个类型为<code>String</code>的数组作为方法的参数，以及如何在方法调用期间传递相同类型的数组作为参数。</p>\\n<p>Java是一种静态类型编程语言，这意味着变量类型在编译时已知。程序员必须声明一个变量类型，无论是基本类型还是引用类型。在定义带有数组参数的方法时，<strong>我们期望在方法调用期间声明我们要作为参数传递的数组类型</strong>。</p>","autoDesc":true}');export{d as comp,k as data};
