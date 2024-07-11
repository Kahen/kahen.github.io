import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-uizvaz9h.js";const p={},e=t(`<h1 id="java中使用scanner类处理带空格的输入" tabindex="-1"><a class="header-anchor" href="#java中使用scanner类处理带空格的输入"><span>Java中使用Scanner类处理带空格的输入</span></a></h1><p>在Java编程中，获取和解析用户输入是一项常见任务，处理包含空格的输入有时可能会有些棘手。</p><p>在本教程中，我们将探讨如何使用_Scanner_类在Java中以包含空格的字符串形式接收输入。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>让我们通过一个简单的例子来理解问题。</p><p>假设我们的扫描器接收两行文本。第一行是一个人的名字，第二行简要描述了这个人：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;Michael Jackson\\n&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;He was the &#39;King of Pop&#39;.\\n&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了简单起见，我们将使用字符串来“喂养”_Scanner_对象，并使用单元测试断言来验证结果是否符合预期。</p><p>通常，我们将<strong>使用_Scanner.next()_方法从扫描器中读取下一个token</strong>。</p><p>接下来，让我们尝试从我们的扫描器对象中读取两个token：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> name <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> description <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Michael&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Jackson&quot;</span><span class="token punctuation">,</span> description<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它会通过。显然，_Scanner_并不智能地理解我们的要求。相反，<strong>它使用空格，包括空格和换行符作为默认分隔符来读取token</strong>。因此，我们得到的是“<em>Michael</em>”而不是“<em>Michael Jackson</em>”作为人的名字。</p><p>实际上，这个例子只展示了处理包含空格的输入值的一个场景。可以有两种场景：</p><ul><li>每行一个值，正如我们的“<em>Michael Jackson</em>”示例所示</li><li>由特殊分隔符分隔的值</li></ul><p>接下来，我们将找出如何从_Scanner_对象中读取包含空格的值。当然，我们将涵盖这两种场景。</p><h2 id="_3-每行一个值" tabindex="-1"><a class="header-anchor" href="#_3-每行一个值"><span>3. 每行一个值</span></a></h2><p>让我们首先更仔细地看看“每行一个值”的场景。我们仍然使用前一节中的“<em>Michael Jackson</em>”示例作为本节的输入。</p><h3 id="_3-1-使用-nextline-方法" tabindex="-1"><a class="header-anchor" href="#_3-1-使用-nextline-方法"><span>3.1. 使用_nextLine()_方法</span></a></h3><p>由于我们想要从扫描器中读取整行作为值，_Scanner的_nextLine()_方法是一个不错的选择。<strong>_nextLine()_方法从当前位置读取到下一个换行符</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> name <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> description <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Michael Jackson&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;He was the &#39;King of Pop&#39;.&quot;</span><span class="token punctuation">,</span> description<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，_nextLine()_直接解决了问题。</p><h3 id="_3-2-使用-n-作为分隔符" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-n-作为分隔符"><span>3.2. 使用‘<em>\\n</em>’作为分隔符</span></a></h3><p>我们之前提到过_Scanner_默认将空格和换行符视为分隔符。<strong>如果我们告诉_Scanner_只将换行符作为分隔符，我们仍然可以使用_next()_方法将一行作为token读取</strong>。让我们创建一个测试来验证它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
sc<span class="token punctuation">.</span><span class="token function">useDelimiter</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> name <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> description <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Michael Jackson&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;He was the &#39;King of Pop&#39;.&quot;</span><span class="token punctuation">,</span> description<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，_useDelimiter()_方法是解决问题的关键。</p><h2 id="_4-由特殊分隔符分隔的值" tabindex="-1"><a class="header-anchor" href="#_4-由特殊分隔符分隔的值"><span>4. 由特殊分隔符分隔的值</span></a></h2><p>有时，我们的输入具有预定义的格式。例如，一个逗号和一个空格将输入行中的三个伟大艺术家的名字分开：“<em>Michael Jackson, Whitney Houston, John Lennon</em>”。</p><p>接下来，让我们看看在这种情况下如何读取预期的值。</p><h3 id="_4-1-使用-string-split-方法" tabindex="-1"><a class="header-anchor" href="#_4-1-使用-string-split-方法"><span>4.1. 使用_String.split()_方法</span></a></h3><p>解决这个问题的第一个想法仍然是使用_nextLine()_读取整行。然后，<strong>我们可以将分隔符模式传递给方便的_String.split()_方法以获得数组中的值：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;Michael Jackson, Whitney Houston, John Lennon\\n&quot;</span><span class="token punctuation">;</span>

<span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> names <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;, &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;Michael Jackson&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Whitney Houston&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;John Lennon&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> names<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的测试显示我们已经正确地将三个名字存储在字符串数组中。</p><h3 id="_4-2-自定义分隔符" tabindex="-1"><a class="header-anchor" href="#_4-2-自定义分隔符"><span>4.2. 自定义分隔符</span></a></h3><p>使用分隔符模式的_split()_方法可以处理具有自定义分隔符的值。然而，由于Java中的数组具有固定大小，如果扫描器输入有多个行，合并数组可能会很慢。</p><p><strong>通常，我们会在Java中使用列表而不是数组</strong>。所以接下来，让我们调整_Scanner的_分隔符，并将名字存储在列表中，使用_Scanner的_next()_方法。</p><p>我们已经学会了使用_useDelimiter()_方法来设置自定义分隔符模式。由于这个输入示例的分隔符是一个逗号和一个空格，有些人可能会想到：<em>useDelimiter(&quot;, &quot;)</em>。</p><p>所以接下来，让我们在输入中添加一个名字，看看这个想法是否如预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;Michael Jackson, Whitney Houston, John Lennon\\n&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;Elvis Presley\\n&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
sc<span class="token punctuation">.</span><span class="token function">useDelimiter</span><span class="token punctuation">(</span><span class="token string">&quot;, &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` names <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>sc<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    names<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>sc<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span><span class="token string">&quot;Michael Jackson&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Whitney Houston&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;John Lennon&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Elvis Presley&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> names<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如果我们运行这个测试，它会失败</strong>。真是个惊喜！所以，让我们通过几个断言来弄清楚我们在列表中有什么：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> names<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;John Lennon\\nElvis Presley\\n&quot;</span><span class="token punctuation">,</span> names<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到我们的结果列表有四个元素而不是三个。另外，第三个元素是_“John Lennon\\nElvis Presley\\n”_。这是因为我们设置了“, ”作为分隔符。然后，换行符成为token的一部分。所以**_next()_方法将把换行符视为token中的其他普通字符**。</p><p>现在我们理解了问题的原因。那么解决起来就很容易了——<strong>我们必须在分隔符模式中添加‘<em>\\n</em>’</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
sc<span class="token punctuation">.</span><span class="token function">useDelimiter</span><span class="token punctuation">(</span><span class="token string">&quot;, |\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` names <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>sc<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    names<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>sc<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span><span class="token string">&quot;Michael Jackson&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Whitney Houston&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;John Lennon&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Elvis Presley&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> names<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这次，测试通过了。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们通过示例学习了如何从_Scanner_读取包含空格的值。文章涵盖了两种场景，我们探讨了解决问题的不同方法。</p><p>像往常一样，这里展示的所有代码片段都可以在GitHub上找到。</p>`,47),c=[e];function o(i,l){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","2024-07-05-How to Take Input as String With Spaces in Java Using Scanner .html.vue"]]),d=JSON.parse(`{"path":"/posts/baeldung/2024-07-05/2024-07-05-How%20to%20Take%20Input%20as%20String%20With%20Spaces%20in%20Java%20Using%20Scanner%20.html","title":"Java中使用Scanner类处理带空格的输入","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Scanner"],"tag":["Java","Scanner","Input","Spaces"],"head":[["meta",{"name":"keywords","content":"Java, Scanner, Input, Spaces"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-How%20to%20Take%20Input%20as%20String%20With%20Spaces%20in%20Java%20Using%20Scanner%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中使用Scanner类处理带空格的输入"}],["meta",{"property":"og:description","content":"Java中使用Scanner类处理带空格的输入 在Java编程中，获取和解析用户输入是一项常见任务，处理包含空格的输入有时可能会有些棘手。 在本教程中，我们将探讨如何使用_Scanner_类在Java中以包含空格的字符串形式接收输入。 2. 问题介绍 让我们通过一个简单的例子来理解问题。 假设我们的扫描器接收两行文本。第一行是一个人的名字，第二行简要描..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T09:56:50.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Scanner"}],["meta",{"property":"article:tag","content":"Input"}],["meta",{"property":"article:tag","content":"Spaces"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T09:56:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中使用Scanner类处理带空格的输入\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T09:56:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中使用Scanner类处理带空格的输入 在Java编程中，获取和解析用户输入是一项常见任务，处理包含空格的输入有时可能会有些棘手。 在本教程中，我们将探讨如何使用_Scanner_类在Java中以包含空格的字符串形式接收输入。 2. 问题介绍 让我们通过一个简单的例子来理解问题。 假设我们的扫描器接收两行文本。第一行是一个人的名字，第二行简要描..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 每行一个值","slug":"_3-每行一个值","link":"#_3-每行一个值","children":[{"level":3,"title":"3.1. 使用_nextLine()_方法","slug":"_3-1-使用-nextline-方法","link":"#_3-1-使用-nextline-方法","children":[]},{"level":3,"title":"3.2. 使用‘\\\\n’作为分隔符","slug":"_3-2-使用-n-作为分隔符","link":"#_3-2-使用-n-作为分隔符","children":[]}]},{"level":2,"title":"4. 由特殊分隔符分隔的值","slug":"_4-由特殊分隔符分隔的值","link":"#_4-由特殊分隔符分隔的值","children":[{"level":3,"title":"4.1. 使用_String.split()_方法","slug":"_4-1-使用-string-split-方法","link":"#_4-1-使用-string-split-方法","children":[]},{"level":3,"title":"4.2. 自定义分隔符","slug":"_4-2-自定义分隔符","link":"#_4-2-自定义分隔符","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720173410000,"updatedTime":1720173410000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.9,"words":1469},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-How to Take Input as String With Spaces in Java Using Scanner .md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在Java编程中，获取和解析用户输入是一项常见任务，处理包含空格的输入有时可能会有些棘手。</p>\\n<p>在本教程中，我们将探讨如何使用_Scanner_类在Java中以包含空格的字符串形式接收输入。</p>\\n<h2>2. 问题介绍</h2>\\n<p>让我们通过一个简单的例子来理解问题。</p>\\n<p>假设我们的扫描器接收两行文本。第一行是一个人的名字，第二行简要描述了这个人：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> input <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">StringBuilder</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">append</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Michael Jackson\\\\n\\"</span><span class=\\"token punctuation\\">)</span>\\n  <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">append</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"He was the 'King of Pop'.\\\\n\\"</span><span class=\\"token punctuation\\">)</span>\\n  <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">toString</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token class-name\\">Scanner</span> sc <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Scanner</span><span class=\\"token punctuation\\">(</span>input<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}`);export{k as comp,d as data};
