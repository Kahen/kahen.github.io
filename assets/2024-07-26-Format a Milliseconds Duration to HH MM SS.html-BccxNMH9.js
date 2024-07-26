import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-DpYLEM_u.js";const i={},d=n('<hr><h1 id="将毫秒持续时间格式化为hh-mm-ss-baeldung-概述" tabindex="-1"><a class="header-anchor" href="#将毫秒持续时间格式化为hh-mm-ss-baeldung-概述"><span>将毫秒持续时间格式化为HH:MM:SS | Baeldung## 概述</span></a></h1><p>持续时间是指以小时、分钟、秒、毫秒等为单位表达的时间量。我们可能希望将持续时间格式化为特定的时间模式。</p><p>我们可以通过编写自定义代码并借助一些JDK库来实现这一点，或者使用第三方库。</p><p>在这个快速教程中，我们将看看如何编写简单的代码，将给定的持续时间格式化为HH:MM:SS格式。</p><h2 id="java解决方案" tabindex="-1"><a class="header-anchor" href="#java解决方案"><span>Java解决方案</span></a></h2><p>持续时间可以以多种方式表示——例如，以分钟、秒和毫秒表示，或者作为Java的_Duration_，它具有自己的特定格式。</p><p>本节和后续部分将专注于使用一些JDK库将以毫秒指定的间隔（经过的时间）格式化为HH:MM:SS。为了我们的例子，我们将格式化38114000ms为10:35:14（HH:MM:SS）。</p><h3 id="_2-1-duration" tabindex="-1"><a class="header-anchor" href="#_2-1-duration"><span>2.1. <em>Duration</em></span></a></h3><p><strong>从Java 8开始，引入了_Duration_类来处理各种单位的时间间隔。</strong> _Duration_类提供了许多辅助方法来从持续时间中获取小时、分钟和秒。</p><p>要使用_Duration_类将间隔格式化为HH:MM:SS，我们需要使用_Duration_类中的工厂方法_ofMillis_从我们的间隔初始化_Duration_对象。这将间隔转换为我们可以操作的_Duration_对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Duration duration = Duration.ofMillis(38114000);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了从秒到我们所需的单位进行计算的便利，我们需要获取我们持续时间或间隔的总秒数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>long seconds = duration.getSeconds();\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，一旦我们有了秒数，我们为所需的格式生成相应的小时、分钟和秒：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>long HH = seconds / 3600;\nlong MM = (seconds % 3600) / 60;\nlong SS = seconds % 60;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们格式化我们生成的值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String timeInHHMMSS = String.format(&quot;%02d:%02d:%02d&quot;, HH, MM, SS);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们尝试这个解决方案：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>assertThat(timeInHHMMSS).isEqualTo(&quot;10:35:14&quot;);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>如果我们使用Java 9或更高版本，我们可以使用一些辅助方法直接获取单位，而无需执行任何计算</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>long HH = duration.toHours();\nlong MM = duration.toMinutesPart();\nlong SS = duration.toSecondsPart();\nString timeInHHMMSS = String.format(&quot;%02d:%02d:%02d&quot;, HH, MM, SS);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码片段将给我们与上面测试的相同结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>assertThat(timeInHHMMSS).isEqualTo(&quot;10:35:14&quot;);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-2-timeunit" tabindex="-1"><a class="header-anchor" href="#_2-2-timeunit"><span>2.2. <em>TimeUnit</em></span></a></h3><p>就像前一节讨论的_Duration_类一样，_TimeUnit_代表给定粒度的时间。它提供了一些辅助方法来转换单位——在我们的情况下将是小时、分钟和秒——并在这些单位中执行计时和延迟操作。</p><p>要将毫秒持续时间格式化为HH:MM:SS格式，我们所要做的就是使用_TimeUnit_中的相应辅助方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>long HH = TimeUnit.MILLISECONDS.toHours(38114000);\nlong MM = TimeUnit.MILLISECONDS.toMinutes(38114000) % 60;\nlong SS = TimeUnit.MILLISECONDS.toSeconds(38114000) % 60;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，根据上面生成的单位格式化持续时间：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String timeInHHMMSS = String.format(&quot;%02d:%02d:%02d&quot;, HH, MM, SS);\nassertThat(timeInHHMMSS).isEqualTo(&quot;10:35:14&quot;);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用第三方库" tabindex="-1"><a class="header-anchor" href="#使用第三方库"><span>使用第三方库</span></a></h2><p>我们可能会选择尝试使用第三方库方法而不是编写自己的代码。</p><h3 id="_3-1-apache-commons" tabindex="-1"><a class="header-anchor" href="#_3-1-apache-commons"><span>3.1. Apache Commons</span></a></h3><p>要使用Apache Commons，我们需要将commons-lang3添加到我们的项目中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n    ``&lt;groupId&gt;``org.apache.commons``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``commons-lang3``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``3.12.0``&lt;/version&gt;``\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，这个库在其_DurationFormatUtils_类中有_formatDuration_以及其他单位格式化方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String timeInHHMMSS = DurationFormatUtils.formatDuration(38114000, &quot;HH:MM:SS&quot;, true);\nassertThat(timeInHHMMSS).isEqualTo(&quot;10:35:14&quot;);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-joda-time" tabindex="-1"><a class="header-anchor" href="#_3-2-joda-time"><span>3.2. Joda Time</span></a></h3><p><strong>Joda Time库在我们在Java 8之前的版本中非常有用</strong>，因为它有方便的辅助方法来表示和格式化时间单位。要使用Joda Time，让我们将joda-time依赖项添加到我们的项目中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n    ``&lt;groupId&gt;``joda-time``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``joda-time``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``2.10.10``&lt;/version&gt;``\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Joda Time有一个_Duration_类来表示时间。首先，我们将毫秒间隔转换为Joda Time _Duration_对象的实例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Duration duration = new Duration(38114000);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，我们使用_Duration_中的_toPeriod_方法从上面的持续时间获取周期，该方法将其转换或初始化为Joda Time的_Period_类的实例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Period period = duration.toPeriod();\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们使用其相应的辅助方法从_Period_获取单位（小时、分钟和秒）：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>long HH = period.getHours();\nlong MM = period.getMinutes();\nlong SS = period.getSeconds();\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们可以格式化持续时间并测试结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String timeInHHMMSS = String.format(&quot;%02d:%02d:%02d&quot;, HH, MM, SS);\nassertThat(timeInHHMMSS).isEqualTo(&quot;10:35:14&quot;);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本教程中，我们学习了如何将持续时间格式化为特定格式（在我们的情况下是HH:MM:SS）。</p><p>首先，我们使用了Java自带的_Duration_和_TimeUnit_类来获取所需的单位，并借助_Formatter_进行格式化。</p><p>最后，我们查看了如何使用一些第三方库来实现结果。</p><p>像往常一样，完整的源代码可以在GitHub上找到</p><p>OK</p>',54),s=[d];function l(r,o){return a(),t("div",null,s)}const m=e(i,[["render",l],["__file","2024-07-26-Format a Milliseconds Duration to HH MM SS.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-07-26/2024-07-26-Format%20a%20Milliseconds%20Duration%20to%20HH%20MM%20SS.html","title":"将毫秒持续时间格式化为HH:MM:SS | Baeldung## 概述","lang":"zh-CN","frontmatter":{"date":"2024-07-26T00:00:00.000Z","category":["Java","时间格式化"],"tag":["Java","时间","格式化","毫秒","HH:MM:SS"],"head":[["meta",{"name":"keywords","content":"Java, 时间格式化, 毫秒, HH:MM:SS"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-26/2024-07-26-Format%20a%20Milliseconds%20Duration%20to%20HH%20MM%20SS.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"将毫秒持续时间格式化为HH:MM:SS | Baeldung## 概述"}],["meta",{"property":"og:description","content":"将毫秒持续时间格式化为HH:MM:SS | Baeldung## 概述 持续时间是指以小时、分钟、秒、毫秒等为单位表达的时间量。我们可能希望将持续时间格式化为特定的时间模式。 我们可以通过编写自定义代码并借助一些JDK库来实现这一点，或者使用第三方库。 在这个快速教程中，我们将看看如何编写简单的代码，将给定的持续时间格式化为HH:MM:SS格式。 Ja..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-26T14:07:13.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"时间"}],["meta",{"property":"article:tag","content":"格式化"}],["meta",{"property":"article:tag","content":"毫秒"}],["meta",{"property":"article:tag","content":"HH:MM:SS"}],["meta",{"property":"article:published_time","content":"2024-07-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-26T14:07:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"将毫秒持续时间格式化为HH:MM:SS | Baeldung## 概述\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-26T14:07:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"将毫秒持续时间格式化为HH:MM:SS | Baeldung## 概述 持续时间是指以小时、分钟、秒、毫秒等为单位表达的时间量。我们可能希望将持续时间格式化为特定的时间模式。 我们可以通过编写自定义代码并借助一些JDK库来实现这一点，或者使用第三方库。 在这个快速教程中，我们将看看如何编写简单的代码，将给定的持续时间格式化为HH:MM:SS格式。 Ja..."},"headers":[{"level":2,"title":"Java解决方案","slug":"java解决方案","link":"#java解决方案","children":[{"level":3,"title":"2.1. Duration","slug":"_2-1-duration","link":"#_2-1-duration","children":[]},{"level":3,"title":"2.2. TimeUnit","slug":"_2-2-timeunit","link":"#_2-2-timeunit","children":[]}]},{"level":2,"title":"使用第三方库","slug":"使用第三方库","link":"#使用第三方库","children":[{"level":3,"title":"3.1. Apache Commons","slug":"_3-1-apache-commons","link":"#_3-1-apache-commons","children":[]},{"level":3,"title":"3.2. Joda Time","slug":"_3-2-joda-time","link":"#_3-2-joda-time","children":[]}]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1722002833000,"updatedTime":1722002833000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.02,"words":1206},"filePathRelative":"posts/baeldung/2024-07-26/2024-07-26-Format a Milliseconds Duration to HH MM SS.md","localizedDate":"2024年7月26日","excerpt":"<hr>\\n<h1>将毫秒持续时间格式化为HH:MM:SS | Baeldung## 概述</h1>\\n<p>持续时间是指以小时、分钟、秒、毫秒等为单位表达的时间量。我们可能希望将持续时间格式化为特定的时间模式。</p>\\n<p>我们可以通过编写自定义代码并借助一些JDK库来实现这一点，或者使用第三方库。</p>\\n<p>在这个快速教程中，我们将看看如何编写简单的代码，将给定的持续时间格式化为HH:MM:SS格式。</p>\\n<h2>Java解决方案</h2>\\n<p>持续时间可以以多种方式表示——例如，以分钟、秒和毫秒表示，或者作为Java的_Duration_，它具有自己的特定格式。</p>\\n<p>本节和后续部分将专注于使用一些JDK库将以毫秒指定的间隔（经过的时间）格式化为HH:MM:SS。为了我们的例子，我们将格式化38114000ms为10:35:14（HH:MM:SS）。</p>","autoDesc":true}');export{m as comp,p as data};
