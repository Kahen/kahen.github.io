import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-B5SPsEv6.js";const p={},e=t(`<h1 id="java中对日期进行四舍五入" tabindex="-1"><a class="header-anchor" href="#java中对日期进行四舍五入"><span>Java中对日期进行四舍五入</span></a></h1><p>在Java中处理日期时，我们可能需要将它们四舍五入到特定的单位，比如小时、天或月份。这提供了诸如为分析和报告目的聚合数据以及允许指定显示信息的详细程度等好处。</p><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将学习如何使用<code>java.util.Date</code>、<code>LocalDateTime</code>和<code>ZonedDateTime</code>对日期进行四舍五入。</p><h2 id="_2-基本四舍五入" tabindex="-1"><a class="header-anchor" href="#_2-基本四舍五入"><span>2. 基本四舍五入</span></a></h2><p>在基本四舍五入方法中，我们可以截断Java中任何日期的时间部分。具体来说，这意味着将所有时间元素设置为零。以下是我们可以做到这一点的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Date</span> <span class="token function">roundToDay</span><span class="token punctuation">(</span><span class="token class-name">Date</span> date<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Calendar</span> calendar <span class="token operator">=</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    calendar<span class="token punctuation">.</span><span class="token function">setTime</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span><span class="token punctuation">;</span>
    calendar<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">HOUR_OF_DAY</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    calendar<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MINUTE</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    calendar<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">SECOND</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    calendar<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MILLISECOND</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> calendar<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>roundToDay()</code>方法接受一个<code>Date</code>对象作为参数。然后，我们使用<code>Calendar</code>类的<code>setTime()</code>方法，并使用<code>set()</code>方法将小时、分钟、秒和毫秒四舍五入到一天的开始。</p><h2 id="_3-四舍五入到最近单位" tabindex="-1"><a class="header-anchor" href="#_3-四舍五入到最近单位"><span>3. 四舍五入到最近单位</span></a></h2><p>我们可以选择使四舍五入方法保持恒定，以使日期匹配跨单位（如小时、天或月份）的四舍五入，如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Date</span> <span class="token function">roundToNearestUnit</span><span class="token punctuation">(</span><span class="token class-name">Date</span> date<span class="token punctuation">,</span> <span class="token keyword">int</span> unit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Calendar</span> calendar <span class="token operator">=</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    calendar<span class="token punctuation">.</span><span class="token function">setTime</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">switch</span> <span class="token punctuation">(</span>unit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">HOUR</span><span class="token operator">:</span>
            <span class="token keyword">int</span> minute <span class="token operator">=</span> calendar<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MINUTE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>minute <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> minute \`<span class="token operator">&lt;</span> <span class="token number">15</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                calendar<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MINUTE</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>minute <span class="token operator">&gt;</span>\`<span class="token operator">=</span> <span class="token number">15</span> <span class="token operator">&amp;&amp;</span> minute \`<span class="token operator">&lt;</span> <span class="token number">45</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                calendar<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MINUTE</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                calendar<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MINUTE</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                calendar<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">HOUR_OF_DAY</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            calendar<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">SECOND</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            calendar<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MILLISECOND</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>

        <span class="token keyword">case</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">DAY_OF_MONTH</span><span class="token operator">:</span>
            <span class="token keyword">int</span> hour <span class="token operator">=</span> calendar<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">HOUR_OF_DAY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>hour <span class="token operator">&gt;</span>\`<span class="token operator">=</span> <span class="token number">12</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                calendar<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">DAY_OF_MONTH</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            calendar<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">HOUR_OF_DAY</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            calendar<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MINUTE</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            calendar<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">SECOND</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            calendar<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MILLISECOND</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>

        <span class="token keyword">case</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MONTH</span><span class="token operator">:</span>
            <span class="token keyword">int</span> day <span class="token operator">=</span> calendar<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">DAY_OF_MONTH</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>day <span class="token operator">&gt;=</span> <span class="token number">15</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                calendar<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MONTH</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            calendar<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">DAY_OF_MONTH</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            calendar<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">HOUR_OF_DAY</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            calendar<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MINUTE</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            calendar<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">SECOND</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            calendar<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MILLISECOND</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> calendar<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们有一个<code>roundToNearestUnit()</code>方法，它期望传入一个<code>Date</code>和一个<code>int</code>单位，旨在将输入日期四舍五入到指定的时间单位。</p><p>为此，代码创建了一个<code>Calendar</code>实例并将其设置为输入日期。<strong>我们将检索并调整分钟、小时或天组件，以允许日期四舍五入到最近的30分钟间隔、天或月份，具体取决于所选的单位（<code>Calendar.HOUR</code>、<code>Calendar.DAY_OF_MONTH</code>或<code>Calendar.MONTH</code>）</strong>。</p><p>此外，我们还确保秒和毫秒也归零。根据上述修改按照定义的时间单位，代码返回从生成的<code>Calendar</code>实体派生的新的<code>Date</code>。</p><h2 id="_4-使用localdatetime进行四舍五入" tabindex="-1"><a class="header-anchor" href="#_4-使用localdatetime进行四舍五入"><span>4. 使用<code>LocalDateTime</code>进行四舍五入</span></a></h2><p><code>LocalDateTime</code>是Java中的一个新类，它使我们能够在不同的级别上对日期进行四舍五入，从而为处理日期和时间提供了一个更现代的解决方案。以下是使用<code>LocalDateTime</code>对日期进行四舍五入的两种方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">LocalDateTime</span> <span class="token function">roundToStartOfMonth</span><span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span> dateTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> dateTime<span class="token punctuation">.</span><span class="token function">withDayOfMonth</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withHour</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withMinute</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withSecond</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withNano</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的方法<code>roundToStartOfMonth()</code>中，我们将月份中的天数设置为1，以将给定的<code>LocalDateTime</code>四舍五入到月份的开始，并将所有时间组件重置为午夜（0小时，0分钟，0秒和0纳秒）。</p><p>我们还可以使用<code>LocalDateTime</code>将给定日期四舍五入到周末的结束，如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">LocalDateTime</span> <span class="token function">roundToEndOfWeek</span><span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span> dateTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> dateTime<span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">TemporalAdjusters</span><span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token class-name">DayOfWeek</span><span class="token punctuation">.</span><span class="token constant">SATURDAY</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">withHour</span><span class="token punctuation">(</span><span class="token number">23</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">withMinute</span><span class="token punctuation">(</span><span class="token number">59</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">withSecond</span><span class="token punctuation">(</span><span class="token number">59</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">withNano</span><span class="token punctuation">(</span><span class="token number">999</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><code>RoundToEndOfWeek()</code>方法通过使用<code>TemporalAdjusters.next()</code>函数找到下一个星期六，并将时间组件设置为23小时、59分钟、59秒和999纳秒，将<code>LocalDateTime</code>四舍五入到下一个星期六的结束。</strong></p><h2 id="_5-使用zoneddatetime进行四舍五入" tabindex="-1"><a class="header-anchor" href="#_5-使用zoneddatetime进行四舍五入"><span>5. 使用<code>ZonedDateTime</code>进行四舍五入</span></a></h2><p><code>ZonedDateTime</code>类使得在存在时区的情况下对日期进行四舍五入成为可能。以下是使用<code>ZonedDateTime</code>对日期进行四舍五入的两种方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ZonedDateTime</span> <span class="token function">roundToStartOfMonth</span><span class="token punctuation">(</span><span class="token class-name">ZonedDateTime</span> dateTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> dateTime<span class="token punctuation">.</span><span class="token function">withDayOfMonth</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">withHour</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">withMinute</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">withSecond</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">ChronoField</span><span class="token punctuation">.</span><span class="token constant">MILLI_OF_SECOND</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">ChronoField</span><span class="token punctuation">.</span><span class="token constant">MICRO_OF_SECOND</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">ChronoField</span><span class="token punctuation">.</span><span class="token constant">NANO_OF_SECOND</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述方法<code>roundToStartOfMonth()</code>接受一个<code>ZonedDateTime</code>作为输入，并返回一个新的<code>ZonedDateTime</code>。<strong>具体来说，它返回相同的日期和时间，但时间部分设置为月初的午夜（00:00:00.000）。</strong></p><p>要将输入的<code>Date</code>四舍五入到当前周末的结束，让我们看以下示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ZonedDateTime</span> <span class="token function">roundToEndOfWeek</span><span class="token punctuation">(</span><span class="token class-name">ZonedDateTime</span> dateTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> dateTime<span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">TemporalAdjusters</span><span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token class-name">DayOfWeek</span><span class="token punctuation">.</span><span class="token constant">SATURDAY</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">withHour</span><span class="token punctuation">(</span><span class="token number">23</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">withMinute</span><span class="token punctuation">(</span><span class="token number">59</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">withSecond</span><span class="token punctuation">(</span><span class="token number">59</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">ChronoField</span><span class="token punctuation">.</span><span class="token constant">MILLI_OF_SECOND</span><span class="token punctuation">,</span> <span class="token number">999</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">ChronoField</span><span class="token punctuation">.</span><span class="token constant">MICRO_OF_SECOND</span><span class="token punctuation">,</span> <span class="token number">999</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">ChronoField</span><span class="token punctuation">.</span><span class="token constant">NANO_OF_SECOND</span><span class="token punctuation">,</span> <span class="token number">999</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在<code>roundToEndOfWeek()</code>方法中，我们首先使用<code>TemporalAdjusters</code>找到下一个星期六，然后将时间设置为（23:59:59.999999999）。</strong></p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>总之，在Java中，对基于时间的数据进行四舍五入是最重要的任务之一。在本教程中，我们已经看到了一些将日期四舍五入到不同单位和精度级别，如截断和自定义四舍五入方法的方法。</p><p>请记住，对于每个日期，特别是那些用于国际应用的日期，都应该考虑时间变化。</p><p>如往常一样，本文的完整代码示例可以在GitHub上找到。</p>`,32),c=[e];function o(l,u){return s(),a("div",null,c)}const d=n(p,[["render",o],["__file","2024-06-27-Round the Date in Java.html.vue"]]),r=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-Round%20the%20Date%20in%20Java.html","title":"Java中对日期进行四舍五入","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Date-Time API"],"tag":["Java","Date","Rounding"],"head":[["meta",{"name":"keywords","content":"Java, Date Rounding, LocalDateTime, ZonedDateTime"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-Round%20the%20Date%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中对日期进行四舍五入"}],["meta",{"property":"og:description","content":"Java中对日期进行四舍五入 在Java中处理日期时，我们可能需要将它们四舍五入到特定的单位，比如小时、天或月份。这提供了诸如为分析和报告目的聚合数据以及允许指定显示信息的详细程度等好处。 1. 引言 在本教程中，我们将学习如何使用java.util.Date、LocalDateTime和ZonedDateTime对日期进行四舍五入。 2. 基本四舍五..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T22:52:16.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Date"}],["meta",{"property":"article:tag","content":"Rounding"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T22:52:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中对日期进行四舍五入\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T22:52:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中对日期进行四舍五入 在Java中处理日期时，我们可能需要将它们四舍五入到特定的单位，比如小时、天或月份。这提供了诸如为分析和报告目的聚合数据以及允许指定显示信息的详细程度等好处。 1. 引言 在本教程中，我们将学习如何使用java.util.Date、LocalDateTime和ZonedDateTime对日期进行四舍五入。 2. 基本四舍五..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 基本四舍五入","slug":"_2-基本四舍五入","link":"#_2-基本四舍五入","children":[]},{"level":2,"title":"3. 四舍五入到最近单位","slug":"_3-四舍五入到最近单位","link":"#_3-四舍五入到最近单位","children":[]},{"level":2,"title":"4. 使用LocalDateTime进行四舍五入","slug":"_4-使用localdatetime进行四舍五入","link":"#_4-使用localdatetime进行四舍五入","children":[]},{"level":2,"title":"5. 使用ZonedDateTime进行四舍五入","slug":"_5-使用zoneddatetime进行四舍五入","link":"#_5-使用zoneddatetime进行四舍五入","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719528736000,"updatedTime":1719528736000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.02,"words":1207},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-Round the Date in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在Java中处理日期时，我们可能需要将它们四舍五入到特定的单位，比如小时、天或月份。这提供了诸如为分析和报告目的聚合数据以及允许指定显示信息的详细程度等好处。</p>\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将学习如何使用<code>java.util.Date</code>、<code>LocalDateTime</code>和<code>ZonedDateTime</code>对日期进行四舍五入。</p>\\n<h2>2. 基本四舍五入</h2>\\n<p>在基本四舍五入方法中，我们可以截断Java中任何日期的时间部分。具体来说，这意味着将所有时间元素设置为零。以下是我们可以做到这一点的方法：</p>","autoDesc":true}');export{d as comp,r as data};
