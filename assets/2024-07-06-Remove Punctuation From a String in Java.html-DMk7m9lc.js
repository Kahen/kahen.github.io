import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-BEVMBw2k.js";const e={},p=t(`<h1 id="在java中从字符串中移除标点符号" tabindex="-1"><a class="header-anchor" href="#在java中从字符串中移除标点符号"><span>在Java中从字符串中移除标点符号</span></a></h1><p>在文本处理和分析中，从字符串中消除标点符号是一种常见做法。</p><p>在这个快速教程中，让我们探讨如何轻松地从给定的字符串中移除标点符号。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>假设我们有一个字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">INPUT</span> <span class="token operator">=</span> <span class="token string">&quot;It&#39;s 1 W o r d (!@#$%^&amp;*{}[];&#39;:\\&quot;)&lt;&gt;,.&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如我们所看到的，字符串_INPUT_包含数字、字母、空白和各种标点符号。</p><p><strong>我们的目标是从字符串中仅移除标点符号，并将字母、数字和空白保留在结果中</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">EXPECTED</span> <span class="token operator">=</span> <span class="token string">&quot;Its 1 W o r d &quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这个教程中，我们将主要使用Java标准库中附带的_String.replaceAll()_方法来解决问题。</p><p>为了简单起见，我们将使用单元测试断言来验证结果是否符合预期。</p><p>接下来，让我们看看如何移除标点符号。</p><h2 id="_3-使用正则表达式模式-s-p-l-0-9-和-p-punct" tabindex="-1"><a class="header-anchor" href="#_3-使用正则表达式模式-s-p-l-0-9-和-p-punct"><span>3. 使用正则表达式模式“[^\\s\\p{L}0-9]”和“\\p{Punct}”</span></a></h2><p>我们提到了使用_String.replaceAll()_方法从输入字符串中移除标点。<strong>replaceAll()_方法基于正则表达式进行字符串替换</strong>。它检查输入字符串，并用替换字符串替换所有匹配我们的正则模式的部分。</p><p>因此，正则模式是解决这个问题的关键。</p><p>由于我们想要在结果中保留字母、数字和空白，<strong>我们可以将任何不是数字、字母或空白字符的字符替换为空字符串</strong>。我们可以使用正则表达式的字符范围[^\\s\\p{L}0-9]来匹配这些字母。</p><p>接下来，让我们创建一个测试来检查它是否有效：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token constant">INPUT</span><span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;[^\\\\s\\\\p{L}0-9]&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们执行它，测试就会通过。正则表达式非常直接。对于那些不熟悉语法的人来说，注意以下几点可能会有所帮助：</p><ul><li>[^…] – 匹配不在[...]中的任何一个字符。例如，[^0-9]匹配任何非数字。</li><li>\\s – \\s匹配任何空白字符，如空格和制表符。</li></ul><p>此外，Java的正则表达式引擎支持POSIX字符类。因此，<strong>我们可以直接使用_\\p{Punct}_字符类来匹配任何字符在</strong> <em>!”#$%&amp;&#39;()*+,-./:;<code>&lt;=&gt;</code>?@[]^</em>\`{|}~:_</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token constant">INPUT</span><span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\p{Punct}&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们运行上述测试时，它也会通过。</p><h2 id="_4-当输入是unicode字符串时" tabindex="-1"><a class="header-anchor" href="#_4-当输入是unicode字符串时"><span>4. 当输入是Unicode字符串时</span></a></h2><p>我们已经成功地看到了两种从输入字符串中移除标点的方法。如果我们仔细看看_INPUT_字符串，我们会意识到它由ASCII字符组成。</p><p>一个问题可能会出现 - 如果我们收到像这样的字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">UNICODE_INPUT</span> <span class="token operator">=</span> <span class="token string">&quot;3 March März 三月 březen маршировать (!@#$%^&amp;*{}[];&#39;:\\&quot;)&lt;&gt;,.&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>除了数字‘3’、空白字符和标点符号，这个输入还包括了英语、德语、中文、捷克语和俄语中的“March”这个词。所以，与之前的_INPUT_字符串不同，_UNICODE_INPUT_变量包含Unicode字符。</p><p>移除标点后，预期的结果应该是这样的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">UNICODE_EXPECTED</span> <span class="token operator">=</span> <span class="token string">&quot;3 March März 三月 březen маршировать &quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们测试我们的两种解决方案是否仍然适用于这个输入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result1 <span class="token operator">=</span> <span class="token constant">UNICODE_INPUT</span><span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;[^\\\\s\\\\p{L}0-9]&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertNotEquals</span><span class="token punctuation">(</span><span class="token constant">UNICODE_EXPECTED</span><span class="token punctuation">,</span> result1<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上述测试通过。但我们应该注意到断言是assertNotEquals()。所以“移除[^\\s\\p{L}0-9]”的方法没有产生预期的结果。让我们看看它实际上产生了什么结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> actualResult1 <span class="token operator">=</span> <span class="token string">&quot;3 March Mrz  bezen  &quot;</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>actualResult1<span class="token punctuation">,</span> result1<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，所有非ASCII字符都与标点符号一起被移除了。显然，<strong>“移除[^\\s\\p{L}0-9]”的方法不适用于Unicode字符串</strong>。</p><p>但<strong>我们可以通过将“a-zA-Z”范围替换为“\\p{L}”来修复它</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result3 <span class="token operator">=</span> <span class="token constant">UNICODE_INPUT</span><span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;[^\\\\s\\\\p{L}0-9]&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">UNICODE_EXPECTED</span><span class="token punctuation">,</span> result3<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>值得一提的是，<strong>_\\p{L}_匹配任何字母，包括Unicode字符</strong>。</p><p>另一方面，<strong>“移除_\\p{Punct}_”的方法仍然适用于Unicode输入</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result2 <span class="token operator">=</span> <span class="token constant">UNICODE_INPUT</span><span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\p{Punct}&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">UNICODE_EXPECTED</span><span class="token punctuation">,</span> result2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这是因为_\\p{Punct}_仅匹配标点字符。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何使用标准的_String.replaceAll()_方法从字符串中移除标点：</p><ul><li>String.replaceAll(&quot;[^\\s\\p{L}0-9]&quot;, &quot;&quot;) – 只适用于ASCII字符的输入字符串</li><li>String.replaceAll(&quot;\\p{Punct}&quot;, &quot;&quot;) – 适用于ASCII和Unicode字符串</li><li>String.replaceAll(&quot;[^\\s\\p{L}0-9]&quot;, &quot;&quot;) – 适用于ASCII和Unicode字符串</li></ul><p>像往常一样，这里展示的所有代码片段都可以在GitHub上找到。</p>`,45),o=[p];function c(l,i){return s(),n("div",null,o)}const d=a(e,[["render",c],["__file","2024-07-06-Remove Punctuation From a String in Java.html.vue"]]),k=JSON.parse(`{"path":"/posts/baeldung/2024-07-06/2024-07-06-Remove%20Punctuation%20From%20a%20String%20in%20Java.html","title":"在Java中从字符串中移除标点符号","lang":"zh-CN","frontmatter":{"category":["Java","Text Processing"],"tag":["String Manipulation","Regular Expressions"],"head":[["meta",{"name":"keywords","content":"Java, String, Punctuation, Regular Expressions, Unicode"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Remove%20Punctuation%20From%20a%20String%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中从字符串中移除标点符号"}],["meta",{"property":"og:description","content":"在Java中从字符串中移除标点符号 在文本处理和分析中，从字符串中消除标点符号是一种常见做法。 在这个快速教程中，让我们探讨如何轻松地从给定的字符串中移除标点符号。 2. 问题介绍 假设我们有一个字符串： 正如我们所看到的，字符串_INPUT_包含数字、字母、空白和各种标点符号。 我们的目标是从字符串中仅移除标点符号，并将字母、数字和空白保留在结果中：..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T06:39:57.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"String Manipulation"}],["meta",{"property":"article:tag","content":"Regular Expressions"}],["meta",{"property":"article:modified_time","content":"2024-07-06T06:39:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中从字符串中移除标点符号\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-07-06T06:39:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中从字符串中移除标点符号 在文本处理和分析中，从字符串中消除标点符号是一种常见做法。 在这个快速教程中，让我们探讨如何轻松地从给定的字符串中移除标点符号。 2. 问题介绍 假设我们有一个字符串： 正如我们所看到的，字符串_INPUT_包含数字、字母、空白和各种标点符号。 我们的目标是从字符串中仅移除标点符号，并将字母、数字和空白保留在结果中：..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用正则表达式模式“[^\\\\s\\\\p{L}0-9]”和“\\\\p{Punct}”","slug":"_3-使用正则表达式模式-s-p-l-0-9-和-p-punct","link":"#_3-使用正则表达式模式-s-p-l-0-9-和-p-punct","children":[]},{"level":2,"title":"4. 当输入是Unicode字符串时","slug":"_4-当输入是unicode字符串时","link":"#_4-当输入是unicode字符串时","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720247997000,"updatedTime":1720247997000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.92,"words":1175},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Remove Punctuation From a String in Java.md","localizedDate":"2024年7月6日","excerpt":"\\n<p>在文本处理和分析中，从字符串中消除标点符号是一种常见做法。</p>\\n<p>在这个快速教程中，让我们探讨如何轻松地从给定的字符串中移除标点符号。</p>\\n<h2>2. 问题介绍</h2>\\n<p>假设我们有一个字符串：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">String</span> <span class=\\"token constant\\">INPUT</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"It's 1 W o r d (!@#$%^&amp;*{}[];':\\\\\\")&lt;&gt;,.\\"</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}`);export{d as comp,k as data};
