import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app--f8RLeKm.js";const s={},i=n(`<h1 id="java中计算两个日期之间工作日的数量-baeldung" tabindex="-1"><a class="header-anchor" href="#java中计算两个日期之间工作日的数量-baeldung"><span>Java中计算两个日期之间工作日的数量 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将探讨Java中计算两个日期之间工作日数量的两种不同方法。我们将看到一种使用_流_的可读版本，以及一种不那么易读但更高效的选项，它根本不进行循环。</p><h2 id="_2-使用-流-的全搜索" tabindex="-1"><a class="header-anchor" href="#_2-使用-流-的全搜索"><span>2. 使用_流_的全搜索</span></a></h2><p>首先，让我们看看如何使用_流_来实现。<strong>计划是循环遍历我们两个日期之间的每一天，并计算工作日</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>long getWorkingDaysWithStream(LocalDate start, LocalDate end){
    return start.datesUntil(end)
      .map(LocalDate::getDayOfWeek)
      .filter(day -&gt; !Arrays.asList(DayOfWeek.SATURDAY, DayOfWeek.SUNDAY).contains(day))
      .count();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们首先使用了_LocalDate_的_datesUntil()<em>方法。这个方法返回从开始日期（包括）到结束日期（不包括）的所有日期的_流</em>。</p><p>接下来，我们使用_map()_和_LocalDate_的_getDayOfWeek()_将每个日期转换为星期几。例如，这将把2023年1月10日转换为星期三。</p><p>然后，我们通过检查_DaysOfWeek_枚举来过滤掉所有周末的日子。最后，我们可以计算剩余的天数，因为我们知道这些都将是工作日。</p><p><strong>这种方法不是最快的，因为我们必须查看每一天。</strong> 然而，它易于理解，并提供了轻松添加额外检查或处理的机会。</p><h2 id="_3-不循环的高效搜索" tabindex="-1"><a class="header-anchor" href="#_3-不循环的高效搜索"><span>3. 不循环的高效搜索</span></a></h2><p><strong>我们有另一种选择，那就是不循环遍历所有的日子，而是应用我们对星期几的规则。</strong> 这里我们需要几个步骤，并注意一些边缘情况。</p><h3 id="_3-1-设置初始日期" tabindex="-1"><a class="header-anchor" href="#_3-1-设置初始日期"><span>3.1. 设置初始日期</span></a></h3><p>首先，我们将定义我们的方法签名，它将与我们之前的非常相似：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>long getWorkingDaysWithoutStream(LocalDate start, LocalDate end)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>处理这些日期的第一步是排除开始和结束时的任何周末。</strong> 因此，对于开始日期，如果是周末，我们将取下一个星期一。我们还将使用一个_布尔值_来跟踪我们是否这样做了：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>boolean startOnWeekend = false;
if(start.getDayOfWeek().getValue() &gt; 5){
    start = start.with(TemporalAdjusters.next(DayOfWeek.MONDAY));
    startOnWeekend = true;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在这里使用了_TemporalAdjusters_类，特别是它的_next()_方法，它让我们跳到指定的下一天。</p><p>然后，我们可以对结束日期做同样的事情——如果是周末，我们取上一个星期五。这次我们将使用_TemporalAdjusters.previous()_来带我们回到我们想要的日期之前的第一次出现：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>boolean endOnWeekend = false;
if(end.getDayOfWeek().getValue() &gt; 5){
    end = end.with(TemporalAdjusters.previous(DayOfWeek.FRIDAY));
    endOnWeekend = true;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-考虑边缘情况" tabindex="-1"><a class="header-anchor" href="#_3-2-考虑边缘情况"><span>3.2. 考虑边缘情况</span></a></h3><p>这已经为我们提供了一个潜在的边缘情况，如果我们从星期六开始到星期日结束。在这种情况下，我们的开始日期现在是星期一，结束日期是之前的星期五。开始日期在结束日期之后是没有意义的，所以我们可以用一个快速检查来覆盖这种潜在的使用情况：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>if(start.isAfter(end)){
    return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们还需要覆盖另一个边缘情况，这就是我们为什么保留了开始和结束在周末的记录。</strong> 这是可选的，取决于我们想要如何计算天数。例如，如果我们计算同一周的星期二和星期五之间的天数，我们会说它们之间有三天。</p><p>我们也会说从星期六到下一个星期有五个工作日。然而，如果我们像我们现在这样做，将开始和结束日期移动到星期一和星期五，那么现在计算为四天。为了抵消这一点，我们可以简单地添加一天，如果需要的话：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>long addValue = startOnWeekend || endOnWeekend ? 1 : 0;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-3-最终计算" tabindex="-1"><a class="header-anchor" href="#_3-3-最终计算"><span>3.3. 最终计算</span></a></h3><p>我们现在可以计算开始和结束之间的总周数。为此，<strong>我们将使用_ChronoUnit_的_between()<em>方法。这个方法计算两个_Temporal_对象之间的时间，在指定的单位，在我们的情况下是_周</em></strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>long weeks = ChronoUnit.WEEKS.between(start, end);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>最后，我们可以使用到目前为止收集的所有信息来得到工作日数量的最终值：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>return ( weeks * 5 ) + ( end.getDayOfWeek().getValue() - start.getDayOfWeek().getValue() ) + addValue;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里的步骤首先是将周数乘以每周的工作日数。我们还没有考虑到非整周，所以我们加上了从一周的开始日到结束日之间的额外天数。最后，我们加上了开始或结束在周末的调整。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们看到了计算两个日期之间工作日数量的两种选项。</p><p>首先，我们看到了如何使用_流_并逐个检查每一天。这种方法以牺牲效率为代价提供了简单性和可读性。</p><p>第二个选项是应用我们对星期几的规则来找出答案，而不需要循环。这种方法以牺牲可读性和可维护性为代价提供了效率。</p><p>一如既往，示例的完整代码可以在GitHub上找到。</p>`,37),l=[i];function d(r,o){return t(),a("div",null,l)}const u=e(s,[["render",d],["__file","2024-06-23-Calculate Number of Weekdays Between Two Dates in Java.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Calculate%20Number%20of%20Weekdays%20Between%20Two%20Dates%20in%20Java.html","title":"Java中计算两个日期之间工作日的数量 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Java","教程"],"tag":["工作日计算","Java日期操作"],"head":[["meta",{"name":"keywords","content":"Java, 工作日计算, 日期操作"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Calculate%20Number%20of%20Weekdays%20Between%20Two%20Dates%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中计算两个日期之间工作日的数量 | Baeldung"}],["meta",{"property":"og:description","content":"Java中计算两个日期之间工作日的数量 | Baeldung 1. 概述 在本教程中，我们将探讨Java中计算两个日期之间工作日数量的两种不同方法。我们将看到一种使用_流_的可读版本，以及一种不那么易读但更高效的选项，它根本不进行循环。 2. 使用_流_的全搜索 首先，让我们看看如何使用_流_来实现。计划是循环遍历我们两个日期之间的每一天，并计算工作日..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T17:29:29.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"工作日计算"}],["meta",{"property":"article:tag","content":"Java日期操作"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T17:29:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中计算两个日期之间工作日的数量 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T17:29:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中计算两个日期之间工作日的数量 | Baeldung 1. 概述 在本教程中，我们将探讨Java中计算两个日期之间工作日数量的两种不同方法。我们将看到一种使用_流_的可读版本，以及一种不那么易读但更高效的选项，它根本不进行循环。 2. 使用_流_的全搜索 首先，让我们看看如何使用_流_来实现。计划是循环遍历我们两个日期之间的每一天，并计算工作日..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用_流_的全搜索","slug":"_2-使用-流-的全搜索","link":"#_2-使用-流-的全搜索","children":[]},{"level":2,"title":"3. 不循环的高效搜索","slug":"_3-不循环的高效搜索","link":"#_3-不循环的高效搜索","children":[{"level":3,"title":"3.1. 设置初始日期","slug":"_3-1-设置初始日期","link":"#_3-1-设置初始日期","children":[]},{"level":3,"title":"3.2. 考虑边缘情况","slug":"_3-2-考虑边缘情况","link":"#_3-2-考虑边缘情况","children":[]},{"level":3,"title":"3.3. 最终计算","slug":"_3-3-最终计算","link":"#_3-3-最终计算","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719163769000,"updatedTime":1719163769000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.33,"words":1299},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Calculate Number of Weekdays Between Two Dates in Java.md","localizedDate":"2024年6月24日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将探讨Java中计算两个日期之间工作日数量的两种不同方法。我们将看到一种使用_流_的可读版本，以及一种不那么易读但更高效的选项，它根本不进行循环。</p>\\n<h2>2. 使用_流_的全搜索</h2>\\n<p>首先，让我们看看如何使用_流_来实现。<strong>计划是循环遍历我们两个日期之间的每一天，并计算工作日</strong>：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>long getWorkingDaysWithStream(LocalDate start, LocalDate end){\\n    return start.datesUntil(end)\\n      .map(LocalDate::getDayOfWeek)\\n      .filter(day -&gt; !Arrays.asList(DayOfWeek.SATURDAY, DayOfWeek.SUNDAY).contains(day))\\n      .count();\\n}\\n</code></pre></div>","autoDesc":true}');export{u as comp,g as data};
