import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a}from"./app-Bp_dtxf0.js";const i={},l=a('<h1 id="java中的结构化日志记录" tabindex="-1"><a class="header-anchor" href="#java中的结构化日志记录"><span>Java中的结构化日志记录</span></a></h1><p>应用程序日志是排查问题、测量性能或仅仅是检查软件应用程序行为的重要资源。</p><p>在本教程中，我们将学习如何在Java中实现结构化日志记录以及这种技术相对于非结构化日志记录的优势。</p><h2 id="_2-结构化日志与非结构化日志的比较" tabindex="-1"><a class="header-anchor" href="#_2-结构化日志与非结构化日志的比较"><span>2. 结构化日志与非结构化日志的比较</span></a></h2><p>在深入代码之前，让我们了解非结构化和结构化日志之间的主要区别。</p><p>非结构化日志是打印出的信息，具有一致的格式但没有结构。它只是一段文本，其中一些变量被连接和格式化。</p><p>让我们看一个来自演示Spring应用程序的非结构化日志示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>22:25:48.111 [restartedMain] INFO  o.s.d.r.c.RepositoryConfigurationDelegate - Finished Spring Data repository scanning in 42 ms. Found 1 JPA repository interfaces.\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述日志显示了时间戳、日志级别、完全限定的类名以及Spring当时正在做什么的描述。当我们观察应用程序行为时，这是一条有用的信息。</p><p><strong>然而，从非结构化日志中提取信息比较困难</strong>。例如，要识别并提取生成该日志的类名，我们可能需要使用_String_ 操作逻辑来找到它。</p><p><strong>与此相反，结构化日志以类似字典的方式单独显示每条信息</strong>。我们可以将它们视为信息对象而不是_String_。让我们看看应用于非结构化日志示例的可能的结构化日志解决方案：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{\n    &quot;timestamp&quot;: &quot;22:25:48.111&quot;,\n    &quot;logger&quot;: &quot;restartedMain&quot;,\n    &quot;log_level&quot;: &quot;INFO&quot;,\n    &quot;class&quot;: &quot;o.s.d.r.c.RepositoryConfigurationDelegate&quot;,\n    &quot;message&quot;: &quot;Finished Spring Data repository scanning in 42 ms. Found 1 JPA repository interfaces.&quot;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在结构化日志中，提取特定字段值更容易，因为我们可以使用其名称访问它</strong>。因此，我们不需要处理文本并查找其中的特定模式以提取信息。例如，在我们的代码中，我们可以简单地使用_class_ 字段来访问生成日志的类名。</p><h2 id="_3-配置结构化日志" tabindex="-1"><a class="header-anchor" href="#_3-配置结构化日志"><span>3. 配置结构化日志</span></a></h2><p>在这一部分，我们将深入了解使用_logback_和_slf4j_库在Java应用程序中实现结构化日志记录的细节。</p><h3 id="_3-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_3-1-依赖项"><span>3.1. 依赖项</span></a></h3><p>为了使一切正常工作，我们需要在_pom.xml_文件中设置一些依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````org.slf4j````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````slf4j-api````&lt;/artifactId&gt;````\n    ````&lt;version&gt;````2.0.9````&lt;/version&gt;````\n````&lt;/dependency&gt;````\n````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````ch.qos.logback````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````logback-classic````&lt;/artifactId&gt;````\n    ````&lt;version&gt;````1.4.14````&lt;/version&gt;````\n````&lt;/dependency&gt;````\n````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````ch.qos.logback````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````logback-core````&lt;/artifactId&gt;````\n    ````&lt;version&gt;````1.4.14````&lt;/version&gt;````\n````&lt;/dependency&gt;````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_slf4j-api_依赖项是_logback-classic_和_logback-core_依赖项的门面。它们一起在Java应用程序中轻松实现日志记录机制。请注意，如果我们使用Spring Boot，那么我们不需要添加这三个依赖项，因为它们是_spring-boot-starter-logging_的子级。</p><p>让我们添加另一个依赖项_logstash-logback-encoder_，它有助于实现结构化日志格式和布局：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````net.logstash.logback````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````logstash-logback-encoder````&lt;/artifactId&gt;````\n    ````&lt;version&gt;````7.4````&lt;/version&gt;````\n````&lt;/dependency&gt;````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>记得始终使用上述依赖项的最新可能版本。</p><h3 id="_3-2-为结构化日志配置-logback-的基础知识" tabindex="-1"><a class="header-anchor" href="#_3-2-为结构化日志配置-logback-的基础知识"><span>3.2. 为结构化日志配置_logback_的基础知识</span></a></h3><p>要以结构化方式记录信息，我们需要配置_logback_。为此，让我们创建一个_logback.xml_文件，其中包含一些初始内容：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;configuration&gt;``\n    ``&lt;appender name=&quot;jsonConsoleAppender&quot; class=&quot;ch.qos.logback.core.ConsoleAppender&quot;&gt;``\n        ``&lt;encoder class=&quot;net.logstash.logback.encoder.LogstashEncoder&quot;&gt;``\n        ``&lt;/encoder&gt;``\n    ``&lt;/appender&gt;``\n\n    ``&lt;root level=&quot;INFO&quot;&gt;``\n        ``&lt;appender-ref ref=&quot;jsonConsoleAppender&quot;/&gt;``\n    ``&lt;/root&gt;``\n``&lt;/configuration&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述文件中，我们配置了一个名为_jsonConsoleAppender_的_appender_，它使用_logback-core_中的现有_ConsoleAppender_类作为其appender。</p><p>我们还设置了一个指向_logback-encoder_库中的_LogstashEncoder_类的_encoder_。该编码器负责将日志事件转换为JSON格式并输出信息。</p><p>有了这些设置，让我们看看一个示例日志条目：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{\n{    &quot;@timestamp&quot;:&quot;2023-12-20T22:16:25.2831944-03:00&quot;}\n{    &quot;@version&quot;:&quot;1&quot;}\n    &quot;message&quot;:&quot;Example log message&quot;,\n    &quot;logger_name&quot;:&quot;info_logger&quot;,\n    &quot;thread_name&quot;:&quot;main&quot;,\n{    &quot;level&quot;:&quot;INFO&quot;}\n{    &quot;level_value&quot;:20000}\n    &quot;custom_message&quot;:&quot;my_message&quot;,\n    &quot;password&quot;:&quot;123456&quot;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述日志行以JSON格式结构化，带有元数据信息和自定义字段，如_message_和_password_。</p><h3 id="_3-3-改进结构化日志" tabindex="-1"><a class="header-anchor" href="#_3-3-改进结构化日志"><span>3.3. 改进结构化日志</span></a></h3><p>为了使我们的日志<strong>更易于阅读和安全</strong>，让我们修改我们的_logback.xml_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;configuration&gt;``\n    ``&lt;appender name=&quot;jsonConsoleAppender&quot; class=&quot;ch.qos.logback.core.ConsoleAppender&quot;&gt;``\n        ``&lt;encoder class=&quot;net.logstash.logback.encoder.LogstashEncoder&quot;&gt;``\n            `&lt;includeCallerData&gt;`true`&lt;/includeCallerData&gt;`\n            `&lt;jsonGeneratorDecorator class=&quot;net.logstash.logback.decorate.CompositeJsonGeneratorDecorator&quot;&gt;`\n                `&lt;decorator class=&quot;net.logstash.logback.decorate.PrettyPrintingJsonGeneratorDecorator&quot;/&gt;`\n                `&lt;decorator class=&quot;net.logstash.logback.mask.MaskingJsonGeneratorDecorator&quot;&gt;`\n                    `&lt;defaultMask&gt;`XXXX`&lt;/defaultMask&gt;`\n                    `&lt;path&gt;`password`&lt;/path&gt;`\n                `&lt;/decorator&gt;`\n            `&lt;/jsonGeneratorDecorator&gt;`\n        ``&lt;/encoder&gt;``\n    ``&lt;/appender&gt;``\n\n    ``&lt;root level=&quot;INFO&quot;&gt;``\n        ``&lt;appender-ref ref=&quot;jsonConsoleAppender&quot;/&gt;``\n    ``&lt;/root&gt;``\n``&lt;/configuration&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们添加了几个标签来提高输出的可读性，添加了更多的元数据，并混淆了一些字段。让我们分别看看每一个：</p><ul><li><em>configuration</em>: 包含日志配置的根标签</li><li><em>appender name</em>: 我们定义的appender名称，以便在其他标签中重用</li><li><em>appender class</em>: 实现日志appender的完全限定类名。我们使用了_logback-core_中的_ConsoleAppender_类。</li><li><em>encoder class</em>: 日志编码器实现，在我们的情况下是_logstash-logback-encoder_中的_LogstashEncoder_</li><li><em>includeCallerData</em>: 添加了更多关于生成该日志行的调用者代码的信息</li><li><em>jsonGeneratorDecorator</em>: 为了以更漂亮的格式打印JSON，我们添加了这个标签，其中嵌套了一个_reference_标签，引用了_CompositeJsonGeneratorDecorator_类。</li><li><em>decorator class</em>: 我们使用了_PrettyPrintingJsonGeneratorDecorator_类以更漂亮的方式打印JSON输出，显示每个字段在不同的行。</li><li><em>decorator class</em>: 这里，_MaskingJsonGeneratorDecorator_类混淆了任何字段数据。</li><li><em>defaultMask</em>: 替换在_path_标签中定义的字段的掩码。这在掩码敏感数据时非常有用，使我们的应用程序在使用结构化日志时符合PII合规性。</li><li><em>path</em>: 应用在_defaultMask_标签中定义的掩码的字段名称</li></ul><p>使用新配置，第3.2节的相同日志应该看起来类似于：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{\n  &quot;@timestamp&quot; : &quot;2023-12-20T22:44:58.0961616-03:00&quot;,\n  &quot;@version&quot; : &quot;1&quot;,\n  &quot;message&quot; : &quot;Example log message&quot;,\n  &quot;logger_name&quot; : &quot;info_logger&quot;,\n  &quot;thread_name&quot; : &quot;main&quot;,\n  &quot;level&quot; : &quot;INFO&quot;,\n  &quot;level_value&quot; : 20000,\n  &quot;custom_message&quot; : &quot;my_message&quot;,\n  &quot;password&quot; : &quot;XXXX&quot;,\n  &quot;caller_class_name&quot; : &quot;StructuredLog4jExampleUnitTest&quot;,\n  &quot;caller_method_name&quot; : &quot;givenStructuredLog_whenUseLog4j_thenExtractCorrectInformation&quot;,\n  &quot;caller_file_name&quot; : &quot;StructuredLog4jExampleUnitTest.java&quot;,\n  &quot;caller_line_number&quot; : 16\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>日志也有助于识别我们代码中的错误。因此，<strong>我们还可以使用_LoggingEventBuilder_在_catch_块中说明错误日志记录</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid givenStructuredLog_whenUseLog4j_thenExtractCorrectInformation() {\n    User user = new User(&quot;1&quot;, &quot;John Doe&quot;, &quot;123456&quot;);\n\n    try {\n        throwExceptionMethod();\n    } catch (RuntimeException ex) {\n        logger.atError().addKeyValue(&quot;user_info&quot;,user) user)\n                .setMessage(&quot;Error processing given user&quot;)\n                .addKeyValue(&quot;exception_class&quot;, ex.getClass().getSimpleName())\n                .addKeyValue(&quot;error_message&quot;, ex.getMessage())\n                .log();\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述测试中，我们为异常消息和类名添加了更多的键值对。让我们看看日志输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{\n  &quot;@timestamp&quot; : &quot;2023-12-22T00:04:52.8414988-03:00&quot;,\n  &quot;@version&quot; : &quot;1&quot;,\n  &quot;message&quot; : &quot;Error processing given user&quot;,\n  &quot;logger_name&quot; : &quot;logger_name_example&quot;,\n  &quot;thread_name&quot; : &quot;main&quot;,\n  &quot;level&quot; : &quot;ERROR&quot;,\n  &quot;level_value&quot; : 40000,\n  &quot;user_info&quot; : {\n    &quot;id&quot; : &quot;1&quot;,\n    &quot;name&quot; : &quot;John Doe&quot;,\n    &quot;password&quot; : &quot;XXXX&quot;\n  },\n  &quot;exception_class&quot; : &quot;RuntimeException&quot;,\n  &quot;error_message&quot; : &quot;Error saving user data&quot;,\n  &quot;caller_class_name&quot; : &quot;StructuredLog4jExampleUnitTest&quot;,\n  &quot;caller_method_name&quot; : &quot;givenStructuredLog_whenUseLog4j_thenExtractCorrectInformation&quot;,\n  &quot;caller_file_name&quot; : &quot;StructuredLog4jExampleUnitTest.java&quot;,\n  &quot;caller_line_number&quot; : 35\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结构化日志记录的优势" tabindex="-1"><a class="header-anchor" href="#_5-结构化日志记录的优势"><span>5. 结构化日志记录的优势</span></a></h2><p>结构化日志记录与非结构化日志记录相比有一些优势，比如可读性和效率。</p><h3 id="_5-1-可读性" tabindex="-1"><a class="header-anchor" href="#_5-1-可读性"><span>5.1. 可读性</span></a></h3><p>日志通常是排查软件问题、测量性能以及检查应用程序是否按预期行为的最佳工具之一。因此，创建一个系统，使我们能够更容易地阅读日志行非常重要。</p><p><strong>结构化日志以字典形式显示数据，这使得人脑更容易在日志行中搜索特定字段</strong>。这与使用索引搜索书籍中的特定章节，而不是逐页阅读内容的概念相同。</p><h3 id="_5-2-效率" tabindex="-1"><a class="header-anchor" href="#_5-2-效率"><span>5.2. 效率</span></a></h3><p>通常，像Kibana、New Relic和Splunk这样的数据可视化工具使用查询语言在特定时间窗口中的所有日志行中搜索特定值。<strong>当使用结构化日志记录时，由于数据以_key-value_格式存在，编写日志搜索查询更容易</strong>。</p><p>此外，使用结构化日志记录，更容易创建有关提供的数据的业务指标。在这种情况下，在一致的结构化格式中搜索业务数据比在整个日志文本中搜索特定单词更容易和更有效。</p><p>最后，搜索结构化数据的查询使用更简单的算法，这可能会降低根据使用的工具降低云计算成本。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们看到了一种使用_slf4j_和_logback_在Java中实现结构化日志记录的方法。</p><p>使用格式化的结构化日志记录使机器和人类能够更快地阅读它们，使我们的应用程序更容易排查问题，并降低消费日志事件的复杂性。</p><p>如常，源代码可在GitHub上获得。 OK</p>',54),s=[l];function o(r,d){return n(),t("div",null,s)}const v=e(i,[["render",o],["__file","2024-06-23-Structured Logging in Java.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Structured%20Logging%20in%20Java.html","title":"Java中的结构化日志记录","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Java","编程"],"tag":["日志记录","结构化日志"],"head":[["meta",{"name":"keywords","content":"Java, 结构化日志, 日志记录, 性能监控"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Structured%20Logging%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的结构化日志记录"}],["meta",{"property":"og:description","content":"Java中的结构化日志记录 应用程序日志是排查问题、测量性能或仅仅是检查软件应用程序行为的重要资源。 在本教程中，我们将学习如何在Java中实现结构化日志记录以及这种技术相对于非结构化日志记录的优势。 2. 结构化日志与非结构化日志的比较 在深入代码之前，让我们了解非结构化和结构化日志之间的主要区别。 非结构化日志是打印出的信息，具有一致的格式但没有结..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T07:50:36.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"日志记录"}],["meta",{"property":"article:tag","content":"结构化日志"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T07:50:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的结构化日志记录\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T07:50:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的结构化日志记录 应用程序日志是排查问题、测量性能或仅仅是检查软件应用程序行为的重要资源。 在本教程中，我们将学习如何在Java中实现结构化日志记录以及这种技术相对于非结构化日志记录的优势。 2. 结构化日志与非结构化日志的比较 在深入代码之前，让我们了解非结构化和结构化日志之间的主要区别。 非结构化日志是打印出的信息，具有一致的格式但没有结..."},"headers":[{"level":2,"title":"2. 结构化日志与非结构化日志的比较","slug":"_2-结构化日志与非结构化日志的比较","link":"#_2-结构化日志与非结构化日志的比较","children":[]},{"level":2,"title":"3. 配置结构化日志","slug":"_3-配置结构化日志","link":"#_3-配置结构化日志","children":[{"level":3,"title":"3.1. 依赖项","slug":"_3-1-依赖项","link":"#_3-1-依赖项","children":[]},{"level":3,"title":"3.2. 为结构化日志配置_logback_的基础知识","slug":"_3-2-为结构化日志配置-logback-的基础知识","link":"#_3-2-为结构化日志配置-logback-的基础知识","children":[]},{"level":3,"title":"3.3. 改进结构化日志","slug":"_3-3-改进结构化日志","link":"#_3-3-改进结构化日志","children":[]}]},{"level":2,"title":"5. 结构化日志记录的优势","slug":"_5-结构化日志记录的优势","link":"#_5-结构化日志记录的优势","children":[{"level":3,"title":"5.1. 可读性","slug":"_5-1-可读性","link":"#_5-1-可读性","children":[]},{"level":3,"title":"5.2. 效率","slug":"_5-2-效率","link":"#_5-2-效率","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719129036000,"updatedTime":1719129036000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.9,"words":2070},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Structured Logging in Java.md","localizedDate":"2024年6月23日","excerpt":"\\n<p>应用程序日志是排查问题、测量性能或仅仅是检查软件应用程序行为的重要资源。</p>\\n<p>在本教程中，我们将学习如何在Java中实现结构化日志记录以及这种技术相对于非结构化日志记录的优势。</p>\\n<h2>2. 结构化日志与非结构化日志的比较</h2>\\n<p>在深入代码之前，让我们了解非结构化和结构化日志之间的主要区别。</p>\\n<p>非结构化日志是打印出的信息，具有一致的格式但没有结构。它只是一段文本，其中一些变量被连接和格式化。</p>\\n<p>让我们看一个来自演示Spring应用程序的非结构化日志示例：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>22:25:48.111 [restartedMain] INFO  o.s.d.r.c.RepositoryConfigurationDelegate - Finished Spring Data repository scanning in 42 ms. Found 1 JPA repository interfaces.\\n</code></pre></div>","autoDesc":true}');export{v as comp,g as data};
