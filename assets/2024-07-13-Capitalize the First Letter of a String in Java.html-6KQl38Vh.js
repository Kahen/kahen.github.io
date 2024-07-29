import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-BUAgDejY.js";const i={},r=n(`<hr><h1 id="java中将字符串首字母大写的几种方法" tabindex="-1"><a class="header-anchor" href="#java中将字符串首字母大写的几种方法"><span>Java中将字符串首字母大写的几种方法</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Java标准库提供了_String.toUpperCase()_方法，允许我们将字符串中的所有字母转换为大写。</p><p>在本教程中，我们将学习如何仅将给定字符串的第一个字符转换为大写。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>一个示例可以快速解释这个问题。假设我们有一个输入字符串：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String INPUT = &quot;hi there, Nice to Meet You!&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>给定这个_INPUT_字符串，这是我们期望的结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String EXPECTED = &quot;Hi there, Nice to Meet You!&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如我们所见，我们只想将第一个字符‘h’更改为‘H’。然而，<strong>其余字符不应被修改</strong>。</p><p>当然，如果输入字符串为空，则结果也应该是空字符串：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String EMPTY_INPUT = &quot;&quot;;
String EMPTY_EXPECTED = &quot;&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在本教程中，我们将解决这个问题的几种解决方案。为了简单起见，我们将使用单元测试断言来验证我们的解决方案是否按预期工作。</p><h2 id="_3-使用-substring-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用-substring-方法"><span>3. 使用_substring()_方法</span></a></h2><p>解决问题的第一个想法是将输入字符串拆分为两个子字符串。例如，我们可以将_INPUT_字符串拆分为“h”和“i there, Nice ….”。换句话说，第一个子字符串只包含第一个字符，另一个子字符串保存字符串的其余部分。</p><p>然后，<strong>我们只需对第一个子字符串应用_toUpperCase()_方法并将第二个子字符串连接起来就可以解决问题</strong>。</p><p>Java的_String_类的_substring()_方法可以帮助我们获取这两个子字符串：</p><ul><li><em>INPUT.substring(0, 1)</em> – 包含第一个字符的子字符串1</li><li><em>INPUT.substring(1)</em> – 持有字符其余部分的子字符串2</li></ul><p>接下来，让我们编写一个测试来看看解决方案是否有效：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String output = INPUT.substring(0, 1).toUpperCase() + INPUT.substring(1);
assertEquals(EXPECTED, output);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它会通过。然而，<strong>如果我们的输入是一个空字符串，这种方法将引发_IndexOutOfBoundsException_</strong>。这是因为当我们调用_INPUT.substring(1)_时，结束索引(1)大于空字符串的长度(0)：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>assertThrows(IndexOutOfBoundsException.class, () -&gt; EMPTY_INPUT.substring(1));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，我们应该注意到，如果输入字符串是_null_，这种方法将抛出_NullPointerException_。</p><p><strong>因此，在使用substring方法之前，我们需要检查并确保输入字符串不是_null_或空</strong>。</p><h2 id="_4-使用-matcher-replaceall-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用-matcher-replaceall-方法"><span>4. 使用_Matcher.replaceAll()_方法</span></a></h2><p>解决这个问题的另一个想法是使用正则表达式(“^._”)来匹配第一个字符并将匹配的组转换为大写。</p><p>在Java 9之前，这不是一个容易的任务。这是因为_Matcher_的替换方法，如_replaceAll()<em>和_replaceFirst()</em>，不支持_Function_对象或lambda表达式替换器。然而，自Java 9以来，这种情况已经改变了。</p><p><strong>自Java 9以来，_Matcher_的替换方法支持_Function_对象作为替换器。</strong> 也就是说，我们可以使用一个函数来处理匹配的字符序列并完成替换。当然，为了解决我们的问题，我们只需要在匹配的字符上调用_toUpperCase()_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String output = Pattern.compile(&quot;^.&quot;).matcher(INPUT).replaceFirst(m -&gt; m.group().toUpperCase());
assertEquals(EXPECTED, output);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它会通过。</p><p>如果正则表达式没有匹配到任何内容，替换就不会发生。因此，<strong>这个解决方案也适用于空输入字符串</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String emptyOutput = Pattern.compile(&quot;^.&quot;).matcher(EMPTY_INPUT).replaceFirst(m -&gt; m.group().toUpperCase());
assertEquals(EMPTY_EXPECTED, emptyOutput);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>值得一提的是，如果输入字符串是_null_，这个解决方案也会抛出_NullPointerException_。所以，<strong>我们仍然需要在使用它之前进行_null_检查</strong>。</p><h2 id="_5-使用apache-commons-lang-3中的-stringutils" tabindex="-1"><a class="header-anchor" href="#_5-使用apache-commons-lang-3中的-stringutils"><span>5. 使用Apache Commons Lang 3中的_StringUtils_</span></a></h2><p>Apache Commons Lang3是一个流行的库。它提供了许多方便的实用类，并扩展了Java标准库的功能。</p><p><strong>它的_StringUtils_类提供了_capitalize()_方法，直接解决了我们的问题</strong>。</p><p>要使用这个库，我们首先添加Maven依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`org.apache.commons\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`commons-lang3\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`3.12.0\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，像往常一样，让我们创建一个测试来看看它如何工作：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String output = StringUtils.capitalize(INPUT);
assertEquals(EXPECTED, output);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们执行测试，它会通过。正如我们所看到的，我们只需简单地调用_StringUtils.capitalize(INPUT)_。然后库为我们完成了工作。</p><p>值得一提的是，<strong>_StringUtils.capitalize()_方法是null安全的，也适用于空输入字符串</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String emptyOutput = StringUtils.capitalize(EMPTY_INPUT);
assertEquals(EMPTY_EXPECTED, emptyOutput);
String nullOutput = StringUtils.capitalize(null);
assertNull(nullOutput);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了如何将给定字符串的第一个字符转换为大写。</p><p>一如既往，文章中使用的全部代码可以在GitHub上找到。</p>`,47),s=[r];function l(d,p){return a(),t("div",null,s)}const u=e(i,[["render",l],["__file","2024-07-13-Capitalize the First Letter of a String in Java.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Capitalize%20the%20First%20Letter%20of%20a%20String%20in%20Java.html","title":"Java中将字符串首字母大写的几种方法","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","String Manipulation"],"tag":["Java","String","Capitalize"],"head":[["meta",{"name":"keywords","content":"Java, String, Capitalize, Uppercase, First Letter"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Capitalize%20the%20First%20Letter%20of%20a%20String%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将字符串首字母大写的几种方法"}],["meta",{"property":"og:description","content":"Java中将字符串首字母大写的几种方法 1. 概述 Java标准库提供了_String.toUpperCase()_方法，允许我们将字符串中的所有字母转换为大写。 在本教程中，我们将学习如何仅将给定字符串的第一个字符转换为大写。 2. 问题介绍 一个示例可以快速解释这个问题。假设我们有一个输入字符串： 给定这个_INPUT_字符串，这是我们期望的结果：..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T11:36:53.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:tag","content":"Capitalize"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T11:36:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将字符串首字母大写的几种方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T11:36:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将字符串首字母大写的几种方法 1. 概述 Java标准库提供了_String.toUpperCase()_方法，允许我们将字符串中的所有字母转换为大写。 在本教程中，我们将学习如何仅将给定字符串的第一个字符转换为大写。 2. 问题介绍 一个示例可以快速解释这个问题。假设我们有一个输入字符串： 给定这个_INPUT_字符串，这是我们期望的结果：..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用_substring()_方法","slug":"_3-使用-substring-方法","link":"#_3-使用-substring-方法","children":[]},{"level":2,"title":"4. 使用_Matcher.replaceAll()_方法","slug":"_4-使用-matcher-replaceall-方法","link":"#_4-使用-matcher-replaceall-方法","children":[]},{"level":2,"title":"5. 使用Apache Commons Lang 3中的_StringUtils_","slug":"_5-使用apache-commons-lang-3中的-stringutils","link":"#_5-使用apache-commons-lang-3中的-stringutils","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720870613000,"updatedTime":1720870613000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.96,"words":1189},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Capitalize the First Letter of a String in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中将字符串首字母大写的几种方法</h1>\\n<h2>1. 概述</h2>\\n<p>Java标准库提供了_String.toUpperCase()_方法，允许我们将字符串中的所有字母转换为大写。</p>\\n<p>在本教程中，我们将学习如何仅将给定字符串的第一个字符转换为大写。</p>\\n<h2>2. 问题介绍</h2>\\n<p>一个示例可以快速解释这个问题。假设我们有一个输入字符串：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>String INPUT = \\"hi there, Nice to Meet You!\\";\\n</code></pre></div>","autoDesc":true}');export{u as comp,g as data};
