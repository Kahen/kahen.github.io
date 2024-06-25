import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as i,a as n}from"./app-DQn17T3r.js";const r={},t=n(`<hr><h1 id="java中将公历转换为回历日期" tabindex="-1"><a class="header-anchor" href="#java中将公历转换为回历日期"><span>Java中将公历转换为回历日期</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>公历和回历代表了两种不同的时间测量系统。</p><p>在本教程中，我们将探讨将公历日期转换为回历日期的各种方法。</p><h2 id="_2-公历与回历日历的区别" tabindex="-1"><a class="header-anchor" href="#_2-公历与回历日历的区别"><span>2. 公历与回历日历的区别</span></a></h2><p>让我们了解公历和回历日历之间的区别。公历遵循太阳年，由12个长度固定的月份组成。回历遵循月亮年，有12个月，每个月交替为29天和30天。</p><p>在回历中，每个月的长度取决于月亮绕地球完整旋转的周期。<strong>公历年包含365天或366天，而回历年有354天或355天。这意味着回历年比公历年大约短11天。</strong></p><h2 id="_3-使用-hijrahdate-类" tabindex="-1"><a class="header-anchor" href="#_3-使用-hijrahdate-类"><span>3. 使用 <em>HijrahDate</em> 类</span></a></h2><p>在这种方法中，我们将使用 <em>java.time.chrono</em> 包中的 <em>HijrahDate</em> 类。这个类在Java 8中引入，用于现代日期和时间操作。它提供了多种方法来创建和操作回历日期。</p><h3 id="_3-1-使用-from-方法" tabindex="-1"><a class="header-anchor" href="#_3-1-使用-from-方法"><span>3.1. 使用 <em>from()</em> 方法</span></a></h3><p>我们将使用 <em>HijrahDate</em> 类的 <em>from()</em> 方法将日期从公历转换为回历。这个方法接受一个代表公历日期的 <em>LocalDate</em> 对象作为输入，并返回一个 <em>HijrahDate</em> 对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public HijrahDate usingFromMethod(LocalDate gregorianDate) {
    return HijrahDate.from(gregorianDate);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们运行我们的测试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>void givenGregorianDate_whenUsingFromMethod_thenConvertHijriDate() {
    LocalDate gregorianDate = LocalDate.of(2013, 3, 31);
    HijrahDate hijriDate = GregorianToHijriDateConverter.usingFromMethod(gregorianDate);
    assertEquals(1434, hijriDate.get(ChronoField.YEAR));
    assertEquals(5, hijriDate.get(ChronoField.MONTH_OF_YEAR));
    assertEquals(19, hijriDate.get(ChronoField.DAY_OF_MONTH));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-使用-hijrahchronology-类" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-hijrahchronology-类"><span>3.2. 使用 <em>HijrahChronology</em> 类</span></a></h3><p>在这种方法中，我们将使用 <em>java.time.chrono.HijrahChronology</em> 类，它代表回历（伊斯兰）日历系统。</p><p><em>HijrahChoronology.INSTANCE</em> 方法创建回历日历系统的实例。我们将使用它来创建 <em>ChronoLocalDate</em> 对象，将公历日期转换为回历日期：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public HijrahDate usingHijrahChronology(LocalDate gregorianDate) {
    HijrahChronology hijrahChronology = HijrahChronology.INSTANCE;
    ChronoLocalDate hijriChronoLocalDate = hijrahChronology.date(gregorianDate);
    return HijrahDate.from(hijriChronoLocalDate);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们测试这种方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>void givenGregorianDate_whenUsingHijrahChronologyClass_thenConvertHijriDate() {
    LocalDate gregorianDate = LocalDate.of(2013, 3, 31);
    HijrahDate hijriDate = GregorianToHijriDateConverter.usingHijrahChronology(gregorianDate);
    assertEquals(1434, hijriDate.get(ChronoField.YEAR));
    assertEquals(5, hijriDate.get(ChronoField.MONTH_OF_YEAR));
    assertEquals(19, hijriDate.get(ChronoField.DAY_OF_MONTH));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用-joda-timе" tabindex="-1"><a class="header-anchor" href="#_4-使用-joda-timе"><span>4. 使用 <em>Joda-Timе</em></span></a></h2><p><em>Joda-Timе</em> 是Java的一个流行的日期和时间操作库，提供了一个更直观的接口，作为标准Java日期和时间API的替代品。</p><p>在 <em>Joda-Time</em> 中，<em>IslamicChronology</em> 类代表回历（伊斯兰）日历。我们将使用 <em>DateTime’s withChronology()</em> 方法与 <em>IslamicChornology</em> 实例来将公历日期转换为回历日期：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public DateTime usingJodaDate(DateTime gregorianDate) {
    return gregorianDate.withChronology(IslamicChronology.getInstance());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们测试这种方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>void givenGregorianDate_whenUsingJodaDate_thenConvertHijriDate() {
    DateTime gregorianDate = new DateTime(2013, 3, 31, 0, 0, 0);
    DateTime hijriDate = GregorianToHijriDateConverter.usingJodaDate(gregorianDate);
    assertEquals(1434, hijriDate.getYear());
    assertEquals(5, hijriDate.getMonthOfYear());
    assertEquals(19, hijriDate.getDayOfMonth());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用-ummalquracalendar-类" tabindex="-1"><a class="header-anchor" href="#_5-使用-ummalquracalendar-类"><span>5. 使用 <em>UmmalquraCalendar</em> 类</span></a></h2><p><em>ummalqura-calendar</em> 库有一个 <em>UmmalquraCalendar</em> 类，它是从Java 8派生的。要包含 <em>ummalqura-calendar</em> 库，我们需要添加以下依赖：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`com.github.msarhan\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`ummalqura-calendar\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`2.0.2\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将使用它的 <em>setTime()</em> 方法来执行公历到回历日期的转换：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public UmmalquraCalendar usingUmmalquraCalendar(GregorianCalendar gregorianCalendar) throws ParseException {
    UmmalquraCalendar hijriCalendar = new UmmalquraCalendar();
    hijriCalendar.setTime(gregorianCalendar.getTime());
    return hijriCalendar;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们测试这种方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>void givenGregorianDate_whenUsingUmmalquraCalendar_thenConvertHijriDate() throws ParseException {
    GregorianCalendar gregorianCalenar = new GregorianCalendar(2013, Calendar.MARCH, 31);
    UmmalquraCalendar ummalquraCalendar = GregorianToHijriDateConverter.usingUmmalquraCalendar(gregorianCalenar);
    assertEquals(1434, ummalquraCalendar.get(Calendar.YEAR));
    assertEquals(5, ummalquraCalendar.get(Calendar.MONTH) + 1);
    assertEquals(19, ummalquraCalendar.get(Calendar.DAY_OF_MONTH));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本教程中，我们讨论了将公历日期转换为回历日期的多种方法。</p><p>正如往常一样，示例中使用的代码可以在GitHub上找到。</p>`,37),l=[t];function d(s,o){return i(),a("div",null,l)}const h=e(r,[["render",d],["__file","2024-06-23-Convert Gregorian to Hijri Date in Java.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Convert%20Gregorian%20to%20Hijri%20Date%20in%20Java.html","title":"Java中将公历转换为回历日期","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Java","日期转换"],"tag":["Gregorian","Hijri"],"head":[["meta",{"name":"keywords","content":"Java, 日期转换, Gregorian, Hijri"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Convert%20Gregorian%20to%20Hijri%20Date%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将公历转换为回历日期"}],["meta",{"property":"og:description","content":"Java中将公历转换为回历日期 1. 概述 公历和回历代表了两种不同的时间测量系统。 在本教程中，我们将探讨将公历日期转换为回历日期的各种方法。 2. 公历与回历日历的区别 让我们了解公历和回历日历之间的区别。公历遵循太阳年，由12个长度固定的月份组成。回历遵循月亮年，有12个月，每个月交替为29天和30天。 在回历中，每个月的长度取决于月亮绕地球完整..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T10:49:40.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Gregorian"}],["meta",{"property":"article:tag","content":"Hijri"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T10:49:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将公历转换为回历日期\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T10:49:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将公历转换为回历日期 1. 概述 公历和回历代表了两种不同的时间测量系统。 在本教程中，我们将探讨将公历日期转换为回历日期的各种方法。 2. 公历与回历日历的区别 让我们了解公历和回历日历之间的区别。公历遵循太阳年，由12个长度固定的月份组成。回历遵循月亮年，有12个月，每个月交替为29天和30天。 在回历中，每个月的长度取决于月亮绕地球完整..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 公历与回历日历的区别","slug":"_2-公历与回历日历的区别","link":"#_2-公历与回历日历的区别","children":[]},{"level":2,"title":"3. 使用 HijrahDate 类","slug":"_3-使用-hijrahdate-类","link":"#_3-使用-hijrahdate-类","children":[{"level":3,"title":"3.1. 使用 from() 方法","slug":"_3-1-使用-from-方法","link":"#_3-1-使用-from-方法","children":[]},{"level":3,"title":"3.2. 使用 HijrahChronology 类","slug":"_3-2-使用-hijrahchronology-类","link":"#_3-2-使用-hijrahchronology-类","children":[]}]},{"level":2,"title":"4. 使用 Joda-Timе","slug":"_4-使用-joda-timе","link":"#_4-使用-joda-timе","children":[]},{"level":2,"title":"5. 使用 UmmalquraCalendar 类","slug":"_5-使用-ummalquracalendar-类","link":"#_5-使用-ummalquracalendar-类","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719139780000,"updatedTime":1719139780000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.71,"words":812},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Convert Gregorian to Hijri Date in Java.md","localizedDate":"2024年6月23日","excerpt":"<hr>\\n<h1>Java中将公历转换为回历日期</h1>\\n<h2>1. 概述</h2>\\n<p>公历和回历代表了两种不同的时间测量系统。</p>\\n<p>在本教程中，我们将探讨将公历日期转换为回历日期的各种方法。</p>\\n<h2>2. 公历与回历日历的区别</h2>\\n<p>让我们了解公历和回历日历之间的区别。公历遵循太阳年，由12个长度固定的月份组成。回历遵循月亮年，有12个月，每个月交替为29天和30天。</p>\\n<p>在回历中，每个月的长度取决于月亮绕地球完整旋转的周期。<strong>公历年包含365天或366天，而回历年有354天或355天。这意味着回历年比公历年大约短11天。</strong></p>","autoDesc":true}');export{h as comp,v as data};
