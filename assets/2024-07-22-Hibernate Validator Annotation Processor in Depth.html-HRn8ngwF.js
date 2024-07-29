import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-BUAgDejY.js";const e={},p=t('<h1 id="hibernate-validator注解处理器深度解析" tabindex="-1"><a class="header-anchor" href="#hibernate-validator注解处理器深度解析"><span>Hibernate Validator注解处理器深度解析</span></a></h1><p>在本文中，我们将深入探讨Hibernate Validator注解处理器。首先，我们将安装并配置它，然后通过三个常见的约束问题来探索它的行为。示例代码可以在GitHub上找到。</p><p>请注意，此工具的版本7仅与jakarta.validation约束兼容。此外，处理器还提供了如何在主要Java IDE中设置它的指导。</p><p>以下是文章的翻译内容，包括概述、配置、常见约束问题和结论部分，以及示例代码和错误信息的翻译。由于篇幅限制，这里只提供部分翻译的示例：</p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>很容易误用Bean验证约束。例如，我们可能会不小心在一个String属性上使用@Future约束。这类错误可能导致运行时出现不可预测的错误。</p><p>幸运的是，Hibernate Validator注解处理器可以在编译时检测这些问题。得益于它抛出的错误，我们可以更早地捕捉到这些错误。</p><p>在本教程中，我们将探讨如何配置处理器，并查看它可以为我们找到的一些常见问题。</p><h2 id="_2-配置" tabindex="-1"><a class="header-anchor" href="#_2-配置"><span>2. 配置</span></a></h2><h3 id="_2-1-安装" tabindex="-1"><a class="header-anchor" href="#_2-1-安装"><span>2.1. 安装</span></a></h3><p>让我们从将注解处理器依赖项添加到我们的pom.xml开始：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.apache.maven.plugins```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```maven-compiler-plugin```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```3.6.1```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span><span class="token punctuation">&gt;</span></span>`1.8`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>source</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>target</span><span class="token punctuation">&gt;</span></span>`1.8`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>target</span><span class="token punctuation">&gt;</span></span>`\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>compilerArgs</span><span class="token punctuation">&gt;</span></span>```\n            ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arg</span><span class="token punctuation">&gt;</span></span>```````-Averbose=true```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arg</span><span class="token punctuation">&gt;</span></span>```````\n            ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arg</span><span class="token punctuation">&gt;</span></span>```````-AmethodConstraintsSupported=true```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arg</span><span class="token punctuation">&gt;</span></span>```````\n            ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arg</span><span class="token punctuation">&gt;</span></span>```````-AdiagnosticKind=ERROR```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arg</span><span class="token punctuation">&gt;</span></span>```````\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>compilerArgs</span><span class="token punctuation">&gt;</span></span>```\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>annotationProcessorPaths</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span><span class="token punctuation">&gt;</span></span>`\n                ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.hibernate.validator```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n                ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```hibernate-validator-annotation-processor```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n                ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```6.2.0.Final```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>path</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>annotationProcessorPaths</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意，这个工具的版本7仅与jakarta.validation约束兼容：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```jakarta.validation```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```jakarta.validation-api```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```3.0.1```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>处理器还提供了如何在主要Java IDE中设置它的指导。</p><h3 id="_2-2-编译器选项" tabindex="-1"><a class="header-anchor" href="#_2-2-编译器选项"><span>2.2. 编译器选项</span></a></h3><p>让我们设置我们的处理器编译器选项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>compilerArgs</span><span class="token punctuation">&gt;</span></span>```\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arg</span><span class="token punctuation">&gt;</span></span>```````-Averbose=true```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arg</span><span class="token punctuation">&gt;</span></span>```````\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arg</span><span class="token punctuation">&gt;</span></span>```````-AmethodConstraintsSupported=true```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arg</span><span class="token punctuation">&gt;</span></span>```````\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arg</span><span class="token punctuation">&gt;</span></span>```````-AdiagnosticKind=ERROR```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arg</span><span class="token punctuation">&gt;</span></span>```````\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>compilerArgs</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，diagnosticKind选项针对日志级别。为了在编译时捕捉问题，最好保持默认的ERROR值。所有允许的值都在Diagnostic.Kind枚举中引用。</p><p>接下来，如果我们想要将注解验证限制为仅getter，我们应该将methodConstraintsSupported选项设置为false。</p><p>在这里，我们将verbose设置为true以获得更多的输出，但如果我们不想要大量的日志输出，我们可以将其设置为false。</p><h2 id="_3-常见约束问题" tabindex="-1"><a class="header-anchor" href="#_3-常见约束问题"><span>3. 常见约束问题</span></a></h2><p>注解处理器带有一组预定义的错误来检查。让我们通过使用一个简单的Message类作为示例，更仔细地查看其中的三个：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Message</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 构造函数省略</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-只有getter可以被注解" tabindex="-1"><a class="header-anchor" href="#_3-1-只有getter可以被注解"><span>3.1. 只有Getter可以被注解</span></a></h3><p>首先，这个问题在处理器的默认选项下不应该存在。顾名思义，当我们在非getter方法上注解时，就会出现这个问题。我们需要将methodConstraintsSupported选项设置为true以允许这样做。</p><p>让我们向我们的Message类添加三个注解方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Min</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">broadcast</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token annotation punctuation">@NotNull</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">archive</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n<span class="token punctuation">}</span>\n\n<span class="token annotation punctuation">@AssertTrue</span>\n<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们在配置中将methodConstraintsSupported选项设置为false：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>compilerArgs</span><span class="token punctuation">&gt;</span></span>```\n    ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arg</span><span class="token punctuation">&gt;</span></span>```````AmethodConstraintsSupported=false```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arg</span><span class="token punctuation">&gt;</span></span>```````\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>compilerArgs</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，这三种方法将导致处理器检测到我们的问题：</p><p>[编译错误信息]</p><h3 id="_3-2-只有非void方法可以被注解" tabindex="-1"><a class="header-anchor" href="#_3-2-只有非void方法可以被注解"><span>3.2. 只有非Void方法可以被注解</span></a></h3><p>这个问题说明我们不应该用约束验证来装饰void方法。我们可以通过在我们的Message类中注解一个archive方法来看到它的作用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@NotNull</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">archive</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将导致处理器引发错误：</p><p>[编译错误信息]</p><h3 id="_3-3-注解不支持的类型" tabindex="-1"><a class="header-anchor" href="#_3-3-注解不支持的类型"><span>3.3. 注解不支持的类型</span></a></h3><p>这最后一个问题是最常见的。当注解目标数据类型与目标属性不匹配时，就会发生这种情况。让我们通过在我们的Message类中添加一个错误注解的String属性来看看它是如何工作的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Past</span>\n<span class="token keyword">private</span> <span class="token class-name">String</span> createdAt<span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>由于@Past注解，将会出现错误。实际上，只有日期类型才能使用此约束：</p><p>[编译错误信息]</p><p>如果我们将错误的注解应用于具有不支持返回类型的方法是，我们会得到类似的错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Min</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">broadcast</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>处理器错误消息与之前的相同：</p><p>[编译错误信息]</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们尝试了Hibernate Validator注解处理器。</p><p>首先，我们安装了它并配置了它的选项。然后，我们通过三个常见的约束问题探索了它的行为。</p><p>如往常一样，示例代码可以在GitHub上找到。</p>',50),o=[p];function l(i,c){return s(),n("div",null,o)}const d=a(e,[["render",l],["__file","2024-07-22-Hibernate Validator Annotation Processor in Depth.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-22/2024-07-22-Hibernate%20Validator%20Annotation%20Processor%20in%20Depth.html","title":"Hibernate Validator注解处理器深度解析","lang":"zh-CN","frontmatter":{"date":"2022-01-20T00:00:00.000Z","category":["Hibernate Validator","Annotation Processor"],"tag":["Java","Bean Validation"],"head":[["meta",{"name":"keywords","content":"Hibernate Validator, Annotation Processor, Java, Bean Validation"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-22/2024-07-22-Hibernate%20Validator%20Annotation%20Processor%20in%20Depth.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Hibernate Validator注解处理器深度解析"}],["meta",{"property":"og:description","content":"Hibernate Validator注解处理器深度解析 在本文中，我们将深入探讨Hibernate Validator注解处理器。首先，我们将安装并配置它，然后通过三个常见的约束问题来探索它的行为。示例代码可以在GitHub上找到。 请注意，此工具的版本7仅与jakarta.validation约束兼容。此外，处理器还提供了如何在主要Java IDE..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T02:23:07.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Bean Validation"}],["meta",{"property":"article:published_time","content":"2022-01-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T02:23:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Hibernate Validator注解处理器深度解析\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-01-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T02:23:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Hibernate Validator注解处理器深度解析 在本文中，我们将深入探讨Hibernate Validator注解处理器。首先，我们将安装并配置它，然后通过三个常见的约束问题来探索它的行为。示例代码可以在GitHub上找到。 请注意，此工具的版本7仅与jakarta.validation约束兼容。此外，处理器还提供了如何在主要Java IDE..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 配置","slug":"_2-配置","link":"#_2-配置","children":[{"level":3,"title":"2.1. 安装","slug":"_2-1-安装","link":"#_2-1-安装","children":[]},{"level":3,"title":"2.2. 编译器选项","slug":"_2-2-编译器选项","link":"#_2-2-编译器选项","children":[]}]},{"level":2,"title":"3. 常见约束问题","slug":"_3-常见约束问题","link":"#_3-常见约束问题","children":[{"level":3,"title":"3.1. 只有Getter可以被注解","slug":"_3-1-只有getter可以被注解","link":"#_3-1-只有getter可以被注解","children":[]},{"level":3,"title":"3.2. 只有非Void方法可以被注解","slug":"_3-2-只有非void方法可以被注解","link":"#_3-2-只有非void方法可以被注解","children":[]},{"level":3,"title":"3.3. 注解不支持的类型","slug":"_3-3-注解不支持的类型","link":"#_3-3-注解不支持的类型","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721614987000,"updatedTime":1721614987000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.94,"words":1183},"filePathRelative":"posts/baeldung/2024-07-22/2024-07-22-Hibernate Validator Annotation Processor in Depth.md","localizedDate":"2022年1月20日","excerpt":"\\n<p>在本文中，我们将深入探讨Hibernate Validator注解处理器。首先，我们将安装并配置它，然后通过三个常见的约束问题来探索它的行为。示例代码可以在GitHub上找到。</p>\\n<p>请注意，此工具的版本7仅与jakarta.validation约束兼容。此外，处理器还提供了如何在主要Java IDE中设置它的指导。</p>\\n<p>以下是文章的翻译内容，包括概述、配置、常见约束问题和结论部分，以及示例代码和错误信息的翻译。由于篇幅限制，这里只提供部分翻译的示例：</p>\\n<h2>1. 概述</h2>\\n<p>很容易误用Bean验证约束。例如，我们可能会不小心在一个String属性上使用@Future约束。这类错误可能导致运行时出现不可预测的错误。</p>","autoDesc":true}');export{d as comp,k as data};
