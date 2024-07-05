import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-BaAI5AMv.js";const r={},i=n(`<h1 id="java中12小时制时间转换为24小时制时间的方法" tabindex="-1"><a class="header-anchor" href="#java中12小时制时间转换为24小时制时间的方法"><span>Java中12小时制时间转换为24小时制时间的方法</span></a></h1><p>将不同时间格式之间的转换是常见的编程任务。Java提供了一个标准API用于时间操作。</p><p>在本教程中，我们将探索如何使用日期时间API和旧版日期API将12小时制时间格式转换为24小时制时间格式。</p><h2 id="_2-使用日期时间api" tabindex="-1"><a class="header-anchor" href="#_2-使用日期时间api"><span>2. 使用日期时间API</span></a></h2><p>Java 8中引入的日期时间API提供了一个类，用于使用不同的模式格式化时间。12小时制时间和24小时制时间都有不同的表示模式。</p><p>以下是一个使用日期时间API将12小时制时间转换为24小时制时间的示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenTimeInTwelveHours_whenConvertingToTwentyHoursWithDateTimeFormatter_thenConverted() throws ParseException {
    String time = LocalTime.parse(&quot;06:00 PM&quot;, DateTimeFormatter.ofPattern(&quot;hh:mm a&quot;, Locale.US))
      .format(DateTimeFormatter.ofPattern(&quot;HH:mm&quot;));
    assertEquals(&quot;18:00&quot;, time);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们通过调用LocalTime类的_parse()_方法将12小时制时间字符串解析为_LocalTime_对象。</p><p>_parse()<em>方法接受两个参数——要解析的字符串和一个指定字符串格式的_DateTimeFormatter</em>。</p><p>接下来，我们通过调用DateTimeFormatter的_ofPattern()_方法将时间格式化为12小时制格式。<strong>12小时制时间的模式是“<em>hh:mm a</em>”</strong>。</p><p>此外，我们通过调用解析后时间的_format()_方法，并将模式设置为“<em>HH:mm</em>”，这代表24小时制时间格式，来将12小时制时间转换为24小时制时间。</p><h2 id="_3-使用旧版日期api" tabindex="-1"><a class="header-anchor" href="#_3-使用旧版日期api"><span>3. 使用旧版日期API</span></a></h2><p>简单来说，我们可以使用旧版日期API中的_SimpleDateFormat_来将12小时制时间转换为24小时制时间。</p><p>要使用旧版日期API，我们将解析一个12小时制时间格式的字符串为_Date_类型：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenTimeInTwelveHours_whenConvertingToTwentyHours_thenConverted() throws ParseException {
    SimpleDateFormat displayFormat = new SimpleDateFormat(&quot;HH:mm&quot;);
    SimpleDateFormat parseFormat = new SimpleDateFormat(&quot;hh:mm a&quot;);
    Date date = parseFormat.parse(&quot;06:00 PM&quot;);
    assertEquals(&quot;18:00&quot;, displayFormat.format(date));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个_SimpleDateFormat_实例，通过指定模式将时间格式化为24小时等价形式。最后，我们断言转换后的时间与预期的24小时制时间格式匹配。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们学习了两种将时间从12小时制格式转换为24小时制格式的不同方法。此外，我们还使用了日期时间API中的_DateTimeFormatter_类和旧版日期API中的_SimpleDateFormat_类来实现转换过程。</p><p>如常，示例的完整源代码可以在GitHub上找到。</p>`,19),o=[i];function m(s,l){return a(),t("div",null,o)}const c=e(r,[["render",m],["__file","2024-07-01-Conversion From 12 Hour Time to 24 Hour Time in Java.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Conversion%20From%2012%20Hour%20Time%20to%2024%20Hour%20Time%20in%20Java.html","title":"Java中12小时制时间转换为24小时制时间的方法","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Time Conversion","Java 8"],"head":[["meta",{"name":"keywords","content":"Java, Time Conversion, 24-hour format, 12-hour format"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Conversion%20From%2012%20Hour%20Time%20to%2024%20Hour%20Time%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中12小时制时间转换为24小时制时间的方法"}],["meta",{"property":"og:description","content":"Java中12小时制时间转换为24小时制时间的方法 将不同时间格式之间的转换是常见的编程任务。Java提供了一个标准API用于时间操作。 在本教程中，我们将探索如何使用日期时间API和旧版日期API将12小时制时间格式转换为24小时制时间格式。 2. 使用日期时间API Java 8中引入的日期时间API提供了一个类，用于使用不同的模式格式化时间。12..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T20:30:18.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Time Conversion"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T20:30:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中12小时制时间转换为24小时制时间的方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T20:30:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中12小时制时间转换为24小时制时间的方法 将不同时间格式之间的转换是常见的编程任务。Java提供了一个标准API用于时间操作。 在本教程中，我们将探索如何使用日期时间API和旧版日期API将12小时制时间格式转换为24小时制时间格式。 2. 使用日期时间API Java 8中引入的日期时间API提供了一个类，用于使用不同的模式格式化时间。12..."},"headers":[{"level":2,"title":"2. 使用日期时间API","slug":"_2-使用日期时间api","link":"#_2-使用日期时间api","children":[]},{"level":2,"title":"3. 使用旧版日期API","slug":"_3-使用旧版日期api","link":"#_3-使用旧版日期api","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719865818000,"updatedTime":1719865818000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.18,"words":655},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Conversion From 12 Hour Time to 24 Hour Time in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>将不同时间格式之间的转换是常见的编程任务。Java提供了一个标准API用于时间操作。</p>\\n<p>在本教程中，我们将探索如何使用日期时间API和旧版日期API将12小时制时间格式转换为24小时制时间格式。</p>\\n<h2>2. 使用日期时间API</h2>\\n<p>Java 8中引入的日期时间API提供了一个类，用于使用不同的模式格式化时间。12小时制时间和24小时制时间都有不同的表示模式。</p>\\n<p>以下是一个使用日期时间API将12小时制时间转换为24小时制时间的示例：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>@Test\\nvoid givenTimeInTwelveHours_whenConvertingToTwentyHoursWithDateTimeFormatter_thenConverted() throws ParseException {\\n    String time = LocalTime.parse(\\"06:00 PM\\", DateTimeFormatter.ofPattern(\\"hh:mm a\\", Locale.US))\\n      .format(DateTimeFormatter.ofPattern(\\"HH:mm\\"));\\n    assertEquals(\\"18:00\\", time);\\n}\\n</code></pre></div>","autoDesc":true}');export{c as comp,v as data};
