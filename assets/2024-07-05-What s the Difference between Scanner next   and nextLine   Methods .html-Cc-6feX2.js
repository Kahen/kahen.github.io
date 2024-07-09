import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DRFG6C5y.js";const e={},p=t(`<hr><h1 id="java-scanner-类的-next-和-nextline-方法有什么区别" tabindex="-1"><a class="header-anchor" href="#java-scanner-类的-next-和-nextline-方法有什么区别"><span>Java Scanner 类的 next() 和 nextLine() 方法有什么区别？</span></a></h1><p>在这篇简短的教程中，我们将强调 Scanner 类的 next() 和 nextLine() 方法之间的区别。尽管这两种方法乍一看可能非常相似，但它们实际上有很大的不同。</p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Scanner 类带有一组方法，这些方法通过将输入分解为多个标记来简化解析输入的过程。它通常用于从控制台和文件等不同来源读取输入数据。</p><h2 id="_2-next-方法" tabindex="-1"><a class="header-anchor" href="#_2-next-方法"><span>2. next() 方法</span></a></h2><p>通常，Scanner 通过使用分隔符模式将输入分解为标记，其默认值是任何空格。</p><p>换句话说，正如名称所示，next() 只从输入中读取下一个标记，直到遇到分隔符。</p><h3 id="_2-1-使用默认分隔符" tabindex="-1"><a class="header-anchor" href="#_2-1-使用默认分隔符"><span>2.1. 使用默认分隔符</span></a></h3><p>如前所述，Scanner 类使用空格作为默认分隔符。</p><p>例如，如果我们输入 &quot;Hello world&quot;，next() 将只读取值 &quot;Hello&quot;。剩下的单词 &quot;world&quot; 将可用于下一次调用 next() 方法。</p><p>让我们用一个测试用例来示例 next() 的使用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenInput_whenUsingNextMethod_thenReturnToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;Hello world&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">,</span> scanner<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;world&quot;</span><span class="token punctuation">,</span> scanner<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，Scanner 使用空格字符来解析输入。</p><p>因此，next() 方法的第一个调用只读取了值 &quot;Hello&quot;。进一步地，第二个调用读取了值 &quot;world&quot;。</p><p>多个空格也被视为一个单一的空格，结果相同：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenInput_whenUsingNextMethodWithMultipleWhiteSpaces_thenReturnToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;Hello        world&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">,</span> scanner<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;world&quot;</span><span class="token punctuation">,</span> scanner<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>包括制表符和换行符在内的多个空格也会产生相同的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenInput_whenUsingNextMethodWithTabAndNewLine_thenReturnToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;Hello    \\t\\n world&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">,</span> scanner<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;world&quot;</span><span class="token punctuation">,</span> scanner<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，空格包括多个字符，不仅仅是空格，例如制表符(\\t)、回车符(\\n)等。</p><h3 id="_2-2-使用自定义分隔符" tabindex="-1"><a class="header-anchor" href="#_2-2-使用自定义分隔符"><span>2.2. 使用自定义分隔符</span></a></h3><p>Scanner 类提供了一种方便的方法，通过 useDelimiter() 方法来覆盖默认分隔符。</p><p>让我们看看使用自定义分隔符时 next() 方法的行为。</p><p>例如，我们将使用 &quot;：&quot; 字符作为我们的分隔符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenInput_whenUsingNextMethodWithCustomDelimiter_thenReturnToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;Hello :world&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        scanner<span class="token punctuation">.</span><span class="token function">useDelimiter</span><span class="token punctuation">(</span><span class="token string">&quot;:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Hello &quot;</span><span class="token punctuation">,</span> scanner<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;world&quot;</span><span class="token punctuation">,</span> scanner<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，next() 读取 &quot;Hello&quot;，这次后面跟着空格字符。原因是 Scanner 使用 &quot;：&quot; 而不是空格来将输入分解为标记。</p><h2 id="_3-nextline-方法" tabindex="-1"><a class="header-anchor" href="#_3-nextline-方法"><span>3. nextLine() 方法</span></a></h2><p>另一方面，nextLine() 消耗输入的整行，包括空格字符，直到它到达换行字符 &quot;\\n&quot;。</p><p>换句话说，我们可以使用这种方法来读取包含默认分隔符的输入，例如空格。它在接收到 &quot;\\n&quot; 或按下回车键后停止读取。</p><p>让我们在实践中看看：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenInput_whenUsingNextLineMethod_thenReturnEntireLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;Hello world\\nWelcome to baeldung.com&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Hello world&quot;</span><span class="token punctuation">,</span> scanner<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Welcome to baeldung.com&quot;</span><span class="token punctuation">,</span> scanner<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，第一次 scanner.nextLine() 读取了整个值 &quot;Hello world&quot;，第二次消耗了其余的输入。</p><p>与 next() 不同，它将光标放在同一行，nextLine() 在读取输入后将光标指向下一行。</p><p>这里需要注意的一个重要点是，与 next() 不同，定义自定义分隔符不会改变 nextLine() 的行为。</p><p>让我们用一个测试用例来确认这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenInput_whenUsingNextLineWithCustomDelimiter_thenIgnoreDelimiter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;Hello:world\\nWelcome:to baeldung.com&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        scanner<span class="token punctuation">.</span><span class="token function">useDelimiter</span><span class="token punctuation">(</span><span class="token string">&quot;:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Hello:world&quot;</span><span class="token punctuation">,</span> scanner<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Welcome:to baeldung.com&quot;</span><span class="token punctuation">,</span> scanner<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不出所料，nextLine() 方法忽略了我们的自定义分隔符，并继续读取输入，直到找到 &quot;\\n&quot; 字符。</p><p>接下来，我们将展示其他分隔符将被视为新行并返回相同的结果：</p><p><strong>回车符（&quot;\\r&quot;）和回车换行符（&quot;\\r\\n&quot;）也被视为 nextLine() 的新行分隔符：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenInput_whenUsingNextLineMethodWithCR_thenReturnEntireLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;Hello world\\rWelcome to baeldung.com&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Hello world&quot;</span><span class="token punctuation">,</span> scanner<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Welcome to baeldung.com&quot;</span><span class="token punctuation">,</span> scanner<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，与回车换行符 <strong>：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenInput_whenUsingNextLineMethodWithCRLF_thenReturnEntireLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;Hello world\\r\\nWelcome to baeldung.com&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Hello world&quot;</span><span class="token punctuation">,</span> scanner<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Welcome to baeldung.com&quot;</span><span class="token punctuation">,</span> scanner<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-差异" tabindex="-1"><a class="header-anchor" href="#_4-差异"><span>4. 差异</span></a></h2><p>简而言之，以下是比较 next() 和 nextLine() 方法时需要记住的一些关键点：</p><ul><li>nextLine() 返回到换行符的整个文本。next() 根据给定的分隔符（默认为空格）读取标记化文本</li><li>nextLine() 在读取输入后将扫描器位置放在下一行。然而，next() 保持光标在同一行</li></ul><h2 id="_5-其他标记化字符串的方法" tabindex="-1"><a class="header-anchor" href="#_5-其他标记化字符串的方法"><span>5. 其他标记化字符串的方法</span></a></h2><p>如果你想将 Scanner 类用作标记化机制，你可以使用一些替代方法，如 String.split()。根据你的需求，你可以使用 split 方法的一些变体。</p><p>这里有两种 split 方法，具有不同的参数：</p><ul><li>split(String regex, int limit) – 它将根据提供的正则表达式拆分字符串。第一个参数是正则表达式，第二个是模式将被应用于提供的字符串的次数</li><li>split(String regex): 它将根据提供的正则表达式拆分字符串。模式将无限期地应用，直到到达字符串的末尾。</li></ul><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们详细解释了 Scanner.next() 和 Scanner.nextLine() 方法之间的区别。</p><p>如往常一样，示例的完整源代码可在 GitHub 上获得。</p>`,52),o=[p];function c(i,l){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-05-What s the Difference between Scanner next   and nextLine   Methods .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-What%20s%20the%20Difference%20between%20Scanner%20next%20%20%20and%20nextLine%20%20%20Methods%20.html","title":"Java Scanner 类的 next() 和 nextLine() 方法有什么区别？","lang":"zh-CN","frontmatter":{"date":"2024-07-05T00:00:00.000Z","category":["Java","Scanner"],"tag":["next()","nextLine()"],"head":[["meta",{"name":"keywords","content":"Java, Scanner, next(), nextLine(), 区别"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-What%20s%20the%20Difference%20between%20Scanner%20next%20%20%20and%20nextLine%20%20%20Methods%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java Scanner 类的 next() 和 nextLine() 方法有什么区别？"}],["meta",{"property":"og:description","content":"Java Scanner 类的 next() 和 nextLine() 方法有什么区别？ 在这篇简短的教程中，我们将强调 Scanner 类的 next() 和 nextLine() 方法之间的区别。尽管这两种方法乍一看可能非常相似，但它们实际上有很大的不同。 1. 概述 Scanner 类带有一组方法，这些方法通过将输入分解为多个标记来简化解析输入的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T05:57:20.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"next()"}],["meta",{"property":"article:tag","content":"nextLine()"}],["meta",{"property":"article:published_time","content":"2024-07-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T05:57:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java Scanner 类的 next() 和 nextLine() 方法有什么区别？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-05T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T05:57:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java Scanner 类的 next() 和 nextLine() 方法有什么区别？ 在这篇简短的教程中，我们将强调 Scanner 类的 next() 和 nextLine() 方法之间的区别。尽管这两种方法乍一看可能非常相似，但它们实际上有很大的不同。 1. 概述 Scanner 类带有一组方法，这些方法通过将输入分解为多个标记来简化解析输入的..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. next() 方法","slug":"_2-next-方法","link":"#_2-next-方法","children":[{"level":3,"title":"2.1. 使用默认分隔符","slug":"_2-1-使用默认分隔符","link":"#_2-1-使用默认分隔符","children":[]},{"level":3,"title":"2.2. 使用自定义分隔符","slug":"_2-2-使用自定义分隔符","link":"#_2-2-使用自定义分隔符","children":[]}]},{"level":2,"title":"3. nextLine() 方法","slug":"_3-nextline-方法","link":"#_3-nextline-方法","children":[]},{"level":2,"title":"4. 差异","slug":"_4-差异","link":"#_4-差异","children":[]},{"level":2,"title":"5. 其他标记化字符串的方法","slug":"_5-其他标记化字符串的方法","link":"#_5-其他标记化字符串的方法","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720159040000,"updatedTime":1720159040000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.31,"words":1292},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-What s the Difference between Scanner next   and nextLine   Methods .md","localizedDate":"2024年7月5日","excerpt":"<hr>\\n<h1>Java Scanner 类的 next() 和 nextLine() 方法有什么区别？</h1>\\n<p>在这篇简短的教程中，我们将强调 Scanner 类的 next() 和 nextLine() 方法之间的区别。尽管这两种方法乍一看可能非常相似，但它们实际上有很大的不同。</p>\\n<h2>1. 概述</h2>\\n<p>Scanner 类带有一组方法，这些方法通过将输入分解为多个标记来简化解析输入的过程。它通常用于从控制台和文件等不同来源读取输入数据。</p>\\n<h2>2. next() 方法</h2>\\n<p>通常，Scanner 通过使用分隔符模式将输入分解为标记，其默认值是任何空格。</p>","autoDesc":true}');export{k as comp,d as data};
