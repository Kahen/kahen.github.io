import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-BUAgDejY.js";const t={},c=e(`<hr><h1 id="java中scanner的integer-parseint-scanner-nextline-和scanner-nextint-的比较" tabindex="-1"><a class="header-anchor" href="#java中scanner的integer-parseint-scanner-nextline-和scanner-nextint-的比较"><span>Java中Scanner的Integer.parseInt(scanner.nextLine())和scanner.nextInt()的比较</span></a></h1><p>在Java中，我们可以使用<code>Integer.parseInt(Scanner.nextLine())</code>和<code>Scanner.nextInt()</code>两种方法来从<code>Scanner</code>读取整数。然而，这两种方法之间存在一些差异。</p><p>本教程将对它们进行比较并讨论它们之间的不同之处。</p><h3 id="使用integer-parseint-scanner-nextline-和scanner-nextint-读取整数" tabindex="-1"><a class="header-anchor" href="#使用integer-parseint-scanner-nextline-和scanner-nextint-读取整数"><span>使用<code>Integer.parseInt(scanner.nextLine())</code>和<code>scanner.nextInt()</code>读取整数</span></a></h3><p><code>Scanner.nextLine()</code>方法将整行作为字符串从扫描器中读取。因此，如果我们想要得到一个<code>Integer</code>类型的结果，我们必须自己将字符串转换为<code>Integer</code>，例如使用<code>Integer.parseInt()</code>方法。</p><p>另一方面，<code>Scanner.nextInt()</code>读取输入中的下一个记作为整数。在<code>Scanner</code>中，一个标记是由<code>Scanner</code>用于解析输入流的分隔符模式定义的。默认情况下，<code>Scanner</code>的分隔符模式是任何空白字符（例如空格、制表符或换行符）。</p><p>现在我们已经了解了这些方法的作用，让我们看看它们是如何从<code>Scanner</code>对象中读取整数的。首先，我们将向扫描器输入一个带有尾随换行符的字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;42\\n&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了简单起见，本教程将使用单元测试断言来验证结果。</p><p>首先，让我们使用<code>Scanner.nextLine()</code>方法获取数字42：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Scanner</span> sc1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> num1 <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>sc1<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">,</span> num1<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，轮到<code>Scanner.nextInt()</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Scanner</span> sc2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> num2 <span class="token operator">=</span> sc2<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">,</span> num2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上述两个测试所示，这两种方法都可以从<code>Scanner</code>对象中读取输入并正确地获取整数42。</p><p>接下来，让我们看看这两种方法的不同之处。</p><h3 id="当输入是无效数字格式时" tabindex="-1"><a class="header-anchor" href="#当输入是无效数字格式时"><span>当输入是无效数字格式时</span></a></h3><p>它们的第一个区别是，当输入不是有效的数字时，这两种方法会抛出不同的异常。</p><p>现在，让我们改变输入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;Nan\\n&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>当我们通过<code>scanner.nextLine()</code>读取输入并尝试将无效输入转换为整数时，它会抛出</strong> <code>NumberFormatException</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Scanner</span> sc1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">NumberFormatException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>sc1<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这是因为<code>sc1.nextLine()</code>将下一行输入作为字符串读取。但是，后续的转换失败了。因此，<code>Integer.parseInt()</code>方法抛出了<code>NumberFormatException</code>。</p><p>值得一提的是，我们使用了JUnit 5的<code>assertThrows()</code>方法来断言方法调用抛出了<code>NumberFormatException</code>。</p><p>另一方面，当我们<strong>尝试使用<code>Scanner.nextInt()</code>将输入作为整数读取时，它会引发<code>InputMismatchException</code></strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Scanner</span> sc2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">InputMismatchException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> sc2<span class="token operator">::</span><span class="token function">nextInt</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="scanner-nextint-方法不会消耗无效的标记" tabindex="-1"><a class="header-anchor" href="#scanner-nextint-方法不会消耗无效的标记"><span><code>Scanner.nextInt()</code>方法不会消耗无效的标记</span></a></h3><p>正如前面提到的，<code>Scanner.nextLine()</code>将输入中的下一行作为字符串读取。与<code>Scanner.nextLine()</code>方法不同，<code>nextInt()</code>将尝试将输入中的下一个标记解析为整数。</p><p>如果它无法解析一个标记，正如我们之前看到的，<code>nextInt()</code>会抛出<code>InputMismatchException</code>。但是<strong>我们应该注意到<code>Scanner.nextInt()</code>不会消耗它未能解析的解析失败的标记</strong>。</p><p>一个例子可以帮助我们快速理解这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;42 is a magic number\\n&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// nextInt()</span>
<span class="token class-name">Scanner</span> sc2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> num2 <span class="token operator">=</span> sc2<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">,</span> num2<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 再次调用nextInt()在&quot;is&quot;上引发异常</span>
<span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">InputMismatchException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> sc2<span class="token operator">::</span><span class="token function">nextInt</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> theNextToken <span class="token operator">=</span> sc2<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;is&quot;</span><span class="token punctuation">,</span> theNextToken<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上述例子所示，输入字符串有五个标记。第一个，“42”，是一个有效的整数。正如我们预期的，<code>sc2.nextInt()</code>调用得到了整数42。然后，我们再次调用了<code>nextInt()</code>并试图将标记“is”解析为整数。它抛出了<code>InputMismatchException</code>，这也是我们的预期。</p><p>接下来，我们调用了<code>sc2.next()</code>来获取下一个标记作为字符串。我们可以看到，标记“is”，<code>nextInt()</code>方法刚才未能解析的标记，被从输入中读取出来。换句话说，“is”没有被<code>sc2.nextInt()</code>方法消耗。</p><h3 id="换行符处理" tabindex="-1"><a class="header-anchor" href="#换行符处理"><span>换行符处理</span></a></h3><p>Java Scanner默认通过输入中的“\\n”字符分隔行。接下来，让我们看看<code>Scanner.nextLine()</code>和<code>nextInt()</code>如何处理换行字符。</p><p>首先，我们准备一个多行字符串作为输入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;42\\n&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;It is a magic number.\\n&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><code>Scanner.nextLine()</code>方法消耗整行，包括行分隔符。但它只返回不带尾随换行字符的文本，</strong> 然后将位置设置为下一行的开头：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// nextLine()</span>
<span class="token class-name">Scanner</span> sc1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> num1 <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>sc1<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> nextLineText1 <span class="token operator">=</span> sc1<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">,</span> num1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;It is a magic number.&quot;</span><span class="token punctuation">,</span> nextLineText1<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，另一方面，<strong><code>Scanner.nextInt()</code>扫描输入的下一个标记作为整数，但不消耗随后的换行字符</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// nextInt()</span>
<span class="token class-name">Scanner</span> sc2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> num2 <span class="token operator">=</span> sc2<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">,</span> num2<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// nextInt()留下换行字符(\\n)</span>
<span class="token class-name">String</span> nextLineText2 <span class="token operator">=</span> sc2<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> nextLineText2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试中，我们在调用<code>sc2.nextInt()</code>获取数字42后，调用了<code>sc2.nextLine()</code>。然后，正如我们所看到的，该方法返回了一个空字符串而不是“It is a magic number.”。这是因为<code>nextInt()</code>没有消耗“42”后的换行字符。</p><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在本文中，我们通过例子讨论了<code>Integer.parseInt(Scanner.nextLine())</code>和<code>Scanner.nextInt()</code>之间的差异。让我们在这里总结一下：</p><ul><li>两种方法对于无效数字格式的输入抛出不同的异常。</li><li><code>Scanner.nextLine()</code>消耗了<code>Scanner</code>中的换行字符，但返回的字符串中不包含它。</li><li><code>Scanner.nextInt()</code>不消耗换行字符。</li><li><code>Scanner.nextInt()</code>不消耗它未能解析的标记。</li></ul><p>像往常一样，这里展示的所有代码片段都可以在GitHub上找到。</p>`,46),p=[c];function o(i,l){return s(),a("div",null,p)}const d=n(t,[["render",o],["__file","2024-07-06-Integer.parseInt scanner.nextLine    and scanner.nextInt   in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Integer.parseInt%20scanner.nextLine%20%20%20%20and%20scanner.nextInt%20%20%20in%20Java.html","title":"Java中Scanner的Integer.parseInt(scanner.nextLine())和scanner.nextInt()的比较","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Scanner"],"tag":["Java","Scanner","Integer.parseInt","nextInt"],"head":[["meta",{"name":"keywords","content":"Java, Scanner, Integer.parseInt, nextInt, 比较, 用法, 异常处理"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Integer.parseInt%20scanner.nextLine%20%20%20%20and%20scanner.nextInt%20%20%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中Scanner的Integer.parseInt(scanner.nextLine())和scanner.nextInt()的比较"}],["meta",{"property":"og:description","content":"Java中Scanner的Integer.parseInt(scanner.nextLine())和scanner.nextInt()的比较 在Java中，我们可以使用Integer.parseInt(Scanner.nextLine())和Scanner.nextInt()两种方法来从Scanner读取整数。然而，这两种方法之间存在一些差异。 本教程..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T23:32:29.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Scanner"}],["meta",{"property":"article:tag","content":"Integer.parseInt"}],["meta",{"property":"article:tag","content":"nextInt"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T23:32:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中Scanner的Integer.parseInt(scanner.nextLine())和scanner.nextInt()的比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T23:32:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中Scanner的Integer.parseInt(scanner.nextLine())和scanner.nextInt()的比较 在Java中，我们可以使用Integer.parseInt(Scanner.nextLine())和Scanner.nextInt()两种方法来从Scanner读取整数。然而，这两种方法之间存在一些差异。 本教程..."},"headers":[{"level":3,"title":"使用Integer.parseInt(scanner.nextLine())和scanner.nextInt()读取整数","slug":"使用integer-parseint-scanner-nextline-和scanner-nextint-读取整数","link":"#使用integer-parseint-scanner-nextline-和scanner-nextint-读取整数","children":[]},{"level":3,"title":"当输入是无效数字格式时","slug":"当输入是无效数字格式时","link":"#当输入是无效数字格式时","children":[]},{"level":3,"title":"Scanner.nextInt()方法不会消耗无效的标记","slug":"scanner-nextint-方法不会消耗无效的标记","link":"#scanner-nextint-方法不会消耗无效的标记","children":[]},{"level":3,"title":"换行符处理","slug":"换行符处理","link":"#换行符处理","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720308749000,"updatedTime":1720308749000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.48,"words":1343},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Integer.parseInt scanner.nextLine    and scanner.nextInt   in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中Scanner的Integer.parseInt(scanner.nextLine())和scanner.nextInt()的比较</h1>\\n<p>在Java中，我们可以使用<code>Integer.parseInt(Scanner.nextLine())</code>和<code>Scanner.nextInt()</code>两种方法来从<code>Scanner</code>读取整数。然而，这两种方法之间存在一些差异。</p>\\n<p>本教程将对它们进行比较并讨论它们之间的不同之处。</p>\\n<h3>使用<code>Integer.parseInt(scanner.nextLine())</code>和<code>scanner.nextInt()</code>读取整数</h3>","autoDesc":true}');export{d as comp,k as data};
