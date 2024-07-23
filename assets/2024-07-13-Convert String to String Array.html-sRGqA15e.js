import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-on0L14Tx.js";const p={},o=t(`<hr><h1 id="java中将字符串转换为字符串数组" tabindex="-1"><a class="header-anchor" href="#java中将字符串转换为字符串数组"><span>Java中将字符串转换为字符串数组</span></a></h1><p>在本教程中，我们将探讨如何在Java中将<code>String</code>转换为<code>String</code>数组（<code>String[]</code>）。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>将字符串转换为字符串数组可能有两种场景：</p><ul><li>将字符串转换为单例数组（只有一个元素的数组）</li><li>根据特定规则将字符串拆分为数组元素</li></ul><p>第一种情况相对容易理解。例如，如果我们有一个字符串<code>&quot;baeldung&quot;</code>，我们想将其转换为<code>String[]{ &quot;baeldung&quot; }</code>。换句话说，<strong>转换后的数组只有一个元素，即输入字符串本身</strong>。</p><p>对于第二种情况，我们需要将输入字符串拆分成片段。然而，结果应该是完全取决于需求的。例如，如果我们期望最终数组中的每个元素包含输入字符串中的两个相邻字符，给定<code>&quot;baeldung&quot;</code>，我们将有<code>String[]{ &quot;ba&quot;, &quot;el&quot;, &quot;du&quot;, &quot;ng&quot; }</code>。稍后，我们将看到更多的例子。</p><p>在本教程中，我们将使用这个字符串作为输入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token constant">INPUT</span> <span class="token operator">=</span> <span class="token string">&quot;Hi there, nice to meet you!&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当然，我们将涵盖两种转换场景。此外，为了简单起见，我们将使用单元测试断言来验证我们的解决方案是否如预期工作。</p><h2 id="_3-转换为单例数组" tabindex="-1"><a class="header-anchor" href="#_3-转换为单例数组"><span>3. 转换为单例数组</span></a></h2><p>由于输入字符串将是目标数组中的唯一元素，<strong>我们可以通过使用输入字符串初始化数组来解决问题</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> myArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token constant">INPUT</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;Hi there, nice to meet you!&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> myArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，如果我们运行测试，它会通过。</p><h2 id="_4-将输入字符串转换为数组中的元素" tabindex="-1"><a class="header-anchor" href="#_4-将输入字符串转换为数组中的元素"><span>4. 将输入字符串转换为数组中的元素</span></a></h2><p>现在，让我们看看如何将输入字符串拆分成段。</p><h3 id="_4-1-使用string的split-方法" tabindex="-1"><a class="header-anchor" href="#_4-1-使用string的split-方法"><span>4.1. 使用<code>String</code>的<code>split()</code>方法</span></a></h3><p><strong>我们经常需要按照特定模式处理输入字符串。</strong> 在这种情况下，我们可以使用正则表达式或regex将输入拆分为<code>String</code>数组。<strong>Java的<code>String</code>类提供了<code>split()</code>方法来完成这项工作</strong>。</p><p>接下来，我们将根据几个不同的要求，将我们的输入示例拆分为数组。</p><p>首先，假设我们想要将输入句子拆分为子句数组。为了解决这个问题，我们可以通过标点符号来拆分输入字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> myArray <span class="token operator">=</span> <span class="token constant">INPUT</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;[-,.!;?]\\\\s*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;Hi there&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;nice to meet you&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> myArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>值得一提的是，<strong>当我们需要在正则表达式的字符类中包含一个破折号字符时，我们可以将其放在最开始</strong>。</p><p>上述测试表明，输入字符串被拆分成了包含两个子句的数组。</p><p>接下来，让我们从同一个输入字符串中提取所有单词到一个单词数组。这也是我们在现实世界中可能经常遇到的问题。</p><p>要获得单词数组，我们可以通过非单词字符（<code>\\\\W+</code>）来拆分输入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> myArray <span class="token operator">=</span> <span class="token constant">INPUT</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\W+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;Hi&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;there&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;nice&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;to&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;meet&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;you&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> myArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们将输入字符串拆分成字符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> myArray <span class="token operator">=</span> <span class="token constant">INPUT</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;H&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;i&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;t&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;h&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;e&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;r&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;e&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;,&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;n&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;i&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;e&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;t&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;o&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;m&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;e&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;e&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;t&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;y&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;o&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;u&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;!&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> myArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上述代码所示，我们使用空字符串（零宽度）作为正则表达式。输入字符串中的每个字符，包括空格，都被提取为目标数组的一个元素。</p><p>我们应该注意到**<code>String.toCharArray()</code>也转换输入为数组。然而，目标数组是一个<code>char</code>数组（<code>char[]</code>）而不是<code>String</code>数组（<code>String[]</code>）**。</p><p>三个例子使用了<code>String.split()</code>方法将输入字符串转换为不同的字符串数组。一些流行的库，如Guava和Apache Commons，也提供了增强的字符串拆分功能。我们在另一篇文章中详细讨论了这一点。</p><p>此外，我们还有更多文章讨论如何解决不同的具体拆分问题。</p><h3 id="_4-2-特殊解析需求" tabindex="-1"><a class="header-anchor" href="#_4-2-特殊解析需求"><span>4.2. 特殊解析需求</span></a></h3><p>有时，我们必须遵循特定规则来拆分输入。一个例子可以快速澄清它。假设我们有这个输入字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token constant">FLIGHT_INPUT</span> <span class="token operator">=</span> <span class="token string">&quot;20221018LH720FRAPEK&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们期望得到这个数组作为结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">{</span> <span class="token string">&quot;20221018&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;LH720&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;FRA&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;PEK&quot;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>乍一看，这种转换逻辑看起来有些模糊。然而，如果我们列出输入字符串的定义，我们将看到为什么期望上述数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">[</span>date<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token class-name">Flight</span> number<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token class-name">Airport</span> from<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token class-name">Airport</span> <span class="token keyword">to</span><span class="token punctuation">]</span>
<span class="token operator">-</span> date<span class="token operator">:</span> <span class="token constant">YYYY</span><span class="token operator">-</span><span class="token constant">MM</span><span class="token operator">-</span><span class="token constant">DD</span><span class="token punctuation">;</span> length<span class="token operator">:</span><span class="token number">8</span>
<span class="token operator">-</span> <span class="token class-name">Flight</span> number<span class="token punctuation">;</span> length<span class="token operator">:</span> variable
<span class="token operator">-</span> <span class="token class-name">Airport</span> <span class="token class-name">From</span><span class="token operator">:</span> <span class="token constant">IATA</span> airport code<span class="token punctuation">,</span> length<span class="token operator">:</span><span class="token number">3</span>
<span class="token operator">-</span> <span class="token class-name">Airport</span> <span class="token class-name">To</span><span class="token operator">:</span> <span class="token constant">IATA</span> airport code<span class="token punctuation">,</span> length<span class="token operator">:</span><span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，有时我们需要根据相当特殊的规则解析输入字符串。在这种情况下，<strong>我们需要分析需求并实现一个解析器</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> dateStr <span class="token operator">=</span> <span class="token constant">FLIGHT_INPUT</span><span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> flightNo <span class="token operator">=</span> <span class="token constant">FLIGHT_INPUT</span><span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token constant">FLIGHT_INPUT</span><span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> airportStart <span class="token operator">=</span> dateStr<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> flightNo<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> from <span class="token operator">=</span> <span class="token constant">FLIGHT_INPUT</span><span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>airportStart<span class="token punctuation">,</span> airportStart <span class="token operator">+</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> <span class="token keyword">to</span> <span class="token operator">=</span> <span class="token constant">FLIGHT_INPUT</span><span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>airportStart <span class="token operator">+</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> myArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> dateStr<span class="token punctuation">,</span> flightNo<span class="token punctuation">,</span> from<span class="token punctuation">,</span> <span class="token keyword">to</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;20221018&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;LH720&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;FRA&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;PEK&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> myArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上述代码所示，我们已经使用了<code>substring()</code>方法构建了一个解析器，并正确处理了航班输入。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何在Java中将<code>String</code>转换为<code>String</code>数组。</p><p>简单来说，将字符串转换为单例数组是相当直接的。如果我们需要将给定的字符串拆分成段，我们可以求助于<code>String.split()</code>方法。然而，如果我们需要根据特定规则拆分输入，我们可能需要仔细分析输入格式并实现一个解析器来解决问题。</p><p>如常，文章中使用的全部代码可在GitHub上找到。</p>`,47),e=[o];function c(l,u){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","2024-07-13-Convert String to String Array.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Convert%20String%20to%20String%20Array.html","title":"Java中将字符串转换为字符串数组","lang":"zh-CN","frontmatter":{"date":"2024-07-13T00:00:00.000Z","category":["Java","String"],"tag":["Java","String Array"],"head":[["meta",{"name":"keywords","content":"Java, String, Convert, Array"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Convert%20String%20to%20String%20Array.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将字符串转换为字符串数组"}],["meta",{"property":"og:description","content":"Java中将字符串转换为字符串数组 在本教程中，我们将探讨如何在Java中将String转换为String数组（String[]）。 2. 问题介绍 将字符串转换为字符串数组可能有两种场景： 将字符串转换为单例数组（只有一个元素的数组） 根据特定规则将字符串拆分为数组元素 第一种情况相对容易理解。例如，如果我们有一个字符串\\"baeldung\\"，我们想将..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T07:38:20.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"String Array"}],["meta",{"property":"article:published_time","content":"2024-07-13T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T07:38:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将字符串转换为字符串数组\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-13T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T07:38:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将字符串转换为字符串数组 在本教程中，我们将探讨如何在Java中将String转换为String数组（String[]）。 2. 问题介绍 将字符串转换为字符串数组可能有两种场景： 将字符串转换为单例数组（只有一个元素的数组） 根据特定规则将字符串拆分为数组元素 第一种情况相对容易理解。例如，如果我们有一个字符串\\"baeldung\\"，我们想将..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 转换为单例数组","slug":"_3-转换为单例数组","link":"#_3-转换为单例数组","children":[]},{"level":2,"title":"4. 将输入字符串转换为数组中的元素","slug":"_4-将输入字符串转换为数组中的元素","link":"#_4-将输入字符串转换为数组中的元素","children":[{"level":3,"title":"4.1. 使用String的split()方法","slug":"_4-1-使用string的split-方法","link":"#_4-1-使用string的split-方法","children":[]},{"level":3,"title":"4.2. 特殊解析需求","slug":"_4-2-特殊解析需求","link":"#_4-2-特殊解析需求","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720856300000,"updatedTime":1720856300000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.75,"words":1425},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Convert String to String Array.md","localizedDate":"2024年7月13日","excerpt":"<hr>\\n<h1>Java中将字符串转换为字符串数组</h1>\\n<p>在本教程中，我们将探讨如何在Java中将<code>String</code>转换为<code>String</code>数组（<code>String[]</code>）。</p>\\n<h2>2. 问题介绍</h2>\\n<p>将字符串转换为字符串数组可能有两种场景：</p>\\n<ul>\\n<li>将字符串转换为单例数组（只有一个元素的数组）</li>\\n<li>根据特定规则将字符串拆分为数组元素</li>\\n</ul>\\n<p>第一种情况相对容易理解。例如，如果我们有一个字符串<code>\\"baeldung\\"</code>，我们想将其转换为<code>String[]{ \\"baeldung\\" }</code>。换句话说，<strong>转换后的数组只有一个元素，即输入字符串本身</strong>。</p>","autoDesc":true}');export{k as comp,d as data};
