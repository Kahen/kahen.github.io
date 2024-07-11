import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-bN4DcMMr.js";const e={},p=t(`<h1 id="使用java中的当前时间作为文件名" tabindex="-1"><a class="header-anchor" href="#使用java中的当前时间作为文件名"><span>使用Java中的当前时间作为文件名</span></a></h1><p>在本教程中，我们将探讨Java中获取当前时间戳值的几种方法，并将其用作文件名。为了实现我们的目标，我们将利用Java DateTime API中的几个类以及第三方库如Joda-Time。</p><h2 id="_2-初始设置" tabindex="-1"><a class="header-anchor" href="#_2-初始设置"><span>2. 初始设置</span></a></h2><p>在后续部分，我们将构建几个测试用例，展示每种获取当前时间戳并将其用作文件名的方法。</p><p>然而，为了将时间戳值转换为指定的字符串格式，我们首先需要指定时间戳格式，然后使用它来定义格式化器类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">TIMESTAMP_FORMAT</span> <span class="token operator">=</span> <span class="token string">&quot;yyyyMMddHHmmss&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">DateTimeFormatter</span> <span class="token constant">DATETIME_FORMATTER</span> <span class="token operator">=</span> <span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token constant">TIMESTAMP_FORMAT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">SimpleDateFormat</span> <span class="token constant">SIMPLEDATE_FORMAT</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span><span class="token constant">TIMESTAMP_FORMAT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将编写一个方法，将当前时间值转换为有效的文件名。这个方法的示例输出将看起来像“<em>20231209122307.txt</em>”：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">getFileName</span><span class="token punctuation">(</span><span class="token class-name">String</span> currentTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">MessageFormat</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;{0}.txt&quot;</span><span class="token punctuation">,</span> currentTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们正在编写测试用例，我们将创建另一个方法来检查输出的文件名是否包含具有正确格式的时间戳：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">verifyFileName</span><span class="token punctuation">(</span><span class="token class-name">String</span> fileName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Pattern</span>
      <span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;[0-9]{14}+\\\\.txt&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token constant">CASE_INSENSITIVE</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们的文件名由表示时间戳的数字组成。<strong>建议确保文件名格式避免使用在文件名中禁止使用的特殊字符</strong>，这些字符因操作系统而异。</p><h2 id="_3-使用java-datetime-api获取当前时间" tabindex="-1"><a class="header-anchor" href="#_3-使用java-datetime-api获取当前时间"><span>3. 使用Java DateTime API获取当前时间</span></a></h2><p>Java提供了诸如_Calendar_和_Date_之类的旧版类来处理日期和时间信息。然而，由于设计缺陷，在Java 8中引入了新的类。<strong><em>Date</em>、_Calendar_和_SimpleDateFormatter_类是可变的，并且不是线程安全的。</strong></p><p>我们将首先查看_Calendar_和_Date_等旧版类来生成时间，并基本了解，然后是Java 8 DateTime API类，如_Instant, LocalDateTime, ZonedDateTime_和_OffsetDateTime_。</p><p><strong>对于较新的Java程序，建议使用Java 8 DateTime API类而不是旧版Java日期和时间类。</strong></p><h3 id="_3-1-使用-calendar" tabindex="-1"><a class="header-anchor" href="#_3-1-使用-calendar"><span>3.1. 使用_Calendar_</span></a></h3><p>最基础的方法是使用_Calendar.getInstance()_方法，它使用默认时区和区域设置返回一个_Calendar_实例。此外，_getTime()_方法为我们提供了毫秒时间值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingCalender_thenGetCurrentTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> currentTime <span class="token operator">=</span> <span class="token constant">SIMPLEDATE_FORMAT</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> fileName <span class="token operator">=</span> <span class="token function">getFileName</span><span class="token punctuation">(</span>currentTime<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">verifyFileName</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_SimpleDateFormatter_类可以将时间值转换为适当的时间戳格式。</p><h3 id="_3-2-使用-date" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-date"><span>3.2. 使用_Date_</span></a></h3><p>类似地，我们可以构造一个_Date_类的对象，该对象以毫秒为单位表示对象的创建时间。_SimpleDateFormatter_将毫秒时间值转换为所需的字符串模式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingDate_thenGetCurrentTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> currentTime <span class="token operator">=</span> <span class="token constant">SIMPLEDATE_FORMAT</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> fileName <span class="token operator">=</span> <span class="token function">getFileName</span><span class="token punctuation">(</span>currentTime<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">verifyFileName</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>建议使用我们将在下一节中看到的新的Java 8类。</strong></p><h3 id="_3-3-使用-instant" tabindex="-1"><a class="header-anchor" href="#_3-3-使用-instant"><span>3.3. 使用_Instant_</span></a></h3><p>在Java中，_Instant_类表示UTC时间线上的单一时刻：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingInstant_thenGetCurrentTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> currentTime <span class="token operator">=</span> <span class="token class-name">Instant</span>
      <span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">truncatedTo</span><span class="token punctuation">(</span><span class="token class-name">ChronoUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;[:TZ-]&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> fileName <span class="token operator">=</span> <span class="token function">getFileName</span><span class="token punctuation">(</span>currentTime<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">verifyFileName</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_Instant.now()_方法要求系统时钟提供当前瞬间。我们可以使用_truncatedTo()_方法将值四舍五入到最接近的秒。然后可以将秒值转换为字符串，以替换时间戳中的任何不需要的时区信息。</p><h3 id="_3-4-使用-localdatetime" tabindex="-1"><a class="header-anchor" href="#_3-4-使用-localdatetime"><span>3.4. 使用_LocalDateTime_</span></a></h3><p>_LocalDateTime_表示ISO-8601日历系统中没有时区的日期和一天中的时间：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingLocalDateTime_thenGetCurrentTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> currentTime <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token constant">DATETIME_FORMATTER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> fileName <span class="token operator">=</span> <span class="token function">getFileName</span><span class="token punctuation">(</span>currentTime<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">verifyFileName</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_LocalDateTime.now()_方法查询默认系统时钟以提供日期时间信息。然后我们可以传递一个_DateTimeFormatter_将时间戳格式化为字符串。</p><h3 id="_3-5-使用-zoneddatetime" tabindex="-1"><a class="header-anchor" href="#_3-5-使用-zoneddatetime"><span>3.5. 使用_ZonedDateTime_</span></a></h3><p>_ZonedDateTime_是一个不可变的日期时间表示，带有时区：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingZonedDateTime_thenGetCurrentTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> currentTime <span class="token operator">=</span> <span class="token class-name">ZonedDateTime</span>
      <span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Europe/Paris&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token constant">DATETIME_FORMATTER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> fileName <span class="token operator">=</span> <span class="token function">getFileName</span><span class="token punctuation">(</span>currentTime<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">verifyFileName</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**时区标识符能够唯一地识别地球上特定的地理位置，例如“<em>Europe/Paris</em>”。**使用这个标识，我们可以获取_ZoneId_，它决定了将Instant转换为_LocalDateTime_时使用的时区。</p><p><strong>_ZonedDateTime_自动处理一年中夏令时(DST)的调整。</strong></p><h3 id="_3-6-使用-offsetdatetime" tabindex="-1"><a class="header-anchor" href="#_3-6-使用-offsetdatetime"><span>3.6. 使用_OffsetDateTime_</span></a></h3><p><em>OffsetDateTime_是_ZonedDateTime_的简化版本，它忽略了时区。世界各地的时区偏移量不同。例如，“</em>+2:00_”表示比UTC晚两个小时的时区。我们可以使用_Offset_中的偏移值来改变UTC的默认时间：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingOffsetDateTime_thenGetCurrentTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> currentTime <span class="token operator">=</span> <span class="token class-name">OffsetDateTime</span>
      <span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">ZoneOffset</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;+02:00&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token constant">DATETIME_FORMATTER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> fileName <span class="token operator">=</span> <span class="token function">getFileName</span><span class="token punctuation">(</span>currentTime<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">verifyFileName</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_ZonedDateTime_和_OffsetDateTime_都存储了时间线上的一个瞬间，精度高达纳秒。了解它们之间的区别有助于我们在它们之间做出选择。</p><h2 id="_4-使用joda-time获取当前时间" tabindex="-1"><a class="header-anchor" href="#_4-使用joda-time获取当前时间"><span>4. 使用Joda-Time获取当前时间</span></a></h2><p>Joda-Time是一个著名的日期和时间处理库。它是开发者中最流行的库之一，作为麻烦的旧版Java类的替代品。<strong>它使用不可变类处理日期和时间值。</strong></p><p>让我们在_pom.xml_中添加Joda-Time Maven依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`joda-time\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`joda-time\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`2.12.5\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-1-使用joda-datetime" tabindex="-1"><a class="header-anchor" href="#_4-1-使用joda-datetime"><span>4.1. 使用Joda <em>DateTime</em></span></a></h3><p><em>DateTime.now()<em>方法获取一个设置为当前系统毫秒时间的_DateTime</em>，使用默认时区。然后我们可以将其转换为具有定义的时间戳格式的_String</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingJodaTime_thenGetCurrentTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> currentTime <span class="token operator">=</span> <span class="token class-name">DateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token constant">TIMESTAMP_FORMAT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> fileName <span class="token operator">=</span> <span class="token function">getFileName</span><span class="token punctuation">(</span>currentTime<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">verifyFileName</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-使用joda-instant" tabindex="-1"><a class="header-anchor" href="#_4-2-使用joda-instant"><span>4.2. 使用Joda <em>Instant</em></span></a></h3><p>Joda-Time库还提供了_Instant_类来捕捉当前时间线的时刻。我们可以使用_DateTimeFormat_将时间戳转换为所需的字符串模式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingJodaTimeInstant_thenGetCurrentTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> currentTime <span class="token operator">=</span> <span class="token class-name">DateTimeFormat</span>
      <span class="token punctuation">.</span><span class="token function">forPattern</span><span class="token punctuation">(</span><span class="token constant">TIMESTAMP_FORMAT</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span>Instant</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toDateTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> fileName <span class="token operator">=</span> <span class="token function">getFileName</span><span class="token punctuation">(</span>currentTime<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">verifyFileName</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们发现了Java程序中获取当前时间戳的多种方法，并利用它们生成文件名。我们通过使用各种Java DateTime API类和Joda-Time库获取了当前时间戳。</p><p>如常，本文的完整代码可以在GitHub上找到。</p>`,53),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-23-Using Current Time as Filename in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Using%20Current%20Time%20as%20Filename%20in%20Java.html","title":"使用Java中的当前时间作为文件名","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Java","编程"],"tag":["Java","文件名","当前时间"],"head":[["meta",{"name":"keywords","content":"Java, 文件名, 当前时间, 教程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Using%20Current%20Time%20as%20Filename%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Java中的当前时间作为文件名"}],["meta",{"property":"og:description","content":"使用Java中的当前时间作为文件名 在本教程中，我们将探讨Java中获取当前时间戳值的几种方法，并将其用作文件名。为了实现我们的目标，我们将利用Java DateTime API中的几个类以及第三方库如Joda-Time。 2. 初始设置 在后续部分，我们将构建几个测试用例，展示每种获取当前时间戳并将其用作文件名的方法。 然而，为了将时间戳值转换为指定..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T22:31:20.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"文件名"}],["meta",{"property":"article:tag","content":"当前时间"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T22:31:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Java中的当前时间作为文件名\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T22:31:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Java中的当前时间作为文件名 在本教程中，我们将探讨Java中获取当前时间戳值的几种方法，并将其用作文件名。为了实现我们的目标，我们将利用Java DateTime API中的几个类以及第三方库如Joda-Time。 2. 初始设置 在后续部分，我们将构建几个测试用例，展示每种获取当前时间戳并将其用作文件名的方法。 然而，为了将时间戳值转换为指定..."},"headers":[{"level":2,"title":"2. 初始设置","slug":"_2-初始设置","link":"#_2-初始设置","children":[]},{"level":2,"title":"3. 使用Java DateTime API获取当前时间","slug":"_3-使用java-datetime-api获取当前时间","link":"#_3-使用java-datetime-api获取当前时间","children":[{"level":3,"title":"3.1. 使用_Calendar_","slug":"_3-1-使用-calendar","link":"#_3-1-使用-calendar","children":[]},{"level":3,"title":"3.2. 使用_Date_","slug":"_3-2-使用-date","link":"#_3-2-使用-date","children":[]},{"level":3,"title":"3.3. 使用_Instant_","slug":"_3-3-使用-instant","link":"#_3-3-使用-instant","children":[]},{"level":3,"title":"3.4. 使用_LocalDateTime_","slug":"_3-4-使用-localdatetime","link":"#_3-4-使用-localdatetime","children":[]},{"level":3,"title":"3.5. 使用_ZonedDateTime_","slug":"_3-5-使用-zoneddatetime","link":"#_3-5-使用-zoneddatetime","children":[]},{"level":3,"title":"3.6. 使用_OffsetDateTime_","slug":"_3-6-使用-offsetdatetime","link":"#_3-6-使用-offsetdatetime","children":[]}]},{"level":2,"title":"4. 使用Joda-Time获取当前时间","slug":"_4-使用joda-time获取当前时间","link":"#_4-使用joda-time获取当前时间","children":[{"level":3,"title":"4.1. 使用Joda DateTime","slug":"_4-1-使用joda-datetime","link":"#_4-1-使用joda-datetime","children":[]},{"level":3,"title":"4.2. 使用Joda Instant","slug":"_4-2-使用joda-instant","link":"#_4-2-使用joda-instant","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719181880000,"updatedTime":1719181880000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.91,"words":1472},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Using Current Time as Filename in Java.md","localizedDate":"2024年6月24日","excerpt":"\\n<p>在本教程中，我们将探讨Java中获取当前时间戳值的几种方法，并将其用作文件名。为了实现我们的目标，我们将利用Java DateTime API中的几个类以及第三方库如Joda-Time。</p>\\n<h2>2. 初始设置</h2>\\n<p>在后续部分，我们将构建几个测试用例，展示每种获取当前时间戳并将其用作文件名的方法。</p>\\n<p>然而，为了将时间戳值转换为指定的字符串格式，我们首先需要指定时间戳格式，然后使用它来定义格式化器类：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">String</span> <span class=\\"token constant\\">TIMESTAMP_FORMAT</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"yyyyMMddHHmmss\\"</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">DateTimeFormatter</span> <span class=\\"token constant\\">DATETIME_FORMATTER</span> <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">DateTimeFormatter</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">ofPattern</span><span class=\\"token punctuation\\">(</span><span class=\\"token constant\\">TIMESTAMP_FORMAT</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">SimpleDateFormat</span> <span class=\\"token constant\\">SIMPLEDATE_FORMAT</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">SimpleDateFormat</span><span class=\\"token punctuation\\">(</span><span class=\\"token constant\\">TIMESTAMP_FORMAT</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
