import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-2zDpbLgD.js";const p={},e=t('<h1 id="使用lombok注解通过openapi生成模型" tabindex="-1"><a class="header-anchor" href="#使用lombok注解通过openapi生成模型"><span>使用Lombok注解通过OpenAPI生成模型</span></a></h1><p>Lombok是一个Java库，有助于减少像getter、setter等样板代码。OpenAPI提供了一个属性来自动生成带有Lombok注解的模型。</p><p>在本教程中，我们将探讨如何使用OpenAPI代码生成器生成带有Lombok注解的模型。</p><h2 id="_2-项目设置" tabindex="-1"><a class="header-anchor" href="#_2-项目设置"><span>2. 项目设置</span></a></h2><p>首先，让我们启动一个Spring Boot项目，并添加Spring Boot Starter Web和Lombok依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````org.springframework.boot````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````spring-boot-starter-web````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````3.1.2````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````org.projectlombok````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````lombok````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````1.18.30````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>`provided`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>`\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们还需要Swagger注解、Gson、Java注解API依赖项等，以防止生成代码中与包相关的错误：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````javax.annotation````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````javax.annotation-api````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````1.3.2````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````com.google.code.gson````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````gson````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````2.10.1````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````io.swagger.core.v3````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````swagger-annotations````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````2.2.19````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````org.openapitools````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````jackson-databind-nullable````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````7.1.0````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````javax.validation````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````validation-api````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````2.0.1.Final````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下一节中，我们将为名为_Book_的模型创建API规范，然后使用OpenAPI代码生成器生成带有Lombok注解的代码。</p><h2 id="_3-使用openapi生成模型" tabindex="-1"><a class="header-anchor" href="#_3-使用openapi生成模型"><span>3. 使用OpenAPI生成模型</span></a></h2><p>OpenAPI的理念是在实际编码开始之前编写API规范。在这里，我们将创建一个规范文件，并根据规范生成模型。</p><h3 id="_3-1-创建模型规范" tabindex="-1"><a class="header-anchor" href="#_3-1-创建模型规范"><span>3.1. 创建模型规范</span></a></h3><p>首先，让我们在_resources_文件夹中创建一个名为_bookapi.yml_的新文件，以定义_Book_规范：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">openapi</span><span class="token punctuation">:</span> 3.0.2\n<span class="token key atrule">info</span><span class="token punctuation">:</span>\n  <span class="token key atrule">version</span><span class="token punctuation">:</span> 1.0.0\n  <span class="token key atrule">title</span><span class="token punctuation">:</span> 书店\n  <span class="token key atrule">license</span><span class="token punctuation">:</span>\n    <span class="token key atrule">name</span><span class="token punctuation">:</span> MIT\n<span class="token key atrule">paths</span><span class="token punctuation">:</span>\n  <span class="token key atrule">/books</span><span class="token punctuation">:</span>\n    <span class="token key atrule">get</span><span class="token punctuation">:</span>\n      <span class="token key atrule">tags</span><span class="token punctuation">:</span>\n        <span class="token punctuation">-</span> book\n      <span class="token key atrule">summary</span><span class="token punctuation">:</span> 获取所有书籍\n      <span class="token key atrule">responses</span><span class="token punctuation">:</span>\n        <span class="token key atrule">200</span><span class="token punctuation">:</span>\n          <span class="token key atrule">description</span><span class="token punctuation">:</span> 操作成功\n          <span class="token key atrule">content</span><span class="token punctuation">:</span>\n            <span class="token key atrule">application/json</span><span class="token punctuation">:</span>\n              <span class="token key atrule">schema</span><span class="token punctuation">:</span>\n                <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">&#39;#/components/schemas/Book&#39;</span>\n        <span class="token key atrule">404</span><span class="token punctuation">:</span>\n          <span class="token key atrule">description</span><span class="token punctuation">:</span> 书籍未找到\n          <span class="token key atrule">content</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>\n<span class="token key atrule">components</span><span class="token punctuation">:</span>\n  <span class="token key atrule">schemas</span><span class="token punctuation">:</span>\n    <span class="token key atrule">Book</span><span class="token punctuation">:</span>\n      <span class="token key atrule">type</span><span class="token punctuation">:</span> object\n      <span class="token key atrule">required</span><span class="token punctuation">:</span>\n        <span class="token punctuation">-</span> id\n        <span class="token punctuation">-</span> name\n        <span class="token punctuation">-</span> author\n      <span class="token key atrule">properties</span><span class="token punctuation">:</span>\n        <span class="token key atrule">id</span><span class="token punctuation">:</span>\n          <span class="token key atrule">type</span><span class="token punctuation">:</span> integer\n          <span class="token key atrule">format</span><span class="token punctuation">:</span> int64\n        <span class="token key atrule">name</span><span class="token punctuation">:</span>\n          <span class="token key atrule">type</span><span class="token punctuation">:</span> string\n        <span class="token key atrule">author</span><span class="token punctuation">:</span>\n          <span class="token key atrule">type</span><span class="token punctuation">:</span> string\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述规范中，我们定义了具有_id_、_name_和_author_字段的_Book_模式。此外，我们定义了一个端点来获取所有存储的书籍。</p><h3 id="_3-2-生成带有lombok注解的模型" tabindex="-1"><a class="header-anchor" href="#_3-2-生成带有lombok注解的模型"><span>3.2. 生成带有Lombok注解的模型</span></a></h3><p>在定义了API规范之后，让我们将OpenAPI插件添加到_pom.xml_中，以帮助根据规范生成代码：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````org.openapitools````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````openapi-generator-maven-plugin````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n    ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````````7.1.0````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````````\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>executions</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goals</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>`generate`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goals</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>inputSpec</span><span class="token punctuation">&gt;</span></span>`${project.basedir}/src/main/resources/bookapi.yml`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>inputSpec</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>generatorName</span><span class="token punctuation">&gt;</span></span>`spring`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>generatorName</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configOptions</span><span class="token punctuation">&gt;</span></span>`\n                    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>additionalModelTypeAnnotations</span><span class="token punctuation">&gt;</span></span>`@lombok.Data @lombok.NoArgsConstructor @lombok.AllArgsConstructor`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>additionalModelTypeAnnotations</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configOptions</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>generateApis</span><span class="token punctuation">&gt;</span></span>`false`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>generateApis</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>generateSupportingFiles</span><span class="token punctuation">&gt;</span></span>`false`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>generateSupportingFiles</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>generateApiDocumentation</span><span class="token punctuation">&gt;</span></span>`false`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>generateApiDocumentation</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>executions</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们指定了插件在生成过程中要检查的规范文件的位置。此外，我们添加了_additionalModelTypeAnnotations_属性，以向模型添加三个Lombok注解。</p><p>为了简化，我们禁用了支持文件和API文档的生成。</p><p>最后，让我们通过执行Maven _install_命令来生成模型：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ ./mvnw install\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述命令在_target_文件夹中生成了一个_Book_模型。</p><h3 id="_3-3-生成的代码" tabindex="-1"><a class="header-anchor" href="#_3-3-生成的代码"><span>3.3. 生成的代码</span></a></h3><p>让我们看看生成的_Book_模型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@lombok.Data</span> <span class="token annotation punctuation">@lombok.NoArgsConstructor</span> <span class="token annotation punctuation">@lombok.AllArgsConstructor</span>\n<span class="token annotation punctuation">@Generated</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;org.openapitools.codegen.languages.SpringCodegen&quot;</span><span class="token punctuation">,</span> date <span class="token operator">=</span> <span class="token string">&quot;2024-01-03T22:22:14.557819500+02:00[Europe/Bucharest]&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">String</span> author<span class="token punctuation">;</span>\n\n    <span class="token comment">// ..</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述生成的代码中，我们使用插件中的_additionalModelTypeAnnotations_属性定义的三个Lombok注解被添加到了模型类中。</p><p><em>@Data_注解在编译时帮助生成getter、setter等。</em>@NoArgsConstructor_生成一个空构造函数，而_@AllArgsConstructor_生成一个接受类中所有字段参数的构造函数。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们学习了如何使用OpenAPI代码生成器生成带有Lombok注解的模型。添加_additionalModelTypeAnnotations_属性为我们提供了添加所需Lombok注解的灵活性。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>',31),o=[e];function l(c,i){return s(),a("div",null,o)}const g=n(p,[["render",l],["__file","2024-07-01-Generate Models Using OpenAPI With Lombok Annotations.html.vue"]]),r=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Generate%20Models%20Using%20OpenAPI%20With%20Lombok%20Annotations.html","title":"使用Lombok注解通过OpenAPI生成模型","lang":"zh-CN","frontmatter":{"date":"2024-01-03T00:00:00.000Z","category":["Java","OpenAPI","Lombok"],"tag":["Java","Lombok","OpenAPI","Spring Boot","自动生成模型"],"head":[["meta",{"name":"keywords","content":"Java, Lombok, OpenAPI, 自动生成模型, Spring Boot"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Generate%20Models%20Using%20OpenAPI%20With%20Lombok%20Annotations.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Lombok注解通过OpenAPI生成模型"}],["meta",{"property":"og:description","content":"使用Lombok注解通过OpenAPI生成模型 Lombok是一个Java库，有助于减少像getter、setter等样板代码。OpenAPI提供了一个属性来自动生成带有Lombok注解的模型。 在本教程中，我们将探讨如何使用OpenAPI代码生成器生成带有Lombok注解的模型。 2. 项目设置 首先，让我们启动一个Spring Boot项目，并添加..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T10:53:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Lombok"}],["meta",{"property":"article:tag","content":"OpenAPI"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"自动生成模型"}],["meta",{"property":"article:published_time","content":"2024-01-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T10:53:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Lombok注解通过OpenAPI生成模型\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-01-03T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T10:53:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Lombok注解通过OpenAPI生成模型 Lombok是一个Java库，有助于减少像getter、setter等样板代码。OpenAPI提供了一个属性来自动生成带有Lombok注解的模型。 在本教程中，我们将探讨如何使用OpenAPI代码生成器生成带有Lombok注解的模型。 2. 项目设置 首先，让我们启动一个Spring Boot项目，并添加..."},"headers":[{"level":2,"title":"2. 项目设置","slug":"_2-项目设置","link":"#_2-项目设置","children":[]},{"level":2,"title":"3. 使用OpenAPI生成模型","slug":"_3-使用openapi生成模型","link":"#_3-使用openapi生成模型","children":[{"level":3,"title":"3.1. 创建模型规范","slug":"_3-1-创建模型规范","link":"#_3-1-创建模型规范","children":[]},{"level":3,"title":"3.2. 生成带有Lombok注解的模型","slug":"_3-2-生成带有lombok注解的模型","link":"#_3-2-生成带有lombok注解的模型","children":[]},{"level":3,"title":"3.3. 生成的代码","slug":"_3-3-生成的代码","link":"#_3-3-生成的代码","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719831239000,"updatedTime":1719831239000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.01,"words":903},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Generate Models Using OpenAPI With Lombok Annotations.md","localizedDate":"2024年1月3日","excerpt":"\\n<p>Lombok是一个Java库，有助于减少像getter、setter等样板代码。OpenAPI提供了一个属性来自动生成带有Lombok注解的模型。</p>\\n<p>在本教程中，我们将探讨如何使用OpenAPI代码生成器生成带有Lombok注解的模型。</p>\\n<h2>2. 项目设置</h2>\\n<p>首先，让我们启动一个Spring Boot项目，并添加Spring Boot Starter Web和Lombok依赖项：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>```````<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>```````\\n    ````````<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>````````org.springframework.boot````````<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>````````\\n    ````````<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>````````spring-boot-starter-web````````<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>````````\\n    ````````<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>````````3.1.2````````<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>````````\\n```````<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>```````\\n```````<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>```````\\n    ````````<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>````````org.projectlombok````````<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>````````\\n    ````````<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>````````lombok````````<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>````````\\n    ````````<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>````````1.18.30````````<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>````````\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>scope</span><span class=\\"token punctuation\\">&gt;</span></span>`provided`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>scope</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n```````<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>```````\\n</code></pre></div>","autoDesc":true}');export{g as comp,r as data};
