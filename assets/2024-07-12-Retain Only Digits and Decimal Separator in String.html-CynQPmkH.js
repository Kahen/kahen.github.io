import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-C6rqSDgP.js";const e={},p=t('<h1 id="在字符串中仅保留数字和小数点" tabindex="-1"><a class="header-anchor" href="#在字符串中仅保留数字和小数点"><span>在字符串中仅保留数字和小数点</span></a></h1><p>让我们假设我们需要从一个包含字母数字和特殊字符的字符串中移除所有非数字字符，同时保留小数点。例如，我们想要从文本“这个包的价格是100.5$”中提取数字和小数部分，仅得到“100.5”，即价格部分。</p><p>在本教程中，我们将探索在Java中实现此目的的四种不同方法。</p><h2 id="使用正则表达式和string的replaceall-方法" tabindex="-1"><a class="header-anchor" href="#使用正则表达式和string的replaceall-方法"><span>使用正则表达式和String的replaceAll()方法</span></a></h2><p>最简单的方法是使用String类的内置replaceAll()方法。它替换文本中匹配所提供正则表达式的每个部分为指定的替换内容。</p><p>replaceAll()方法接受两个参数：正则表达式和替换内容。</p><p>因此，如果我们<strong>将相关的正则表达式和一个空字符串作为替换参数传递给该方法</strong>，我们就可以达成我们的目的。</p><p>为了简化，我们将定义一个单元测试来验证预期结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> s <span class="token operator">=</span> <span class="token string">&quot;Testing abc123.555abc&quot;</span><span class="token punctuation">;</span>\ns <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;[^\\\\d.]&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;123.555&quot;</span><span class="token punctuation">,</span> s<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的测试案例中，我们定义了正则表达式为**<em>[^\\d.]</em>，表示一个否定集，匹配不在包含任何数字字符（0-9）和“.”字符的集合中的任何字符**。</p><p>上述测试成功执行，从而验证最终结果只包含数字字符和小数点。</p><h2 id="使用java-8-stream" tabindex="-1"><a class="header-anchor" href="#使用java-8-stream"><span>使用Java 8 Stream</span></a></h2><p>使用Java 8 Streams，我们有能力在不同的小步骤中定义对数据的一系列操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> s <span class="token operator">=</span> <span class="token string">&quot;Testing abc123.555abc&quot;</span><span class="token punctuation">;</span>\n<span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ns<span class="token punctuation">.</span><span class="token function">chars</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">mapToObj</span><span class="token punctuation">(</span>c <span class="token operator">-&gt;</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> c<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>c <span class="token operator">-&gt;</span> <span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">isDigit</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token operator">||</span> c <span class="token operator">==</span> <span class="token char">&#39;.&#39;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>sb<span class="token operator">::</span><span class="token function">append</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;123.555&quot;</span><span class="token punctuation">,</span> sb<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们创建了一个StringBuilder实例来保存最终结果。然后，我们使用chars()方法遍历String中的各个字符，该方法返回int的流，这些实际上是字符代码。为了处理这种情况，我们使用了一个映射函数mapToObj()，它返回一个Character的Stream。</p><p>最后，<strong>我们使用filter()方法仅选择那些是数字或小数点的字符</strong>。</p><h2 id="使用外部库" tabindex="-1"><a class="header-anchor" href="#使用外部库"><span>使用外部库</span></a></h2><p>我们也可以通过将一些外部库如Guava和Apache Commons集成到我们的代码库中来解决我们的问题。我们可以利用这些库中可用的预定义工具类。</p><h3 id="_4-1-guava" tabindex="-1"><a class="header-anchor" href="#_4-1-guava"><span>4.1. Guava</span></a></h3><p>要使用Guava在Java String中移除所有非数字字符但保留小数点，<strong>我们将使用CharMatcher实用程序类中的方法</strong>。</p><p>要包含Guava，我们首先需要更新我们的pom.xml文件：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.google.guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``33.0.0-jre``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们使用CharMatcher类中的方法重写单元测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> s <span class="token operator">=</span> <span class="token string">&quot;Testing abc123.555abc&quot;</span><span class="token punctuation">;</span>\n<span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name">CharMatcher</span><span class="token punctuation">.</span><span class="token function">inRange</span><span class="token punctuation">(</span><span class="token char">&#39;0&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;9&#39;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">or</span><span class="token punctuation">(</span><span class="token class-name">CharMatcher</span><span class="token punctuation">.</span><span class="token function">is</span><span class="token punctuation">(</span><span class="token char">&#39;.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">retainFrom</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;123.555&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它将成功执行并返回预期的结果。为了清楚起见，让我们回顾一下我们使用的方法：</p><ul><li>inRange()方法接受两个char参数，startInclusive和endInclusive，并匹配在给定范围内定义的字符。</li><li>or()方法接受一个CharMatcher类型的单个参数。它通过匹配这个匹配器或它被调用的匹配器中的任何字符来返回一个匹配器。</li><li>is()方法接受一个单一参数，char match。它只匹配一个指定的字符。</li><li>retainFrom()方法接受一个单一参数，CharSequence sequence。<strong>它返回满足指定匹配标准的序列中的字符</strong>。</li></ul><h3 id="_4-2-apache-commons" tabindex="-1"><a class="header-anchor" href="#_4-2-apache-commons"><span>4.2. Apache Commons</span></a></h3><p>在Apache Commons中，<strong>_RegExUtils_类提供了一个简单直接的方法_removeAll(String text, String regex)_来移除所有符合正则表达式中指定标准的字符</strong>。</p><p>要包含Apache Commons Lang，我们需要更新我们的pom.xml文件：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.commons``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``commons-lang3``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``3.12.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们查看_RegExUtils_类，我们将看到它的_removeAll()_方法可以帮助我们解决问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> s <span class="token operator">=</span> <span class="token string">&quot;Testing abc123.555abc&quot;</span><span class="token punctuation">;</span>\n<span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name">RegExUtils</span><span class="token punctuation">.</span><span class="token function">removeAll</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token string">&quot;[^\\\\d.]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;123.555&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_RegExUtils.removeAll()_需要两个String参数，text和regex。在这里，我们以与上面String.replaceAll示例中相同的方式定义了regex。</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们探讨了从Java String中移除所有非数字字符的同时保留小数点的四种不同方法。</p><p>像往常一样，这里展示的所有代码片段都可以在GitHub上找到。</p>',36),c=[p];function o(l,i){return s(),n("div",null,c)}const d=a(e,[["render",o],["__file","2024-07-12-Retain Only Digits and Decimal Separator in String.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Retain%20Only%20Digits%20and%20Decimal%20Separator%20in%20String.html","title":"在字符串中仅保留数字和小数点","lang":"zh-CN","frontmatter":{"category":["Java","字符串处理"],"tag":["正则表达式","字符串","Java 8","Guava","Apache Commons"],"head":[["meta",{"name":"keywords","content":"Java, 字符串处理, 数字, 小数点, 正则表达式, Guava, Apache Commons"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Retain%20Only%20Digits%20and%20Decimal%20Separator%20in%20String.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在字符串中仅保留数字和小数点"}],["meta",{"property":"og:description","content":"在字符串中仅保留数字和小数点 让我们假设我们需要从一个包含字母数字和特殊字符的字符串中移除所有非数字字符，同时保留小数点。例如，我们想要从文本“这个包的价格是100.5$”中提取数字和小数部分，仅得到“100.5”，即价格部分。 在本教程中，我们将探索在Java中实现此目的的四种不同方法。 使用正则表达式和String的replaceAll()方法 最..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T16:45:48.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"正则表达式"}],["meta",{"property":"article:tag","content":"字符串"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:tag","content":"Guava"}],["meta",{"property":"article:tag","content":"Apache Commons"}],["meta",{"property":"article:modified_time","content":"2024-07-12T16:45:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在字符串中仅保留数字和小数点\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-07-12T16:45:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在字符串中仅保留数字和小数点 让我们假设我们需要从一个包含字母数字和特殊字符的字符串中移除所有非数字字符，同时保留小数点。例如，我们想要从文本“这个包的价格是100.5$”中提取数字和小数部分，仅得到“100.5”，即价格部分。 在本教程中，我们将探索在Java中实现此目的的四种不同方法。 使用正则表达式和String的replaceAll()方法 最..."},"headers":[{"level":2,"title":"使用正则表达式和String的replaceAll()方法","slug":"使用正则表达式和string的replaceall-方法","link":"#使用正则表达式和string的replaceall-方法","children":[]},{"level":2,"title":"使用Java 8 Stream","slug":"使用java-8-stream","link":"#使用java-8-stream","children":[]},{"level":2,"title":"使用外部库","slug":"使用外部库","link":"#使用外部库","children":[{"level":3,"title":"4.1. Guava","slug":"_4-1-guava","link":"#_4-1-guava","children":[]},{"level":3,"title":"4.2. Apache Commons","slug":"_4-2-apache-commons","link":"#_4-2-apache-commons","children":[]}]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720802748000,"updatedTime":1720802748000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.78,"words":1134},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Retain Only Digits and Decimal Separator in String.md","localizedDate":"2024年7月12日","excerpt":"\\n<p>让我们假设我们需要从一个包含字母数字和特殊字符的字符串中移除所有非数字字符，同时保留小数点。例如，我们想要从文本“这个包的价格是100.5$”中提取数字和小数部分，仅得到“100.5”，即价格部分。</p>\\n<p>在本教程中，我们将探索在Java中实现此目的的四种不同方法。</p>\\n<h2>使用正则表达式和String的replaceAll()方法</h2>\\n<p>最简单的方法是使用String类的内置replaceAll()方法。它替换文本中匹配所提供正则表达式的每个部分为指定的替换内容。</p>\\n<p>replaceAll()方法接受两个参数：正则表达式和替换内容。</p>\\n<p>因此，如果我们<strong>将相关的正则表达式和一个空字符串作为替换参数传递给该方法</strong>，我们就可以达成我们的目的。</p>","autoDesc":true}');export{d as comp,k as data};
