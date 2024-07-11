import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-bN4DcMMr.js";const t={},o=e(`<h1 id="java中比较两个字节数组" tabindex="-1"><a class="header-anchor" href="#java中比较两个字节数组"><span>Java中比较两个字节数组</span></a></h1><p>在Java中，如果我们不正确地比较两个字节数组，可能会得到一个意想不到的结果。</p><p>所以，在这个快速教程中，我们将学习以值比较两个数组的正确方式。</p><h3 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h3><p>一个例子可以快速解释问题。假设我们有这样一个字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token constant">INPUT</span> <span class="token operator">=</span> <span class="token string">&quot;I am a magic string.&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，我们通过<code>String.getBytes()</code>方法从上面的字符串中获取两个字节数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token keyword">static</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token constant">ARRAY1</span> <span class="token operator">=</span> <span class="token constant">INPUT</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">final</span> <span class="token keyword">static</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token constant">ARRAY2</span> <span class="token operator">=</span> <span class="token constant">INPUT</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>显然，如果我们比较<code>ARRAY1</code>和<code>ARRAY2</code>，<strong>我们期望这两个数组在值上是相等的</strong>，因为它们是从同一个输入字符串创建的。</p><p>接下来，让我们看看我们可能会犯的常见错误，并找出正确的比较方法。</p><p>为了简化，我们将使用单元测试断言来验证每种比较方法是否返回预期的结果。</p><h3 id="_3-运算符和equals-方法不是好的选择" tabindex="-1"><a class="header-anchor" href="#_3-运算符和equals-方法不是好的选择"><span>3. <code>==</code>运算符和<code>equals()</code>方法不是好的选择</span></a></h3><p>在Java中，<code>==</code>被称为“等于”运算符。首先，让我们尝试使用<code>==</code>运算符比较两个数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token constant">ARRAY1</span> <span class="token operator">==</span> <span class="token constant">ARRAY2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们运行上述简单测试时，测试通过。也就是说，即使两个数组中的元素在值上相同，<code>ARRAY1 == ARRAY2</code>也返回<code>false</code>——这不是我们期望的结果。这是因为**<code>==</code>运算符比较的是两个数组的内存地址而不是它们的内容**。这意味着两个数组可以有相同的内容，但它们是不同的对象。所以，即使两个数组等价，<code>==</code>运算符也会返回<code>false</code>。</p><p>我们可能已经了解了Java中<code>==</code>运算符和<code>equals()</code>方法之间的区别：<code>==</code>进行引用等值检查，但<code>equals()</code>方法执行值等值检查。</p><p>由于我们的目标是比较两个数组的值，让我们创建另一个简单的测试，使用<code>equals()</code>方法比较<code>ARRAY1</code>和<code>ARRAY2</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token constant">ARRAY1</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token constant">ARRAY2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们运行这个测试，它也会通过。这意味着**<code>equals()</code>方法也没有给我们预期的结果**。接下来，让我们找出为什么<code>equals()</code>不能正确工作。</p><p>当我们调用<code>ARRAY1.equals(ARRAY2)</code>时，实际上是调用了<code>Object</code>类的<code>equals()</code>方法。让我们看看<code>Object</code>类的<code>equals()</code>方法的实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">==</span> obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，<code>Object</code>的<code>equals()</code>方法内部使用<code>==</code>运算符比较两个对象。<strong>当我们比较数组时，<code>==</code>和<code>equals()</code>是一样的。因此，它们都执行引用等值检查</strong>。</p><h3 id="_4-使用arrays-equals-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用arrays-equals-方法"><span>4. 使用<code>Arrays.equals()</code>方法</span></a></h3><p>现在，我们了解到<code>==</code>运算符和<code>equals()</code>方法都不是检查两个数组值等值的正确方式。但是，在Java编程中，比较两个数组的值是一个相当常见的操作。因此，Java标准库提供了<code>Arrays.equals()</code>方法来完成这项工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token constant">ARRAY1</span><span class="token punctuation">,</span> <span class="token constant">ARRAY2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们运行这个测试，它会通过。所以，<strong><code>Arrays.equals()</code>返回了我们比较两个字节数组的预期结果</strong>。</p><p>此外，<code>Arrays.equals()</code>适用于其他类型的数组。<strong>我们应该使用<code>Arrays.equals()</code>方法来检查所有数组类型的值等值</strong>。</p><p>最后，让我们再看一个比较两个<code>String</code>数组的值的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> strArray1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;Java&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;is&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;great&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> strArray2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;Java&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;is&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;great&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">assertFalse</span><span class="token punctuation">(</span>strArray1 <span class="token operator">==</span> strArray2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span>strArray1<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>strArray2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>strArray1<span class="token punctuation">,</span> strArray2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，<code>strArray1</code>和<code>strArray2</code>的内容是相同的。测试结果表明<code>==</code>和<code>equals()</code>报告<code>false</code>，但使用<code>Arrays.equals()</code>方法给出了预期的结果。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们讨论了比较两个数组内容时常见的陷阱。我们还探讨了比较两个字节数组值的正确方式。</p><p><code>==</code>运算符和<code>equals()</code>方法对数组执行引用等值检查。如果我们需要比较两个数组的值，使用<code>Arrays.equals(array1, array2)</code>方法是正确的方法。</p><p>像往常一样，这里展示的所有代码片段都可以在GitHub上找到。</p>`,34),p=[o];function c(l,r){return s(),n("div",null,p)}const d=a(t,[["render",c],["__file","2024-07-06-Comparing Two Byte Arrays in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Comparing%20Two%20Byte%20Arrays%20in%20Java.html","title":"Java中比较两个字节数组","lang":"zh-CN","frontmatter":{"category":["Java","Programming"],"tag":["byte arrays","array comparison","Java"],"head":[["meta",{"name":"keywords","content":"Java, byte arrays, array comparison, programming"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Comparing%20Two%20Byte%20Arrays%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中比较两个字节数组"}],["meta",{"property":"og:description","content":"Java中比较两个字节数组 在Java中，如果我们不正确地比较两个字节数组，可能会得到一个意想不到的结果。 所以，在这个快速教程中，我们将学习以值比较两个数组的正确方式。 2. 问题介绍 一个例子可以快速解释问题。假设我们有这样一个字符串： 现在，我们通过String.getBytes()方法从上面的字符串中获取两个字节数组： 显然，如果我们比较ARR..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T04:37:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"byte arrays"}],["meta",{"property":"article:tag","content":"array comparison"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:modified_time","content":"2024-07-06T04:37:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中比较两个字节数组\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-07-06T04:37:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中比较两个字节数组 在Java中，如果我们不正确地比较两个字节数组，可能会得到一个意想不到的结果。 所以，在这个快速教程中，我们将学习以值比较两个数组的正确方式。 2. 问题介绍 一个例子可以快速解释问题。假设我们有这样一个字符串： 现在，我们通过String.getBytes()方法从上面的字符串中获取两个字节数组： 显然，如果我们比较ARR..."},"headers":[{"level":3,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":3,"title":"3. ==运算符和equals()方法不是好的选择","slug":"_3-运算符和equals-方法不是好的选择","link":"#_3-运算符和equals-方法不是好的选择","children":[]},{"level":3,"title":"4. 使用Arrays.equals()方法","slug":"_4-使用arrays-equals-方法","link":"#_4-使用arrays-equals-方法","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720240658000,"updatedTime":1720240658000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.45,"words":1036},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Comparing Two Byte Arrays in Java.md","localizedDate":"2024年7月6日","excerpt":"\\n<p>在Java中，如果我们不正确地比较两个字节数组，可能会得到一个意想不到的结果。</p>\\n<p>所以，在这个快速教程中，我们将学习以值比较两个数组的正确方式。</p>\\n<h3>2. 问题介绍</h3>\\n<p>一个例子可以快速解释问题。假设我们有这样一个字符串：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">final</span> <span class=\\"token keyword\\">static</span> <span class=\\"token class-name\\">String</span> <span class=\\"token constant\\">INPUT</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"I am a magic string.\\"</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
