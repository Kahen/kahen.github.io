import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CJGTm_7y.js";const e={},p=t(`<hr><h1 id="java中localdatetime与zoneddatetime的转换" tabindex="-1"><a class="header-anchor" href="#java中localdatetime与zoneddatetime的转换"><span>Java中LocalDateTime与ZonedDateTime的转换</span></a></h1><p>Java中的_LocalDateTime_ API用于表示和操作日期和时间的组合。_ZonedDateTime_是一个不可变对象，它持有一个精确到纳秒的日期时间值，一个基于ISO 8601日历系统的时间区值，以及一个_ZoneOffSet_来处理模糊的本地日期时间。</p><p>在本教程中，我们将看到如何从_LocalDateTime_转换到_ZonedDateTime_以及反过来。</p><p>让我们从将_LocalDateTime_的实例转换为_ZonedDateTime_开始。</p><h3 id="_2-1-使用-atzone-方法" tabindex="-1"><a class="header-anchor" href="#_2-1-使用-atzone-方法"><span>2.1 使用_atZone()_方法</span></a></h3><p><strong>来自_LocalDateTime_实例的_atZone()_方法执行转换到_ZonedDateTime_并保持相同的日期时间值</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">LocalDateTime</span> localDateTime <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2022</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ZonedDateTime</span> zonedDateTime <span class="token operator">=</span> localDateTime<span class="token punctuation">.</span><span class="token function">atZone</span><span class="token punctuation">(</span><span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Canada/Atlantic&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span>localDateTime<span class="token punctuation">.</span><span class="token function">getYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> zonedDateTime<span class="token punctuation">.</span><span class="token function">getYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>localDateTime<span class="token punctuation">.</span><span class="token function">getMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> zonedDateTime<span class="token punctuation">.</span><span class="token function">getMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>localDateTime<span class="token punctuation">.</span><span class="token function">getDayOfMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> zonedDateTime<span class="token punctuation">.</span><span class="token function">getDayOfMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>localDateTime<span class="token punctuation">.</span><span class="token function">getHour</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> zonedDateTime<span class="token punctuation">.</span><span class="token function">getHour</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>localDateTime<span class="token punctuation">.</span><span class="token function">getMinute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> zonedDateTime<span class="token punctuation">.</span><span class="token function">getMinute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>localDateTime<span class="token punctuation">.</span><span class="token function">getSecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> zonedDateTime<span class="token punctuation">.</span><span class="token function">getSecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_atZone()_方法接收一个_ZoneId_值，该值指定基于ISO 8601日历系统的时间区。</p><p><strong>调用_withZoneSameInstant()_方法使用_ZoneOffSet_时间差转换为实际的日期时间值</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">LocalDateTime</span> localDateTime <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2022</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ZonedDateTime</span> zonedDateTime <span class="token operator">=</span> localDateTime<span class="token punctuation">.</span><span class="token function">atZone</span><span class="token punctuation">(</span><span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Africa/Lagos&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withZoneSameInstant</span><span class="token punctuation">(</span><span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Canada/Atlantic&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;2021-12-31T19:30:22-04:00[Canada/Atlantic]&quot;</span><span class="token punctuation">,</span> zonedDateTime<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;-04:00&quot;</span><span class="token punctuation">,</span> zonedDateTime<span class="token punctuation">.</span><span class="token function">getOffset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以通过调用静态_ZoneId.getAvailableZoneIds()<em>方法来获取可用的_ZoneId_s。此方法返回所有可用的基于地区的ID作为_String</em>，我们可以选择它们来创建一个_ZoneId_对象。</p><p>此外，使用_atZone()<em>的转换还带有_ZoneOffSet_值，提供_UTC (GMT)<em>和_ZonedDateTime_对象之间的时间差（如上例中的</em>-04:00</em>）。</p><h3 id="_2-2-使用-zoneddatetime-of-方法" tabindex="-1"><a class="header-anchor" href="#_2-2-使用-zoneddatetime-of-方法"><span>2.2 使用_ZonedDateTime.of()_方法</span></a></h3><p>_ZonedDateTime_类还提供了一个静态_of()_方法来创建一个_ZonedDateTime_对象。该方法接受_LocalDateTime_和_ZoneId_作为参数，并返回一个_ZonedDateTime_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">LocalDateTime</span> localDateTime <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2022</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ZonedDateTime</span> zonedDateTime <span class="token operator">=</span> <span class="token class-name">ZonedDateTime</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>localDateTime<span class="token punctuation">,</span> <span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Africa/Accra&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withZoneSameInstant</span><span class="token punctuation">(</span><span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Africa/Lagos&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;2022-11-05T08:30:22+01:00[Africa/Lagos]&quot;</span><span class="token punctuation">,</span> zonedDateTime<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>localDateTime<span class="token punctuation">.</span><span class="token function">getYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> zonedDateTime<span class="token punctuation">.</span><span class="token function">getYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，正如我们之前看到的，我们可以通过调用_withZoneSameInstant()_方法来获取给定区域的实际日期时间值。</p><h3 id="_2-3-使用-zoneddatetime-ofinstant-方法" tabindex="-1"><a class="header-anchor" href="#_2-3-使用-zoneddatetime-ofinstant-方法"><span>2.3 使用_ZonedDateTime.ofInstant()_方法</span></a></h3><p>我们还可以使用_ZoneOffSet_对象结合_LocalDateTime_来创建一个_ZonedDateTime_对象。</p><p>静态_ofInstant()<em>方法接受_LocalDateTime</em>、_ZoneOffSet_和_ZoneId_对象作为参数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">LocalDateTime</span> localDateTime <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2022</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ZoneId</span> zoneId <span class="token operator">=</span> <span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Africa/Lagos&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ZoneOffset</span> zoneOffset <span class="token operator">=</span> zoneId<span class="token punctuation">.</span><span class="token function">getRules</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getOffset</span><span class="token punctuation">(</span>localDateTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ZonedDateTime</span> zonedDateTime <span class="token operator">=</span> <span class="token class-name">ZonedDateTime</span><span class="token punctuation">.</span><span class="token function">ofInstant</span><span class="token punctuation">(</span>localDateTime<span class="token punctuation">,</span> zoneOffset<span class="token punctuation">,</span> zoneId<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;2022-01-05T17:30:22+01:00[Africa/Lagos]&quot;</span><span class="token punctuation">,</span> zonedDateTime<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>_ZonedDateTime_对象是由隐式形成的_Instant_对象创建的，该对象通过结合_LocalDateTime_和_ZoneOffSet_对象形成</strong>。</p><h3 id="_2-4-使用-zoneddatetime-oflocal-方法" tabindex="-1"><a class="header-anchor" href="#_2-4-使用-zoneddatetime-oflocal-方法"><span>2.4 使用_ZonedDateTime.ofLocal()_方法</span></a></h3><p>静态_ofLocal()<em>方法从_LocalDateTime_对象和作为参数传递的首选_ZoneOffSet_对象创建一个_ZonedDateTime</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">LocalDateTime</span> localDateTime <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2022</span><span class="token punctuation">,</span> <span class="token number">8</span> <span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">35</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ZoneId</span> zoneId <span class="token operator">=</span> <span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Africa/Lagos&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ZoneOffset</span> zoneOffset <span class="token operator">=</span> zoneId<span class="token punctuation">.</span><span class="token function">getRules</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getOffset</span><span class="token punctuation">(</span>localDateTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ZonedDateTime</span> zonedDateTime <span class="token operator">=</span> <span class="token class-name">ZonedDateTime</span><span class="token punctuation">.</span><span class="token function">ofLocal</span><span class="token punctuation">(</span>localDateTime<span class="token punctuation">,</span> zoneId<span class="token punctuation">,</span> zoneOffset<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;2022-08-25T08:35:22+01:00[Africa/Lagos]&quot;</span><span class="token punctuation">,</span> zonedDateTime<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>通常，对于一个本地日期时间只有一个有效的偏移量</strong>。当发生时间重叠时，就会有两个有效的偏移量。</p><p>如果作为参数传递的首选_ZoneOffset_是有效的偏移量之一，则使用它。否则，转换将保持之前的有效偏移量。</p><h3 id="_2-5-使用-zoneddatetime-ofstrict-方法" tabindex="-1"><a class="header-anchor" href="#_2-5-使用-zoneddatetime-ofstrict-方法"><span>2.5 使用_ZonedDateTime.ofStrict()_方法</span></a></h3><p>类似地，静态_ofStrict()<em>方法通过严格验证_LocalDateTime</em>、_ZoneOffSet_和_ZoneID_参数的组合返回一个_ZonedDateTime_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">LocalDateTime</span> localDateTime <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2022</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ZoneId</span> zoneId <span class="token operator">=</span> <span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Asia/Tokyo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ZoneOffset</span> zoneOffset <span class="token operator">=</span> zoneId<span class="token punctuation">.</span><span class="token function">getRules</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getOffset</span><span class="token punctuation">(</span>localDateTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ZonedDateTime</span> zonedDateTime <span class="token operator">=</span> <span class="token class-name">ZonedDateTime</span><span class="token punctuation">.</span><span class="token function">ofStrict</span><span class="token punctuation">(</span>localDateTime<span class="token punctuation">,</span> zoneOffset<span class="token punctuation">,</span> zoneId<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;2002-12-25T06:18:02+09:00[Asia/Tokyo]&quot;</span><span class="token punctuation">,</span> zonedDateTime<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果提供无效的参数组合，该方法将抛出一个_DateTimeException_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>zoneId <span class="token operator">=</span> <span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Asia/Tokyo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
zoneOffset <span class="token operator">=</span> <span class="token class-name">ZoneOffset</span><span class="token punctuation">.</span><span class="token constant">UTC</span><span class="token punctuation">;</span>
<span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">DateTimeException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">ZonedDateTime</span><span class="token punctuation">.</span><span class="token function">ofStrict</span><span class="token punctuation">(</span>localDateTime<span class="token punctuation">,</span> zoneOffset<span class="token punctuation">,</span> zoneId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述示例显示，当我们尝试使用_Asia/Tokyo_的_ZoneId_和表示默认_UTC (GMT + 0)_的_ZoneOffSet_值的组合来创建一个_ZonedDateTime_对象时，会抛出异常。</p><h2 id="_3-将-zoneddatetime-转换为-localdatetime" tabindex="-1"><a class="header-anchor" href="#_3-将-zoneddatetime-转换为-localdatetime"><span>3. 将_ZonedDateTime_转换为_LocalDateTime_</span></a></h2><p>一个_ZonedDateTime_对象维护三个不同的对象：一个_LocalDateTime_、一个_ZoneId_和一个_ZoneOffset_。</p><p>我们可以使用_toLocalDateTime()<em>方法将_ZonedDateTime_的实例转换为_LocalDateTime</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ZonedDateTime</span> zonedDateTime <span class="token operator">=</span> <span class="token class-name">ZonedDateTime</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2011</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">58086000</span><span class="token punctuation">,</span> <span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Asia/Tokyo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">LocalDateTime</span> localDateTime <span class="token operator">=</span> zonedDateTime<span class="token punctuation">.</span><span class="token function">toLocalDateTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;2011-02-12T06:14:01.058086+09:00[Asia/Tokyo]&quot;</span><span class="token punctuation">,</span> zonedDateTime<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法检索作为_ZonedDateTime_属性存储的_LocalDateTime_对象。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们学习了如何将_LocalDateTime_的实例转换为_ZonedDateTime_以及反过来。</p><p>如常，示例的源代码可在GitHub上获取。</p>`,44),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-12-Convert Between LocalDateTime and ZonedDateTime.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Convert%20Between%20LocalDateTime%20and%20ZonedDateTime.html","title":"Java中LocalDateTime与ZonedDateTime的转换","lang":"zh-CN","frontmatter":{"date":"2024-07-12T00:00:00.000Z","category":["Java","DateTime API"],"tag":["LocalDateTime","ZonedDateTime"],"head":[["meta",{"name":"keywords","content":"Java, LocalDateTime, ZonedDateTime, 转换"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Convert%20Between%20LocalDateTime%20and%20ZonedDateTime.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中LocalDateTime与ZonedDateTime的转换"}],["meta",{"property":"og:description","content":"Java中LocalDateTime与ZonedDateTime的转换 Java中的_LocalDateTime_ API用于表示和操作日期和时间的组合。_ZonedDateTime_是一个不可变对象，它持有一个精确到纳秒的日期时间值，一个基于ISO 8601日历系统的时间区值，以及一个_ZoneOffSet_来处理模糊的本地日期时间。 在本教程中，我..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T03:43:31.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"LocalDateTime"}],["meta",{"property":"article:tag","content":"ZonedDateTime"}],["meta",{"property":"article:published_time","content":"2024-07-12T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T03:43:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中LocalDateTime与ZonedDateTime的转换\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-12T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T03:43:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中LocalDateTime与ZonedDateTime的转换 Java中的_LocalDateTime_ API用于表示和操作日期和时间的组合。_ZonedDateTime_是一个不可变对象，它持有一个精确到纳秒的日期时间值，一个基于ISO 8601日历系统的时间区值，以及一个_ZoneOffSet_来处理模糊的本地日期时间。 在本教程中，我..."},"headers":[{"level":3,"title":"2.1 使用_atZone()_方法","slug":"_2-1-使用-atzone-方法","link":"#_2-1-使用-atzone-方法","children":[]},{"level":3,"title":"2.2 使用_ZonedDateTime.of()_方法","slug":"_2-2-使用-zoneddatetime-of-方法","link":"#_2-2-使用-zoneddatetime-of-方法","children":[]},{"level":3,"title":"2.3 使用_ZonedDateTime.ofInstant()_方法","slug":"_2-3-使用-zoneddatetime-ofinstant-方法","link":"#_2-3-使用-zoneddatetime-ofinstant-方法","children":[]},{"level":3,"title":"2.4 使用_ZonedDateTime.ofLocal()_方法","slug":"_2-4-使用-zoneddatetime-oflocal-方法","link":"#_2-4-使用-zoneddatetime-oflocal-方法","children":[]},{"level":3,"title":"2.5 使用_ZonedDateTime.ofStrict()_方法","slug":"_2-5-使用-zoneddatetime-ofstrict-方法","link":"#_2-5-使用-zoneddatetime-ofstrict-方法","children":[]},{"level":2,"title":"3. 将_ZonedDateTime_转换为_LocalDateTime_","slug":"_3-将-zoneddatetime-转换为-localdatetime","link":"#_3-将-zoneddatetime-转换为-localdatetime","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720755811000,"updatedTime":1720755811000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.53,"words":1059},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Convert Between LocalDateTime and ZonedDateTime.md","localizedDate":"2024年7月12日","excerpt":"<hr>\\n<h1>Java中LocalDateTime与ZonedDateTime的转换</h1>\\n<p>Java中的_LocalDateTime_ API用于表示和操作日期和时间的组合。_ZonedDateTime_是一个不可变对象，它持有一个精确到纳秒的日期时间值，一个基于ISO 8601日历系统的时间区值，以及一个_ZoneOffSet_来处理模糊的本地日期时间。</p>\\n<p>在本教程中，我们将看到如何从_LocalDateTime_转换到_ZonedDateTime_以及反过来。</p>\\n<p>让我们从将_LocalDateTime_的实例转换为_ZonedDateTime_开始。</p>","autoDesc":true}');export{d as comp,m as data};
