import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CXN34Kw1.js";const e={},p=t('<hr><h1 id="swagger中枚举的文档" tabindex="-1"><a class="header-anchor" href="#swagger中枚举的文档"><span>Swagger中枚举的文档</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将学习如何使用_swagger-maven-plugin_在Swagger中记录枚举，并在swagger编辑器中验证生成的JSON文档。</p><h2 id="_2-swagger是什么" tabindex="-1"><a class="header-anchor" href="#_2-swagger是什么"><span>2. Swagger是什么？</span></a></h2><p>Swagger是一个开源工具，用于定义基于REST的API。在当今世界，大多数组织都在向微服务和API优先方法发展。Swagger在设计和记录API方面非常有用。它还提供了各种工具，如Swagger编辑器、Swagger UI和Swagger CodeGen来协助API开发。</p><p><strong>此外，Swagger是_OpenAPI_规范或_OAS_的实现</strong>，它定义了REST API开发的一套标准；因此，它帮助全球组织标准化编写API的过程。</p><p>由我们的应用程序生成的JSON文件也将遵循_OpenAPI_规范。</p><p>让我们尝试理解Swagger中枚举的重要性。一些API需要用户坚持使用一组特定的预定义值。这些预定义的常量值被称为枚举。类似地，当Swagger公开API时，我们希望确保用户从这个预定义的集合中选择一个值，而不是自由文本。<strong>换句话说，我们需要在我们的_swagger.json_文件中记录枚举，以便用户了解可能的值。</strong></p><h2 id="_3-实现" tabindex="-1"><a class="header-anchor" href="#_3-实现"><span>3. 实现</span></a></h2><p>让我们以一个REST API为例，并跳转到实现。<strong>我们将实现一个POST API，为组织雇佣特定角色的员工。然而，角色只能是以下之一：<em>Engineer</em>（工程师）、<em>Clerk</em>（职员）、<em>Driver</em>（司机）或_Janitor_（清洁工）。</strong></p><p>我们将创建一个名为_Role_的枚举，包含所有可能的员工角色值，并创建一个具有角色属性的_Employee_类。让我们看一下类及其关系的UML图，以便更好地理解：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/02/UML-HireController.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>要在Swagger中记录这一点，首先，我们将导入并配置_swagger-maven-plugin_在我们的应用程序中。其次，我们将向我们的代码添加所需的注释，最后，我们将构建项目并在swagger编辑器中验证生成的swagger文档或_swagger.json_。</p><h3 id="_3-1-导入并配置插件" tabindex="-1"><a class="header-anchor" href="#_3-1-导入并配置插件"><span>3.1. 导入并配置插件</span></a></h3><p>我们将使用_swagger-maven-plugin_，我们需要将其作为依赖项添加到我们的应用程序的_pom.xml_中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.github.kongchen``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``swagger-maven-plugin``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```3.1.1```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，为了配置并启用此插件，我们将在_pom.xml_的插件部分添加它：</p><ul><li><em>locations</em>：此标签指定包含_@Api_的包或类，用分号分隔</li><li><em>info</em>：此标签提供API的元数据。Swagger-ui使用此数据显示信息</li><li><em>swaggerDirectory</em>：此标签定义_swagger.json_文件的路径</li></ul><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.github.kongchen``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``swagger-maven-plugin``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```3.1.1```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>apiSources</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>apiSource</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>springmvc</span><span class="token punctuation">&gt;</span></span>`false`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>springmvc</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>locations</span><span class="token punctuation">&gt;</span></span>`com.baeldung.swaggerenums.controller`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>locations</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>schemes</span><span class="token punctuation">&gt;</span></span>`http,https`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>schemes</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>host</span><span class="token punctuation">&gt;</span></span>`baeldung.com`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>host</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>basePath</span><span class="token punctuation">&gt;</span></span>`/api`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>basePath</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>info</span><span class="token punctuation">&gt;</span></span>`\n                    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>`Baeldung - Document Enum`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>`\n                    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```v1```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n                    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>description</span><span class="token punctuation">&gt;</span></span>`This is a Baeldung Document Enum Sample Code`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>description</span><span class="token punctuation">&gt;</span></span>`\n                    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>contact</span><span class="token punctuation">&gt;</span></span>`\n                        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>email</span><span class="token punctuation">&gt;</span></span>`pmurria@baeldung.com`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>email</span><span class="token punctuation">&gt;</span></span>`\n                        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>``Test``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span>``\n                    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>contact</span><span class="token punctuation">&gt;</span></span>`\n                    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>license</span><span class="token punctuation">&gt;</span></span>`\n                        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">&gt;</span></span>`https://www.apache.org/licenses/LICENSE-2.0.html`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">&gt;</span></span>`\n                        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>``Apache 2.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span>``\n                    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>license</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>info</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>swaggerDirectory</span><span class="token punctuation">&gt;</span></span>`generated/swagger-ui`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>swaggerDirectory</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>apiSource</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>apiSources</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>executions</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>phase</span><span class="token punctuation">&gt;</span></span>`compile`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>phase</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goals</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>`generate`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goals</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>executions</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-记录枚举" tabindex="-1"><a class="header-anchor" href="#_3-2-记录枚举"><span>3.2. 记录枚举</span></a></h3><p>为了在Swagger中记录枚举，<strong>我们需要使用注释_@ApiModel_声明模型。</strong></p><p>在这个例子中，我们创建了一个有四个可能值的枚举_Role_——<em>Engineer, Clerk, Driver, and Janitor</em>。由于我们需要记录这个枚举，我们将在枚举_Role_上添加_@ApiModel_。换句话说，这将让Swagger知道模型的存在。在_Employee_类中，我们将用_@ApiModel_注释_Employee_，并用_@ApiModelProperty_注释_Role_。</p><p>我们的_Employee_、_Role_和_HireController_将如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ApiModel</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@ApiModelProperty</span>\n    <span class="token keyword">public</span> <span class="token class-name">Role</span> role<span class="token punctuation">;</span>\n\n   <span class="token comment">// 标准setter和getter</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ApiModel</span>\n<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">Role</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Engineer</span><span class="token punctuation">,</span> <span class="token class-name">Clerk</span><span class="token punctuation">,</span> <span class="token class-name">Driver</span><span class="token punctuation">,</span> <span class="token class-name">Janitor</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将创建一个API，使用_@Path_为_“/hire”<em>，并使用_Employee_模型作为_hireEmployee_方法的输入参数。我们必须在_HireController_上添加</em>@Api_，以便_swagger-maven-plugin_知道并应考虑其进行文档记录：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Api</span>\n<span class="token annotation punctuation">@Path</span><span class="token punctuation">(</span>value<span class="token operator">=</span><span class="token string">&quot;/hire&quot;</span><span class="token punctuation">)</span>\n<span class="token annotation punctuation">@Produces</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;application/json&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HireController</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@POST</span>\n    <span class="token annotation punctuation">@ApiOperation</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;This method is used to hire employee with a specific role&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">hireEmployee</span><span class="token punctuation">(</span><span class="token annotation punctuation">@ApiParam</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;role&quot;</span><span class="token punctuation">,</span> required <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token class-name">Employee</span> employee<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;Hired for role: %s&quot;</span><span class="token punctuation">,</span> employee<span class="token punctuation">.</span>role<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-生成swagger文档" tabindex="-1"><a class="header-anchor" href="#_3-3-生成swagger文档"><span>3.3. 生成Swagger文档</span></a></h3><p>要构建我们的项目并生成swagger文档，运行以下命令：</p><p><code>mvn clean install</code></p><p>构建完成后，插件将在_生成/swagger-ui_或插件配置的位置生成_swagger.json_文件。在定义下，我们将看到枚举_Role_记录在员工属性中，包含其所有可能的值。</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token property">&quot;definitions&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>\n  <span class="token property">&quot;Employee&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;properties&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token property">&quot;role&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span>\n        <span class="token property">&quot;enum&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;Engineer&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Clerk&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Driver&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Janitor&quot;</span> <span class="token punctuation">]</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们将使用在线swagger编辑器可视化生成的JSON，并查找枚举_Role_：<img src="https://www.baeldung.com/wp-content/uploads/2022/02/Swagger-Json-in-editor.png" alt="img" loading="lazy"></p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本教程中，我们讨论了Swagger是什么以及_OpenAPI_规范及其在组织API开发中的重要性。此外，我们使用_swagger-maven-plugin_创建并记录了我们的示例API，其中包含枚举。最后，为了验证输出，我们使用swagger编辑器可视化了生成的JSON文档。</p><p>此实现可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"></p><p>OK</p>',39),o=[p];function l(c,i){return s(),a("div",null,o)}const r=n(e,[["render",l],["__file","2024-07-21-Document Enum in Swagger.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-Document%20Enum%20in%20Swagger.html","title":"Swagger中枚举的文档","lang":"zh-CN","frontmatter":{"date":"2022-02-01T00:00:00.000Z","category":["Swagger"],"tag":["API","Documentation"],"head":[["meta",{"name":"keywords","content":"Swagger, Enum, API Documentation"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-Document%20Enum%20in%20Swagger.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Swagger中枚举的文档"}],["meta",{"property":"og:description","content":"Swagger中枚举的文档 1. 概述 在本教程中，我们将学习如何使用_swagger-maven-plugin_在Swagger中记录枚举，并在swagger编辑器中验证生成的JSON文档。 2. Swagger是什么？ Swagger是一个开源工具，用于定义基于REST的API。在当今世界，大多数组织都在向微服务和API优先方法发展。Swagger..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/02/UML-HireController.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T18:14:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"API"}],["meta",{"property":"article:tag","content":"Documentation"}],["meta",{"property":"article:published_time","content":"2022-02-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T18:14:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Swagger中枚举的文档\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/02/UML-HireController.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/02/Swagger-Json-in-editor.png\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\"],\\"datePublished\\":\\"2022-02-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T18:14:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Swagger中枚举的文档 1. 概述 在本教程中，我们将学习如何使用_swagger-maven-plugin_在Swagger中记录枚举，并在swagger编辑器中验证生成的JSON文档。 2. Swagger是什么？ Swagger是一个开源工具，用于定义基于REST的API。在当今世界，大多数组织都在向微服务和API优先方法发展。Swagger..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Swagger是什么？","slug":"_2-swagger是什么","link":"#_2-swagger是什么","children":[]},{"level":2,"title":"3. 实现","slug":"_3-实现","link":"#_3-实现","children":[{"level":3,"title":"3.1. 导入并配置插件","slug":"_3-1-导入并配置插件","link":"#_3-1-导入并配置插件","children":[]},{"level":3,"title":"3.2. 记录枚举","slug":"_3-2-记录枚举","link":"#_3-2-记录枚举","children":[]},{"level":3,"title":"3.3. 生成Swagger文档","slug":"_3-3-生成swagger文档","link":"#_3-3-生成swagger文档","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721585646000,"updatedTime":1721585646000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.22,"words":1266},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-Document Enum in Swagger.md","localizedDate":"2022年2月1日","excerpt":"<hr>\\n<h1>Swagger中枚举的文档</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将学习如何使用_swagger-maven-plugin_在Swagger中记录枚举，并在swagger编辑器中验证生成的JSON文档。</p>\\n<h2>2. Swagger是什么？</h2>\\n<p>Swagger是一个开源工具，用于定义基于REST的API。在当今世界，大多数组织都在向微服务和API优先方法发展。Swagger在设计和记录API方面非常有用。它还提供了各种工具，如Swagger编辑器、Swagger UI和Swagger CodeGen来协助API开发。</p>\\n<p><strong>此外，Swagger是_OpenAPI_规范或_OAS_的实现</strong>，它定义了REST API开发的一套标准；因此，它帮助全球组织标准化编写API的过程。</p>","autoDesc":true}');export{r as comp,k as data};
