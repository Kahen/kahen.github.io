import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-CXN34Kw1.js";const e={},p=t('<h1 id="在java中从字符串中移除空白字符-baeldung" tabindex="-1"><a class="header-anchor" href="#在java中从字符串中移除空白字符-baeldung"><span>在Java中从字符串中移除空白字符 | Baeldung</span></a></h1><ol><li>概述</li></ol><p>当我们在Java中操作字符串时，我们经常需要从字符串中移除空白字符。</p><p>在本教程中，我们将探索在Java中从字符串中移除空白字符的常见场景。</p><ol start="2"><li>问题介绍</li></ol><p>为了更容易理解问题，我们首先来看一个字符串示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> myString <span class="token operator">=</span> <span class="token string">&quot;   I    am a    wonderful String     !   &quot;</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述示例显示，<code>myString</code>变量包含多个前导、尾随空格和中间的空白字符。</p><p>通常，当我们在Java中处理类似<code>myString</code>这样的字符串时，我们经常面临这两个要求：</p><ul><li>从给定字符串中移除所有空白字符 -&gt; &quot;IamawonderfulString!&quot;</li><li>将连续的空白字符替换为单个空格，并移除所有前导和尾随空白字符 -&gt; &quot;I am a wonderful String !&quot;</li></ul><p>接下来，我们将针对每种情况介绍两种方法：使用<code>String</code>类的便捷<code>replaceAll()</code>方法，以及广泛使用的Apache Commons Lang3库中的<code>StringUtils</code>类。</p><p>为了在本教程中保持简单，当我们谈论空白时，我们不会涵盖Unicode字符集中的空白字符。此外，我们将使用测试断言来验证每个解决方案。</p><p>现在让我们看看它们是如何工作的。</p><ol start="3"><li>从字符串中移除所有空白字符</li></ol><h3 id="_3-1-使用string-replaceall" tabindex="-1"><a class="header-anchor" href="#_3-1-使用string-replaceall"><span>3.1. 使用<code>String.replaceAll()</code></span></a></h3><p>首先，我们将使用<code>replaceAll()</code>方法从字符串中移除所有空白。</p><p><code>replaceAll()</code>使用正则表达式（regex）。<strong>我们可以使用正则表达式字符类‘\\s’来匹配一个空白字符。</strong> 我们可以将输入字符串中的每个空白字符替换为空字符串来解决问题：<code>inputString.replaceAll(&quot;\\\\s&quot;, &quot;&quot;)</code>。</p><p>然后我们将创建一个测试，看看这个想法是否适用于我们的示例字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result <span class="token operator">=</span> myString<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\s&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;IamawonderfulString!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它通过了。所以<code>replaceAll()</code>方法解决了问题。接下来，让我们使用Apache Commons Lang3来解决问题。</p><h3 id="_3-2-使用apache-commons-lang3库" tabindex="-1"><a class="header-anchor" href="#_3-2-使用apache-commons-lang3库"><span>3.2. 使用Apache Commons Lang3库</span></a></h3><p>Apache Commons Lang3库附带了一个<code>StringUtils</code>实用工具，它允许我们方便地操作字符串。</p><p>要开始使用Apache Commons Lang 3，让我们添加Maven依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`org.apache.commons`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`commons-lang3`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`3.14.0`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们查看<code>StringUtils</code>类中的方法，有一个叫做<code>deleteWhitespace()</code>的方法。这个名字暗示了它就是我们要找的方法。</p><p>接下来，<strong>我们使用<code>StringUtils.deleteWhitespace()</code>从字符串中移除所有空白</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">deleteWhitespace</span><span class="token punctuation">(</span>myString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;IamawonderfulString!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们执行测试时，测试通过了。所以<code>deleteWhitespace()</code>完成了工作。</p><ol start="4"><li>将连续的空白字符替换为单个空格</li></ol><h3 id="_4-1-使用string-replaceall" tabindex="-1"><a class="header-anchor" href="#_4-1-使用string-replaceall"><span>4.1. 使用<code>String.replaceAll()</code></span></a></h3><p>现在让我们看看另一个场景。我们可以分两步解决这个问题：</p><ul><li>将连续的空白替换为单个空格</li><li>修剪第一步的结果</li></ul><p>值得一提的是，我们也可以先修剪输入字符串，然后替换连续的空白。所以，我们先执行哪个步骤并不重要。</p><p>对于第一步，我们仍然可以使用<code>replaceAll()</code>和正则表达式来匹配连续的空白字符，并将一个空格设置为替换。</p><p><strong>正则表达式‘\\s+’匹配一个或多个空白字符。因此，我们可以调用<code>replaceAll(&quot;\\\\s+&quot;, &quot; &quot;)</code>方法来完成第一步</strong>。然后我们可以调用<code>String.trim()</code>方法来应用修剪操作。</p><p>接下来，我们将创建一个测试来检查我们的想法是否可以解决问题。为了清晰起见，我们为两个步骤编写两个断言：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result <span class="token operator">=</span> myString<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\s+&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot; I am a wonderful String ! &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;I am a wonderful String !&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行它，测试通过了。所以这种方法按预期工作。</p><p>最后，让我们使用Apache Commons Lang 3库来解决问题。</p><h3 id="_4-2-使用apache-commons-lang3库" tabindex="-1"><a class="header-anchor" href="#_4-2-使用apache-commons-lang3库"><span>4.2. 使用Apache Commons Lang3库</span></a></h3><p><strong><code>StringUtils.normalizeSpace()</code>方法修剪输入字符串，然后用单个空格替换空白字符序列。</strong> 因此，我们可以直接调用这个方法来解决问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">normalizeSpace</span><span class="token punctuation">(</span>myString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;I am a wonderful String !&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们执行测试时，测试通过了。正如我们所见，<code>StringUtils.normalizeSpace()</code>非常直接易用。</p><ol start="5"><li>结论</li></ol><p>在本文中，我们学习了如何在Java中从字符串中移除空白字符。</p><p>如往常一样，完整的源代码可在GitHub上获得。抱歉，由于原文内容较长，我将翻译剩余部分。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们学习了如何在Java中从字符串中移除空白字符。</p><p>正如往常一样，完整的源代码可在GitHub上获得。</p><p><a href="kimi://action?name=cheer-on-kimi">给Kimi加油</a></p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="Baeldung logo" loading="lazy"><img src="https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&amp;r=g" alt="Gravatar image" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg" alt="Eric Martin avatar" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="Announcement icon" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="REST post footer image" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="REST post footer icon" loading="lazy"></p><p>OK</p>',52),o=[p];function l(c,i){return s(),n("div",null,o)}const d=a(e,[["render",l],["__file","2024-07-16-Remove Whitespace From a String in Java.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-Remove%20Whitespace%20From%20a%20String%20in%20Java.html","title":"在Java中从字符串中移除空白字符 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-07-17T00:00:00.000Z","category":["Java","字符串操作"],"tag":["Java","字符串","空白字符"],"head":[["meta",{"name":"keywords","content":"Java, 字符串, 空白字符, 删除空白"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-Remove%20Whitespace%20From%20a%20String%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中从字符串中移除空白字符 | Baeldung"}],["meta",{"property":"og:description","content":"在Java中从字符串中移除空白字符 | Baeldung 概述 当我们在Java中操作字符串时，我们经常需要从字符串中移除空白字符。 在本教程中，我们将探索在Java中从字符串中移除空白字符的常见场景。 问题介绍 为了更容易理解问题，我们首先来看一个字符串示例： 上述示例显示，myString变量包含多个前导、尾随空格和中间的空白字符。 通常，当我们在..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T23:14:09.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"字符串"}],["meta",{"property":"article:tag","content":"空白字符"}],["meta",{"property":"article:published_time","content":"2024-07-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T23:14:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中从字符串中移除空白字符 | Baeldung\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2024-07-17T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T23:14:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中从字符串中移除空白字符 | Baeldung 概述 当我们在Java中操作字符串时，我们经常需要从字符串中移除空白字符。 在本教程中，我们将探索在Java中从字符串中移除空白字符的常见场景。 问题介绍 为了更容易理解问题，我们首先来看一个字符串示例： 上述示例显示，myString变量包含多个前导、尾随空格和中间的空白字符。 通常，当我们在..."},"headers":[{"level":3,"title":"3.1. 使用String.replaceAll()","slug":"_3-1-使用string-replaceall","link":"#_3-1-使用string-replaceall","children":[]},{"level":3,"title":"3.2. 使用Apache Commons Lang3库","slug":"_3-2-使用apache-commons-lang3库","link":"#_3-2-使用apache-commons-lang3库","children":[]},{"level":3,"title":"4.1. 使用String.replaceAll()","slug":"_4-1-使用string-replaceall","link":"#_4-1-使用string-replaceall","children":[]},{"level":3,"title":"4.2. 使用Apache Commons Lang3库","slug":"_4-2-使用apache-commons-lang3库","link":"#_4-2-使用apache-commons-lang3库","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721171649000,"updatedTime":1721171649000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.25,"words":1274},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-Remove Whitespace From a String in Java.md","localizedDate":"2024年7月17日","excerpt":"\\n<ol>\\n<li>概述</li>\\n</ol>\\n<p>当我们在Java中操作字符串时，我们经常需要从字符串中移除空白字符。</p>\\n<p>在本教程中，我们将探索在Java中从字符串中移除空白字符的常见场景。</p>\\n<ol start=\\"2\\">\\n<li>问题介绍</li>\\n</ol>\\n<p>为了更容易理解问题，我们首先来看一个字符串示例：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> myString <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"   I    am a    wonderful String     !   \\"</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,g as data};
