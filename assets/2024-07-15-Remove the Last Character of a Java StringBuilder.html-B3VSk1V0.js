import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-on0L14Tx.js";const e={},p=t(`<h1 id="删除java-stringbuilder中的最后一个字符" tabindex="-1"><a class="header-anchor" href="#删除java-stringbuilder中的最后一个字符"><span>删除Java StringBuilder中的最后一个字符</span></a></h1><p>当我们想在Java中构建一个字符串时，我们通常会选择方便的_StringBuilder_来完成这项工作。</p><p>假设我们有一个包含一些字符串片段的_StringBuilder_序列，我们想要从中删除最后一个字符。在这个快速教程中，我们将探索三种实现方法。</p><h2 id="_2-使用-stringbuilder-的-deletecharat-方法" tabindex="-1"><a class="header-anchor" href="#_2-使用-stringbuilder-的-deletecharat-方法"><span>2. 使用_StringBuilder_的_deleteCharAt()_方法</span></a></h2><p>_StringBuilder_类有一个_deleteCharAt()_方法。它允许我们删除指定位置的字符。</p><p><strong>_deleteCharAt()_方法只有一个参数：我们想要删除的字符索引。</strong></p><p>因此，如果我们将最后一个字符的索引传递给该方法，我们就可以删除该字符。为了简单起见，我们将使用单元测试断言来验证它是否按预期工作。</p><p>接下来，让我们创建一个测试来检查它是否有效：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">&quot;使用sb.deleteCharAt()方法！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
sb<span class="token punctuation">.</span><span class="token function">deleteCharAt</span><span class="token punctuation">(</span>sb<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;使用sb.deleteCharAt()方法&quot;</span><span class="token punctuation">,</span> sb<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的测试所示，我们传递最后一个字符的索引（<em>sb.length() -1</em>）给_deleteCharAt()<em>方法，并期望结尾的感叹号（</em>!_）被删除。</p><p>如果我们运行测试，它会通过。因此，_deleteCharAt()_解决了问题。</p><h2 id="_3-使用-stringbuilder-的-replace-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用-stringbuilder-的-replace-方法"><span>3. 使用_StringBuilder_的_replace()_方法</span></a></h2><p>_StringBuilder_的_replace()_方法允许我们在序列的子字符串中用给定的字符串替换字符。该方法接受三个参数：</p><ul><li><em>start</em> 索引 - 开始索引，包含</li><li><em>end</em> 索引 - 结束索引，不包含</li><li><em>replacement</em> - 用于替换的字符串</li></ul><p>假设序列中最后一个字符的索引是_lastIdx._ <strong>如果我们想删除最后一个字符，我们可以将_lastIdx_作为开始索引，<em>lastIdx+1_作为结束索引，并将空字符串</em>“”<em>作为替换传递给_replace()</em></strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">&quot;使用sb.replace()方法！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> last <span class="token operator">=</span> sb<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
sb<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>last<span class="token punctuation">,</span> last <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;使用sb.replace()方法&quot;</span><span class="token punctuation">,</span> sb<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，如果我们运行上面的测试，它会通过。因此，_replace()_方法可以用来解决问题。</p><h2 id="_4-使用-stringbuilder-的-substring-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用-stringbuilder-的-substring-方法"><span>4. 使用_StringBuilder_的_substring()_方法</span></a></h2><p>我们可以使用_StringBuilder_的_substring()_方法来获取给定的字符串的子序列。该方法需要两个参数，开始索引（包含）和结束索引（不包含）。</p><p>值得一提的是，_substring()_方法返回一个新的_String_对象。换句话说，<strong>_substring()_方法不会修改_StringBuilder_对象</strong>。</p><p>我们可以将0作为开始索引，将最后一个字符的索引作为_结束_索引传递给_substring()_方法，以获取一个没有最后一个字符的字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">&quot;使用sb.substring()方法！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;使用sb.substring()方法&quot;</span><span class="token punctuation">,</span> sb<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> sb<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// stringBuilder对象没有改变</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;使用sb.substring()方法！&quot;</span><span class="token punctuation">,</span> sb<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们执行测试，它会通过。</p><p>正如我们在测试中看到的，即使由_substring()<em>返回的_String_没有最后一个字符（</em>!_），原始的_StringBuilder_并没有改变。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇简短的文章中，我们学习了如何从_StringBuilder_序列中删除最后一个字符。</p><p>像往常一样，这里展示的所有代码片段都可以在GitHub上找到。</p>`,27),i=[p];function r(l,o){return s(),a("div",null,i)}const d=n(e,[["render",r],["__file","2024-07-15-Remove the Last Character of a Java StringBuilder.html.vue"]]),_=JSON.parse('{"path":"/posts/baeldung/2024-07-15/2024-07-15-Remove%20the%20Last%20Character%20of%20a%20Java%20StringBuilder.html","title":"删除Java StringBuilder中的最后一个字符","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","StringBuilder"],"tag":["Java","StringBuilder","删除字符"],"head":[["meta",{"name":"keywords","content":"Java, StringBuilder, 删除最后一个字符"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-15/2024-07-15-Remove%20the%20Last%20Character%20of%20a%20Java%20StringBuilder.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"删除Java StringBuilder中的最后一个字符"}],["meta",{"property":"og:description","content":"删除Java StringBuilder中的最后一个字符 当我们想在Java中构建一个字符串时，我们通常会选择方便的_StringBuilder_来完成这项工作。 假设我们有一个包含一些字符串片段的_StringBuilder_序列，我们想要从中删除最后一个字符。在这个快速教程中，我们将探索三种实现方法。 2. 使用_StringBuilder_的_d..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-15T07:06:08.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"StringBuilder"}],["meta",{"property":"article:tag","content":"删除字符"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-15T07:06:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"删除Java StringBuilder中的最后一个字符\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-15T07:06:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"删除Java StringBuilder中的最后一个字符 当我们想在Java中构建一个字符串时，我们通常会选择方便的_StringBuilder_来完成这项工作。 假设我们有一个包含一些字符串片段的_StringBuilder_序列，我们想要从中删除最后一个字符。在这个快速教程中，我们将探索三种实现方法。 2. 使用_StringBuilder_的_d..."},"headers":[{"level":2,"title":"2. 使用_StringBuilder_的_deleteCharAt()_方法","slug":"_2-使用-stringbuilder-的-deletecharat-方法","link":"#_2-使用-stringbuilder-的-deletecharat-方法","children":[]},{"level":2,"title":"3. 使用_StringBuilder_的_replace()_方法","slug":"_3-使用-stringbuilder-的-replace-方法","link":"#_3-使用-stringbuilder-的-replace-方法","children":[]},{"level":2,"title":"4. 使用_StringBuilder_的_substring()_方法","slug":"_4-使用-stringbuilder-的-substring-方法","link":"#_4-使用-stringbuilder-的-substring-方法","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721027168000,"updatedTime":1721027168000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.76,"words":829},"filePathRelative":"posts/baeldung/2024-07-15/2024-07-15-Remove the Last Character of a Java StringBuilder.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>当我们想在Java中构建一个字符串时，我们通常会选择方便的_StringBuilder_来完成这项工作。</p>\\n<p>假设我们有一个包含一些字符串片段的_StringBuilder_序列，我们想要从中删除最后一个字符。在这个快速教程中，我们将探索三种实现方法。</p>\\n<h2>2. 使用_StringBuilder_的_deleteCharAt()_方法</h2>\\n<p>_StringBuilder_类有一个_deleteCharAt()_方法。它允许我们删除指定位置的字符。</p>\\n<p><strong>_deleteCharAt()_方法只有一个参数：我们想要删除的字符索引。</strong></p>","autoDesc":true}');export{d as comp,_ as data};
