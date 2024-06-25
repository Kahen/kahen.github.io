import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BaMF6Agx.js";const e={},p=t(`<hr><h1 id="java中将字符串日期转换为xmlgregoriancalendar" tabindex="-1"><a class="header-anchor" href="#java中将字符串日期转换为xmlgregoriancalendar"><span>Java中将字符串日期转换为XMLGregorianCalendar</span></a></h1><p>在本教程中，我们将探讨将字符串日期转换为XMLGregorianCalendar的各种方法。</p><p>XML Schema标准为在XML格式中指定日期定义了明确的规则。为了使用这种格式，Java类XMLGregorianCalendar在Java 1.5中引入，代表W3C XML Schema 1.0日期/时间数据类型。</p><p>javax.xml.datatype包中的DatatypeFactory类提供了创建各种XML模式内置类型的工厂方法。我们将使用这个类来生成XMLGregorianCalendar的新实例。</p><h3 id="_3-1-使用标准datatypefactory" tabindex="-1"><a class="header-anchor" href="#_3-1-使用标准datatypefactory"><span>3.1 使用标准DatatypeFactory</span></a></h3><p>以下是使用DatatypeFactory将日期字符串解析为XMLGregorianCalendar的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">XMLGregorianCalendar</span> <span class="token function">usingDatatypeFactoryForDate</span><span class="token punctuation">(</span><span class="token class-name">String</span> dateString<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">DatatypeConfigurationException</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">DatatypeFactory</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newXMLGregorianCalendar</span><span class="token punctuation">(</span>dateString<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，newXMLGregorianCalendar()方法根据XML模式dateTime数据类型从字符串表示的日期创建XMLGregorianCalendar实例。</p><p>让我们通过执行转换来创建XMLGregorianCalendar的实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">givenStringDate_whenUsingDatatypeFactory_thenConvertToXMLGregorianCalendar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">DatatypeConfigurationException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> dateAsString <span class="token operator">=</span> <span class="token string">&quot;2014-04-24&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">XMLGregorianCalendar</span> xmlGregorianCalendar <span class="token operator">=</span> <span class="token class-name">StringDateToXMLGregorianCalendarConverter</span><span class="token punctuation">.</span><span class="token function">usingDatatypeFactoryForDate</span><span class="token punctuation">(</span>dateAsString<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">24</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getDay</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2014</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-使用localdate" tabindex="-1"><a class="header-anchor" href="#_3-2-使用localdate"><span>3.2 使用LocalDate</span></a></h3><p>LocalDate是一个不可变、线程安全的类。此外，LocalDate只能保存日期值，而没有时间组件。在这种方法中，我们首先将字符串日期转换为LocalDate实例，然后再将其转换为XMLGregorianCalendar：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">XMLGregorianCalendar</span> <span class="token function">usingLocalDate</span><span class="token punctuation">(</span><span class="token class-name">String</span> dateAsString<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">DatatypeConfigurationException</span> <span class="token punctuation">{</span>
    <span class="token class-name">LocalDate</span> localDate <span class="token operator">=</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>dateAsString<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">DatatypeFactory</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newXMLGregorianCalendar</span><span class="token punctuation">(</span>localDate<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看以下的测试代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">givenStringDateTime_whenUsingApacheCommonsLang3_thenConvertToXMLGregorianCalendar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">DatatypeConfigurationException</span> <span class="token punctuation">{</span>
    <span class="token class-name">XMLGregorianCalendar</span> xmlGregorianCalendar <span class="token operator">=</span> <span class="token class-name">StringDateToXMLGregorianCalendarConverter</span><span class="token punctuation">.</span><span class="token function">usingLocalDate</span><span class="token punctuation">(</span>dateAsString<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">24</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getDay</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2014</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-1-使用simpledateformat类" tabindex="-1"><a class="header-anchor" href="#_4-1-使用simpledateformat类"><span>4.1 使用SimpleDateFormat类</span></a></h3><p>将带有时间戳的日期转换为XMLGregorianCalendar的传统方法之一是使用SimpleDateFormat类。让我们从dateTimeAsString创建XMLGregorianCalendar的实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">XMLGregorianCalendar</span> <span class="token function">usingSimpleDateFormat</span><span class="token punctuation">(</span><span class="token class-name">String</span> dateTimeAsString<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">DatatypeConfigurationException</span><span class="token punctuation">,</span> <span class="token class-name">ParseException</span> <span class="token punctuation">{</span>
    <span class="token class-name">SimpleDateFormat</span> simpleDateFormat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd&#39;T&#39;HH:mm:ss&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Date</span> date <span class="token operator">=</span> simpleDateFormat<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>dateTimeAsString<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">DatatypeFactory</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newXMLGregorianCalendar</span><span class="token punctuation">(</span>simpleDateFormat<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用SimpleDateFormat解析输入字符串dateTime为Date对象，然后将Date对象重新格式化为字符串，再创建XMLGregorianCalendar实例。</p><p>让我们测试这种方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">givenStringDateTime_whenUsingSimpleDateFormat_thenConvertToXMLGregorianCalendar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">DatatypeConfigurationException</span><span class="token punctuation">,</span> <span class="token class-name">ParseException</span> <span class="token punctuation">{</span>
    <span class="token class-name">XMLGregorianCalendar</span> xmlGregorianCalendar <span class="token operator">=</span> <span class="token class-name">StringDateToXMLGregorianCalendarConverter</span><span class="token punctuation">.</span><span class="token function">usingSimpleDateFormat</span><span class="token punctuation">(</span>dateTimeAsString<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">24</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getDay</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2014</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getHour</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">45</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getMinute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getSecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-使用gregoriancalendar类" tabindex="-1"><a class="header-anchor" href="#_4-2-使用gregoriancalendar类"><span>4.2 使用GregorianCalendar类</span></a></h3><p>GregorianCalendar是java.util.Calendar抽象类的具体实现。让我们使用GregorianCalendar类将字符串日期和时间转换为XMLGregorianCalendar：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">XMLGregorianCalendar</span> <span class="token function">usingGregorianCalendar</span><span class="token punctuation">(</span><span class="token class-name">String</span> dateTimeAsString<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">DatatypeConfigurationException</span><span class="token punctuation">,</span> <span class="token class-name">ParseException</span> <span class="token punctuation">{</span>
    <span class="token class-name">GregorianCalendar</span> calendar <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GregorianCalendar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    calendar<span class="token punctuation">.</span><span class="token function">setTime</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd&#39;T&#39;HH:mm:ss&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>dateTimeAsString<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">DatatypeFactory</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newXMLGregorianCalendar</span><span class="token punctuation">(</span>calendar<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们创建GregorianCalendar的实例，并根据解析的Date设置其时间。之后，我们使用DatatypeFactory创建XMLGregorianCalendar实例。让我们测试这种方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">givenStringDateTime_whenUsingGregorianCalendar_thenConvertToXMLGregorianCalendar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">DatatypeConfigurationException</span><span class="token punctuation">,</span> <span class="token class-name">ParseException</span> <span class="token punctuation">{</span>
    <span class="token class-name">XMLGregorianCalendar</span> xmlGregorianCalendar <span class="token operator">=</span> <span class="token class-name">StringDateToXMLGregorianCalendarConverter</span><span class="token punctuation">.</span><span class="token function">usingGregorianCalendar</span><span class="token punctuation">(</span>dateTimeAsString<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">24</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getDay</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2014</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getHour</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">45</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getMinute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getSecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-使用joda-time" tabindex="-1"><a class="header-anchor" href="#_4-3-使用joda-time"><span>4.3 使用Joda-Time</span></a></h3><p>Joda-Time是Java的一个流行的日期和时间操作库，为标准Java日期和时间API提供了一个更直观的替代接口。</p><p>让我们探索如何使用Joda-Time将字符串日期和时间转换为XMLGregorianCalendar：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">XMLGregorianCalendar</span> <span class="token function">usingJodaTime</span><span class="token punctuation">(</span><span class="token class-name">String</span> dateTimeAsString<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">DatatypeConfigurationException</span> <span class="token punctuation">{</span>
    <span class="token class-name">DateTime</span> dateTime <span class="token operator">=</span> <span class="token class-name">DateTime</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>dateTimeAsString<span class="token punctuation">,</span> <span class="token class-name">DateTimeFormat</span><span class="token punctuation">.</span><span class="token function">forPattern</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd&#39;T&#39;HH:mm:ss&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">DatatypeFactory</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newXMLGregorianCalendar</span><span class="token punctuation">(</span>dateTime<span class="token punctuation">.</span><span class="token function">toGregorianCalendar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们从提供的dateTimeAsString值实例化了DateTime对象。这个dateTime对象使用toGregorianCalendar()方法转换为GregorianCalendar实例。最后，我们使用DatatypeFactory类的newXMLGregorianCalendar()方法创建了XMLGregorianCalendar实例。</p><p>让我们测试这种方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">givenStringDateTime_whenUsingJodaTime_thenConvertToXMLGregorianCalendar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">DatatypeConfigurationException</span> <span class="token punctuation">{</span>
    <span class="token class-name">XMLGregorianCalendar</span> xmlGregorianCalendar <span class="token operator">=</span> <span class="token class-name">StringDateToXMLGregorianCalendarConverter</span><span class="token punctuation">.</span><span class="token function">usingJodaTime</span><span class="token punctuation">(</span>dateTimeAsString<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">24</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getDay</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2014</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getHour</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">45</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getMinute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> xmlGregorianCalendar<span class="token punctuation">.</span><span class="token function">getSecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这个快速教程中，我们讨论了将字符串日期转换为XMLGregorianCalendar实例的各种方法。</p><p>正如往常一样，本文的完整代码示例可以在GitHub上找到。</p>`,37),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-23-Convert String Date to XMLGregorianCalendar in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Convert%20String%20Date%20to%20XMLGregorianCalendar%20in%20Java.html","title":"Java中将字符串日期转换为XMLGregorianCalendar","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Java","XMLGregorianCalendar"],"tag":["String Date Conversion","XML Schema"],"head":[["meta",{"name":"keywords","content":"Java, XMLGregorianCalendar, Date Conversion"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Convert%20String%20Date%20to%20XMLGregorianCalendar%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将字符串日期转换为XMLGregorianCalendar"}],["meta",{"property":"og:description","content":"Java中将字符串日期转换为XMLGregorianCalendar 在本教程中，我们将探讨将字符串日期转换为XMLGregorianCalendar的各种方法。 XML Schema标准为在XML格式中指定日期定义了明确的规则。为了使用这种格式，Java类XMLGregorianCalendar在Java 1.5中引入，代表W3C XML Schem..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T03:31:37.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"String Date Conversion"}],["meta",{"property":"article:tag","content":"XML Schema"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T03:31:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将字符串日期转换为XMLGregorianCalendar\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T03:31:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将字符串日期转换为XMLGregorianCalendar 在本教程中，我们将探讨将字符串日期转换为XMLGregorianCalendar的各种方法。 XML Schema标准为在XML格式中指定日期定义了明确的规则。为了使用这种格式，Java类XMLGregorianCalendar在Java 1.5中引入，代表W3C XML Schem..."},"headers":[{"level":3,"title":"3.1 使用标准DatatypeFactory","slug":"_3-1-使用标准datatypefactory","link":"#_3-1-使用标准datatypefactory","children":[]},{"level":3,"title":"3.2 使用LocalDate","slug":"_3-2-使用localdate","link":"#_3-2-使用localdate","children":[]},{"level":3,"title":"4.1 使用SimpleDateFormat类","slug":"_4-1-使用simpledateformat类","link":"#_4-1-使用simpledateformat类","children":[]},{"level":3,"title":"4.2 使用GregorianCalendar类","slug":"_4-2-使用gregoriancalendar类","link":"#_4-2-使用gregoriancalendar类","children":[]},{"level":3,"title":"4.3 使用Joda-Time","slug":"_4-3-使用joda-time","link":"#_4-3-使用joda-time","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719113497000,"updatedTime":1719113497000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.96,"words":888},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Convert String Date to XMLGregorianCalendar in Java.md","localizedDate":"2024年6月23日","excerpt":"<hr>\\n<h1>Java中将字符串日期转换为XMLGregorianCalendar</h1>\\n<p>在本教程中，我们将探讨将字符串日期转换为XMLGregorianCalendar的各种方法。</p>\\n<p>XML Schema标准为在XML格式中指定日期定义了明确的规则。为了使用这种格式，Java类XMLGregorianCalendar在Java 1.5中引入，代表W3C XML Schema 1.0日期/时间数据类型。</p>\\n<p>javax.xml.datatype包中的DatatypeFactory类提供了创建各种XML模式内置类型的工厂方法。我们将使用这个类来生成XMLGregorianCalendar的新实例。</p>","autoDesc":true}');export{k as comp,d as data};
