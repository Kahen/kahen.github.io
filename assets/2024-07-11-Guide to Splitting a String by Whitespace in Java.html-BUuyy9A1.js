import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as i,a as n}from"./app-7JssDWWZ.js";const a={},r=n(`<h1 id="java中按空白字符分割字符串的指南" tabindex="-1"><a class="header-anchor" href="#java中按空白字符分割字符串的指南"><span>Java中按空白字符分割字符串的指南</span></a></h1><p>在Java中，一个_String_可以被视为多个子字符串的连接。此外，使用空白字符作为分隔符来构建和存储一系列子字符串到一个单独的字符串中是很常见的做法。</p><p>在本教程中，我们将<strong>学习如何通过空白字符，例如空格、制表符或换行符，来分割一个_String_</strong>。</p><h2 id="_2-string-示例" tabindex="-1"><a class="header-anchor" href="#_2-string-示例"><span>2. <em>String</em> 示例</span></a></h2><p>首先，我们需要构建一些_String_示例，这些示例可以作为按空白字符分割的输入。所以，让我们首先<strong>定义一些空白字符作为_String_常量</strong>，以便我们可以方便地重复使用它们：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String SPACE = &quot; &quot;;
String TAB = &quot;\\t&quot;;
String NEW_LINE = &quot;\\n&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们使用这些作为分隔符来定义包含不同水果名称的_String_示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String FRUITS_TAB_SEPARATED = &quot;Apple&quot; + TAB + &quot;Banana&quot; + TAB + &quot;Mango&quot; + TAB + &quot;Orange&quot;;
String FRUITS_SPACE_SEPARATED = &quot;Apple&quot; + SPACE + &quot;Banana&quot; + SPACE + &quot;Mango&quot; + SPACE + &quot;Orange&quot;;
String FRUITS_NEWLINE_SEPARATED = &quot;Apple&quot; + NEW_LINE + &quot;Banana&quot; + NEW_LINE + &quot;Mango&quot; + NEW_LINE + &quot;Orange&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们还将<strong>编写_verifySplit()_方法，我们将重用此方法来验证通过空白字符分割这些字符串的预期结果</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private void verifySplit(String[] fruitArray) {
    assertEquals(4, fruitArray.length);
    assertEquals(&quot;Apple&quot;, fruitArray[0]);
    assertEquals(&quot;Banana&quot;, fruitArray[1]);
    assertEquals(&quot;Mango&quot;, fruitArray[2]);
    assertEquals(&quot;Orange&quot;, fruitArray[3]);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们已经构建了输入字符串，我们准备探索不同的策略来分割这些字符串并验证分割。</p><h2 id="_3-使用分隔符正则表达式分割" tabindex="-1"><a class="header-anchor" href="#_3-使用分隔符正则表达式分割"><span>3. 使用分隔符正则表达式分割</span></a></h2><p><strong>_String_类的_split()_方法是分割字符串的事实标准</strong>。它接受一个分隔符正则表达式，并产生分割到一个_String_数组中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String[] split(String regex);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>首先，让我们通过一个单独的空格字符来分割_FRUITS_SPACE_SEPARATED_字符串：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenSpaceSeparatedString_whenSplitUsingSpace_shouldGetExpectedResult() {
    String fruits = FRUITS_SPACE_SEPARATED;
    String[] fruitArray = fruits.split(SPACE);
    verifySplit(fruitArray);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，我们可以使用_TAB_和_NEW_LINE_分别作为分隔符正则表达式来分割_FRUITS_TAB_SEPARATED_和_FRUITS_NEWLINE_SEPARATED_。</p><p>接下来，让我们尝试使用一个更通用的正则表达式来表示空格、制表符和换行符，并<strong>使用相同的正则表达式分割所有的字符串样本</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenWhiteSpaceSeparatedString_whenSplitUsingWhiteSpaceRegex_shouldGetExpectedResult() {
    String whitespaceRegex = SPACE + &quot;|&quot; + TAB + &quot;|&quot; + NEW_LINE;
    String[] allSamples = new String[] { FRUITS_SPACE_SEPARATED, FRUITS_TAB_SEPARATED, FRUITS_NEWLINE_SEPARATED };
    for (String fruits : allSamples) {
        String[] fruitArray = fruits.split(whitespaceRegex);
        verifySplit(fruitArray);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到目前为止，看起来我们已经做对了！</p><p>最后，让我们<strong>简化我们的方法，使用空白字符的元字符( <em>\\s</em> )</strong>，它本身代表所有类型的空白字符：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenNewlineSeparatedString_whenSplitUsingWhiteSpaceMetaChar_shouldGetExpectedResult() {
    String whitespaceMetaChar = &quot;\\\\s&quot;;
    String[] allSamples = new String[] { FRUITS_SPACE_SEPARATED, FRUITS_TAB_SEPARATED, FRUITS_NEWLINE_SEPARATED };
    for (String fruits : allSamples) {
        String[] fruitArray = fruits.split(whitespaceMetaChar);
        verifySplit(fruitArray);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意到，使用_\\s_元字符比创建我们自己的空白正则表达式更方便和可靠。此外，如果我们的输入字符串可以有多个空白字符作为分隔符，那么我们可以不改变其余代码而使用_\\s+<em>而不是</em>\\s_。</p><h2 id="_4-使用-stringtokenizer-分割" tabindex="-1"><a class="header-anchor" href="#_4-使用-stringtokenizer-分割"><span>4. 使用_StringTokenizer_分割</span></a></h2><p><strong>按空白字符分割字符串是如此常见的用例，以至于许多Java库都提供了一个接口来实现这一点，而不需要显式指定分隔符</strong>。在本节中，让我们学习如何使用_StringTokenizer_来解决这个用例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenSpaceSeparatedString_whenSplitUsingStringTokenizer_shouldGetExpectedResult() {
    String fruits = FRUITS_SPACE_SEPARATED;
    StringTokenizer tokenizer = new StringTokenizer(fruits);
    String[] fruitArray = new String[tokenizer.countTokens()];
    int index = 0;
    while (tokenizer.hasMoreTokens()) {
        fruitArray[index++] = tokenizer.nextToken();
    }
    verifySplit(fruitArray);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到我们没有提供任何分隔符，因为_StringTokenizer_默认使用空白分隔符。此外，<strong>代码遵循迭代器设计模式，其中_hasMoreTokens()_方法决定了循环终止条件，_nextToken()_给出了下一个分割</strong>。</p><p>此外，我们应该注意到我们使用了_countTokens()_方法来预先确定分割的数量。然而，如果我们想按顺序一次消费结果分割，这并不是必须的。通常，<strong>当我们想要在输入字符串很长时立即获取下一个分割而不需要等待整个分割过程完成时，我们应该使用这种方法</strong>。</p><h2 id="_5-使用apache-commons分割" tabindex="-1"><a class="header-anchor" href="#_5-使用apache-commons分割"><span>5. 使用Apache Commons分割</span></a></h2><p><strong>_org.apache.commons.lang3_包中的_StringUtils_类提供了一个_split()<em>实用方法来分割一个_String</em></strong>。像_StringTokenizer_类一样，它使用空白作为默认的字符串分割分隔符：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static String[] split(String str);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们首先在项目的_pom.xml_文件中添加_commons-lang3_依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`org.apache.commons\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`commons-lang3\`&lt;/artifactId&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们通过分割_String_样本来看到这一点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenWhiteSpaceSeparatedString_whenSplitUsingStringUtils_shouldGetExpectedResult() {
    String[] allSamples = new String[] { FRUITS_SPACE_SEPARATED, FRUITS_TAB_SEPARATED, FRUITS_NEWLINE_SEPARATED };
    for (String fruits : allSamples) {
        String[] fruitArray = StringUtils.split(fruits);
        verifySplit(fruitArray);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用_StringUtils_类的_split()_实用方法的一个优点是调用者不需要显式执行空值检查</strong>。这是因为_split()_方法优雅地处理了这一点。让我们继续并看到这一点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenNullString_whenSplitUsingStringUtils_shouldReturnNull() {
    String fruits = null;
    String[] fruitArray = StringUtils.split(fruits);
    assertNull(fruitArray);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，该方法对_null_输入返回_null_值。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本教程中，<strong>我们学习了多种按空白字符分割字符串的方法</strong>。此外，我们还注意到了与某些策略相关的一些优点和推荐的最佳实践。</p><p>一如既往，教程的完整源代码可在GitHub上获得。</p>`,41),s=[r];function l(d,u){return i(),t("div",null,s)}const g=e(a,[["render",l],["__file","2024-07-11-Guide to Splitting a String by Whitespace in Java.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Guide%20to%20Splitting%20a%20String%20by%20Whitespace%20in%20Java.html","title":"Java中按空白字符分割字符串的指南","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","String"],"tag":["split","whitespace"],"head":[["meta",{"name":"keywords","content":"Java, String, split, whitespace"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Guide%20to%20Splitting%20a%20String%20by%20Whitespace%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中按空白字符分割字符串的指南"}],["meta",{"property":"og:description","content":"Java中按空白字符分割字符串的指南 在Java中，一个_String_可以被视为多个子字符串的连接。此外，使用空白字符作为分隔符来构建和存储一系列子字符串到一个单独的字符串中是很常见的做法。 在本教程中，我们将学习如何通过空白字符，例如空格、制表符或换行符，来分割一个_String_。 2. String 示例 首先，我们需要构建一些_String_..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T07:02:12.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"split"}],["meta",{"property":"article:tag","content":"whitespace"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T07:02:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中按空白字符分割字符串的指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T07:02:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中按空白字符分割字符串的指南 在Java中，一个_String_可以被视为多个子字符串的连接。此外，使用空白字符作为分隔符来构建和存储一系列子字符串到一个单独的字符串中是很常见的做法。 在本教程中，我们将学习如何通过空白字符，例如空格、制表符或换行符，来分割一个_String_。 2. String 示例 首先，我们需要构建一些_String_..."},"headers":[{"level":2,"title":"2. String 示例","slug":"_2-string-示例","link":"#_2-string-示例","children":[]},{"level":2,"title":"3. 使用分隔符正则表达式分割","slug":"_3-使用分隔符正则表达式分割","link":"#_3-使用分隔符正则表达式分割","children":[]},{"level":2,"title":"4. 使用_StringTokenizer_分割","slug":"_4-使用-stringtokenizer-分割","link":"#_4-使用-stringtokenizer-分割","children":[]},{"level":2,"title":"5. 使用Apache Commons分割","slug":"_5-使用apache-commons分割","link":"#_5-使用apache-commons分割","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720681332000,"updatedTime":1720681332000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.35,"words":1304},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Guide to Splitting a String by Whitespace in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在Java中，一个_String_可以被视为多个子字符串的连接。此外，使用空白字符作为分隔符来构建和存储一系列子字符串到一个单独的字符串中是很常见的做法。</p>\\n<p>在本教程中，我们将<strong>学习如何通过空白字符，例如空格、制表符或换行符，来分割一个_String_</strong>。</p>\\n<h2>2. <em>String</em> 示例</h2>\\n<p>首先，我们需要构建一些_String_示例，这些示例可以作为按空白字符分割的输入。所以，让我们首先<strong>定义一些空白字符作为_String_常量</strong>，以便我们可以方便地重复使用它们：</p>\\n","autoDesc":true}');export{g as comp,p as data};
