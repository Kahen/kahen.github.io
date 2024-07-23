import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-LwwahXlT.js";const p={},e=t('<h1 id="groovy-在-spring-中的使用" tabindex="-1"><a class="header-anchor" href="#groovy-在-spring-中的使用"><span>Groovy 在 Spring 中的使用</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Groovy 是一种功能强大且动态的 JVM 语言，拥有众多特性。在 Spring 中使用 Groovy 可以显著增强应用程序的灵活性和可读性。自版本 4 起，Spring 支持基于 Groovy 的配置。</p><p>在本教程中，<strong>我们将探讨使用 Groovy 与 Spring 的不同方式</strong>。首先，我们将看到如何使用 Spring 提供的多种选项创建 Groovy bean 定义。接下来，我们将讨论如何使用 Groovy 脚本引导应用程序上下文。最后，我们将看到如何使用 XML 和 <em>GroovyScriptEngine</em> 类执行 Groovy 脚本（无需编译）。</p><h2 id="_2-maven-依赖" tabindex="-1"><a class="header-anchor" href="#_2-maven-依赖"><span>2. Maven 依赖</span></a></h2><p>让我们首先在 <em>pom.xml</em> 中定义 Groovy 依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.groovy``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``groovy``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``4.0.21``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们需要添加 GMavenPlus 插件来编译 Groovy 文件：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n            ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.codehaus.gmavenplus``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n            ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``gmavenplus-plugin``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n            ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``3.0.2``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>executions</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">&gt;</span></span>`\n                    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goals</span><span class="token punctuation">&gt;</span></span>`\n                        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>````````addSources````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>````````\n                        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>````````addTestSources````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>````````\n                        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>````````generateStubs````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>````````\n                        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>````````compile````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>````````\n                        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>````````generateTestStubs````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>````````\n                        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>````````compileTests````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>````````\n                        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>````````removeStubs````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>````````\n                        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>````````removeTestStubs````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>````````\n                    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goals</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>executions</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-bean-定义" tabindex="-1"><a class="header-anchor" href="#_3-bean-定义"><span>3. Bean 定义</span></a></h2><p>传统上，开发人员通过 XML 配置声明 beans。后来这种风格被 Java 注解的程序化定义所取代。另一种声明 beans 的方式是通过 Groovy 脚本。</p><p>由于我们使用 GMavenPlus 插件，Groovy 源文件可以与其他 Java 代码一起混合在 <em>src/main/java</em> 源文件夹中。然而，<strong>最好将 Groovy 文件放在专用的 <em>src/main/groovy</em> 源文件夹中，以避免后期混淆</strong>。</p><h3 id="_3-1-使用-groovy-bean-builder" tabindex="-1"><a class="header-anchor" href="#_3-1-使用-groovy-bean-builder"><span>3.1. 使用 Groovy Bean Builder</span></a></h3><p>Groovy Bean Builder 是 Java 的 <em>@Configuration</em> 注解基础配置和基于 XML 的配置的强大替代品。让我们看看使用 Groovy 代码的一些基本 bean 定义：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>beans <span class="token punctuation">{</span>\n    <span class="token comment">// 声明一个带有构造函数参数的简单 bean</span>\n    <span class="token function">company</span><span class="token punctuation">(</span>Company<span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token string">&#39;ABC Inc&#39;</span><span class="token punctuation">)</span>\n\n    <span class="token comment">// 可以使用更简单的语法声明相同的 bean：beanName(type, constructor-args)</span>\n    company String<span class="token punctuation">,</span> <span class="token string">&#39;ABC Inc&#39;</span>\n\n    <span class="token comment">// 声明一个员工对象，使用 setter 引用前面的 bean</span>\n    <span class="token function">employee</span><span class="token punctuation">(</span>Employee<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        firstName <span class="token operator">=</span> <span class="token string">&#39;Lakshmi&#39;</span>\n        lastName <span class="token operator">=</span> <span class="token string">&#39;Priya&#39;</span>\n        <span class="token comment">// 其他 bean 的引用可以以两种方式完成</span>\n        vendor <span class="token operator">=</span> company <span class="token comment">// 或 vendor = ref(&#39;company&#39;)</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">// 允许导入其他配置文件，包括 XML 和 Groovy</span>\n    <span class="token function">importBeans</span><span class="token punctuation">(</span><span class="token string">&#39;classpath:ApplicationContext.xml&#39;</span><span class="token punctuation">)</span>\n    <span class="token function">importBeans</span><span class="token punctuation">(</span><span class="token string">&#39;classpath:GroovyContext.groovy&#39;</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，顶级的 <em>beans</em> 构造函数包装了所有声明的 beans，是一个闭包，由 <em>GroovyBeanDefinitionReader</em> 作为 DSL 处理。</p><h3 id="_3-2-使用注解" tabindex="-1"><a class="header-anchor" href="#_3-2-使用注解"><span>3.2. 使用注解</span></a></h3><p>另外，Groovy 类可以是有效的 Spring beans，Groovy 可以代替 Java 用于基于注解的配置：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code><span class="token annotation punctuation">@Configuration</span>\n<span class="token keyword">class</span> <span class="token class-name">SpringGroovyConfiguration</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@Bean</span>\n    List`<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>` <span class="token function">fruits</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token punctuation">[</span><span class="token string">&#39;Apple&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Orange&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Banana&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Grapes&#39;</span><span class="token punctuation">]</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Bean</span>\n    Map`<span class="token operator">&lt;</span>Integer<span class="token punctuation">,</span> String<span class="token operator">&gt;</span>` <span class="token function">rankings</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span> <span class="token string">&#39;Gold&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">:</span> <span class="token string">&#39;Silver&#39;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">:</span> <span class="token string">&#39;Bronze&#39;</span><span class="token punctuation">]</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-使用-xml" tabindex="-1"><a class="header-anchor" href="#_3-3-使用-xml"><span>3.3. 使用 XML</span></a></h3><p>当然，Groovy Bean Builder 和基于注解的配置更加灵活。然而，我们仍然可以使用 XML 来声明 Groovy 脚本中定义的 beans。Groovy 是一种动态语言，Spring 为此提供了全面的支持。因此，<strong>我们需要在 XML 配置中使用一个特殊元素（ <em><code>&lt;lang:groovy&gt;</code></em> ）来表示我们正在定义动态语言支持的 beans</strong>。</p><p>例如，让我们看看一个引用正确模式的 XML 配置示例，以便 <em>lang</em> 命名空间中的标签可用：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>beans</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.springframework.org/schema/beans<span class="token punctuation">&quot;</span></span>\n       <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">&quot;</span></span>\n       <span class="token attr-name"><span class="token namespace">xmlns:</span>lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.springframework.org/schema/lang<span class="token punctuation">&quot;</span></span>\n       <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>\n        http://www.springframework.org/schema/beans https://www.springframework.org/schema/beans/spring-beans.xsd\n        http://www.springframework.org/schema/lang https://www.springframework.org/schema/lang/spring-lang.xsd<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">lang:</span>groovy</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>notification<span class="token punctuation">&quot;</span></span> <span class="token attr-name">script-source</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>file:NotificationServiceImpl.groovy<span class="token punctuation">&quot;</span></span> <span class="token attr-name">refresh-check-delay</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>10000<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">lang:</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>message<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Hello<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">lang:</span>groovy</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>beans</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们声明了 <em>notification</em> bean，它通过 <em>script-source</em> 属性引用 Groovy 脚本。我们可以使用 <em>file</em> 前缀指定脚本的确切位置。或者，我们可以使用 <em>classpath</em> 前缀直接从类路径访问资源。<em>refresh-check-delay</em> 属性定义了脚本的刷新间隔，当脚本内容更改时，可以自动刷新。</p><h2 id="_4-引导应用程序上下文" tabindex="-1"><a class="header-anchor" href="#_4-引导应用程序上下文"><span>4. 引导应用程序上下文</span></a></h2><p>Spring 需要知道如何引导 Groovy 上下文文件，以便将 beans 可用于应用程序。我们可以通过在 <em>web.xml</em> 中配置或以编程方式加载上下文来实现。</p><h3 id="_4-1-在-web-xml-中添加-groovy-配置" tabindex="-1"><a class="header-anchor" href="#_4-1-在-web-xml-中添加-groovy-配置"><span>4.1. 在 <em>web.xml</em> 中添加 Groovy 配置</span></a></h3><p>为了简化事情，Spring 版本 4.1 通过 <em>GroovyWebApplicationContext</em> 的帮助，增加了通过 <em>web.xml</em> 加载 Groovy 配置文件的支持。</p><p>默认情况下，配置将从 <em>/WEB-INF/applicationContext.groovy</em> 加载。然而，这个位置可以通过 <em>contextConfigLocation</em> servlet 上下文参数覆盖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>web-app</span><span class="token punctuation">&gt;</span></span>`\n    ...\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>listener</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>listener-class</span><span class="token punctuation">&gt;</span></span>`org.springframework.web.context.ContextLoaderListener`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>listener-class</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>listener</span><span class="token punctuation">&gt;</span></span>`\n\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>context-param</span><span class="token punctuation">&gt;</span></span>``\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param-name</span><span class="token punctuation">&gt;</span></span>``contextClass``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param-name</span><span class="token punctuation">&gt;</span></span>``\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param-value</span><span class="token punctuation">&gt;</span></span>``org.springframework.web.context.support.GroovyWebApplicationContext``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param-value</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>context-param</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>context-param</span><span class="token punctuation">&gt;</span></span>``\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param-name</span><span class="token punctuation">&gt;</span></span>``contextConfigLocation``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param-name</span><span class="token punctuation">&gt;</span></span>``\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param-value</span><span class="token punctuation">&gt;</span></span>``/WEB-INF/applicationContext.groovy``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param-value</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>context-param</span><span class="token punctuation">&gt;</span></span>``\n\n    ...\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>web-app</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-使用-genericgroovyapplicationcontext" tabindex="-1"><a class="header-anchor" href="#_4-2-使用-genericgroovyapplicationcontext"><span>4.2. 使用 <em>GenericGroovyApplicationContext</em></span></a></h3><p>Spring 提供了 <em>GenericGroovyApplicationContext</em> 来引导 Groovy bean 定义。此外，上下文可以使用内联 bean 定义闭包进行加载：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code><span class="token keyword">def</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GenericGroovyApplicationContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\ncontext<span class="token punctuation">.</span>reader<span class="token punctuation">.</span>beans <span class="token punctuation">{</span>\n    <span class="token function">department</span><span class="token punctuation">(</span>Department<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        name <span class="token operator">=</span> <span class="token string">&#39;Finance&#39;</span>\n        floor <span class="token operator">=</span> <span class="token number">3</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\ncontext<span class="token punctuation">.</span><span class="token function">refresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>或者，我们可以将这个 bean 定义外部化，并从 Groovy 配置文件加载应用程序上下文</strong>：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>GenericGroovyApplicationContext context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GenericGroovyApplicationContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ncontext<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;config/applicationContext.groovy&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ncontext<span class="token punctuation">.</span><span class="token function">refresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，加载 Groovy 上下文类似于 Java 风格的实例化 <em>XmlWebApplicationContext</em> 或 <em>ClassPathXmlApplicationContext</em>。</p><p>如果没有额外的配置，代码可以更加简洁：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>ApplicationContext context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GenericGroovyApplicationContext</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;config/applicationContext.groovy&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nString foo <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;foo&quot;</span></span><span class="token punctuation">,</span> String<span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，<strong><em>GenericGroovyApplicationContext</em></strong> <strong>还理解 XML bean 定义文件。</strong> <strong>这增加了更多的灵活性，允许与 Groovy bean 定义文件无缝混合和匹配。</strong></p><h2 id="_5-执行-groovy-脚本" tabindex="-1"><a class="header-anchor" href="#_5-执行-groovy-脚本"><span>5. 执行 Groovy 脚本</span></a></h2><p>除了 Groovy bean 定义之外，Spring 还支持执行 Groovy 脚本，无需编译。这种执行可以作为一个独立的 bean，或者通过在 bean 中调用 Groovy 脚本，使脚本成为它的可执行部分。</p><h3 id="_5-1-作为内联脚本" tabindex="-1"><a class="header-anchor" href="#_5-1-作为内联脚本"><span>5.1. 作为内联脚本</span></a></h3><p>正如我们之前看到的，我们可以使用 Spring 提供的动态语言支持将 Groovy 源文件直接嵌入 Spring bean 定义中。因此，我们可以利用 <em><code>&lt;lang:inline-script/&gt;</code></em> 元素在 Spring 配置 XML 文件内立即定义 Groovy 源代码。</p><p>例如，我们可以使用内联脚本特性创建一个 <em>Notifier</em> bean：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">lang:</span>groovy</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>notifier<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">lang:</span>inline-script</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>',45),o=[e];function l(c,i){return s(),a("div",null,o)}const g=n(p,[["render",l],["__file","2024-07-13-Using Groovy in Spring.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Using%20Groovy%20in%20Spring.html","title":"Groovy 在 Spring 中的使用","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring","Groovy"],"tag":["Groovy","Spring Framework","Configuration"],"head":[["meta",{"name":"keywords","content":"Spring, Groovy, Configuration, Dynamic Language, Bean Definitions"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Using%20Groovy%20in%20Spring.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Groovy 在 Spring 中的使用"}],["meta",{"property":"og:description","content":"Groovy 在 Spring 中的使用 1. 概述 Groovy 是一种功能强大且动态的 JVM 语言，拥有众多特性。在 Spring 中使用 Groovy 可以显著增强应用程序的灵活性和可读性。自版本 4 起，Spring 支持基于 Groovy 的配置。 在本教程中，我们将探讨使用 Groovy 与 Spring 的不同方式。首先，我们将看到如何..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T03:43:36.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Groovy"}],["meta",{"property":"article:tag","content":"Spring Framework"}],["meta",{"property":"article:tag","content":"Configuration"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T03:43:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Groovy 在 Spring 中的使用\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T03:43:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Groovy 在 Spring 中的使用 1. 概述 Groovy 是一种功能强大且动态的 JVM 语言，拥有众多特性。在 Spring 中使用 Groovy 可以显著增强应用程序的灵活性和可读性。自版本 4 起，Spring 支持基于 Groovy 的配置。 在本教程中，我们将探讨使用 Groovy 与 Spring 的不同方式。首先，我们将看到如何..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Maven 依赖","slug":"_2-maven-依赖","link":"#_2-maven-依赖","children":[]},{"level":2,"title":"3. Bean 定义","slug":"_3-bean-定义","link":"#_3-bean-定义","children":[{"level":3,"title":"3.1. 使用 Groovy Bean Builder","slug":"_3-1-使用-groovy-bean-builder","link":"#_3-1-使用-groovy-bean-builder","children":[]},{"level":3,"title":"3.2. 使用注解","slug":"_3-2-使用注解","link":"#_3-2-使用注解","children":[]},{"level":3,"title":"3.3. 使用 XML","slug":"_3-3-使用-xml","link":"#_3-3-使用-xml","children":[]}]},{"level":2,"title":"4. 引导应用程序上下文","slug":"_4-引导应用程序上下文","link":"#_4-引导应用程序上下文","children":[{"level":3,"title":"4.1. 在 web.xml 中添加 Groovy 配置","slug":"_4-1-在-web-xml-中添加-groovy-配置","link":"#_4-1-在-web-xml-中添加-groovy-配置","children":[]},{"level":3,"title":"4.2. 使用 GenericGroovyApplicationContext","slug":"_4-2-使用-genericgroovyapplicationcontext","link":"#_4-2-使用-genericgroovyapplicationcontext","children":[]}]},{"level":2,"title":"5. 执行 Groovy 脚本","slug":"_5-执行-groovy-脚本","link":"#_5-执行-groovy-脚本","children":[{"level":3,"title":"5.1. 作为内联脚本","slug":"_5-1-作为内联脚本","link":"#_5-1-作为内联脚本","children":[]}]}],"git":{"createdTime":1720842216000,"updatedTime":1720842216000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.82,"words":1447},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Using Groovy in Spring.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>Groovy 是一种功能强大且动态的 JVM 语言，拥有众多特性。在 Spring 中使用 Groovy 可以显著增强应用程序的灵活性和可读性。自版本 4 起，Spring 支持基于 Groovy 的配置。</p>\\n<p>在本教程中，<strong>我们将探讨使用 Groovy 与 Spring 的不同方式</strong>。首先，我们将看到如何使用 Spring 提供的多种选项创建 Groovy bean 定义。接下来，我们将讨论如何使用 Groovy 脚本引导应用程序上下文。最后，我们将看到如何使用 XML 和 <em>GroovyScriptEngine</em> 类执行 Groovy 脚本（无需编译）。</p>","autoDesc":true}');export{g as comp,k as data};
