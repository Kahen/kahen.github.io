import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-B6f8H54y.js";const e={},l=t(`<h1 id="java中string类的equals-与contentequals-方法的比较" tabindex="-1"><a class="header-anchor" href="#java中string类的equals-与contentequals-方法的比较"><span>Java中String类的equals()与contentEquals()方法的比较</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Java中String类的equals()和contentEquals()方法用于执行字符串比较。然而，这两种方法在功能上存在特定的差异。</p><p>在本教程中，我们将通过实际示例快速查看这两种方法之间的区别。</p><h2 id="_2-equals-方法" tabindex="-1"><a class="header-anchor" href="#_2-equals-方法"><span>2. equals()方法</span></a></h2><p>equals()方法是Java String类的公共方法。它覆盖了Object类中的原始equals()方法。该方法的签名如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> anObject<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该方法通过检查两个不同的String对象中的各个字符来进行比较。<strong>然而，该方法不仅检查内容，还检查对象是否是String的实例。</strong> 因此，只有在满足以下所有条件时，该方法才返回true：</p><ul><li>参数对象不是null</li><li>它是一个String对象</li><li>字符序列完全相同</li></ul><h2 id="_3-contentequals-方法" tabindex="-1"><a class="header-anchor" href="#_3-contentequals-方法"><span>3. contentEquals()方法</span></a></h2><p>与equals()方法类似，contentEquals()方法也用于比较String的内容。<strong>然而，与equals()方法不同，contentEquals()接受任何CharSequence接口的实现作为参数。</strong> 这意味着可以比较String、StringBuffer、StringBuilder、CharBuffer或Segment。</p><p>该方法的签名如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">contentEquals</span><span class="token punctuation">(</span><span class="token class-name">StringBuffer</span> sb<span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">contentEquals</span><span class="token punctuation">(</span><span class="token class-name">CharSequence</span> cs<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>因此，contentEquals()方法只关心字符串的内容。</strong> 如果参数是String对象，则调用equals()方法进行比较。另一方面，如果提供了一个通用的字符序列，则该方法比较相似位置上的各个字符。</p><p>如果给定参数中的字符序列与原始String匹配，则该方法返回true。与equals()方法不同，如果将null参数传递给contentEquals()方法，它将抛出NullPointerException。</p><h2 id="_4-示例" tabindex="-1"><a class="header-anchor" href="#_4-示例"><span>4. 示例</span></a></h2><p>让我们通过编写简单的测试用例来查看这两种方法的实际应用。为了简化，让我们在我们的代码中使用单词“Baeldung”。</p><p>首先，我们将两个相同的String对象进行比较。在这种情况下，两种方法都将返回true值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> actualString <span class="token operator">=</span> <span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> identicalString <span class="token operator">=</span> <span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">;</span>

<span class="token function">assertTrue</span><span class="token punctuation">(</span>actualString<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>identicalString<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>actualString<span class="token punctuation">.</span><span class="token function">contentEquals</span><span class="token punctuation">(</span>identicalString<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们使用两个具有相同内容的不同CharSequence实现。对于第一个实现，我们将使用String实例化CharSequence。在这种情况下，由于内容和类型都相同，两种方法都应该返回true：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CharSequence</span> identicalStringInstance <span class="token operator">=</span> <span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">;</span>

<span class="token function">assertTrue</span><span class="token punctuation">(</span>actualString<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>identicalStringInstance<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>actualString<span class="token punctuation">.</span><span class="token function">contentEquals</span><span class="token punctuation">(</span>identicalStringInstance<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于下一个示例，我们将使用StringBuffer实现。<strong>由于contentEquals()方法只检查内容，它应该返回true。</strong> 然而，equals()方法应该返回false：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CharSequence</span> identicalStringBufferInstance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuffer</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertFalse</span><span class="token punctuation">(</span>actualString<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>identicalStringBufferInstance<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>actualString<span class="token punctuation">.</span><span class="token function">contentEquals</span><span class="token punctuation">(</span>identicalStringBufferInstance<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们快速查看了String类的两种方法。equals()方法仅比较String实例，而contentEquals()方法可以比较任何CharSequence的实现。</p><p>总之，当我们只关心对象的内容时，我们应该使用contentEquals()。另一方面，有时检查对象的类型可能很重要。在这种情况下，我们应该使用equals()方法，它提供了更严格的检查条件。</p><p>如往常一样，代码片段可在GitHub上找到。--- date: 2022-04-01 category:</p><ul><li>Java</li><li>String tag:</li><li>equals</li><li>contentEquals head:</li><li><ul><li>meta</li><li>name: keywords content: Java, String, equals, contentEquals</li></ul></li></ul><hr><h1 id="java中string类的equals-与contentequals-方法的比较-1" tabindex="-1"><a class="header-anchor" href="#java中string类的equals-与contentequals-方法的比较-1"><span>Java中String类的equals()与contentEquals()方法的比较</span></a></h1><h2 id="_1-引言-1" tabindex="-1"><a class="header-anchor" href="#_1-引言-1"><span>1. 引言</span></a></h2><p>Java中String类的equals()和contentEquals()方法用于执行字符串比较。然而，这两种方法在功能上存在特定的差异。</p><p>在本教程中，我们将通过实际示例快速查看这两种方法之间的区别。</p><h2 id="_2-equals-方法-1" tabindex="-1"><a class="header-anchor" href="#_2-equals-方法-1"><span>2. equals()方法</span></a></h2><p>equals()方法是Java String类的公共方法。它覆盖了Object类中的原始equals()方法。该方法的签名如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> anObject<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该方法通过检查两个不同的String象中的各个字符来进行比较。然而，该方法不仅检查内容，还检查对象是否是String的实例。因此，只有在满足以下所有条件时，该方法才返回true：</p><ul><li>参数对象不是null</li><li>它是一个String对象</li><li>字符序列完全相同</li></ul><h2 id="_3-contentequals-方法-1" tabindex="-1"><a class="header-anchor" href="#_3-contentequals-方法-1"><span>3. contentEquals()方法</span></a></h2><p>与equals()方法类似，contentEquals()方法也用于比较String的内容。然而，与equals()方法不同，contentEquals()接受任何CharSequence口的实现作为参数。这意味着可以比较String、StringBuffer、StringBuilder、CharBuffer或Segment。</p><p>该方法的签名如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">contentEquals</span><span class="token punctuation">(</span><span class="token class-name">StringBuffer</span> sb<span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">contentEquals</span><span class="token punctuation">(</span><span class="token class-name">CharSequence</span> cs<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，contentEquals()方法只关心字符串的内容。如果参数是String对象，则调用equals()方法进行比较。另一方面，如果提供了一个通用的字符序列，则该方法比较相似位置上的各个字符。</p><p>如果给定参数中的字符序列与原始String匹配，则该方法返回true。与equals()方法不同，如果将null参数传递给contentEquals()方法，它将抛出NullPointerException。</p><h2 id="_4-示例-1" tabindex="-1"><a class="header-anchor" href="#_4-示例-1"><span>4. 示例</span></a></h2><p>让我们通过编写简单的测试用例来查看这两种方法的实际应用。为了简化，让我们在我们的代码中使用单词“Baeldung”。</p><p>首先，我们将两个相同的String对象进行比较。在这种情况下，两种方法都将返回true值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> actualString <span class="token operator">=</span> <span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> identicalString <span class="token operator">=</span> <span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">;</span>

<span class="token function">assertTrue</span><span class="token punctuation">(</span>actualString<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>identicalString<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>actualString<span class="token punctuation">.</span><span class="token function">contentEquals</span><span class="token punctuation">(</span>identicalString<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们使用两个具有相同内容的不同CharSequence实现。对于第一个实现，我们将使用String实例化CharSequence。在这种情况下，由于内容和类型都相同，两种方法都应该返回true：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CharSequence</span> identicalStringInstance <span class="token operator">=</span> <span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">;</span>

<span class="token function">assertTrue</span><span class="token punctuation">(</span>actualString<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>identicalStringInstance<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>actualString<span class="token punctuation">.</span><span class="token function">contentEquals</span><span class="token punctuation">(</span>identicalStringInstance<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于下一个示例，我们将使用StringBuffer实现。由于contentEquals()方法只检查内容，它应该返回true。然而，equals()方法应该返回false：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CharSequence</span> identicalStringBufferInstance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuffer</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertFalse</span><span class="token punctuation">(</span>actualString<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>identicalStringBufferInstance<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>actualString<span class="token punctuation">.</span><span class="token function">contentEquals</span><span class="token punctuation">(</span>identicalStringBufferInstance<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论-1" tabindex="-1"><a class="header-anchor" href="#_5-结论-1"><span>5. 结论</span></a></h2><p>在本文中，我们快速查看了String类的两种方法。equals()方法仅比较String实例，而contentEquals()方法可以比较任何CharSequence的实现。</p><p>总之，当我们只关心对象的内容时，我们应该使用contentEquals()。另一方面，有时检查对象的类型可能很重要。在这种情况下，我们应该使用equals()方法，它提供了更严格的检查条件。</p><p>如往常一样，代码片段可在GitHub上找到。</p><p>OK</p>`,57),c=[l];function p(i,u){return s(),a("div",null,c)}const d=n(e,[["render",p],["__file","2024-07-22-String equals   Vs contentEquals   in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-22/2024-07-22-String%20equals%20%20%20Vs%20contentEquals%20%20%20in%20Java.html","title":"Java中String类的equals()与contentEquals()方法的比较","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","String"],"tag":["equals","contentEquals"],"head":[["meta",{"name":"keywords","content":"Java, String, equals, contentEquals"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-22/2024-07-22-String%20equals%20%20%20Vs%20contentEquals%20%20%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中String类的equals()与contentEquals()方法的比较"}],["meta",{"property":"og:description","content":"Java中String类的equals()与contentEquals()方法的比较 1. 引言 Java中String类的equals()和contentEquals()方法用于执行字符串比较。然而，这两种方法在功能上存在特定的差异。 在本教程中，我们将通过实际示例快速查看这两种方法之间的区别。 2. equals()方法 equals()方法是Ja..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T22:15:48.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"equals"}],["meta",{"property":"article:tag","content":"contentEquals"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T22:15:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中String类的equals()与contentEquals()方法的比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T22:15:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中String类的equals()与contentEquals()方法的比较 1. 引言 Java中String类的equals()和contentEquals()方法用于执行字符串比较。然而，这两种方法在功能上存在特定的差异。 在本教程中，我们将通过实际示例快速查看这两种方法之间的区别。 2. equals()方法 equals()方法是Ja..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. equals()方法","slug":"_2-equals-方法","link":"#_2-equals-方法","children":[]},{"level":2,"title":"3. contentEquals()方法","slug":"_3-contentequals-方法","link":"#_3-contentequals-方法","children":[]},{"level":2,"title":"4. 示例","slug":"_4-示例","link":"#_4-示例","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]},{"level":2,"title":"1. 引言","slug":"_1-引言-1","link":"#_1-引言-1","children":[]},{"level":2,"title":"2. equals()方法","slug":"_2-equals-方法-1","link":"#_2-equals-方法-1","children":[]},{"level":2,"title":"3. contentEquals()方法","slug":"_3-contentequals-方法-1","link":"#_3-contentequals-方法-1","children":[]},{"level":2,"title":"4. 示例","slug":"_4-示例-1","link":"#_4-示例-1","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论-1","link":"#_5-结论-1","children":[]}],"git":{"createdTime":1721686548000,"updatedTime":1721686548000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.16,"words":1547},"filePathRelative":"posts/baeldung/2024-07-22/2024-07-22-String equals   Vs contentEquals   in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>Java中String类的equals()和contentEquals()方法用于执行字符串比较。然而，这两种方法在功能上存在特定的差异。</p>\\n<p>在本教程中，我们将通过实际示例快速查看这两种方法之间的区别。</p>\\n<h2>2. equals()方法</h2>\\n<p>equals()方法是Java String类的公共方法。它覆盖了Object类中的原始equals()方法。该方法的签名如下：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">boolean</span> <span class=\\"token function\\">equals</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Object</span> anObject<span class=\\"token punctuation\\">)</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
