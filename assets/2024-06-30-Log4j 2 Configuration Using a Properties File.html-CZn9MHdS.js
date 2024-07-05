import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as e,a as s}from"./app-C2EXT5sr.js";const t={},p=s('<h1 id="log4j-2-使用属性文件进行配置" tabindex="-1"><a class="header-anchor" href="#log4j-2-使用属性文件进行配置"><span>Log4j 2 使用属性文件进行配置</span></a></h1><p>Log4j 2 是一个流行的开源 Java 日志框架。它被引入是为了克服 Log4j 的各种架构缺陷。它是线程安全的、快速的，并且提供了许多改进，超过了它的前身。它在开源 Apache 软件许可下分发。</p><p>Log4j 2 是经典 Log4j 框架的最新和改进版本，该框架在 2015 年 8 月 5 日达到了生命周期的终点。然而，Log4j 仍然在许多 Java 企业应用程序中作为日志框架被广泛使用。</p><p>在本教程中，我们将学习 Log4j 2，它相对于 Log4j 的优势，以及如何使用 Java 中的 <em>log4j2.properties</em> 文件配置其核心组件。</p><h2 id="_2-maven-配置" tabindex="-1"><a class="header-anchor" href="#_2-maven-配置"><span>2. Maven 配置</span></a></h2><p>我们需要在 <em>pom.xml</em> 中添加 <em>log4j-core</em> 依赖项来开始：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.logging.log4j``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``log4j-core``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``2.20.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.logging.log4j``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``log4j-api``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``2.20.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以在 Maven 仓库中找到 <em>log4j-core</em> 和 <em>log4j-api</em> 的最新版本。</p><h2 id="_3-log4j-2-日志器" tabindex="-1"><a class="header-anchor" href="#_3-log4j-2-日志器"><span>3. Log4j 2 日志器</span></a></h2><p>与 Log4j 中使用 <em>Logger.getLogger()</em> 获取具有特定名称的 <em>Logger</em> 实例不同，在 Log4j 2 中我们使用 <em>LogManager.getLogger()</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> logger <span class="token operator">=</span> <span class="token class-name">LogManager</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">Log4j2Example</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>LogManager</em> 从配置文件或配置类中读取初始配置参数。一个 <em>Logger</em> 与 <em>LoggerConfig</em> 关联，后者又与实际传递日志事件的 <em>Appender</em> 相关联。</p><p><strong>如果我们通过传递相同的（类）名称调用 <em>LogManager.getLogger()</em>，我们将始终获得相同的日志器实例的引用。</strong></p><p><em>Logger</em> 和 <em>LoggerConfig</em> 都是命名实体。每个 <em>Logger</em> 引用一个 <em>LoggerConfig</em>，它可以引用其父级，从而实现相同的效果。</p><p><em>Logger</em> 遵循命名层次结构。这意味着名为 &quot;<em>com.baeldung</em>&quot; 的 <em>LoggerConfig</em> 是名为 &quot;<em>com.baeldung.foo</em>&quot; 的 <em>LoggerConfig</em> 的父级。</p><p>与 Log4j 仅支持通过属性和 XML 格式进行配置不同，我们可以**使用 JSON、XML、YAML 或属性文件格式定义 Log4j 2 配置。**所有这些格式在功能上是等效的。因此，我们可以轻松地将一种格式中的配置转换为任何其他格式。</p><p><strong>此外，Log4j2 支持自动配置，这意味着它能够在初始化期间自动配置自己。</strong></p><p>它在启动时扫描并定位所有 <em>ConfigurationFactory</em> 插件，并按从高到低的加权顺序排列——属性文件具有最高的优先级值 <em>8</em>，其次是 YAML、JSON 和 XML。</p><p>这意味着如果我们有以属性文件和 XML 文件形式的日志配置，那么将优先考虑属性文件。</p><h2 id="_5-log4j2-properties-文件" tabindex="-1"><a class="header-anchor" href="#_5-log4j2-properties-文件"><span>5. <em>log4j2.properties</em> 文件</span></a></h2><p>当 Log4j 2 发布时，它不支持通过属性文件进行配置。它从版本 2.4 开始支持属性文件。</p><p>默认的属性配置文件始终是 <em>log4j2.properties</em>。<em>Logger</em> 从 <em>CLASSPATH</em> 中获取此文件的引用。</p><p>然而，<strong>如果我们需要使用不同的配置文件名，我们可以使用系统属性 <em>log4j.configurationFile</em> 来设置。</strong></p><p>系统属性可能指向本地文件系统或可能包含 URL。如果 Log4j 2 无法定位配置文件，它提供 <em>DefaultConfiguration</em>。在这种情况下，我们将日志输出重定向到控制台，并将 <em>root logger</em> 级别设置为 <em>ERROR</em>。</p><h2 id="_6-log4j2-properties-文件的语法" tabindex="-1"><a class="header-anchor" href="#_6-log4j2-properties-文件的语法"><span>6. <em>log4j2.properties</em> 文件的语法</span></a></h2><p><em>log4j2.properties</em> 文件的语法与 <em>log4j.properties</em> 不同。在 <em>log4j.properties</em> 文件中，每个配置都以 &#39;<em>log4j</em>&#39; 开头，而在 <em>log4j2.properties</em> 配置中省略了这一点。</p><p>让我们看看一个通用 <em>log4j2.properties</em> 文件的语法：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token comment"># 根日志器与追加器名称</span>\n<span class="token key attr-name">rootLogger</span> <span class="token punctuation">=</span> <span class="token value attr-value">DEBUG, STDOUT</span>\n\n<span class="token comment"># 分配 STDOUT 一个有效的追加器并定义其布局</span>\n<span class="token key attr-name">appender.console.name</span> <span class="token punctuation">=</span> <span class="token value attr-value">STDOUT</span>\n<span class="token key attr-name">appender.console.type</span> <span class="token punctuation">=</span> <span class="token value attr-value">Console</span>\n<span class="token key attr-name">appender.console.layout.type</span> <span class="token punctuation">=</span> <span class="token value attr-value">PatternLayout</span>\n<span class="token key attr-name">appender.console.layout.pattern</span> <span class="token punctuation">=</span> <span class="token value attr-value">%msg%n</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，<em>STDOUT</em> 是 <em>Appender</em> 的名称。如前所述，我们可以将多个 <em>appender</em> 附加到 <em>logger</em> 以将日志定向到不同的目的地。</p><p><strong>我们还应该在每个 Log4j 2 配置中定义根日志器。否则，将使用默认的 <em>root LoggerConfig</em>，它具有 <em>ERROR</em> 级别和 <em>ConsoleAppender</em>。</strong></p><h2 id="_7-示例" tabindex="-1"><a class="header-anchor" href="#_7-示例"><span>7. 示例</span></a></h2><p>现在，让我们通过一些示例来理解不同 <em>appender</em> 的 <em>log4j2.properties</em> 文件配置。</p><h3 id="_7-1-示例程序" tabindex="-1"><a class="header-anchor" href="#_7-1-示例程序"><span>7.1. 示例程序</span></a></h3><p>让我们从一个记录一些消息的示例应用程序开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Log4j2ConsoleAndFile</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> logger <span class="token operator">=</span> <span class="token class-name">LogManager</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">Log4j2ConsoleAndFile</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        logger<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-2-控制台日志记录" tabindex="-1"><a class="header-anchor" href="#_7-2-控制台日志记录"><span>7.2. 控制台日志记录</span></a></h3><p>如果没有找到配置文件，控制台是记录消息的默认位置。让我们为控制台 <em>Appender</em> 以及 <em>root logger</em> 创建一个 <em>log4j2.properties</em> 配置，并为其定义日志级别：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token comment"># 根日志器</span>\n<span class="token key attr-name">rootLogger</span><span class="token punctuation">=</span><span class="token value attr-value">DEBUG, STDOUT</span>\n\n<span class="token comment"># 直接将日志消息定向到 stdout</span>\n<span class="token key attr-name">appender.console.type</span> <span class="token punctuation">=</span> <span class="token value attr-value">Console</span>\n<span class="token key attr-name">appender.console.name</span> <span class="token punctuation">=</span> <span class="token value attr-value">STDOUT</span>\n<span class="token key attr-name">appender.console.layout.type</span> <span class="token punctuation">=</span> <span class="token value attr-value">PatternLayout</span>\n<span class="token key attr-name">appender.console.layout.pattern</span> <span class="token punctuation">=</span> <span class="token value attr-value">[%-5level] %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %c{1} - %msg%n</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们定义了一个具有以下规格的 <em>log4j2.properties</em> 文件：</p><ul><li>我们定义了 <em>root logger</em> 的级别为 <em>DEBUG</em>。这意味着我们将获得所有级别为 <em>DEBUG</em> 及以上的日志事件。我们还为 <em>appender</em> 定义了一个名称为 <em>STDOUT</em>。</li><li>由于我们想要将日志定向到控制台，我们分配了 <em>Appender type</em> 为 <em>Console</em>。我们应该注意到键名中的 <em>console</em> 一词只是一种惯例，不是强制性的。</li><li>然后，我们指定了我们想要打印日志消息的模式。</li></ul><p>让我们也了解一下我们在 <em>layout</em> 模式中使用的每个转换字符的含义：</p><ul><li><em>%-5level</em> 为每个日志语句添加日志级别信息。它表示日志事件的优先级左对齐到五个字符的宽度。</li><li><em>%d</em> 以定义的格式添加时间戳。</li><li><em>%t</em> 向日志语句添加线程名称</li><li><em>%c{1}</em> 打印限定的类名，可选地后跟包名（精度限定符）<em>,</em> 记录特定日志语句的类。</li><li><em>%msg</em> 打印实际的日志消息。</li><li><em>%n</em> 在每个日志语句后添加新行。</li></ul><p>因此，当我们运行我们的示例应用程序时，我们在控制台上得到以下行打印：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[INFO ] 2023-08-05 23:04:03.255 [main] Log4j2ConsoleAndFile - Hello World!\n[DEBUG] 2023-08-05 23:04:03.255 [main] Log4j2ConsoleAndFile - Hello World!\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>类 <em>PatternLayout</em> 根据我们的需求解释了我们可以使用更多的转换字符。</strong></p><h3 id="_7-3-多个目的地" tabindex="-1"><a class="header-anchor" href="#_7-3-多个目的地"><span>7.3. 多个目的地</span></a></h3><p>如前所述，我们可以将日志事件重定向到多个目的地：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token comment"># 根日志器</span>\n<span class="token key attr-name">rootLogger</span><span class="token punctuation">=</span><span class="token value attr-value">INFO, STDOUT, LOGFILE</span>\n\n<span class="token comment"># 直接将日志消息定向到 STDOUT</span>\n<span class="token key attr-name">appender.console.type</span> <span class="token punctuation">=</span> <span class="token value attr-value">Console</span>\n<span class="token key attr-name">appender.console.name</span> <span class="token punctuation">=</span> <span class="token value attr-value">STDOUT</span>\n<span class="token key attr-name">appender.console.layout.type</span> <span class="token punctuation">=</span> <span class="token value attr-value">PatternLayout</span>\n<span class="token key attr-name">appender.console.layout.pattern</span> <span class="token punctuation">=</span> <span class="token value attr-value">[%-5level] %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %c{1} - %msg%n</span>\n\n<span class="token comment"># 直接定向到文件</span>\n<span class="token key attr-name">appender.file.type</span> <span class="token punctuation">=</span> <span class="token value attr-value">File</span>\n<span class="token key attr-name">appender.file.name</span> <span class="token punctuation">=</span> <span class="token value attr-value">LOGFILE</span>\n<span class="token key attr-name">appender.file.fileName</span> <span class="token punctuation">=</span> <span class="token value attr-value">baeldung/logs/log4j2.log</span>\n<span class="token key attr-name">appender.file.layout.type</span> <span class="token punctuation">=</span> <span class="token value attr-value">PatternLayout</span>\n<span class="token key attr-name">appender.file.layout.pattern</span> <span class="token punctuation">=</span> <span class="token value attr-value">[%-5level] %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %c{1} - %msg%n</span>\n<span class="token key attr-name">appender.file.filter.threshold.type</span> <span class="token punctuation">=</span> <span class="token value attr-value">ThresholdFilter</span>\n<span class="token key attr-name">appender.file.filter.threshold.level</span> <span class="token punctuation">=</span> <span class="token value attr-value">info</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用了两个 <em>appender</em> 将日志消息重定向到文件和控制台。我们分别将它们命名为 <em>STDOUT</em> 和 <em>LOGFILE</em>。此外，我们将这两个 <em>appender</em> 都添加到了 <em>root logger</em>。</p><p><strong>要将日志消息重定向到文件，我们需要指定文件的名称及其位置。</strong></p><p>我们还使用了 <em>ThresholdFilter</em>，它过滤掉一定日志级别及以上的日志消息。最后，我们将 <em>threshold.level</em> 指定为 <em>INFO</em>。因此，所有级别为 <em>INFO</em> 或更高的日志消息将被打印到文件中。</p><p>当我们运行我们的示例应用程序时，我们只在控制台以及 <em>log4j2.log</em> 文件中打印以下行：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[INFO ] 2023-08-05 23:04:03.255 [main] Log4j2ConsoleAndFile - Hello World!\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本文中，我们探讨了 Log4j 2 及其相对于 Log4j 的优势。我们还理解了 <em>log4j2.properties</em> 文件的语法以及一些简单的配置 <em>log4j2.properties</em> 文件的示例。</p><p>正如往常一样，伴随本文的示例可以在 GitHub 上找到。</p><p>[文章结束]</p><p>OK</p>',58),o=[p];function l(i,c){return e(),n("div",null,o)}const m=a(t,[["render",l],["__file","2024-06-30-Log4j 2 Configuration Using a Properties File.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-Log4j%202%20Configuration%20Using%20a%20Properties%20File.html","title":"Log4j 2 使用属性文件进行配置","lang":"zh-CN","frontmatter":{"date":"2024-06-30T00:00:00.000Z","category":["Java","Log4j2"],"tag":["Log4j2","日志配置"],"head":[["meta",{"name":"keywords","content":"Log4j2, 日志配置, Java, 配置文件"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-Log4j%202%20Configuration%20Using%20a%20Properties%20File.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Log4j 2 使用属性文件进行配置"}],["meta",{"property":"og:description","content":"Log4j 2 使用属性文件进行配置 Log4j 2 是一个流行的开源 Java 日志框架。它被引入是为了克服 Log4j 的各种架构缺陷。它是线程安全的、快速的，并且提供了许多改进，超过了它的前身。它在开源 Apache 软件许可下分发。 Log4j 2 是经典 Log4j 框架的最新和改进版本，该框架在 2015 年 8 月 5 日达到了生命周期的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T03:53:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Log4j2"}],["meta",{"property":"article:tag","content":"日志配置"}],["meta",{"property":"article:published_time","content":"2024-06-30T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T03:53:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Log4j 2 使用属性文件进行配置\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-30T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T03:53:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Log4j 2 使用属性文件进行配置 Log4j 2 是一个流行的开源 Java 日志框架。它被引入是为了克服 Log4j 的各种架构缺陷。它是线程安全的、快速的，并且提供了许多改进，超过了它的前身。它在开源 Apache 软件许可下分发。 Log4j 2 是经典 Log4j 框架的最新和改进版本，该框架在 2015 年 8 月 5 日达到了生命周期的..."},"headers":[{"level":2,"title":"2. Maven 配置","slug":"_2-maven-配置","link":"#_2-maven-配置","children":[]},{"level":2,"title":"3. Log4j 2 日志器","slug":"_3-log4j-2-日志器","link":"#_3-log4j-2-日志器","children":[]},{"level":2,"title":"5. log4j2.properties 文件","slug":"_5-log4j2-properties-文件","link":"#_5-log4j2-properties-文件","children":[]},{"level":2,"title":"6. log4j2.properties 文件的语法","slug":"_6-log4j2-properties-文件的语法","link":"#_6-log4j2-properties-文件的语法","children":[]},{"level":2,"title":"7. 示例","slug":"_7-示例","link":"#_7-示例","children":[{"level":3,"title":"7.1. 示例程序","slug":"_7-1-示例程序","link":"#_7-1-示例程序","children":[]},{"level":3,"title":"7.2. 控制台日志记录","slug":"_7-2-控制台日志记录","link":"#_7-2-控制台日志记录","children":[]},{"level":3,"title":"7.3. 多个目的地","slug":"_7-3-多个目的地","link":"#_7-3-多个目的地","children":[]}]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1719719618000,"updatedTime":1719719618000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.31,"words":1894},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-Log4j 2 Configuration Using a Properties File.md","localizedDate":"2024年6月30日","excerpt":"\\n<p>Log4j 2 是一个流行的开源 Java 日志框架。它被引入是为了克服 Log4j 的各种架构缺陷。它是线程安全的、快速的，并且提供了许多改进，超过了它的前身。它在开源 Apache 软件许可下分发。</p>\\n<p>Log4j 2 是经典 Log4j 框架的最新和改进版本，该框架在 2015 年 8 月 5 日达到了生命周期的终点。然而，Log4j 仍然在许多 Java 企业应用程序中作为日志框架被广泛使用。</p>\\n<p>在本教程中，我们将学习 Log4j 2，它相对于 Log4j 的优势，以及如何使用 Java 中的 <em>log4j2.properties</em> 文件配置其核心组件。</p>","autoDesc":true}');export{m as comp,d as data};
