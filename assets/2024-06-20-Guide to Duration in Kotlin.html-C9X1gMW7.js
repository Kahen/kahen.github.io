import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as i,a as t}from"./app-Ckd2YV4o.js";const a={},s=t(`<h1 id="kotlin中duration类的指南" tabindex="-1"><a class="header-anchor" href="#kotlin中duration类的指南"><span>Kotlin中Duration类的指南</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在构建软件应用程序时，处理时间间隔和持续时间是一项常见任务。Kotlin通过_Duration_类提供了一个强大的API来处理时间管理的这一特定方面。</p><p>在本教程中，我们将探讨_Duration_类以及它如何使Kotlin中的时间和持续时间操作变得高效且容易。</p><h2 id="_2-duration-是什么" tabindex="-1"><a class="header-anchor" href="#_2-duration-是什么"><span>2. _Duration_是什么？</span></a></h2><p><strong>_Duration_表示一个特定的时间量，可以是正数、负数、零甚至无限大。</strong></p><p>这些间隔通过_DurationUnit_枚举指定，支持类型_DAYS_, <em>HOURS</em>, <em>MINUTES</em>, <em>SECONDS</em>, <em>MILLISECONDS</em>, <em>MICROSECONDS_和_NANOSECONDS</em>。因此，即使在指代周和月时，超过一天的持续时间也以天为单位表示。</p><p>_Duration_类便于创建、操作、聚合和转换持续时间。</p><p>**与具体时刻的日期和时间不同，持续时间表示这些时刻之间经过的时间量。**例如，_Duration.DAYS_表示以整天为单位的时间长度，每天代表24小时。它侧重于经过的时间本身，而不是特定的日期。</p><p>Kotlin中的_Duration_类在调度任务、管理超时、测量经过时间和执行基于时间的精确高效计算等场景中具有实际应用。</p><h2 id="_3-创建持续时间" tabindex="-1"><a class="header-anchor" href="#_3-创建持续时间"><span>3. 创建持续时间</span></a></h2><p>Kotlin提供了多种创建持续时间的方法。让我们在这一部分看看不同的方法。</p><h3 id="_3-1-使用伴生对象" tabindex="-1"><a class="header-anchor" href="#_3-1-使用伴生对象"><span>3.1. 使用伴生对象</span></a></h3><p>Kotlin在_Duration_伴生对象中定义了简单的扩展函数，可以轻松地从_Int_, _Long_和_Double_创建持续时间。让我们看看如何使用它们：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>val tenMinutes = 10.minutes
val tenSeconds = 10.seconds
val tenHours = 10.hours
val tenDays = 10.days
val tenMillis = 10.milliseconds
val tenMicros = 10.microseconds
val tenNanos = 10.nanoseconds
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们还可以创建零和无限的持续时间：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>val zero = Duration.ZERO
val infinite = Duration.INFINITE
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>无限持续时间对于配置永不过期的超时值非常有用。</strong></p><h3 id="_3-2-使用-toduration" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-toduration"><span>3.2. 使用_toDuration()_</span></a></h3><p>另一种创建持续时间的方法是使用_Int_, _Long_和_Double_上的_toDuration()_扩展函数，通过传递所需的单位。让我们看看用法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>val tenMinutes = 10.toDuration(DurationUnit.MINUTES)
val tenSeconds = 10.toDuration(DurationUnit.SECONDS)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这个函数根据提供的数字和由_DurationUnit_枚举值指定的单位生成持续时间。</p><h3 id="_3-3-从iso8601持续时间格式" tabindex="-1"><a class="header-anchor" href="#_3-3-从iso8601持续时间格式"><span>3.3. 从ISO8601持续时间格式</span></a></h3><p>**我们还可以从ISO8601持续时间格式字符串创建持续时间。**在此格式中，持续时间可以使用周期指示符及其相应的值来表示。例如，十天可以表示为_P10D_，其中_P_标记周期的开始，而_10D_表示十天。同样，十分钟可以表示为_PT10M_。在这里，_T_表示时间部分的开始，而_10M_表示十分钟。由于这种表示中没有涉及天，因此在_P_和_T_之间没有值。</p><p>让我们看看如何在Kotlin中使用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>val tenMinDuration = Duration.parseIsoString(&quot;PT10M&quot;)
val tenDays = Duration.parseIsoString(&quot;P10D&quot;)
val tenDaysAndOneHour = Duration.parseIsoString(&quot;P10DT1H&quot;)
val tenDaysWithAllUnits = Duration.parseIsoString(&quot;P10DT1H5M7S&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些示例展示了如何使用_parseIsoString()_方法将不同的ISO8601时间表达式转换为_Duration_对象。</p><p><strong>需要注意的是，在Kotlin中，天的最大周期指示符由_D_表示，尽管ISO8601标准还支持_Y_表示年和_M_表示月。</strong></p><h2 id="_4-duration-操作" tabindex="-1"><a class="header-anchor" href="#_4-duration-操作"><span>4. _Duration_操作</span></a></h2><p>_Duration_提供了多种操作符，用于与持续时间实例交互。</p><h3 id="_4-1-持续时间的转换" tabindex="-1"><a class="header-anchor" href="#_4-1-持续时间的转换"><span>4.1. 持续时间的转换</span></a></h3><p>我们可以使用诸如_inWholeSeconds()_, _inWholeMinutes()_等方法从_Duration_中以各种单位检索值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>val tenMinutes = 10.minutes
assertEquals(10L, tenMinutes.inWholeMinutes)
assertEquals(600L, tenMinutes.inWholeSeconds)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，我们可以使用_toIsoString()_方法将_Duration_转换为ISO8601字符串格式：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>val tenSeconds = 10.seconds
assertEquals(&quot;PT10S&quot;, tenSeconds.toIsoString())
val tenDaysAndOneHour = Duration.parseIsoString(&quot;P10DT1H&quot;)
assertEquals(&quot;PT241H&quot;, tenDaysAndOneHour.toIsoString())
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，值得注意的是，这种方法总是使用转换值中的最大小时数。天数被转换为小时，然后使用，因此省略了_D_组件。因此，当使用_toIsoString()_时，该方法将_10D_转换为240小时。</p><p>此外，我们可以将持续时间的组件分解为其单位：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>val seventyMinutes = 70.minutes
val asStr = seventyMinutes.toComponents { hrs, min, sec, nanos -&gt; &quot;\${hrs}:\${min}&quot; }
assertEquals(&quot;1:10&quot;, asStr)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，_toComponents()_方法将持续时间分解为小时、分钟、秒和纳秒，便于轻松使用每个组件。此外，还有多个_toComponents()_方法可用，每种方法返回不同的单位，增加了多样性。</p><h3 id="_4-2-算术运算" tabindex="-1"><a class="header-anchor" href="#_4-2-算术运算"><span>4.2. 算术运算</span></a></h3><p>就像数值一样，我们可以组合多个_Duration_实例。不同类型的持续时间会自动处理并正确转换。</p><p>让我们看一些示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>val tenMinutes = 10.minutes
val fiveHours = 5.hours
val fiveHoursPlusTenMin = tenMinutes + fiveHours
assertEquals(310L, fiveHoursPlusTenMin.inWholeMinutes)
val fiveHoursMinusTenMin = fiveHours - tenMinutes
assertEquals(290L, fiveHoursMinusTenMin.inWholeMinutes)
val timesMinutes = tenMinutes.times(3)
assertEquals(30L, timesMinutes.inWholeMinutes)
val sixSecs = tenMinutes.div(100)
assertEquals(6, sixSecs.inWholeSeconds)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们可以使用函数_plus()_和_minus()<em>而不是运算符</em>+<em>和</em>–_来实现相同的结果。</p><p>这些统一的操作大大简化了处理不同单位持续时间的过程。</p><h3 id="_4-3-比较持续时间" tabindex="-1"><a class="header-anchor" href="#_4-3-比较持续时间"><span>4.3. 比较持续时间</span></a></h3><p>Kotlin提供了多种方法来比较不同的持续时间。让我们看看比较持续时间的不同方式：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>val tenMinutes = 10.minutes
val fiveHours = 5.hours
assertTrue { fiveHours &gt; tenMinutes }
assertFalse { fiveHours &lt; tenMinutes }
assertTrue { fiveHours == 300.minutes }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的示例展示了不同的比较_Duration_实例的方式。</p><p>此外，Kotlin还提供了一系列方法来验证不同的条件，包括_isInfinite()_, <em>isNegative()</em>, _isFinite()_等。</p><h3 id="_4-4-两个-datetime-之间的持续时间" tabindex="-1"><a class="header-anchor" href="#_4-4-两个-datetime-之间的持续时间"><span>4.4. 两个_DateTime_之间的持续时间</span></a></h3><p>我们还可以从两个_DateTime_实例创建_Duration_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>val datetime1 = LocalDateTime.now()
val datetime2 = LocalDateTime.now().minusDays(1).minusHours(1)
val duration = java.time.Duration.between(datetime2, datetime1).toKotlinDuration()
val expectedDuration = 25.hours
assertEquals(expectedDuration, duration)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用_java.time_包中的_Duration_ API创建持续时间值。然而，这个实例来自Java API。我们可以使用扩展函数_toKotlinDuration()_将其转换为Kotlin <em>Duration</em>。</p><h3 id="_4-5-一些实际用途" tabindex="-1"><a class="header-anchor" href="#_4-5-一些实际用途"><span>4.5. 一些实际用途</span></a></h3><p>_Duration_类在构建软件时有许多实际应用。</p><p>我们可以测量一个方法或代码块执行所需的时间：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@ExperimentalTime
fun main() {
    val elapsedTime = kotlin.time.measureTime {
        Thread.sleep(510)
    }
    println(elapsedTime)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，_elapsedTime_变量捕获了代码块执行所需的持续时间。</p><p>同样，协程使用持续时间值来指定延迟执行：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@OptIn(ExperimentalTime::class)
fun main() = runBlocking {
    val delayDuration = 1000.milliseconds
    println(&quot;Task will execute after a delay of $delayDuration&quot;)
    delay(delayDuration)
    println(&quot;Task executed&quot;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，我们使用_delay()_函数通过传递指定的持续时间值来延迟执行。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了Kotlin中的_Duration_类及其各种操作。</p><p>我们讨论了不同的创建和解析_Duration_的方式。此外，《Duration_类提供了各种操作，如加法、减法、比较和转换单位。无论是进行计算、调度任务还是管理超时，Kotlin的_Duration_类都提供了简化时间管理任务的基本工具。</p><p>如常，本教程中使用的示例代码可在GitHub上找到。</p>`,66),l=[s];function r(d,o){return i(),n("div",null,l)}const _=e(a,[["render",r],["__file","2024-06-20-Guide to Duration in Kotlin.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Guide%20to%20Duration%20in%20Kotlin.html","title":"Kotlin中Duration类的指南","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Kotlin","Duration"],"tag":["Duration","Time Management"],"head":[["meta",{"name":"keywords","content":"Kotlin, Duration, Time Management, Tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Guide%20to%20Duration%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中Duration类的指南"}],["meta",{"property":"og:description","content":"Kotlin中Duration类的指南 1. 引言 在构建软件应用程序时，处理时间间隔和持续时间是一项常见任务。Kotlin通过_Duration_类提供了一个强大的API来处理时间管理的这一特定方面。 在本教程中，我们将探讨_Duration_类以及它如何使Kotlin中的时间和持续时间操作变得高效且容易。 2. _Duration_是什么？ _Du..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Duration"}],["meta",{"property":"article:tag","content":"Time Management"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中Duration类的指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中Duration类的指南 1. 引言 在构建软件应用程序时，处理时间间隔和持续时间是一项常见任务。Kotlin通过_Duration_类提供了一个强大的API来处理时间管理的这一特定方面。 在本教程中，我们将探讨_Duration_类以及它如何使Kotlin中的时间和持续时间操作变得高效且容易。 2. _Duration_是什么？ _Du..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. _Duration_是什么？","slug":"_2-duration-是什么","link":"#_2-duration-是什么","children":[]},{"level":2,"title":"3. 创建持续时间","slug":"_3-创建持续时间","link":"#_3-创建持续时间","children":[{"level":3,"title":"3.1. 使用伴生对象","slug":"_3-1-使用伴生对象","link":"#_3-1-使用伴生对象","children":[]},{"level":3,"title":"3.2. 使用_toDuration()_","slug":"_3-2-使用-toduration","link":"#_3-2-使用-toduration","children":[]},{"level":3,"title":"3.3. 从ISO8601持续时间格式","slug":"_3-3-从iso8601持续时间格式","link":"#_3-3-从iso8601持续时间格式","children":[]}]},{"level":2,"title":"4. _Duration_操作","slug":"_4-duration-操作","link":"#_4-duration-操作","children":[{"level":3,"title":"4.1. 持续时间的转换","slug":"_4-1-持续时间的转换","link":"#_4-1-持续时间的转换","children":[]},{"level":3,"title":"4.2. 算术运算","slug":"_4-2-算术运算","link":"#_4-2-算术运算","children":[]},{"level":3,"title":"4.3. 比较持续时间","slug":"_4-3-比较持续时间","link":"#_4-3-比较持续时间","children":[]},{"level":3,"title":"4.4. 两个_DateTime_之间的持续时间","slug":"_4-4-两个-datetime-之间的持续时间","link":"#_4-4-两个-datetime-之间的持续时间","children":[]},{"level":3,"title":"4.5. 一些实际用途","slug":"_4-5-一些实际用途","link":"#_4-5-一些实际用途","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":5.65,"words":1695},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Guide to Duration in Kotlin.md","localizedDate":"2024年6月20日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在构建软件应用程序时，处理时间间隔和持续时间是一项常见任务。Kotlin通过_Duration_类提供了一个强大的API来处理时间管理的这一特定方面。</p>\\n<p>在本教程中，我们将探讨_Duration_类以及它如何使Kotlin中的时间和持续时间操作变得高效且容易。</p>\\n<h2>2. _Duration_是什么？</h2>\\n<p><strong>_Duration_表示一个特定的时间量，可以是正数、负数、零甚至无限大。</strong></p>\\n<p>这些间隔通过_DurationUnit_枚举指定，支持类型_DAYS_, <em>HOURS</em>, <em>MINUTES</em>, <em>SECONDS</em>, <em>MILLISECONDS</em>, <em>MICROSECONDS_和_NANOSECONDS</em>。因此，即使在指代周和月时，超过一天的持续时间也以天为单位表示。</p>","autoDesc":true}');export{_ as comp,v as data};
