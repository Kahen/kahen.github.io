import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as d,a as n}from"./app-C6rqSDgP.js";const a={},r=n(`<h1 id="cron表达式中-和-的区别-baeldung" tabindex="-1"><a class="header-anchor" href="#cron表达式中-和-的区别-baeldung"><span>Cron表达式中*和?的区别 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>使用cron调度器，我们可以自动化那些我们本需要手动处理的重复性任务。此外，cron表达式允许我们安排任务在所需的日期和时间执行。</p><p>在Java中安排任务，我们通常使用Quartz库。它是一个完全用Java编写的作业调度的开源解决方案。此外，如果我们使用Spring框架，我们可以使用<code>@Scheduled</code>注解轻松安排任务。</p><p>尽管cron表达式是安排任务的强大方式，但其语法有时可能会令人困惑和不知所措。</p><p>在本教程中，我们将探讨cron表达式中?和*符号的区别。</p><h2 id="_2-cron表达式的字段" tabindex="-1"><a class="header-anchor" href="#_2-cron表达式的字段"><span>2. Cron表达式的字段</span></a></h2><p>在我们深入之前，让我们先探索一下可能出现在cron表达式中的字段。</p><p>在Quartz中，cron表达式表示一个字符串，涉及多达七个字段，由空格分隔，每个字段代表特定的日期和时间单位：</p><table><thead><tr><th>字段</th><th>必需</th><th>允许值</th><th>允许的特殊字符</th></tr></thead><tbody><tr><td>秒</td><td>是</td><td>0-59</td><td>, – * /</td></tr><tr><td>分钟</td><td>是</td><td>0-59</td><td>, – * /</td></tr><tr><td>小时</td><td>是</td><td>0-23</td><td>, – * /</td></tr><tr><td>月份中的天</td><td>是</td><td>1-31</td><td>, – * / ? L W</td></tr><tr><td>月份</td><td>是</td><td>0-11 (或JAN-DEC)</td><td>, – * /</td></tr><tr><td>星期中的天</td><td>是</td><td>1-7 (或SUN-SAT)</td><td>, – * / ? L C #</td></tr><tr><td>年</td><td>否</td><td>1970-2099 (或空)</td><td>, – * /</td></tr></tbody></table><p>如上表所示，除了指定年份的字段外，所有字段都是必需的。如果我们不提供值，任务将每年执行一次。</p><p>此外，Unix cron表达式的语法有点不同：</p><table><thead><tr><th>字段</th><th>必需</th><th>允许值</th><th>允许的特殊字符</th></tr></thead><tbody><tr><td>分钟</td><td>是</td><td>0-59</td><td>, – * /</td></tr><tr><td>小时</td><td>是</td><td>0-23</td><td>, – * /</td></tr><tr><td>月份中的天</td><td>是</td><td>1-31</td><td>, – * /</td></tr><tr><td>月份</td><td>是</td><td>1-12 (或JAN-DEC)</td><td>, – * /</td></tr><tr><td>星期中的天</td><td>是</td><td>0-6 (或SUN-SAT)</td><td>, – * /</td></tr></tbody></table><p>Unix cron表达式由五个字段组成，后面跟着我们想要执行的命令。与Quartz不同，没有特定的字段来指定秒和年份。它专注于为当年安排任务。</p><p><strong>值得注意的是，Unix cron表达式不允许在表达式中出现?符号。</strong></p><p>在接下来的部分中，我们将主要关注使用Quartz库的cron表达式。</p><h2 id="_3-cron表达式中的" tabindex="-1"><a class="header-anchor" href="#_3-cron表达式中的"><span>3. Cron表达式中的?</span></a></h2><p>接下来，让我们研究cron表达式中的问号符号(?)。简单来说，它表示没有特定的值。</p><p><strong>我们只能在指定月份中的天和星期中的天的字段中使用它。</strong></p><p>然而，需要注意的是，月份中的天和星期中的天字段是互斥的。换句话说，我们不能在同一个表达式中为这两个字段指定值。</p><p>例如，以下表达式会导致错误：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>0 30 10 1 OCT 2 2023
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，为了更容易理解表达式，让我们在表格中看到它：</p><table><thead><tr><th>秒</th><th>分钟</th><th>小时</th><th>月份中的天</th><th>月份</th><th>星期中的天</th><th>年</th></tr></thead><tbody><tr><td>0</td><td>30</td><td>10</td><td>1</td><td>OCT</td><td>2</td><td>2023</td></tr></tbody></table><p>我们为月份中的天和星期中的天参数都设置了值，这在Quartz中是不支持的。</p><p>即使我们使用正确的星期几的月份中的天：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>0 30 10 30 OCT 2 2023
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里，2023年10月30日是星期一，但表达式仍然无效。</p><p>**此外，由于我们需要为这两个字段设置值，我们需要在一个字段上放置?符号来表示该值未设置。**我们设置?的字段将被忽略：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>0 0 0 30 OCT ?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>从示例中，任务每年10月30日午夜运行。</p><p>**此外，?只能在cron表达式中出现一次。**将两个值都设置为?也会导致错误：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>0 30 * ? OCT ?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-cron表达式中的" tabindex="-1"><a class="header-anchor" href="#_4-cron表达式中的"><span>4. Cron表达式中的*</span></a></h2><p>另一方面，cron表达式中的星号(*)意味着所有值。换句话说，我们将使用它来为特定字段设置所有定义的值。</p><p><em><em>此外，与?不同，我们可以在cron表达式的任何字段中使用</em>。</em>*</p><p>例如，让我们创建一个cron表达式，我们将设置小时字段的所有值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>0 30 * 1 OCT ?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们以表格格式看到：</p><table><thead><tr><th>秒</th><th>分钟</th><th>小时</th><th>月份中的天</th><th>月份</th><th>星期中的天</th><th>年</th></tr></thead><tbody><tr><td>0</td><td>30</td><td>*</td><td>1</td><td>OCT</td><td>?</td><td>空</td></tr></tbody></table><p>任务在10月1日的每个小时的30分0秒执行。</p><p>此外，我们也可以在多个字段中使用*：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>* * * * OCT ?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个任务在10月的每一天的每一秒都运行。</p><h3 id="_4-1-linux-cron中的月份中的天和星期中的天" tabindex="-1"><a class="header-anchor" href="#_4-1-linux-cron中的月份中的天和星期中的天"><span>4.1. Linux Cron中的月份中的天和星期中的天</span></a></h3><p>当涉及到Linux cron中的月份中的天和工作日字段时，它们的行为与Quartz中的不同。</p><p>首先，它们不是互斥的。我们可以在同一个cron表达式中设置这两个值。</p><p>其次，如果两个字段都包含除星号之外的值，它们形成并集：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>30 10 1 10 5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述示例中的工作在10月1日和每个星期五的10:30执行。</p><p>最后，如果其中一个值以星号开头，它们形成交集：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>30 10 */1 * 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，任务只在每个月的每天的10:30运行，如果它恰好是星期一。</p><h2 id="_5-和-之间的比较" tabindex="-1"><a class="header-anchor" href="#_5-和-之间的比较"><span>5. *和?之间的比较</span></a></h2><p>为了总结，让我们列出cron表达式中*和?特殊字符之间的主要区别：</p><table><thead><tr><th>*符号</th><th>?符号</th></tr></thead><tbody><tr><td>代表特定字段的所有允许值</td><td>表示没有特定值</td></tr><tr><td>可以在任何字段中使用</td><td>只能在代表月份中的天和星期中的天的字段中使用</td></tr><tr><td>用于指定字段中的所有值</td><td>用于设置空值</td></tr><tr><td>可以在同一个表达式中出现多次</td><td>每个表达式中只能存在一个</td></tr></tbody></table><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了cron表达式中星号和问号特殊字符的区别。</p><p>总之，我们将在cron表达式的字段中使用*来<strong>包括该特定字段的所有允许值</strong>。相反，<strong>?表示没有特定值，只能用于月份中的天和星期中的天字段</strong>。</p><p>由于Quartz不支持这两个字段的实现，我们需要在其中一个字段中使用?来留空该字段。</p>`,60),i=[r];function o(l,s){return d(),e("div",null,i)}const h=t(a,[["render",o],["__file","2024-06-27-Differences Between   and   in Cron Expressions.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-Differences%20Between%20%20%20and%20%20%20in%20Cron%20Expressions.html","title":"Cron表达式中*和?的区别 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","Quartz"],"tag":["Cron表达式","定时任务"],"head":[["meta",{"name":"keywords","content":"cron表达式, Quartz, 定时任务, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-Differences%20Between%20%20%20and%20%20%20in%20Cron%20Expressions.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Cron表达式中*和?的区别 | Baeldung"}],["meta",{"property":"og:description","content":"Cron表达式中*和?的区别 | Baeldung 1. 概述 使用cron调度器，我们可以自动化那些我们本需要手动处理的重复性任务。此外，cron表达式允许我们安排任务在所需的日期和时间执行。 在Java中安排任务，我们通常使用Quartz库。它是一个完全用Java编写的作业调度的开源解决方案。此外，如果我们使用Spring框架，我们可以使用@Sch..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T08:34:15.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Cron表达式"}],["meta",{"property":"article:tag","content":"定时任务"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T08:34:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Cron表达式中*和?的区别 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T08:34:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Cron表达式中*和?的区别 | Baeldung 1. 概述 使用cron调度器，我们可以自动化那些我们本需要手动处理的重复性任务。此外，cron表达式允许我们安排任务在所需的日期和时间执行。 在Java中安排任务，我们通常使用Quartz库。它是一个完全用Java编写的作业调度的开源解决方案。此外，如果我们使用Spring框架，我们可以使用@Sch..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Cron表达式的字段","slug":"_2-cron表达式的字段","link":"#_2-cron表达式的字段","children":[]},{"level":2,"title":"3. Cron表达式中的?","slug":"_3-cron表达式中的","link":"#_3-cron表达式中的","children":[]},{"level":2,"title":"4. Cron表达式中的*","slug":"_4-cron表达式中的","link":"#_4-cron表达式中的","children":[{"level":3,"title":"4.1. Linux Cron中的月份中的天和星期中的天","slug":"_4-1-linux-cron中的月份中的天和星期中的天","link":"#_4-1-linux-cron中的月份中的天和星期中的天","children":[]}]},{"level":2,"title":"5. *和?之间的比较","slug":"_5-和-之间的比较","link":"#_5-和-之间的比较","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719477255000,"updatedTime":1719477255000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.18,"words":1555},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-Differences Between   and   in Cron Expressions.md","localizedDate":"2024年6月27日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>使用cron调度器，我们可以自动化那些我们本需要手动处理的重复性任务。此外，cron表达式允许我们安排任务在所需的日期和时间执行。</p>\\n<p>在Java中安排任务，我们通常使用Quartz库。它是一个完全用Java编写的作业调度的开源解决方案。此外，如果我们使用Spring框架，我们可以使用<code>@Scheduled</code>注解轻松安排任务。</p>\\n<p>尽管cron表达式是安排任务的强大方式，但其语法有时可能会令人困惑和不知所措。</p>\\n<p>在本教程中，我们将探讨cron表达式中?和*符号的区别。</p>\\n<h2>2. Cron表达式的字段</h2>","autoDesc":true}');export{h as comp,u as data};
