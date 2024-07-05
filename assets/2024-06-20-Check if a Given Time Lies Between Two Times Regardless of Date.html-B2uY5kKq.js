import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as i}from"./app-B_xdonR7.js";const n={},r=i(`<h1 id="检查给定时间是否在两个时间之间-不论日期" tabindex="-1"><a class="header-anchor" href="#检查给定时间是否在两个时间之间-不论日期"><span>检查给定时间是否在两个时间之间，不论日期</span></a></h1><p>在Java中，有多种方法可以确定一个特定时间是否在两个时间之间，而不考虑日期。</p><p><strong>在本教程中，我们将探讨几种可能的实现方式。</strong></p><h2 id="_2-使用-isafter-和-isbefore-方法" tabindex="-1"><a class="header-anchor" href="#_2-使用-isafter-和-isbefore-方法"><span>2. 使用 <em>isAfter()</em> 和 <em>isBefore()</em> 方法</span></a></h2><p>Java 8在_java.time_包中引入了_LocalTime_类，提供了方便的方法来处理不考虑日期的时间：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>LocalTime startTime = LocalTime.parse(&quot;09:00:00&quot;);
LocalTime endTime = LocalTime.parse(&quot;17:00:00&quot;);
LocalTime targetTime = LocalTime.parse(&quot;12:30:00&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们使用特定的时间值初始化三个_LocalTime_变量，<em>startTime</em>、<em>endTime_和_targetTime</em>。这些行基本上设置了测试方法中的开始时间、结束时间和目标时间。</p><p><strong>_LocalTime.parse(&quot;09:00:00&quot;)_将字符串“<em>09:00:00</em>”解析为表示上午9:00的_LocalTime_对象。类似地，“<em>17:00:00</em>”表示下午5:00，“<em>12:30:00</em>”表示中午12:30。</strong></p><p>现在，我们来测试这种方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenLocalTime_whenUsingIsAfterIsBefore_thenTimeIsBetween() {
    assertTrue(!targetTime.isBefore(startTime) &amp;&amp; !targetTime.isAfter(endTime));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法使用_LocalTime_类的_isAfter_()和_isBefore()_方法来测试给定的_targetTime_是否落在指定的_startTime_和_endTime_之间。我们使用_assetTrue()_方法来验证_targetTime_既不在_startTime_之前也不在_endTime_之后。</p><h2 id="_3-使用-compareto-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用-compareto-方法"><span>3. 使用 <em>compareTo()</em> 方法</span></a></h2><p>另一种方法是使用_compareTo()_方法，它比较两个_LocalTime_实例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenLocalTime_whenUsingCompareTo_thenTimeIsBetween() {
    assertTrue(targetTime.compareTo(startTime) &gt;= 0 &amp;&amp; targetTime.compareTo(endTime) \`&lt;= 0);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，表达式_targetTime.compareTo(startTime) &gt;\`= 0 &amp;&amp; targetTime.compareTo(endTime) &lt;= 0_使用逻辑与(&amp;&amp;)组合了两个比较。它检查_targetTime_是否大于或等于_startTime_并且小于或等于_endTime_。</p><p>这个复合条件确保_targetTime_落在由_startTime_和_endTime_定义的时间范围内，包括边界。<strong>如果两个单独的比较都为真，则整个表达式的结果为真，表明目标时间在开始和结束时间之间，或与它们重合。</strong></p><h2 id="_4-使用-after-和-before-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用-after-和-before-方法"><span>4. 使用 <em>after()</em> 和 <em>before()</em> 方法</span></a></h2><p>在这种方法中，我们将使用遗留的_Date_和_Calendar_对象来表示和比较时间。<strong>尽管这种方法被认为不如Java 8的_LocalTime_方法方便，但它仍然适用于需要与旧代码库或系统兼容的场景：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenDate_whenUsingAfterBefore_thenTimeIsBetween() {
    Calendar startCalendar = Calendar.getInstance();
    startCalendar.set(Calendar.HOUR_OF_DAY, 9);
    startCalendar.set(Calendar.MINUTE, 0);
    Date startTime = startCalendar.getTime();

    Calendar endCalendar = Calendar.getInstance();
    endCalendar.set(Calendar.HOUR_OF_DAY, 17);
    endCalendar.set(Calendar.MINUTE, 0);
    Date endTime = endCalendar.getTime();

    Calendar targetCalendar = Calendar.getInstance();
    targetCalendar.set(Calendar.HOUR_OF_DAY, 12);
    targetCalendar.set(Calendar.MINUTE, 30);
    Date targetTime = targetCalendar.getTime();

    assertTrue(!targetTime.before(startTime) &amp;&amp; !targetTime.after(endTime));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们使用_Calendar.getInstance()<em>方法创建_startTime</em>、_endTime_和_targetTime_的_Calendar_实例，该方法返回一个初始化为当前日期和时间的_Calendar_对象。</p><p>一旦_Calendar_对象设置好，我们就从它们各自的_Calendar_实例中提取表示开始、结束和目标时间的_Date_对象。</p><p>有了_Date_对象后，我们通过使用_Date_类的_before()_和_after()<em>方法来比较_targetTime_与_startTime_和_endTime</em>。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>总之，Java提供了多种方法，包括现代的_LocalTime_方法、遗留的_Date_功能和正则表达式，以准确地确定特定时间是否落在定义的边界内，满足多样化的开发需求。</p><p>如常，相关的源代码可以在GitHub上找到。</p>`,25),s=[r];function l(m,d){return t(),a("div",null,s)}const _=e(n,[["render",l],["__file","2024-06-20-Check if a Given Time Lies Between Two Times Regardless of Date.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Check%20if%20a%20Given%20Time%20Lies%20Between%20Two%20Times%20Regardless%20of%20Date.html","title":"检查给定时间是否在两个时间之间，不论日期","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Java","时间处理"],"tag":["Java 8","LocalTime","Date","Calendar"],"head":[["meta",{"name":"keywords","content":"Java, 时间比较, LocalTime, Date, Calendar"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Check%20if%20a%20Given%20Time%20Lies%20Between%20Two%20Times%20Regardless%20of%20Date.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"检查给定时间是否在两个时间之间，不论日期"}],["meta",{"property":"og:description","content":"检查给定时间是否在两个时间之间，不论日期 在Java中，有多种方法可以确定一个特定时间是否在两个时间之间，而不考虑日期。 在本教程中，我们将探讨几种可能的实现方式。 2. 使用 isAfter() 和 isBefore() 方法 Java 8在_java.time_包中引入了_LocalTime_类，提供了方便的方法来处理不考虑日期的时间： 这里，我们..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:tag","content":"LocalTime"}],["meta",{"property":"article:tag","content":"Date"}],["meta",{"property":"article:tag","content":"Calendar"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"检查给定时间是否在两个时间之间，不论日期\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"检查给定时间是否在两个时间之间，不论日期 在Java中，有多种方法可以确定一个特定时间是否在两个时间之间，而不考虑日期。 在本教程中，我们将探讨几种可能的实现方式。 2. 使用 isAfter() 和 isBefore() 方法 Java 8在_java.time_包中引入了_LocalTime_类，提供了方便的方法来处理不考虑日期的时间： 这里，我们..."},"headers":[{"level":2,"title":"2. 使用 isAfter() 和 isBefore() 方法","slug":"_2-使用-isafter-和-isbefore-方法","link":"#_2-使用-isafter-和-isbefore-方法","children":[]},{"level":2,"title":"3. 使用 compareTo() 方法","slug":"_3-使用-compareto-方法","link":"#_3-使用-compareto-方法","children":[]},{"level":2,"title":"4. 使用 after() 和 before() 方法","slug":"_4-使用-after-和-before-方法","link":"#_4-使用-after-和-before-方法","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.65,"words":795},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Check if a Given Time Lies Between Two Times Regardless of Date.md","localizedDate":"2024年6月21日","excerpt":"\\n<p>在Java中，有多种方法可以确定一个特定时间是否在两个时间之间，而不考虑日期。</p>\\n<p><strong>在本教程中，我们将探讨几种可能的实现方式。</strong></p>\\n<h2>2. 使用 <em>isAfter()</em> 和 <em>isBefore()</em> 方法</h2>\\n<p>Java 8在_java.time_包中引入了_LocalTime_类，提供了方便的方法来处理不考虑日期的时间：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>LocalTime startTime = LocalTime.parse(\\"09:00:00\\");\\nLocalTime endTime = LocalTime.parse(\\"17:00:00\\");\\nLocalTime targetTime = LocalTime.parse(\\"12:30:00\\");\\n</code></pre></div>","autoDesc":true}');export{_ as comp,p as data};
