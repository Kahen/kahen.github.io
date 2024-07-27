import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as o}from"./app-CBerKIce.js";const n={},r=o(`<h1 id="java-17中hexformat的介绍" tabindex="-1"><a class="header-anchor" href="#java-17中hexformat的介绍"><span>Java 17中HexFormat的介绍</span></a></h1><p>在Java中，我们通常编写自己的方法来处理字节和十六进制字符串之间的转换。然而，Java 17引入了<code>java.util.HexFormat</code>，这是一个实用工具类，它<strong>可以转换原始类型、字节数组或字符数组到十六进制字符串，反之亦然</strong>。</p><p>在本教程中，我们将探索如何使用<code>HexFormat</code>并演示它提供的功能。</p><h2 id="_2-java-17之前处理十六进制字符串" tabindex="-1"><a class="header-anchor" href="#_2-java-17之前处理十六进制字符串"><span>2. Java 17之前处理十六进制字符串</span></a></h2><p>十六进制编号系统使用16作为基数来表示数字。这意味着它由16个符号组成，通常使用0-9的符号表示0到9的值，使用A-F的符号表示10到15的值。</p><p>这是表示长二进制值的流行选择，因为它比二进制字符串的1和0更容易理解。</p><p>当我们需要在十六进制字符串和字节数组之间进行转换时，开发人员通常使用<code>String.format()</code>编写自己的方法来完成这项工作。</p><p>这是一个简单且易于理解的实现，但往往效率不高：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static String byteArrayToHex(byte[] a) {
    StringBuilder sb = new StringBuilder(a.length * 2);
    for (byte b: a) {
       sb.append(String.format(&quot;%02x&quot;, b));
    }
    return sb.toString();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一个流行的解决方案是使用Apache Commons Codec库，它包含一个<code>Hex</code>实用工具类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String foo = &quot;I am a string&quot;;
byte[] bytes = foo.getBytes();
Hex.encodeHexString(bytes);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的另一个教程解释了手动执行此转换的不同方法。</p><h2 id="_3-java-17中hexformat的使用" tabindex="-1"><a class="header-anchor" href="#_3-java-17中hexformat的使用"><span>3. Java 17中<code>HexFormat</code>的使用</span></a></h2><p><code>HexFormat</code>可以在Java 17标准库中找到，并且可以<strong>处理字节和十六进制字符串之间的转换</strong>。它还支持几种格式化选项。</p><h3 id="_3-1-创建hexformat" tabindex="-1"><a class="header-anchor" href="#_3-1-创建hexformat"><span>3.1. 创建<code>HexFormat</code></span></a></h3><p>我们如何创建一个新的<code>HexFormat</code>实例<strong>取决于我们是否需要分隔符支持</strong>。<code>HexFormat</code>是线程安全的，所以一个实例可以在多个线程中使用。</p><p><code>HexFormat.of()</code>是我们使用最普遍的情况，当我们不需要分隔符支持时使用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>HexFormat hexFormat = HexFormat.of();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>HexFormat.ofDelimiter(&quot;:&quot;)</code>可以用于分隔符支持，此示例使用冒号作为分隔符：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>HexFormat hexFormat = HexFormat.ofDelimiter(&quot;:&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-2-字符串格式化" tabindex="-1"><a class="header-anchor" href="#_3-2-字符串格式化"><span>3.2. 字符串格式化</span></a></h3><p><code>HexFormat</code>允许我们<strong>向现有的<code>HexFormat</code>对象添加前缀、后缀和分隔符格式化选项</strong>。我们可以使用这些来控制正在解析或生成的<code>String</code>的格式。</p><p>以下是将这三个一起使用的示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>HexFormat hexFormat = HexFormat.of().withPrefix(&quot;[&quot;).withSuffix(&quot;]&quot;).withDelimiter(&quot;, &quot;);
assertEquals(&quot;[48], [0c], [11]&quot;, hexFormat.formatHex(new byte[] {72, 12, 17}));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们使用简单的<code>of()</code>方法创建对象，然后使用<code>withDelimiter()</code>添加分隔符。</p><h3 id="_3-3-字节和十六进制字符串的转换" tabindex="-1"><a class="header-anchor" href="#_3-3-字节和十六进制字符串的转换"><span>3.3. 字节和十六进制字符串的转换</span></a></h3><p>现在我们已经看到了如何创建一个<code>HexFormat</code>实例，让我们来讨论一下如何执行转换。</p><p>我们将使用创建实例的简单方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>HexFormat hexFormat = HexFormat.of();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们使用这个将<code>String</code>转换为<code>byte[]</code>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>byte[] hexBytes = hexFormat.parseHex(&quot;ABCDEF0123456789&quot;);
assertArrayEquals(new byte[] { -85, -51, -17, 1, 35, 69, 103, -119 }, hexBytes);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>再转换回去：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String bytesAsString = hexFormat.formatHex(new byte[] { -85, -51, -17, 1, 35, 69, 103, -119 });
assertEquals(&quot;ABCDEF0123456789&quot;, bytesAsString);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-原始类型到十六进制字符串的转换" tabindex="-1"><a class="header-anchor" href="#_3-4-原始类型到十六进制字符串的转换"><span>3.4. 原始类型到十六进制字符串的转换</span></a></h3><p><code>HexFormat</code>还支持将原始类型转换为十六进制字符串：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String fromByte = hexFormat.toHexDigits((byte) 64);
assertEquals(&quot;40&quot;, fromByte);

String fromLong = hexFormat.toHexDigits(1234_5678_9012_3456L);
assertEquals(&quot;000462d53c8abac0&quot;, fromLong);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5-大写和小写输出" tabindex="-1"><a class="header-anchor" href="#_3-5-大写和小写输出"><span>3.5. 大写和小写输出</span></a></h3><p>正如示例所示，<code>HexFormat</code>的默认行为是产生小写十六进制值。<strong>我们可以通过在创建我们的<code>HexFormat</code>实例时调用<code>withUpperCase()</code>来改变这种行为</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>upperCaseHexFormat = HexFormat.of().withUpperCase();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>尽管小写是默认行为，但<code>withLowerCase()</code>方法也存在。这对于使我们的代码自文档化和对其他开发人员明确是有用的。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>Java 17中<code>HexFormat</code>的引入解决了我们在执行字节和十六进制字符串转换时传统上面临的许多问题。</p><p>我们在本文中介绍了最常见的用例，但<code>HexFormat</code>还支持更多小众功能。例如，有更多的转换方法和管理全字节的上半部分和下半部分的能力。</p><p><code>HexFormat</code>的官方文档可在Java 17文档中找到。</p><p>像往常一样，我们在本文中展示的示例在GitHub上。抱歉，由于内容过长，我将为您提供剩余部分的翻译：</p><h2 id="_4-结论-1" tabindex="-1"><a class="header-anchor" href="#_4-结论-1"><span>4. 结论</span></a></h2><p><code>HexFormat</code>在Java 17中的引入解决了我们在字节和十六进制字符串转换中通常面临的问题。</p><p>我们已经在本文中讨论了最常见的用例，但<code>HexFormat</code>还支持更专业的功能。例如，它提供了更多的转换方法，以及管理完整字节的上半部分和下半部分的能力。</p><p><code>HexFormat</code>的官方文档可在Java 17的文档中找到。</p><p>正如往常一样，本文中展示的示例可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/1fd59313f33ad19dab0e6e7c519c7f2d?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>`,52),d=[r];function i(s,l){return t(),a("div",null,d)}const p=e(n,[["render",i],["__file","2024-07-24-Introduction to HexFormat in Java 17.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-24/2024-07-24-Introduction%20to%20HexFormat%20in%20Java%2017.html","title":"Java 17中HexFormat的介绍","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","HexFormat"],"tag":["Java 17","Hexadecimal"],"head":[["meta",{"name":"keywords","content":"Java 17, HexFormat, Hexadecimal, Java 17 HexFormat"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-24/2024-07-24-Introduction%20to%20HexFormat%20in%20Java%2017.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 17中HexFormat的介绍"}],["meta",{"property":"og:description","content":"Java 17中HexFormat的介绍 在Java中，我们通常编写自己的方法来处理字节和十六进制字符串之间的转换。然而，Java 17引入了java.util.HexFormat，这是一个实用工具类，它可以转换原始类型、字节数组或字符数组到十六进制字符串，反之亦然。 在本教程中，我们将探索如何使用HexFormat并演示它提供的功能。 2. Java..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-24T18:50:48.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 17"}],["meta",{"property":"article:tag","content":"Hexadecimal"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-24T18:50:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 17中HexFormat的介绍\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/1fd59313f33ad19dab0e6e7c519c7f2d?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-24T18:50:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 17中HexFormat的介绍 在Java中，我们通常编写自己的方法来处理字节和十六进制字符串之间的转换。然而，Java 17引入了java.util.HexFormat，这是一个实用工具类，它可以转换原始类型、字节数组或字符数组到十六进制字符串，反之亦然。 在本教程中，我们将探索如何使用HexFormat并演示它提供的功能。 2. Java..."},"headers":[{"level":2,"title":"2. Java 17之前处理十六进制字符串","slug":"_2-java-17之前处理十六进制字符串","link":"#_2-java-17之前处理十六进制字符串","children":[]},{"level":2,"title":"3. Java 17中HexFormat的使用","slug":"_3-java-17中hexformat的使用","link":"#_3-java-17中hexformat的使用","children":[{"level":3,"title":"3.1. 创建HexFormat","slug":"_3-1-创建hexformat","link":"#_3-1-创建hexformat","children":[]},{"level":3,"title":"3.2. 字符串格式化","slug":"_3-2-字符串格式化","link":"#_3-2-字符串格式化","children":[]},{"level":3,"title":"3.3. 字节和十六进制字符串的转换","slug":"_3-3-字节和十六进制字符串的转换","link":"#_3-3-字节和十六进制字符串的转换","children":[]},{"level":3,"title":"3.4. 原始类型到十六进制字符串的转换","slug":"_3-4-原始类型到十六进制字符串的转换","link":"#_3-4-原始类型到十六进制字符串的转换","children":[]},{"level":3,"title":"3.5. 大写和小写输出","slug":"_3-5-大写和小写输出","link":"#_3-5-大写和小写输出","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论-1","link":"#_4-结论-1","children":[]}],"git":{"createdTime":1721847048000,"updatedTime":1721847048000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.23,"words":1269},"filePathRelative":"posts/baeldung/2024-07-24/2024-07-24-Introduction to HexFormat in Java 17.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在Java中，我们通常编写自己的方法来处理字节和十六进制字符串之间的转换。然而，Java 17引入了<code>java.util.HexFormat</code>，这是一个实用工具类，它<strong>可以转换原始类型、字节数组或字符数组到十六进制字符串，反之亦然</strong>。</p>\\n<p>在本教程中，我们将探索如何使用<code>HexFormat</code>并演示它提供的功能。</p>\\n<h2>2. Java 17之前处理十六进制字符串</h2>\\n<p>十六进制编号系统使用16作为基数来表示数字。这意味着它由16个符号组成，通常使用0-9的符号表示0到9的值，使用A-F的符号表示10到15的值。</p>","autoDesc":true}');export{p as comp,u as data};
