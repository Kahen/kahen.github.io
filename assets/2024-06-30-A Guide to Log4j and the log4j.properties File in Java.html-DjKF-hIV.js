import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as n,a as l}from"./app-Ckd2YV4o.js";const t={},i=l(`<h1 id="log4j和java中log4j-properties文件指南" tabindex="-1"><a class="header-anchor" href="#log4j和java中log4j-properties文件指南"><span>Log4j和Java中log4j.properties文件指南</span></a></h1><p>Log4J是一个流行的开源日志框架，用Java编写。各种基于Java的应用程序广泛使用Log4j。此外，它是线程安全的，快速的，并提供了一个命名的_Logger_层级结构。Log4j在开源Apache软件许可下分发。</p><p><strong>Log4j 1.x在2015年8月5日达到了生命周期的终点。因此，到目前为止，Log4j2是Log4j的最新升级。</strong></p><p>在本教程中，我们将学习Log4j以及如何使用Java中的_log4j.properties_文件配置核心Log4j组件。</p><h2 id="_2-maven设置" tabindex="-1"><a class="header-anchor" href="#_2-maven设置"><span>2. Maven设置</span></a></h2><p>我们需要在_pom.xml_中加入_log4j-core_依赖项来开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`org.apache.logging.log4j\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`log4j-api\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`1.2.17\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以在此处找到_log4j-core_的最新版本。</p><h2 id="_3-log4j-api" tabindex="-1"><a class="header-anchor" href="#_3-log4j-api"><span>3. Log4j API</span></a></h2><p>Log4j API提供了一种机制，可以根据各种优先级级别传递日志信息，并将它们定向到各种目的地，如文件、控制台、数据库等。它还支持在将日志事件传递给_logger_或_appender_之前进行过滤。</p><p>Log4j API具有分层架构，提供了Log4j框架中的两种类型的对象——核心对象和支持对象。</p><h2 id="_4-log4j组件" tabindex="-1"><a class="header-anchor" href="#_4-log4j组件"><span>4. Log4j组件</span></a></h2><p>Log4j有三个主要组件——<em>logger</em>、<em>appender_和_layout</em>——可以一起使用，以在所需的目的地打印自定义的日志语句。让我们简要地看看它们。</p><h3 id="_4-1-logger" tabindex="-1"><a class="header-anchor" href="#_4-1-logger"><span>4.1. <em>Logger</em></span></a></h3><p>_Logger_对象负责表示日志信息。它是Log4j架构中的第一层强制性层。_Logger_类在_package org.apache.log4j_中定义。</p><p>通常，<strong>我们为每个应用程序类创建一个_Logger_实例来记录属于该类的重要事件</strong>。此外，我们通常在类的开头使用一个静态工厂方法创建此实例，该方法接受类名为参数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private static final Logger logger = Logger.getLogger(JavaClass.class.getName());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>随后，我们可以使用_Logger_类的多种方法来记录或打印根据不同类别的重要事件。这些方法是_trace()_、<em>debug()</em>、<em>info()</em>、<em>warn()</em>、<em>error()</em>、<em>fatal()</em>。这些方法决定了日志请求的级别。</p><p><em>Logger_方法的优先级顺序是：<em>TRACE</em> &lt; <em>DEBUG</em> &lt; <em>INFO</em> &lt; <em>WARN</em> &lt; <em>ERROR</em> &lt; <em>FATAL</em>。因此，这些方法根据在_log4j.properties_文件中设置的_logger_级别打印日志消息。这意味着如果我们将_logger_级别设置为_INFO</em>，那么所有的_INFO_、<em>WARN</em>、_ERROR_和_FATAL_事件都将被记录。</p><h3 id="_4-2-appender" tabindex="-1"><a class="header-anchor" href="#_4-2-appender"><span>4.2. <em>Appender</em></span></a></h3><p><em>Appender_表示日志输出的目的地。我们可以使用Log4j将日志输出打印到多个首选目的地，如控制台、文件、远程套接字服务器、数据库等。我们称这些输出目的地为_Appender</em>。此外，我们可以将多个_appender_附加到一个_Logger_。</p><p><em>Appender_根据_appender_累加规则工作。**这条规则规定，任何_Logger_的日志语句的输出将传递到它的所有_appender</em> s及其祖先——** <strong>在层级结构中较高的_appender_ s。</strong></p><p>Log4j为文件、控制台、GUI组件、远程套接字服务器、JMS等定义了多个_appender_。</p><h3 id="_4-3-layout" tabindex="-1"><a class="header-anchor" href="#_4-3-layout"><span>4.3. <em>Layout</em></span></a></h3><p>我们使用_layout_来自定义日志语句的格式。我们可以通过将_layout_与已经定义的_appender_关联来实现这一点。因此，_layout_和_appender_的组合帮助我们将格式化的日志语句发送到所需的目的地。</p><p>我们可以通过使用转换模式来指定日志语句的格式。<strong>类_PatternLayout_更多地解释了我们可以根据需要使用的转换字符。</strong></p><p>我们还将通过以下部分的示例来了解一些转换字符。</p><p>我们可以使用XML或属性文件配置Log4j。_log4j.properties_文件以键值对的形式存储配置。</p><p>log4j属性配置文件的默认名称是_log4j.properties_。_Logger_在_CLASSPATH_中查找此文件名。然而，<strong>如果我们需要使用不同的配置文件名，我们可以使用系统属性_log4j.configuration_来设置。</strong></p><p><em>log4j.properties_文件包含_appender</em> s的规范，它们的名称和类型，以及_layout_模式。它还包含有关默认_root Logger_及其日志级别的规范。</p><h2 id="_6-log4j-properties-文件的语法" tabindex="-1"><a class="header-anchor" href="#_6-log4j-properties-文件的语法"><span>6. _log4j.properties_文件的语法</span></a></h2><p>在一般的_log4j.properties_文件中，我们定义以下配置：</p><ul><li>_root logger_及其级别。我们还在这里为_appender_提供了一个名称。</li><li>然后，我们将一个有效的_appender_分配给定义的appender名称。</li><li>最后，我们为定义的_appender_定义_layout_、目标、级别等。</li></ul><p>让我们看看一般log4.properties文件的语法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code># Root logger with appender name
log4j.rootLogger = DEBUG, NAME

# Assign NAME a valid appender
log4j.appender.NAME = org.apache.log4j.FileAppender

# Define the layout for NAME
log4j.appender.NAME.layout=org.apache.log4j.PatternLayout
log4j.appender.NAME.layout.conversionPattern=%m%n
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，_NAME_是_Appender_的名称。正如前面所讨论的，<strong>我们可以将多个_appender_附加到一个_Logger_来将日志定向到不同的目的地。</strong></p><h2 id="_7-示例" tabindex="-1"><a class="header-anchor" href="#_7-示例"><span>7. 示例</span></a></h2><p>现在，让我们通过一些示例来理解不同_appender_的_log4j.properties_文件配置。</p><h3 id="_7-1-示例程序" tabindex="-1"><a class="header-anchor" href="#_7-1-示例程序"><span>7.1. 示例程序</span></a></h3><p>让我们从一个记录一些消息的示例应用程序开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>import org.apache.log4j.Logger;

public class Log4jExample {

    private static Logger logger = Logger.getLogger(Log4jExample.class);

    public static void main(String[] args) throws InterruptedException {
        for(int i = 1; i &lt;= 2000; i++) {
            logger.info(&quot;This is the &quot; + i + &quot; time I say &#39;Hello World&#39;.&quot;);
            Thread.sleep(100);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该应用程序是一个简单的应用程序——它在循环中写入一些消息，每次迭代之间有短暂的延迟。它有2,000次迭代，每次迭代之间有100毫秒的暂停。因此，执行应该需要大约三个半小时才能完成。我们将在下面的例子中使用这个应用程序。</p><h3 id="_7-2-控制台日志记录" tabindex="-1"><a class="header-anchor" href="#_7-2-控制台日志记录"><span>7.2. 控制台日志记录</span></a></h3><p>如果没有找到配置文件，控制台是记录消息的默认位置。让我们为_console_和_root logger_创建一个_log4j.properties_配置，并为其定义日志级别：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code># Root Logger
log4j.rootLogger=INFO, stdout

# Direct log messages to stdout
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target=System.out
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们定义了一个_log4j.properties_文件，具有以下规格：</p><ul><li>我们定义了_root logger_的级别为_INFO_。这意味着所有级别为_INFO_及以上的日志事件都将被记录。我们还为_appender_定义了一个名称为_stdout_。</li><li>由于我们想要将日志定向到控制台，我们分配了_Appender_为_org.apache.log4j.ConsoleAppender_，并将目标设置为_System.out_。</li><li>最后，我们指定了我们想要打印日志的_PatternLayout_格式，使用_ConversionPattern_。</li></ul><p>让我们也了解一下我们在_ConversionPattern_中使用的每个转换字符的含义：</p><ul><li>_%d_以定义的格式添加时间戳。</li><li>_%-5p_将日志级别信息添加到每个日志语句中。它表示日志事件的优先级应该左对齐到五个字符的宽度。</li><li>_%c{1}_打印限定的类名，后面可以选择性地跟随包名（精度限定符），即记录特定的日志语句。</li><li>_%L_打印特定日志事件的行号。</li><li>_%m_打印实际的日志消息。</li><li>_%n_在每个日志语句后添加一个新行。</li></ul><p>因此，当我们运行我们的示例应用程序时，我们在控制台上得到以下行打印：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>2023-08-01 00:27:25 INFO Log4jExample:15 - This is the 1 time I say &#39;Hello World&#39;.
...
...
2023-08-01 00:27:25 INFO Log4jExample:15 - This is the 2000 time I say &#39;Hello World&#39;.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>_PatternLayout_类的文档根据我们的需求解释了更多的转换字符。</strong></p><h3 id="_7-3-多个destinations" tabindex="-1"><a class="header-anchor" href="#_7-3-多个destinations"><span>7.3. 多个destinations</span></a></h3><p>正如前面所讨论的，我们可以将日志事件重定向到多个目的地：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code># Root logger
log4j.rootLogger=INFO, file, stdout

# Direct to a file
log4j.appender.file=org.apache.log4j.RollingFileAppender
log4j.appender.file.File=C:\\\\Baeldung\\\\app.log
log4j.appender.file.MaxFileSize=5KB
log4j.appender.file.MaxBackupIndex=2
log4j.appender.file.layout=org.apache.log4j.PatternLayout
log4j.appender.file.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n

# Direct to console
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target=System.out
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用了两个_appender_ s将日志消息重定向到文件和控制台。此外，我们还为我们的文件_Appender_分配了一个_RollingFileAppender_。当我们知道日志文件可能会随着时间增长时，我们使用_RollingFileAppender_。</p><p>在上述示例中，<strong>我们使用了_RollingFileAppender_，它根据大小和日志文件的数量使用_MaxFileSize_和_MaxBackupIndex_参数来滚动日志文件。</strong> 因此，当日志文件大小达到5KB时，日志文件将滚动，我们将保留最多两个滚动的日志文件作为备份。</p><p>当我们运行我们的示例应用程序时，我们得到以下包含与前一个示例中相同的日志语句的文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>31/01/2023  10:28    138 app.log
31/01/2023  10:28  5.281 app.log.1
31/01/2023  10:28  5.281 app.log.2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以在GitHub上找到基于大小滚动日志文件的详细示例和执行说明。</p><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本文中，我们探讨了Log4j及其三个组件——<em>logger</em> s、<em>appender</em> s和_layout_ s。我们还了解了_log4j.properties_文件的语法和一些简单的_log4j.properties_文件配置示例。</p><p>正如往常一样，伴随本文的示例可以在GitHub上找到。</p><p>OK</p>`,64),o=[i];function r(p,s){return n(),a("div",null,o)}const _=e(t,[["render",r],["__file","2024-06-30-A Guide to Log4j and the log4j.properties File in Java.html.vue"]]),c=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-A%20Guide%20to%20Log4j%20and%20the%20log4j.properties%20File%20in%20Java.html","title":"Log4j和Java中log4j.properties文件指南","lang":"zh-CN","frontmatter":{"date":"2024-06-30T00:00:00.000Z","category":["Log4j","Java"],"tag":["Log4j","log4j.properties","Java日志"],"head":[["meta",{"name":"keywords","content":"Java, Log4j, log4j.properties, 日志配置"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-A%20Guide%20to%20Log4j%20and%20the%20log4j.properties%20File%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Log4j和Java中log4j.properties文件指南"}],["meta",{"property":"og:description","content":"Log4j和Java中log4j.properties文件指南 Log4J是一个流行的开源日志框架，用Java编写。各种基于Java的应用程序广泛使用Log4j。此外，它是线程安全的，快速的，并提供了一个命名的_Logger_层级结构。Log4j在开源Apache软件许可下分发。 Log4j 1.x在2015年8月5日达到了生命周期的终点。因此，到目前..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T02:48:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Log4j"}],["meta",{"property":"article:tag","content":"log4j.properties"}],["meta",{"property":"article:tag","content":"Java日志"}],["meta",{"property":"article:published_time","content":"2024-06-30T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T02:48:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Log4j和Java中log4j.properties文件指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-30T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T02:48:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Log4j和Java中log4j.properties文件指南 Log4J是一个流行的开源日志框架，用Java编写。各种基于Java的应用程序广泛使用Log4j。此外，它是线程安全的，快速的，并提供了一个命名的_Logger_层级结构。Log4j在开源Apache软件许可下分发。 Log4j 1.x在2015年8月5日达到了生命周期的终点。因此，到目前..."},"headers":[{"level":2,"title":"2. Maven设置","slug":"_2-maven设置","link":"#_2-maven设置","children":[]},{"level":2,"title":"3. Log4j API","slug":"_3-log4j-api","link":"#_3-log4j-api","children":[]},{"level":2,"title":"4. Log4j组件","slug":"_4-log4j组件","link":"#_4-log4j组件","children":[{"level":3,"title":"4.1. Logger","slug":"_4-1-logger","link":"#_4-1-logger","children":[]},{"level":3,"title":"4.2. Appender","slug":"_4-2-appender","link":"#_4-2-appender","children":[]},{"level":3,"title":"4.3. Layout","slug":"_4-3-layout","link":"#_4-3-layout","children":[]}]},{"level":2,"title":"6. _log4j.properties_文件的语法","slug":"_6-log4j-properties-文件的语法","link":"#_6-log4j-properties-文件的语法","children":[]},{"level":2,"title":"7. 示例","slug":"_7-示例","link":"#_7-示例","children":[{"level":3,"title":"7.1. 示例程序","slug":"_7-1-示例程序","link":"#_7-1-示例程序","children":[]},{"level":3,"title":"7.2. 控制台日志记录","slug":"_7-2-控制台日志记录","link":"#_7-2-控制台日志记录","children":[]},{"level":3,"title":"7.3. 多个destinations","slug":"_7-3-多个destinations","link":"#_7-3-多个destinations","children":[]}]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1719715739000,"updatedTime":1719715739000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.46,"words":2239},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-A Guide to Log4j and the log4j.properties File in Java.md","localizedDate":"2024年6月30日","excerpt":"\\n<p>Log4J是一个流行的开源日志框架，用Java编写。各种基于Java的应用程序广泛使用Log4j。此外，它是线程安全的，快速的，并提供了一个命名的_Logger_层级结构。Log4j在开源Apache软件许可下分发。</p>\\n<p><strong>Log4j 1.x在2015年8月5日达到了生命周期的终点。因此，到目前为止，Log4j2是Log4j的最新升级。</strong></p>\\n<p>在本教程中，我们将学习Log4j以及如何使用Java中的_log4j.properties_文件配置核心Log4j组件。</p>\\n<h2>2. Maven设置</h2>\\n<p>我们需要在_pom.xml_中加入_log4j-core_依赖项来开始：</p>","autoDesc":true}');export{_ as comp,c as data};
