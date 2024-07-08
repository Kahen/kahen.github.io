import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-C_fPDS1x.js";const i={},l=n(`<h1 id="在java中打印带引号的字符串" tabindex="-1"><a class="header-anchor" href="#在java中打印带引号的字符串"><span>在Java中打印带引号的字符串</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>“Hello World!”可能是我们开始学习Java时看到的第一个Java示例。我们知道，如果我们将一个字符串对象传递给System.out.println()方法，Java就会在控制台输出该字符串。</p><p>然而，有时我们希望输出的字符串被引号包围（“...”）。在这个快速教程中，我们将探讨如何实现这一点。</p><h2 id="_2-使用两个转义引号字符串包装" tabindex="-1"><a class="header-anchor" href="#_2-使用两个转义引号字符串包装"><span>2. 使用两个转义引号字符串包装</span></a></h2><p>如果我们想要将字符串用引号（“...”）包裹，最直接的想法可能是将引号连接到给定文本的开头和结尾。</p><p>在Java中，当我们使用字符串值时，我们必须使用引号，例如System.out.println(&quot;Hello World!&quot;)。然而，我们不能像“”这样在字符串中放置引号字符。Java不接受它。因此，在这种情况下，<strong>我们必须在字符串中转义引号符号：&quot;\\&quot;&quot;</strong>。</p><p>接下来，让我们用一个输入示例来尝试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String theySay = &quot;All Java programmers are cute!&quot;;
String quoted = &quot;\\&quot;&quot; + theySay + &quot;\\&quot;&quot;;

System.out.print(quoted);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们运行上述程序时，我们可以看到带有引号的输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&quot;All Java programmers are cute!&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-在单元测试中验证输出" tabindex="-1"><a class="header-anchor" href="#_3-在单元测试中验证输出"><span>3. 在单元测试中验证输出</span></a></h2><p>通常，我们构建单元测试来验证一个方法是否按预期工作。然而，这个案例有点特别，因为我们需要验证我们打印到控制台的输出。为了验证输出，我们可以将System.out替换为另一个使用ByteArrayOutputStream作为OutputStream的PrintStream对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>final ByteArrayOutputStream outContent = new ByteArrayOutputStream();
final PrintStream originalOut = System.out;

@BeforeEach
void replaceOut() {
    System.setOut(new PrintStream(outContent));
}

@AfterEach
void restoreOut() {
    System.setOut(originalOut);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@BeforeEach和@AfterEach是JUnit 5的两个注解。这些注解的方法将在每个测试方法执行之前和之后被调用。</p><p>现在，如果我们将原始的输出代码放入一个测试方法中，我们可以验证打印的输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String theySay = &quot;All Java programmers are cute!&quot;;
String quoted = &quot;\\&quot;&quot; + theySay + &quot;\\&quot;&quot;;

System.out.println(quoted);

//断言
String expected = &quot;\\&quot;All Java programmers are cute!\\&quot;&quot;;
assertEquals(expected, outContent.toString());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它将通过。因此，为了简单起见，在后续的例子中，我们将使用单元测试断言来验证由System.out.println()打印的输出。</p><h2 id="_4-使用replaceall-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用replaceall-方法"><span>4. 使用replaceAll()方法</span></a></h2><p>标准的String.replaceAll()方法可以通过正则表达式执行字符串替换操作。我们已经通过在输入字符串的开头和结尾连接引号来解决了问题。</p><p>按照相同的思路，我们可以使用replaceAll()方法来实现：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String theyAsk = &quot;Can you write Java code?&quot;;
String quoted = theyAsk.replaceAll(&quot;^|$&quot;, &quot;\\&quot;&quot;);

System.out.println(quoted);

//断言
String expected = &quot;\\&quot;Can you write Java code?\\&quot;&quot;;
assertEquals(expected, outContent.toString());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述示例显示<strong>正则表达式“^|$”匹配输入字符串的开头和结尾</strong>。因此，replaceAll()方法用引号替换匹配项。</p><h2 id="_5-使用两个引号字符包装" tabindex="-1"><a class="header-anchor" href="#_5-使用两个引号字符包装"><span>5. 使用两个引号字符包装</span></a></h2><p>到目前为止，我们已经学习了两种打印带引号的字符串的方法。两种方法都像“&quot;”一样在字符串中转义引号字符。它正确地完成了工作。然而，<strong>使用转义字符可能会使代码更难阅读和理解。</strong></p><p>为了避免<strong>转义引号字符，我们可以使用char而不是字符串</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String weSay = &quot;Yes, we can write beautiful Java codes!&quot;;
String quoted = &#39;&quot;&#39; + weSay + &#39;&quot;&#39;;

System.out.println(quoted);

//断言
String expected = &quot;\\&quot;Yes, we can write beautiful Java codes!\\&quot;&quot;;
assertEquals(expected, outContent.toString());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它会通过。如上所示的测试，我们在两个char和一个String上执行加法操作：&#39;&quot;&#39; + weSay + &#39;&quot;&#39;。这是因为<strong>Java自动将char转换为String，然后与字符串weSay连接</strong>。因此，不需要转义。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这篇文章中，我们探讨了三种不同的打印带引号(“”)的字符串的方法：</p><ul><li>“&quot;” + input + “&quot;” - 在输入字符串的开头和结尾添加转义引号字符串(“&quot;”)</li><li>input.replaceAll(“^|$”, “&quot;”) - 使用基于正则表达式的replaceAll()方法</li><li>&#39;&quot;“ + input + &#39;&quot;“ - 与第一种解决方案类似，但使用char代替String以避免转义</li></ul><p>除此之外，我们还学习了如何在单元测试中验证由System.out.println()写入的输出。</p><p>像往常一样，这里展示的所有代码片段都可以在GitHub上找到。</p><p>OK</p>`,34),r=[l];function s(o,d){return a(),t("div",null,r)}const p=e(i,[["render",s],["__file","2024-07-06-Print    Quotes Around a String in Java.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Print%20%20%20%20Quotes%20Around%20a%20String%20in%20Java.html","title":"在Java中打印带引号的字符串","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","字符串处理"],"tag":["Java","字符串","引号"],"head":[["meta",{"name":"keywords","content":"Java, 字符串, 引号, 打印, 格式化"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Print%20%20%20%20Quotes%20Around%20a%20String%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中打印带引号的字符串"}],["meta",{"property":"og:description","content":"在Java中打印带引号的字符串 1. 概述 “Hello World!”可能是我们开始学习Java时看到的第一个Java示例。我们知道，如果我们将一个字符串对象传递给System.out.println()方法，Java就会在控制台输出该字符串。 然而，有时我们希望输出的字符串被引号包围（“...”）。在这个快速教程中，我们将探讨如何实现这一点。 2...."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T08:57:29.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"字符串"}],["meta",{"property":"article:tag","content":"引号"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T08:57:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中打印带引号的字符串\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T08:57:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中打印带引号的字符串 1. 概述 “Hello World!”可能是我们开始学习Java时看到的第一个Java示例。我们知道，如果我们将一个字符串对象传递给System.out.println()方法，Java就会在控制台输出该字符串。 然而，有时我们希望输出的字符串被引号包围（“...”）。在这个快速教程中，我们将探讨如何实现这一点。 2...."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用两个转义引号字符串包装","slug":"_2-使用两个转义引号字符串包装","link":"#_2-使用两个转义引号字符串包装","children":[]},{"level":2,"title":"3. 在单元测试中验证输出","slug":"_3-在单元测试中验证输出","link":"#_3-在单元测试中验证输出","children":[]},{"level":2,"title":"4. 使用replaceAll()方法","slug":"_4-使用replaceall-方法","link":"#_4-使用replaceall-方法","children":[]},{"level":2,"title":"5. 使用两个引号字符包装","slug":"_5-使用两个引号字符包装","link":"#_5-使用两个引号字符包装","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720256249000,"updatedTime":1720256249000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.57,"words":1072},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Print    Quotes Around a String in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>“Hello World!”可能是我们开始学习Java时看到的第一个Java示例。我们知道，如果我们将一个字符串对象传递给System.out.println()方法，Java就会在控制台输出该字符串。</p>\\n<p>然而，有时我们希望输出的字符串被引号包围（“...”）。在这个快速教程中，我们将探讨如何实现这一点。</p>\\n<h2>2. 使用两个转义引号字符串包装</h2>\\n<p>如果我们想要将字符串用引号（“...”）包裹，最直接的想法可能是将引号连接到给定文本的开头和结尾。</p>\\n<p>在Java中，当我们使用字符串值时，我们必须使用引号，例如System.out.println(\\"Hello World!\\")。然而，我们不能像“”这样在字符串中放置引号字符。Java不接受它。因此，在这种情况下，<strong>我们必须在字符串中转义引号符号：\\"\\\\\\"\\"</strong>。</p>","autoDesc":true}');export{p as comp,v as data};
