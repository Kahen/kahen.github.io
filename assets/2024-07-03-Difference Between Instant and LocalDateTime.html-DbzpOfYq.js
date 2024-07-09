import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-DRFG6C5y.js";const s={},i=n(`<h1 id="java中instant和localdatetime的区别" tabindex="-1"><a class="header-anchor" href="#java中instant和localdatetime的区别"><span>Java中Instant和LocalDateTime的区别</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Java 8引入了一组新的日期和时间类。了解何时使用哪一个可能会令人困惑。在本教程中，我们将探讨Instant和LocalDateTime类之间的区别。</p><h2 id="_2-instant类" tabindex="-1"><a class="header-anchor" href="#_2-instant类"><span>2. Instant类</span></a></h2><p><strong>将Instant类想象成UTC时区中的一个单一时间点是最简单的方式</strong>。如果我们将时间想象成一条线，Instant就代表线上的一个点。</p><p>在内部，Instant类实际上只是计算相对于1970年1月1日标准Unix纪元时间00:00:00的秒数和纳秒数。这个时间点由0秒和0纳秒表示，其他一切都是从它开始的偏移。</p><p>通过存储相对于这个特定时间点的秒数和纳秒数，它允许类存储正负偏移。换句话说，<strong>Instant类可以表示纪元时间之前和之后的时间</strong>。</p><h3 id="_2-1-使用instant" tabindex="-1"><a class="header-anchor" href="#_2-1-使用instant"><span>2.1. 使用Instant</span></a></h3><p>让我们看看如何使用Instant类。首先，它提供了各种静态方法，用于快速计算时间线上的瞬间。</p><p>例如，Instant.now()方法给我们提供了一个Instant对象，代表当前的UTC时间。我们还可以使用Instant进行一些基本的算术运算：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Instant twelveHoursFromNow = Instant.now().plus(12, ChronoUnit.HOURS);
Instant oneWeekAgo = Instant.now().minus(7, ChronoUnit.DAYS);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们可以比较两个Instant：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Instant instant1 = Instant.now();
Instant instant2 = instant1.plus(1, ChronoUnit.SECONDS);
assertTrue(instant1.isBefore(instant2));
assertFalse(instant1.isAfter(instant2));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-限制" tabindex="-1"><a class="header-anchor" href="#_2-2-限制"><span>2.2. 限制</span></a></h3><p>Instant类简单明了，但也有一些缺点。首先，它<strong>不完全符合考虑闰秒的其他标准</strong>。它不是在一天的末尾添加或删除一秒钟，而是使用自己的时间尺度，将那一秒钟分散在那一天的最后1000秒内。</p><p>这样做基本上可以认为每一天都有确切的86400秒。然而，这不是其他时间标准的工作方式，所以<strong>Instant不是那么精确</strong>。</p><p>此外，因为Instant只是从固定纪元时间存储秒数和纳秒数，<strong>它在它能表示的时间上是有限的</strong>。具体来说，Instant中的秒数使用long数据类型存储。这意味着有一个限制，我们可以用Instant表示Unix纪元时间之前和之后的距离。</p><p>幸运的是，最小值和最大值大约是10亿年前和10亿年后，所以这个限制可能不会影响大多数应用程序。</p><h2 id="_3-localdatetime类" tabindex="-1"><a class="header-anchor" href="#_3-localdatetime类"><span>3. LocalDateTime类</span></a></h2><p>现在让我们看看LocalDateTime类。首先需要知道的是，尽管它的名字中有&quot;Local&quot;，但它<strong>并不与任何时区绑定</strong>。从本质上讲，&quot;Local&quot;前缀意味着日期和时间在我们所处的任何地区。</p><p>我们可以将其想象为简单地设置为一年中的特定日子的日历，以及一天中某个特定时间的时钟。事实上，底层的日期和时间值分别使用LocalDate和LocalTime类型存储。这两个值都独立于任何地区存在。它们不像Instant类那样是任何特定时间线的一部分。</p><p><strong>LocalDateTime类非常适合表示无论时区如何都会发生的事件</strong>。例如，元旦总是在1月1日午夜。这个确切的时间最终会在每个时区发生，但显然不是在同一时间。当伦敦的人们倒数新年时，洛杉矶的人们正在愉快地度过他们的下午。</p><p>因此，单独使用<strong>LocalDateTime类并不适用于需要时区的场景</strong>。想象一下，你要求一个不同时区的同事在2023年6月15日下午3点见面。或者想象一下设置一个提醒在下午5点给朋友打电话，然后飞越国家。如果没有时区的知识，我们很可能会错过与同事的会议，忘记给朋友打电话。</p><h3 id="_3-1-使用localdatetime" tabindex="-1"><a class="header-anchor" href="#_3-1-使用localdatetime"><span>3.1. 使用LocalDateTime</span></a></h3><p>让我们看一些使用LocalDateTime类的例子。我们可以使用LocalDateTime.now()方法轻松地计算默认时区的当前日期和时间。</p><p>就像Instant一样，还有许多静态方法让我们提供各种日期和时间值的组合：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>LocalDateTime.of(2023, 6, 1, 12, 0);
LocalDateTime.of(2023, 6, 1, 12, 0, 0);
LocalDateTime.of(2023, 6, 1, 12, 0, 0, 0);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还可以使用LocalDateTime进行基本的算术运算：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>LocalDateTime tomorrow = LocalDateTime.now().plus(1, ChronoUnit.DAYS);
LocalDateTime oneYearAgo = LocalDateTime.now().minus(1, ChronoUnit.YEARS);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们可以比较两个LocalDateTime对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>LocalDateTime now = LocalDateTime.now();
LocalDateTime y2k = LocalDateTime.of(2000, 1, 1, 0, 0);
assertTrue(now.isAfter(y2k));
assertTrue(y2k.isBefore(now));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-其他java日期和时间类" tabindex="-1"><a class="header-anchor" href="#_4-其他java日期和时间类"><span>4. 其他Java日期和时间类</span></a></h2><p>如果我们需要处理时区怎么办？我们在上面看到Instant和LocalDateTime都不适合这个，但幸运的是<strong>Java提供了一些其他类来处理时区</strong>。下面我们将简要看一下其中的一些。</p><h3 id="_4-1-zoneoffset" tabindex="-1"><a class="header-anchor" href="#_4-1-zoneoffset"><span>4.1. ZoneOffset</span></a></h3><p>ZoneOffset类表示在标准UTC区域之前或之后的偏移量，以小时、分钟和秒为单位。<strong>它只是偏移信息，没有其他</strong>。没有名称，没有夏令时知识等。</p><h3 id="_4-2-zoneid" tabindex="-1"><a class="header-anchor" href="#_4-2-zoneid"><span>4.2. ZoneId</span></a></h3><p>ZoneId类比ZoneOffset类要详细得多。虽然它也定义了UTC区域的小时、分钟和秒，但它包含更多信息，如名称、唯一ID、夏令时规则等。</p><p>特定时区的规则由当地政府设定，因此变化相当频繁。因此，ZoneId类封装了每个区域的所有特定规则，以及任何变化的历史。</p><h3 id="_4-3-zoneddatetime" tabindex="-1"><a class="header-anchor" href="#_4-3-zoneddatetime"><span>4.3. ZonedDateTime</span></a></h3><p>最后，我们得到了ZonedDateTime类。我们可以将这个类想象成带有ZoneId信息的Instant。虽然我们应该始终使用一致的区域为所有用户存储日期和时间值，但<strong>ZonedDateTime类对于在特定区域为个别用户显示这些值非常有用</strong>。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>Java 8提供了一组丰富的API，这些API远远优于旧的Date类来处理日期和时间。然而，知道对于特定用例使用哪一个并不总是显而易见的。</p><p>在本文中，我们查看了两个新类，Instant和LocalDateTime。虽然它们具有相似的API，但它们非常不同。我们看到<strong>Instant只是Unix纪元时间的正或负偏移，并且始终与UTC时区绑定</strong>。我们还看到<strong>LocalDateTime只是一个日历和时钟，没有任何时区信息</strong>。</p><p>两者都可以用于不同的事情，但如果我们需要时区信息，它们单独任何一个都不够。</p>`,44),o=[i];function l(r,d){return a(),t("div",null,o)}const m=e(s,[["render",l],["__file","2024-07-03-Difference Between Instant and LocalDateTime.html.vue"]]),h=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Difference%20Between%20Instant%20and%20LocalDateTime.html","title":"Java中Instant和LocalDateTime的区别","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Date and Time"],"tag":["Instant","LocalDateTime"],"head":[["meta",{"name":"keywords","content":"Java, Instant, LocalDateTime, date and time"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Difference%20Between%20Instant%20and%20LocalDateTime.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中Instant和LocalDateTime的区别"}],["meta",{"property":"og:description","content":"Java中Instant和LocalDateTime的区别 1. 引言 Java 8引入了一组新的日期和时间类。了解何时使用哪一个可能会令人困惑。在本教程中，我们将探讨Instant和LocalDateTime类之间的区别。 2. Instant类 将Instant类想象成UTC时区中的一个单一时间点是最简单的方式。如果我们将时间想象成一条线，Inst..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T21:00:37.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Instant"}],["meta",{"property":"article:tag","content":"LocalDateTime"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T21:00:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中Instant和LocalDateTime的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T21:00:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中Instant和LocalDateTime的区别 1. 引言 Java 8引入了一组新的日期和时间类。了解何时使用哪一个可能会令人困惑。在本教程中，我们将探讨Instant和LocalDateTime类之间的区别。 2. Instant类 将Instant类想象成UTC时区中的一个单一时间点是最简单的方式。如果我们将时间想象成一条线，Inst..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. Instant类","slug":"_2-instant类","link":"#_2-instant类","children":[{"level":3,"title":"2.1. 使用Instant","slug":"_2-1-使用instant","link":"#_2-1-使用instant","children":[]},{"level":3,"title":"2.2. 限制","slug":"_2-2-限制","link":"#_2-2-限制","children":[]}]},{"level":2,"title":"3. LocalDateTime类","slug":"_3-localdatetime类","link":"#_3-localdatetime类","children":[{"level":3,"title":"3.1. 使用LocalDateTime","slug":"_3-1-使用localdatetime","link":"#_3-1-使用localdatetime","children":[]}]},{"level":2,"title":"4. 其他Java日期和时间类","slug":"_4-其他java日期和时间类","link":"#_4-其他java日期和时间类","children":[{"level":3,"title":"4.1. ZoneOffset","slug":"_4-1-zoneoffset","link":"#_4-1-zoneoffset","children":[]},{"level":3,"title":"4.2. ZoneId","slug":"_4-2-zoneid","link":"#_4-2-zoneid","children":[]},{"level":3,"title":"4.3. ZonedDateTime","slug":"_4-3-zoneddatetime","link":"#_4-3-zoneddatetime","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720040437000,"updatedTime":1720040437000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.39,"words":1617},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Difference Between Instant and LocalDateTime.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>Java 8引入了一组新的日期和时间类。了解何时使用哪一个可能会令人困惑。在本教程中，我们将探讨Instant和LocalDateTime类之间的区别。</p>\\n<h2>2. Instant类</h2>\\n<p><strong>将Instant类想象成UTC时区中的一个单一时间点是最简单的方式</strong>。如果我们将时间想象成一条线，Instant就代表线上的一个点。</p>\\n<p>在内部，Instant类实际上只是计算相对于1970年1月1日标准Unix纪元时间00:00:00的秒数和纳秒数。这个时间点由0秒和0纳秒表示，其他一切都是从它开始的偏移。</p>","autoDesc":true}');export{m as comp,h as data};
