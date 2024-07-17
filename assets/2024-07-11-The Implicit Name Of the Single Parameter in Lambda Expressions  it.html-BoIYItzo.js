import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-YddbDb53.js";const p={},e=t(`<hr><h1 id="kotlin中单参数lambda表达式的隐式名称-it" tabindex="-1"><a class="header-anchor" href="#kotlin中单参数lambda表达式的隐式名称-it"><span>Kotlin中单参数Lambda表达式的隐式名称：it</span></a></h1><p>Lambda表达式是Kotlin中用于编写简洁且富有表现力代码的强大工具。此外，我们可以在Lambda表达式中使用默认的隐式参数_it_。</p><p>在本教程中，我们将探索_it_是什么，以及如何提高我们的Lambda表达式的可读性。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>首先，让我们看一个在Lambda表达式中使用_it_作为参数名称的例子：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> result <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kai&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Liam&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Eric&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Kevin&quot;</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">filter</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">4</span> <span class="token punctuation">}</span>
  <span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span><span class="token function">uppercase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token punctuation">.</span><span class="token function">sortedBy</span> <span class="token punctuation">{</span> it <span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;ERIC&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;LIAM&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们阅读上面的代码时，它非常直接。我们以一个名字列表作为输入。首先，我们过滤长度为四的_String_值。然后，过滤后的_String_元素被转换为大写并排序。</p><p>我们使用Lambda表达式执行每个处理。在这个例子中，带有_it_参数的Lambda表达式使函数调用流畅且易于理解。</p><p>接下来，让我们再看一个例子。我们将使用相同的名单作为输入，但这次，我们的目标是对_String_值进行编码。我们将通过将每个字符替换为其ASCII码加一来实现这一点。例如，‘<em>K</em>’将被转换为‘<em>L</em>’，‘<em>a</em>’在编码过程后将变成‘<em>b</em>’：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> result <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kai&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Liam&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Eric&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Kevin&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span>
  it<span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span>
    <span class="token punctuation">(</span>it <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">also</span> <span class="token punctuation">{</span> log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Char After: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">it</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">joinToString</span><span class="token punctuation">(</span>separator <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Lbj&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Mjbn&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Fsjd&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Lfwjo&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，我们继续使用Lambda表达式和默认的隐式_it_参数来执行编码逻辑。然而，<strong>由于代码中的嵌套Lambda表达式，_it_参数所指的可能不是立即明显的</strong>。例如，在示例代码中，_it_可以表示列表中的_String_元素，字符，以及编码后的字符。</p><p>接下来，让我们更仔细地检查_it_参数，并探索如何提高Lambda表达式的可读性。</p><h2 id="_3-它是什么" tabindex="-1"><a class="header-anchor" href="#_3-它是什么"><span>3. 它是什么？</span></a></h2><p><strong>当Lambda表达式只接受一个参数时，Kotlin提供了省略显式参数声明的选项，而是隐式地使用_it_来引用它。</strong></p><p>我们经常在内置函数如_let()_、_also()<em>以及我们之前看到的函数中使用隐式参数_it</em>。但它并不局限于内置函数。</p><p>接下来，让我们创建一个_Long_类的扩展函数作为例子：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> Long<span class="token punctuation">.</span><span class="token function">calc</span><span class="token punctuation">(</span>desc<span class="token operator">:</span> String<span class="token punctuation">,</span> operation<span class="token operator">:</span> <span class="token punctuation">(</span>Long<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> Long<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">desc</span></span><span class="token string">(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression"><span class="token keyword">this</span></span></span><span class="token string">) = </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression"><span class="token function">operation</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span></span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>calc()_扩展函数的第二个参数（<em>operation</em>）是一个函数</strong>。进一步地说，<strong>这个函数只有一个_Long_参数</strong>。因此，当我们将Lambda表达式作为_operation_参数传递时，我们可以使用隐式的_it_参数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> negateOutput <span class="token operator">=</span> <span class="token number">2L</span><span class="token punctuation">.</span><span class="token function">calc</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;negate&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">-</span>it <span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;negate(2) = -2&quot;</span></span><span class="token punctuation">,</span> negateOutput<span class="token punctuation">)</span>

<span class="token keyword">val</span> squareOutput <span class="token operator">=</span> <span class="token number">2L</span><span class="token punctuation">.</span><span class="token function">calc</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;square&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> it <span class="token operator">*</span> it <span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;square(2) = 4&quot;</span></span><span class="token punctuation">,</span> squareOutput<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，这种优雅的简写简化了代码并提高了可读性，特别是对于简短且直接的操作。</p><h2 id="_4-提高可读性" tabindex="-1"><a class="header-anchor" href="#_4-提高可读性"><span>4. 提高可读性</span></a></h2><p>现在我们已经理解了_it_是什么，让我们探索如何在_it_可能导致歧义时提高Lambda表达式的可读性。</p><h3 id="_4-1-用显式参数名覆盖-it" tabindex="-1"><a class="header-anchor" href="#_4-1-用显式参数名覆盖-it"><span>4.1. 用显式参数名覆盖_it_</span></a></h3><p>在Kotlin中，<strong>我们可以通过在格式为“<em>ParamName -&gt;</em>”中显式声明参数名称来覆盖Lambda表达式中的隐式_it_参数</strong>。这允许代码更透明地理解，<strong>特别是在嵌套Lambda表达式可能引起混淆的情况下</strong>。</p><p>让我们以前面的_String_编码示例来展示如何使用显式参数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> result <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kai&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Liam&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Eric&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Kevin&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> name <span class="token operator">-&gt;</span>
  name<span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> originalChar <span class="token operator">-&gt;</span>
    <span class="token punctuation">(</span>originalChar <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">also</span> <span class="token punctuation">{</span> resultChar <span class="token operator">-&gt;</span> log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Char After: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">resultChar</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">joinToString</span><span class="token punctuation">(</span>separator <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Lbj&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Mjbn&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Fsjd&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Lfwjo&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们在Lambda表达式中显式命名了参数。现在，当阅读代码时，Lambda表达式内参数的目的没有歧义。</p><h3 id="_4-2-使用解构声明" tabindex="-1"><a class="header-anchor" href="#_4-2-使用解构声明"><span>4.2. 使用解构声明</span></a></h3><p><strong>我们还可以使用Kotlin的解构声明来覆盖_it_参数以提高可读性</strong>。接下来，让我们通过一个例子看看如何实现它：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> players <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Kai&quot;</span></span> <span class="token keyword">to</span> <span class="token number">42</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Liam&quot;</span></span> <span class="token keyword">to</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Eric&quot;</span></span> <span class="token keyword">to</span> <span class="token number">27</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Kevin&quot;</span></span> <span class="token keyword">to</span> <span class="token number">49</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在_players_列表中，我们有四个_Pair_实例。每个_Pair_包含一个玩家的名字（<em>String</em>）和分数（<em>Int</em>）。我们的目标是生成一个简单的玩家报告：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> expectedOutput <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span>
  <span class="token string-literal singleline"><span class="token string">&quot;Kai&#39;s score: 42&quot;</span></span><span class="token punctuation">,</span>
  <span class="token string-literal singleline"><span class="token string">&quot;Liam&#39;s score: 50&quot;</span></span><span class="token punctuation">,</span>
  <span class="token string-literal singleline"><span class="token string">&quot;Eric&#39;s score: 27&quot;</span></span><span class="token punctuation">,</span>
  <span class="token string-literal singleline"><span class="token string">&quot;Kevin&#39;s score: 49&quot;</span></span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以使用_it_来实现这一点：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> output1 <span class="token operator">=</span> players<span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> <span class="token string-literal singleline"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">it<span class="token punctuation">.</span>first</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&#39;s score: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">it<span class="token punctuation">.</span>second</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span> <span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedOutput<span class="token punctuation">,</span> output1<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，在阅读或编写此代码时，可能需要回顾_player’s_声明以检查_it.first_和_it.second_代表什么。</p><p>或者，我们可以使用解构声明来覆盖_it_，使代码更容易理解：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> output2 <span class="token operator">=</span> players<span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> <span class="token punctuation">(</span>player<span class="token punctuation">,</span> score<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token string-literal singleline"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">player</span></span><span class="token string">&#39;s score: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">score</span></span><span class="token string">&quot;</span></span> <span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedOutput<span class="token punctuation">,</span> output2<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探索了Kotlin的Lambda表达式，并发现隐式的_it_参数可能导致歧义，特别是在嵌套Lambda表达式中。然后，我们讨论了如何通过使用显式参数覆盖_it_来提高代码的可读性。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>`,41),o=[e];function i(l,c){return a(),s("div",null,o)}const k=n(p,[["render",i],["__file","2024-07-11-The Implicit Name Of the Single Parameter in Lambda Expressions  it.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-The%20Implicit%20Name%20Of%20the%20Single%20Parameter%20in%20Lambda%20Expressions%20%20it.html","title":"Kotlin中单参数Lambda表达式的隐式名称：it","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Programming"],"tag":["Kotlin","Lambda Expressions"],"head":[["meta",{"name":"keywords","content":"Kotlin, Lambda Expressions, it, implicit parameter"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-The%20Implicit%20Name%20Of%20the%20Single%20Parameter%20in%20Lambda%20Expressions%20%20it.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中单参数Lambda表达式的隐式名称：it"}],["meta",{"property":"og:description","content":"Kotlin中单参数Lambda表达式的隐式名称：it Lambda表达式是Kotlin中用于编写简洁且富有表现力代码的强大工具。此外，我们可以在Lambda表达式中使用默认的隐式参数_it_。 在本教程中，我们将探索_it_是什么，以及如何提高我们的Lambda表达式的可读性。 2. 问题介绍 首先，让我们看一个在Lambda表达式中使用_it_作为..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T09:42:39.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"Lambda Expressions"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T09:42:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中单参数Lambda表达式的隐式名称：it\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T09:42:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中单参数Lambda表达式的隐式名称：it Lambda表达式是Kotlin中用于编写简洁且富有表现力代码的强大工具。此外，我们可以在Lambda表达式中使用默认的隐式参数_it_。 在本教程中，我们将探索_it_是什么，以及如何提高我们的Lambda表达式的可读性。 2. 问题介绍 首先，让我们看一个在Lambda表达式中使用_it_作为..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 它是什么？","slug":"_3-它是什么","link":"#_3-它是什么","children":[]},{"level":2,"title":"4. 提高可读性","slug":"_4-提高可读性","link":"#_4-提高可读性","children":[{"level":3,"title":"4.1. 用显式参数名覆盖_it_","slug":"_4-1-用显式参数名覆盖-it","link":"#_4-1-用显式参数名覆盖-it","children":[]},{"level":3,"title":"4.2. 使用解构声明","slug":"_4-2-使用解构声明","link":"#_4-2-使用解构声明","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720690959000,"updatedTime":1720690959000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.29,"words":1288},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-The Implicit Name Of the Single Parameter in Lambda Expressions  it.md","localizedDate":"2022年11月1日","excerpt":"<hr>\\n<h1>Kotlin中单参数Lambda表达式的隐式名称：it</h1>\\n<p>Lambda表达式是Kotlin中用于编写简洁且富有表现力代码的强大工具。此外，我们可以在Lambda表达式中使用默认的隐式参数_it_。</p>\\n<p>在本教程中，我们将探索_it_是什么，以及如何提高我们的Lambda表达式的可读性。</p>\\n<h2>2. 问题介绍</h2>\\n<p>首先，让我们看一个在Lambda表达式中使用_it_作为参数名称的例子：</p>\\n<div class=\\"language-kotlin\\" data-ext=\\"kt\\" data-title=\\"kt\\"><pre class=\\"language-kotlin\\"><code><span class=\\"token keyword\\">val</span> result <span class=\\"token operator\\">=</span> <span class=\\"token function\\">listOf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"Kai\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"Liam\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"Eric\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"Kevin\\"</span></span><span class=\\"token punctuation\\">)</span>\\n  <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">filter</span> <span class=\\"token punctuation\\">{</span> it<span class=\\"token punctuation\\">.</span>length <span class=\\"token operator\\">==</span> <span class=\\"token number\\">4</span> <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">map</span> <span class=\\"token punctuation\\">{</span> it<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">uppercase</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">sortedBy</span> <span class=\\"token punctuation\\">{</span> it <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span><span class=\\"token function\\">listOf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"ERIC\\"</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"LIAM\\"</span></span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> result<span class=\\"token punctuation\\">)</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
