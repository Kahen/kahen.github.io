import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-CXN34Kw1.js";const e={},p=t(`<h1 id="java中给时间字符串添加分钟" tabindex="-1"><a class="header-anchor" href="#java中给时间字符串添加分钟"><span>Java中给时间字符串添加分钟</span></a></h1><p>Java提供了一个标准的API来处理日期和时间。<strong>日期时间API提供了一个方法，可以将字符串格式的时间解析为等价的_LocalTime_类型，以便进一步操作</strong>。</p><p>在本教程中，我们将探讨如何使用旧版Date API和日期时间API将分钟添加到字符串格式的时间。</p><h2 id="_2-使用旧版date-api" tabindex="-1"><a class="header-anchor" href="#_2-使用旧版date-api"><span>2. 使用旧版Date API</span></a></h2><p>时间字符串显示时间，但是它是字符串数据类型。<strong>使用字符串执行算术运算是不可行的</strong>。因此，<strong>在执行算术运算之前，我们需要将时间字符串解析为等价的_Date_类型</strong>。</p><p>旧版Date API可以将_String_时间解析为_Date_。让我们看一个使用旧版Date API添加分钟的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenTimeStringUsingSimpleDateFormat_whenIncrementedWith10Minutes_thenResultShouldBeCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ParseException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> timeString <span class="token operator">=</span> <span class="token string">&quot;23:45&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">SimpleDateFormat</span> timeFormat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span><span class="token string">&quot;HH:mm&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Date</span> date <span class="token operator">=</span> timeFormat<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>timeString<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Calendar</span> cal <span class="token operator">=</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    cal<span class="token punctuation">.</span><span class="token function">setTime</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span><span class="token punctuation">;</span>
    cal<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MINUTE</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> timeFormat<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>cal<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;23:55&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们创建了一个带有时间值的_String_变量。然后，我们创建了_SimpleDateFormat_对象，将时间格式化为小时和分钟表示。</p><p>接下来，我们创建了一个_Date_对象，并在_timeFormat_上调用_parse()_，将_String_时间转换为_Date_对象以进行进一步操作。</p><p>此外，我们创建了一个_Calendar_对象，并在其上调用_setTime()_方法。这个方法接受我们之前创建的_Date_对象。接下来，我们在_Calendar_对象上调用_add()_方法，将时间增加_10_分钟。</p><p>最后，我们断言新的时间等于预期的时间。</p><h2 id="_3-使用日期时间api" tabindex="-1"><a class="header-anchor" href="#_3-使用日期时间api"><span>3. 使用日期时间API</span></a></h2><p>日期时间API可以轻松地将时间字符串解析为_LocalTime_。此外，<strong>它提供了使时间算术运算变得简单的方法</strong>。</p><p>以下是使用日期时间API给时间字符串添加分钟的示例代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenTimeStringUsingLocalTime_whenIncrementedWith10Minutes_thenResultShouldBeCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> timeString <span class="token operator">=</span> <span class="token string">&quot;23:45&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">LocalTime</span> time <span class="token operator">=</span> <span class="token class-name">LocalTime</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>timeString<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">LocalTime</span> newTime <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">plusMinutes</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> newTime<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;23:55&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个时间字符串，并将其传递给一个_LocalTime_对象。_LocalTime_类提供了各种方法来对时间执行算术运算。接下来，我们在_time_上调用_plusMinutes()_方法，以增加_10_分钟。</p><p>最后，我们断言新的时间等于预期的时间。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们学习了两种给时间字符串添加分钟的方法。与旧版Date API相比，日期时间API使时间操作和执行算术运算变得容易。</p><p>如常，示例的源代码可在GitHub上找到。</p>`,20),o=[p];function i(c,l){return s(),n("div",null,o)}const d=a(e,[["render",i],["__file","2024-06-30-Add Minutes to a Time String in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-Add%20Minutes%20to%20a%20Time%20String%20in%20Java.html","title":"Java中给时间字符串添加分钟","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Date and Time"],"tag":["Java","Date and Time","Legacy Date API","Date Time API"],"head":[["meta",{"name":"keywords","content":"Java, Date and Time, Legacy Date API, Date Time API"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-Add%20Minutes%20to%20a%20Time%20String%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中给时间字符串添加分钟"}],["meta",{"property":"og:description","content":"Java中给时间字符串添加分钟 Java提供了一个标准的API来处理日期和时间。日期时间API提供了一个方法，可以将字符串格式的时间解析为等价的_LocalTime_类型，以便进一步操作。 在本教程中，我们将探讨如何使用旧版Date API和日期时间API将分钟添加到字符串格式的时间。 2. 使用旧版Date API 时间字符串显示时间，但是它是字符串..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T11:52:50.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Date and Time"}],["meta",{"property":"article:tag","content":"Legacy Date API"}],["meta",{"property":"article:tag","content":"Date Time API"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T11:52:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中给时间字符串添加分钟\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T11:52:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中给时间字符串添加分钟 Java提供了一个标准的API来处理日期和时间。日期时间API提供了一个方法，可以将字符串格式的时间解析为等价的_LocalTime_类型，以便进一步操作。 在本教程中，我们将探讨如何使用旧版Date API和日期时间API将分钟添加到字符串格式的时间。 2. 使用旧版Date API 时间字符串显示时间，但是它是字符串..."},"headers":[{"level":2,"title":"2. 使用旧版Date API","slug":"_2-使用旧版date-api","link":"#_2-使用旧版date-api","children":[]},{"level":2,"title":"3. 使用日期时间API","slug":"_3-使用日期时间api","link":"#_3-使用日期时间api","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719748370000,"updatedTime":1719748370000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.32,"words":696},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-Add Minutes to a Time String in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Java提供了一个标准的API来处理日期和时间。<strong>日期时间API提供了一个方法，可以将字符串格式的时间解析为等价的_LocalTime_类型，以便进一步操作</strong>。</p>\\n<p>在本教程中，我们将探讨如何使用旧版Date API和日期时间API将分钟添加到字符串格式的时间。</p>\\n<h2>2. 使用旧版Date API</h2>\\n<p>时间字符串显示时间，但是它是字符串数据类型。<strong>使用字符串执行算术运算是不可行的</strong>。因此，<strong>在执行算术运算之前，我们需要将时间字符串解析为等价的_Date_类型</strong>。</p>","autoDesc":true}');export{d as comp,m as data};
