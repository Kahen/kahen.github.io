import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as i}from"./app-C6rqSDgP.js";const n={},o=i(`<h1 id="如何在java中检查字母是否为表情符号" tabindex="-1"><a class="header-anchor" href="#如何在java中检查字母是否为表情符号"><span>如何在Java中检查字母是否为表情符号</span></a></h1><p>表情符号在我们可能需要在代码中处理的文本中频繁出现。例如，这可能是在我们使用电子邮件或即时消息服务时。</p><p>在本教程中，我们将看到在Java应用程序中检测表情符号的多种方法。</p><h2 id="_2-java如何表示表情符号" tabindex="-1"><a class="header-anchor" href="#_2-java如何表示表情符号"><span>2. Java如何表示表情符号？</span></a></h2><p>每个表情符号都有一个独特的Unicode值来表示它。<strong>Java使用UTF-16在_String_中对Unicode字符进行编码。</strong></p><p>UTF-16可以对所有Unicode代码点进行编码。一个代码点可能由一个或两个代码单元组成。如果需要两个，因为Unicode值超出了我们可以在16位中存储的范围，那么我们称它为代理对。</p><p>代理对简单地是由两个字符（或代码单元）组成的，当它们组合在一起时表示一个单一的Unicode字符（或代码点）。为代理对保留了一个代码单元的范围。</p><p>例如，骷髅和交叉骨表情符号的Unicode值是“U+2620”，它在_String_中存储为“\\u2620️️”。我们只需要一个代码单元。然而，熊脸表情符号有Unicode字符“U+1F43B”，它在_String_中存储为“\\uD83D\\uDC3B”。这需要两个代码单元，因为Unicode值对于一个单元来说太高了。</p><p>稍后我们将看到这方面的扩展，但这就是基础知识。</p><h2 id="_3-emoji-java-库" tabindex="-1"><a class="header-anchor" href="#_3-emoji-java-库"><span>3. <em>emoji-java</em> 库</span></a></h2><p>一个现成的解决方案是使用_emoji-java_。要在我们的项目中使用这个库，我们需要将其导入到我们的_pom.xml_中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`com.vdurmont\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`emoji-java\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`5.1.1\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最新版本可在Maven仓库中找到。</p><p>使用这个库来检查一个字母是否是表情符号非常简单。<strong>它在_EmojiManager_实用类中提供了静态的_isEmoji()_方法。</strong></p><p>该方法接受一个单一的_String_参数，如果_String_是表情符号，则返回_true_，否则返回_false_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenAWord_whenUsingEmojiJava_thenDetectEmoji(){
    boolean emoji = EmojiManager.isEmoji(&quot;\\uD83D\\uDC3B&quot;);
    assertTrue(emoji);

    boolean notEmoji = EmojiManager.isEmoji(&quot;w&quot;);
    assertFalse(notEmoji);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们从这个测试中可以看到，该库正确地识别了代理对作为表情符号。它还断言了单个字母“<em>w</em>”不是表情符号。</p><p>这个库有其他许多功能。因此，它是处理Java中表情符号的强有力候选者。</p><h2 id="_4-使用正则表达式" tabindex="-1"><a class="header-anchor" href="#_4-使用正则表达式"><span>4. 使用正则表达式</span></a></h2><p>正如我们前面讨论的，我们知道在Java _String_中表情符号大致是什么样子。我们也知道为代理对保留的潜在值的范围。第一个代码单元将在_U+D800_和_U+DBFF_之间，第二个代码单元将在_U+DC00_和_U+DFFF_之间。</p><p>我们可以利用这一见解来编写一个正则表达式，以检查给定的_String_是否是由代理对表示的表情符号之一。我们需要<strong>在这里注意，并非所有代理对都是表情符号，所以这可能会给我们假阳性</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenAWord_whenUsingRegex_thenDetectEmoji(){
    String regexPattern = &quot;[\\\\uD800-\\\\uDBFF\\\\uDC00-\\\\uDFFF]+&quot;;
    String emojiString = &quot;\\uD83D\\uDC3B&quot;;
    boolean emoji = emojiString.matches(regexPattern);
    assertTrue(emoji);

    String notEmojiString = &quot;w&quot;;
    boolean notEmoji = notEmojiString.matches(regexPattern);
    assertFalse(notEmoji);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**然而，情况并不总是像在预期范围内进行检查那么简单。**正如我们已经看到的，一些表情符号只使用单个代码单元。此外，许多表情符号有修饰符，这些修饰符附加在Unicode的末尾，改变了表情符号的外观。我们还可以在它们之间使用零宽度连接符(ZWJ)字符来组合几个表情符号，形成更复杂的表情符号。</p><p>一个很好的例子是海盗旗表情符号，我们可以使用飘扬的黑色旗帜和骷髅与交叉骨，中间加上ZWJ来构建。考虑到这一点，很明显我们需要的正则表达式要复杂得多，以确保我们捕获所有的表情符号。</p><p>**Unicode发布了一份列出所有当前表情符号值的文档。我们可以为这个文档编写解析器，或者将范围提取到我们自己的配置文件中。**然后结果将可用于我们自己的可靠的表情符号查找器。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了Java如何将Unicode表情符号表示为UTF-16代理对。有一个库，<em>emoji-java</em>，我们可以在我们的代码中使用来检测它们。这个库提供了一个简单的方法来检查一个_String_是否是表情符号。</p><p>我们还可以选择使用正则表达式编写我们自己的检测代码。然而，这是复杂的，需要覆盖一个不断增长的可能值的广泛范围。要做到这一点，我们需要能够接受Unicode的更新到我们的程序中。</p><p>像往常一样，示例的完整代码可以在GitHub上找到。</p>`,29),r=[o];function s(d,l){return t(),a("div",null,r)}const p=e(n,[["render",s],["__file","2024-06-30-Check if Letter Is Emoji With Java.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-Check%20if%20Letter%20Is%20Emoji%20With%20Java.html","title":"如何在Java中检查字母是否为表情符号","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Emoji"],"tag":["Java","Emoji","Unicode"],"head":[["meta",{"name":"keywords","content":"Java, Emoji, Unicode, UTF-16, emoji-java, Regex"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-Check%20if%20Letter%20Is%20Emoji%20With%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Java中检查字母是否为表情符号"}],["meta",{"property":"og:description","content":"如何在Java中检查字母是否为表情符号 表情符号在我们可能需要在代码中处理的文本中频繁出现。例如，这可能是在我们使用电子邮件或即时消息服务时。 在本教程中，我们将看到在Java应用程序中检测表情符号的多种方法。 2. Java如何表示表情符号？ 每个表情符号都有一个独特的Unicode值来表示它。Java使用UTF-16在_String_中对Unico..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T07:53:15.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Emoji"}],["meta",{"property":"article:tag","content":"Unicode"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T07:53:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Java中检查字母是否为表情符号\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T07:53:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Java中检查字母是否为表情符号 表情符号在我们可能需要在代码中处理的文本中频繁出现。例如，这可能是在我们使用电子邮件或即时消息服务时。 在本教程中，我们将看到在Java应用程序中检测表情符号的多种方法。 2. Java如何表示表情符号？ 每个表情符号都有一个独特的Unicode值来表示它。Java使用UTF-16在_String_中对Unico..."},"headers":[{"level":2,"title":"2. Java如何表示表情符号？","slug":"_2-java如何表示表情符号","link":"#_2-java如何表示表情符号","children":[]},{"level":2,"title":"3. emoji-java 库","slug":"_3-emoji-java-库","link":"#_3-emoji-java-库","children":[]},{"level":2,"title":"4. 使用正则表达式","slug":"_4-使用正则表达式","link":"#_4-使用正则表达式","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719733995000,"updatedTime":1719733995000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.22,"words":1266},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-Check if Letter Is Emoji With Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>表情符号在我们可能需要在代码中处理的文本中频繁出现。例如，这可能是在我们使用电子邮件或即时消息服务时。</p>\\n<p>在本教程中，我们将看到在Java应用程序中检测表情符号的多种方法。</p>\\n<h2>2. Java如何表示表情符号？</h2>\\n<p>每个表情符号都有一个独特的Unicode值来表示它。<strong>Java使用UTF-16在_String_中对Unicode字符进行编码。</strong></p>\\n<p>UTF-16可以对所有Unicode代码点进行编码。一个代码点可能由一个或两个代码单元组成。如果需要两个，因为Unicode值超出了我们可以在16位中存储的范围，那么我们称它为代理对。</p>","autoDesc":true}');export{p as comp,v as data};
