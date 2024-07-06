import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-ConjvFaO.js";const e={},p=t('<h1 id="在mybatis中将sql查询记录到控制台" tabindex="-1"><a class="header-anchor" href="#在mybatis中将sql查询记录到控制台"><span>在MyBatis中将SQL查询记录到控制台</span></a></h1><p>MyBatis是一个流行的基于Java的持久层框架，它通过将SQL查询映射到Java方法来简化数据库操作。</p><p>在使用MyBatis开发应用程序时，查看正在使用的SQL查询通常对调试非常有用。</p><p>在本教程中，我们将探讨如何在MyBatis中将SQL查询记录到控制台。</p><h2 id="_2-支持的日志实现" tabindex="-1"><a class="header-anchor" href="#_2-支持的日志实现"><span>2. 支持的日志实现</span></a></h2><p>在深入研究MyBatis中的SQL记录之前，了解支持的日志实现是很重要的。</p><p><strong>MyBatis是一个灵活的框架，可以与各种日志框架集成</strong>，包括SLF4J、Apache Commons Logging、Log4j 2和JDK Logging。本文将探讨两种不同的日志选项：标准输出日志和SLF4J。</p><p>标准输出日志在本地功能开发期间很有帮助，因为它为调试提供了一种简单的方法。另一方面，SLF4J更适合生产应用程序，提供了灵活的抽象，可以无缝集成用户在部署期间首选的日志框架。</p><h2 id="_3-在mybatis中配置标准输出日志" tabindex="-1"><a class="header-anchor" href="#_3-在mybatis中配置标准输出日志"><span>3. 在MyBatis中配置标准输出日志</span></a></h2><p>使用标准输出记录MyBatis SQL允许我们直接在控制台上查看执行的SQL语句。这种方法在开发和调试期间非常方便。</p><p>要为MyBatis SQL启用标准输出日志，我们需要在我们的应用程序的_mybatis-config_文件中添加一个日志设置：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>settings</span><span class="token punctuation">&gt;</span></span>``\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>setting</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>logImpl<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>STDOUT_LOGGING<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>settings</span><span class="token punctuation">&gt;</span></span>``\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置_logImpl_属性为_STDOUT_LOGGING_后，MyBatis在执行SQL查询时将输出原始SQL语句、查询参数和查询结果。输出通常包括诸如执行的SQL、绑定参数和返回的结果集等详细信息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>==&gt;  Preparing: SELECT addressId, streetAddress FROM Address WHERE addressId = ?\n==&gt; Parameters: 1(Integer)\n`&lt;==    Columns: ADDRESSID, STREETADDRESS\n&lt;==        Row: 1, 123 Main Street\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出指示正在准备一个SQL查询，以使用特定ID从_Address_表中获取数据。它显示了参数、结果集列（<em>ADDRESSID_和_STREETADDRESS</em>），以及数据的示例行（<em>ADDRESSID: 1, STREETADDRESS: 123 Main Street</em>）。此外，它还告诉我们返回的行总数为1。</p><p>除了在_mybatis-config_中配置_logImpl_属性外，<strong>我们还可以选择以编程方式设置日志实现</strong>。我们可以通过在调用任何其他MyBatis方法之前调用静态方法_LogFactory.useStdOutLogging()_来实现这一点。</p><p>使用<strong>标准输出日志的缺点在于它缺乏对日志的细粒度控制</strong>。使用标准输出日志时，MyBatis会详细记录所有执行的SQL查询，这可能会让人感到不知所措，并使人们难以关注重要信息。</p><p>要实现更精确的日志控制，例如确定哪部分或映射器打印日志，建议使用日志框架。</p><h2 id="_4-在mybatis中配置slf4j和logback日志" tabindex="-1"><a class="header-anchor" href="#_4-在mybatis中配置slf4j和logback日志"><span>4. 在MyBatis中配置SLF4J和Logback日志</span></a></h2><h3 id="_4-1-设置slf4j和logback日志" tabindex="-1"><a class="header-anchor" href="#_4-1-设置slf4j和logback日志"><span>4.1. 设置SLF4J和Logback日志</span></a></h3><p>首先，我们需要将SLF4J和Logback依赖项添加到我们项目的构建文件中。由于Logback自动将SLF4J作为传递依赖项包含在内，对于Maven项目，我们只需要在_pom.xml_文件中指定Logback依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`ch.qos.logback`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`logback-classic`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`1.4.14`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们需要创建一个Logback配置文件，通常命名为_logback.xml_，以定义日志行为：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>```\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stdout<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ch.qos.logback.core.ConsoleAppender<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>encoder</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pattern</span><span class="token punctuation">&gt;</span></span>`%level [%thread] - %msg%n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pattern</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>encoder</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>appender</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>root</span> <span class="token attr-name">level</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>INFO<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender-ref</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stdout<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>root</span><span class="token punctuation">&gt;</span></span>`\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此配置创建了一个根记录器，用于记录INFO或更高级别的日志消息，并将它们指向_stdout_附加器以输出到控制台。</p><p>跟标准输出日志配置类似，我们需要在_mybatis-config_文件中将_logImpl_属性设置为SLF4J：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>settings</span><span class="token punctuation">&gt;</span></span>``\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>setting</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>logImpl<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>SLF4J<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>`\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>settings</span><span class="token punctuation">&gt;</span></span>``\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-记录映射器" tabindex="-1"><a class="header-anchor" href="#_4-2-记录映射器"><span>4.2. 记录映射器</span></a></h3><p>按照上述配置进行日志记录后，记录映射器变得很简单。我们可以将记录器名称设置为映射器接口的完全限定名，或者如果使用XML映射器文件，则设置为命名空间：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>logger</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>com.baeldung.mybatis.mapper.AddressMapper<span class="token punctuation">&quot;</span></span> <span class="token attr-name">level</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>TRACE<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这允许通过将记录器与所需的映射器关联来轻松控制日志记录。只有与此映射器相关的查询才会应用跟踪级别的日志记录。</p><h3 id="_4-3-记录特定映射器方法" tabindex="-1"><a class="header-anchor" href="#_4-3-记录特定映射器方法"><span>4.3. 记录特定映射器方法</span></a></h3><p>要选择性地记录特定方法的执行，例如在_FruitMapper_中的_getFruitById_，我们可以相应地配置记录器：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>logger</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>com.baeldung.mybatis.mapper.AddressMapper.getAddresses<span class="token punctuation">&quot;</span></span> <span class="token attr-name">level</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>TRACE<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>有了这种配置，记录器将仅在执行_getFruitById_方法时将日志打印到控制台，允许更专注和细粒度的日志控制。</p><h3 id="_4-4-记录包中的映射器" tabindex="-1"><a class="header-anchor" href="#_4-4-记录包中的映射器"><span>4.4. 记录包中的映射器</span></a></h3><p>我们可以轻松地通过将记录器名称设置为包名称来启用特定包下所有映射器的日志记录：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>logger</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>com.baeldung.mybatis.mapper<span class="token punctuation">&quot;</span></span> <span class="token attr-name">level</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>TRACE<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种方法允许在指定包内的所有映射器上进行全面的日志记录。</p><h3 id="_4-5-仅记录sql语句" tabindex="-1"><a class="header-anchor" href="#_4-5-仅记录sql语句"><span>4.5. 仅记录SQL语句</span></a></h3><p>在查询可能产生大型结果集的情况下，我们可能更希望查看SQL语句而不是记录实际结果。MyBatis设计为在DEBUG级别记录SQL语句，而在TRACE级别记录结果。如果我们希望看到语句而没有结果，我们需要将日志级别设置为DEBUG：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>logger</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>com.baeldung.mybatis.mapper.AddressMapper<span class="token punctuation">&quot;</span></span> <span class="token attr-name">level</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>DEBUG<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-在spring-boot中配置mybatis的sql日志记录" tabindex="-1"><a class="header-anchor" href="#_5-在spring-boot中配置mybatis的sql日志记录"><span>5. 在Spring Boot中配置MyBatis的SQL日志记录</span></a></h2><p>Spring是一个广泛采用的框架，在许多情况下，MyBatis是与Spring而不是独立使用的。当使用Spring Boot时，配置MyBatis SQL日志记录的工作很少。<strong>Spring Boot使用logback作为其默认的日志实现，并且MyBatis的日志机制优先考虑SLF4J。</strong></p><p>因此，要为特定映射器启用MyBatis SQL日志记录，我们向Spring Boot的_application.properties_文件添加属性：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">logging.level.com.baeldung.mybatis.spring.ArticleMapper</span><span class="token punctuation">=</span><span class="token value attr-value">DEBUG</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过为指定的映射器配置日志级别为_DEBUG_，我们将为该特定映射器提供详细的SQL日志记录。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们查看了MyBatis中SQL日志记录的配置，包括标准输出日志、SLF4J与Logback、记录特定映射器/方法/包，以及与Spring Boot的集成。</p><p>可以在GitHub上找到在独立MyBatis应用程序中配置SQL日志记录的代码，我们还有一个单独的示例用于配置MyBatis中的SQL日志记录。</p>',50),l=[p];function o(i,c){return s(),n("div",null,l)}const d=a(e,[["render",o],["__file","Logging SQL Queries to the Console in Mybatis.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/Archive/Logging%20SQL%20Queries%20to%20the%20Console%20in%20Mybatis.html","title":"在MyBatis中将SQL查询记录到控制台","lang":"zh-CN","frontmatter":{"date":"2024-06-15T00:00:00.000Z","category":["Java","MyBatis"],"tag":["Logging","SQL"],"description":"在MyBatis中将SQL查询记录到控制台 MyBatis是一个流行的基于Java的持久层框架，它通过将SQL查询映射到Java方法来简化数据库操作。 在使用MyBatis开发应用程序时，查看正在使用的SQL查询通常对调试非常有用。 在本教程中，我们将探讨如何在MyBatis中将SQL查询记录到控制台。 2. 支持的日志实现 在深入研究MyBatis中...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Logging%20SQL%20Queries%20to%20the%20Console%20in%20Mybatis.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在MyBatis中将SQL查询记录到控制台"}],["meta",{"property":"og:description","content":"在MyBatis中将SQL查询记录到控制台 MyBatis是一个流行的基于Java的持久层框架，它通过将SQL查询映射到Java方法来简化数据库操作。 在使用MyBatis开发应用程序时，查看正在使用的SQL查询通常对调试非常有用。 在本教程中，我们将探讨如何在MyBatis中将SQL查询记录到控制台。 2. 支持的日志实现 在深入研究MyBatis中..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Logging"}],["meta",{"property":"article:tag","content":"SQL"}],["meta",{"property":"article:published_time","content":"2024-06-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在MyBatis中将SQL查询记录到控制台\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"2. 支持的日志实现","slug":"_2-支持的日志实现","link":"#_2-支持的日志实现","children":[]},{"level":2,"title":"3. 在MyBatis中配置标准输出日志","slug":"_3-在mybatis中配置标准输出日志","link":"#_3-在mybatis中配置标准输出日志","children":[]},{"level":2,"title":"4. 在MyBatis中配置SLF4J和Logback日志","slug":"_4-在mybatis中配置slf4j和logback日志","link":"#_4-在mybatis中配置slf4j和logback日志","children":[{"level":3,"title":"4.1. 设置SLF4J和Logback日志","slug":"_4-1-设置slf4j和logback日志","link":"#_4-1-设置slf4j和logback日志","children":[]},{"level":3,"title":"4.2. 记录映射器","slug":"_4-2-记录映射器","link":"#_4-2-记录映射器","children":[]},{"level":3,"title":"4.3. 记录特定映射器方法","slug":"_4-3-记录特定映射器方法","link":"#_4-3-记录特定映射器方法","children":[]},{"level":3,"title":"4.4. 记录包中的映射器","slug":"_4-4-记录包中的映射器","link":"#_4-4-记录包中的映射器","children":[]},{"level":3,"title":"4.5. 仅记录SQL语句","slug":"_4-5-仅记录sql语句","link":"#_4-5-仅记录sql语句","children":[]}]},{"level":2,"title":"5. 在Spring Boot中配置MyBatis的SQL日志记录","slug":"_5-在spring-boot中配置mybatis的sql日志记录","link":"#_5-在spring-boot中配置mybatis的sql日志记录","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":5.36,"words":1607},"filePathRelative":"posts/baeldung/Archive/Logging SQL Queries to the Console in Mybatis.md","localizedDate":"2024年6月15日","excerpt":"\\n<p>MyBatis是一个流行的基于Java的持久层框架，它通过将SQL查询映射到Java方法来简化数据库操作。</p>\\n<p>在使用MyBatis开发应用程序时，查看正在使用的SQL查询通常对调试非常有用。</p>\\n<p>在本教程中，我们将探讨如何在MyBatis中将SQL查询记录到控制台。</p>\\n<h2>2. 支持的日志实现</h2>\\n<p>在深入研究MyBatis中的SQL记录之前，了解支持的日志实现是很重要的。</p>\\n<p><strong>MyBatis是一个灵活的框架，可以与各种日志框架集成</strong>，包括SLF4J、Apache Commons Logging、Log4j 2和JDK Logging。本文将探讨两种不同的日志选项：标准输出日志和SLF4J。</p>","autoDesc":true}');export{d as comp,g as data};
