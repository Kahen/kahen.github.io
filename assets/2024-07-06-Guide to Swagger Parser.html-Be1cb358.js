import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as i,a as t}from"./app-DjjHj6B8.js";const a={},s=t(`<h1 id="swagger解析器指南" tabindex="-1"><a class="header-anchor" href="#swagger解析器指南"><span>Swagger解析器指南</span></a></h1><p>Swagger是一套用于设计、描述和记录RESTful API的工具集。</p><p>在本教程中，<strong>我们将探讨如何在Java中解析OpenAPI文档文件并提取其各种组件。</strong></p><h2 id="_2-swagger是什么" tabindex="-1"><a class="header-anchor" href="#_2-swagger是什么"><span>2. Swagger是什么？</span></a></h2><p>Swagger本质上是一套开源的规则、规范和工具集，用于开发和描述REST API。然而，随着新标准和规范的演变，这些规范现在被重命名为OpenAPI规范（OAS）。</p><p><strong>OpenAPI规范标准化了如何创建API设计文档。</strong> 它创建了一个我们可以轻松开发和使用API的RESTful接口。API规范有效地映射了与之相关的所有资源和操作。</p><p>OpenAPI文档是一个自包含的或复合资源，定义了一个API及其各种元素。该文档可以以JSON或YAML格式表示。</p><p>OpenAPI规范的最新版本是OAS 3.1。它允许我们指定HTTP资源、动词、响应代码、数据模型、媒体类型、安全方案和其他API组件。我们可以使用OpenAPI定义来生成文档、代码生成以及许多其他用例。</p><p>另一方面，<strong>Swagger已经发展成为开发API的最广泛使用的开源工具集之一。它基本上提供了一套完整的工具集来设计、构建和记录API。</strong></p><p>要验证OpenAPI文档，我们使用Swagger验证器工具。此外，Swagger编辑器提供了一个基于GUI的编辑器，帮助我们在运行时编辑和可视化API文档。</p><p>我们可以轻松地使用生成的OpenAPI文档与第三方工具一起使用，例如导入到Postman。</p><h2 id="_3-使用swagger解析器" tabindex="-1"><a class="header-anchor" href="#_3-使用swagger解析器"><span>3. 使用Swagger解析器</span></a></h2><p><strong>Swagger解析器是Swagger工具之一，它帮助我们解析OpenAPI文档并提取其各种组件。</strong> 下面，让我们看看如何在Java中实现解析器：</p><h3 id="_3-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_3-1-依赖项"><span>3.1. 依赖项</span></a></h3><p>在我们开始之前，让我们将Swagger解析器的Maven依赖项添加到我们项目的_pom.xml_文件中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`io.swagger.parser.v3\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`swagger-parser\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`2.1.13\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们深入了解如何解析OpenAPI文档。</p><h3 id="_3-2-示例openapi文档" tabindex="-1"><a class="header-anchor" href="#_3-2-示例openapi文档"><span>3.2. 示例OpenAPI文档</span></a></h3><p>在我们开始之前，我们需要一些我们可以解析的示例OpenAPI文档。让我们使用以下名为_sample.yml_的示例OpenAPI YAML文档：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>openapi: 3.0.0
info:
  title: 用户API
  version: &#39;1.0&#39;
servers:
  - url: https://jsonplaceholder.typicode.com
    description: Json占位符服务
paths:
  /users/{id}:
    parameters:
      - schema:
          type: integer
        name: id
        in: path
        required: true
    get:
      summary: 按ID获取用户
      tags:
        - 用户
      responses:
        &#39;200&#39;:
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: integer
                  name:
                    type: string
      operationId: get-users-user_id
      description: 按ID检索特定用户
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述YAML是一个非常简单的OpenAPI规范，定义了一个通过ID获取用户详细信息的API。</p><p>同样，我们也有等效的名为_sample.json_的JSON文档文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
  &quot;openapi&quot;: &quot;3.0.0&quot;,
  &quot;info&quot;: {
    &quot;title&quot;: &quot;用户API&quot;,
    &quot;version&quot;: &quot;1.0&quot;
  },
  &quot;servers&quot;: [
    {
      &quot;url&quot;: &quot;https://jsonplaceholder.typicode.com&quot;,
      &quot;description&quot;: &quot;Json占位符服务&quot;
    }
  ],
  &quot;paths&quot;: {
    &quot;/users/{id}&quot;: {
      &quot;parameters&quot;: [
        {
          &quot;schema&quot;: {
            &quot;type&quot;: &quot;integer&quot;
          },
          &quot;name&quot;: &quot;id&quot;,
          &quot;in&quot;: &quot;path&quot;,
          &quot;required&quot;: true
        }
      ],
      &quot;get&quot;: {
        &quot;summary&quot;: &quot;按ID获取用户&quot;,
        &quot;tags&quot;: [
          &quot;用户&quot;
        ],
        &quot;responses&quot;: {
          &quot;200&quot;: {
            &quot;description&quot;: &quot;OK&quot;,
            &quot;content&quot;: {
              &quot;application/json&quot;: {
                &quot;schema&quot;: {
                  &quot;type&quot;: &quot;object&quot;,
                  &quot;properties&quot;: {
                    &quot;id&quot;: {
                      &quot;type&quot;: &quot;integer&quot;
                    },
                    &quot;name&quot;: {
                      &quot;type&quot;: &quot;string&quot;
                    }
                  }
                }
              }
            }
          }
        },
        &quot;operationId&quot;: &quot;get-users-user_id&quot;,
        &quot;description&quot;: &quot;按ID检索特定用户&quot;
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将使用这些OpenAPI文档文件进行所有编码示例。</p><p>现在让我们来看看如何解析这个文档。</p><h3 id="_3-3-解析openapi-yaml文档" tabindex="-1"><a class="header-anchor" href="#_3-3-解析openapi-yaml文档"><span>3.3. 解析OpenAPI YAML文档</span></a></h3><p>首先，<strong>我们使用_OpenAPIParser().readLocation()_方法来读取和解析YAML或JSON文件。</strong> 这个方法接受三个参数：</p><ul><li><em>String</em> – 我们想要读取的文件的URL</li><li><em>List<code>&lt;AuthorizationValue&gt;</code></em> – 如果要读取的OpenAPI文档受保护，则需要传递授权头的_List_</li><li><em>ParserOptions</em> – 作为自定义解析行为的附加解析选项</li></ul><p>首先，让我们检查从URL读取OpenAPI文档的代码片段：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>SwaggerParseResult result = new OpenAPIParser().readLocation(&quot;sample.yml&quot;, null, null);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>_readLocation()_方法返回一个_SwaggerParserResult_实例，其中包含解析后的结果。</p><p>其次，我们将使用返回的_SwaggerParserResult_实例来获取解析的详细信息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>OpenAPI openAPI = result.getOpenAPI();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>_SwaggerParserResult.getOpenAPI()_方法返回一个_OpenAPI_类的实例。返回的_OpenAPI_类实例基本上是OpenAPI文档的POJO版本。</p><p>最后，我们现在可以使用从获得的_OpenAPI_实例的各种getter方法来获取OpenAPI文档的各个组件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>SpecVersion version = openAPI.getSpecVersion();

Info info = openAPI.getInfo();

List\`&lt;Server&gt;\` servers = openAPI.getServers();

Paths paths = openAPI.getPaths();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-解析openapi-json文档" tabindex="-1"><a class="header-anchor" href="#_3-4-解析openapi-json文档"><span>3.4. 解析OpenAPI JSON文档</span></a></h3><p>以类似的方式，我们也可以解析等效的JSON文档文件。让我们通过传递其文件名作为URL来解析_sample.json_文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>SwaggerParseResult result = new OpenAPIParser().readLocation(&quot;sample.json&quot;, null, null);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，<strong>我们甚至可以使用_OpenAPIParser().readContents(String swaggerString, List<code>&lt;AuthorizationValue&gt;</code> auth, ParseOptions options)_方法从_String_解析OpenAPI规范文档。</strong></p><p>同样，我们可以通过调用_SwaggerParserResult.getMessages()_方法来获取解析期间的任何验证错误和警告。这个方法返回一个包含错误消息的字符串列表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>List\`&lt;String&gt;\` messages = result.getMessages();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们查看了OpenAPI规范和Swagger的基础知识。</p><p>我们看到了如何在Java中解析OpenAPI文档文件。我们实现了代码来解析YAML和JSON规范文件。</p><p>像往常一样，所有示例的完整代码都可以在GitHub上找到。</p>`,46),r=[s];function l(d,o){return i(),n("div",null,r)}const v=e(a,[["render",l],["__file","2024-07-06-Guide to Swagger Parser.html.vue"]]),c=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Guide%20to%20Swagger%20Parser.html","title":"Swagger解析器指南","lang":"zh-CN","frontmatter":{"date":"2024-07-07T00:00:00.000Z","category":["Java","Swagger"],"tag":["OpenAPI","API文档"],"head":[["meta",{"name":"keywords","content":"Swagger, OpenAPI, Java, API文档, 解析"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Guide%20to%20Swagger%20Parser.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Swagger解析器指南"}],["meta",{"property":"og:description","content":"Swagger解析器指南 Swagger是一套用于设计、描述和记录RESTful API的工具集。 在本教程中，我们将探讨如何在Java中解析OpenAPI文档文件并提取其各种组件。 2. Swagger是什么？ Swagger本质上是一套开源的规则、规范和工具集，用于开发和描述REST API。然而，随着新标准和规范的演变，这些规范现在被重命名为Op..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T22:58:22.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"OpenAPI"}],["meta",{"property":"article:tag","content":"API文档"}],["meta",{"property":"article:published_time","content":"2024-07-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T22:58:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Swagger解析器指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-07T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T22:58:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Swagger解析器指南 Swagger是一套用于设计、描述和记录RESTful API的工具集。 在本教程中，我们将探讨如何在Java中解析OpenAPI文档文件并提取其各种组件。 2. Swagger是什么？ Swagger本质上是一套开源的规则、规范和工具集，用于开发和描述REST API。然而，随着新标准和规范的演变，这些规范现在被重命名为Op..."},"headers":[{"level":2,"title":"2. Swagger是什么？","slug":"_2-swagger是什么","link":"#_2-swagger是什么","children":[]},{"level":2,"title":"3. 使用Swagger解析器","slug":"_3-使用swagger解析器","link":"#_3-使用swagger解析器","children":[{"level":3,"title":"3.1. 依赖项","slug":"_3-1-依赖项","link":"#_3-1-依赖项","children":[]},{"level":3,"title":"3.2. 示例OpenAPI文档","slug":"_3-2-示例openapi文档","link":"#_3-2-示例openapi文档","children":[]},{"level":3,"title":"3.3. 解析OpenAPI YAML文档","slug":"_3-3-解析openapi-yaml文档","link":"#_3-3-解析openapi-yaml文档","children":[]},{"level":3,"title":"3.4. 解析OpenAPI JSON文档","slug":"_3-4-解析openapi-json文档","link":"#_3-4-解析openapi-json文档","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720306702000,"updatedTime":1720306702000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.35,"words":1306},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Guide to Swagger Parser.md","localizedDate":"2024年7月7日","excerpt":"\\n<p>Swagger是一套用于设计、描述和记录RESTful API的工具集。</p>\\n<p>在本教程中，<strong>我们将探讨如何在Java中解析OpenAPI文档文件并提取其各种组件。</strong></p>\\n<h2>2. Swagger是什么？</h2>\\n<p>Swagger本质上是一套开源的规则、规范和工具集，用于开发和描述REST API。然而，随着新标准和规范的演变，这些规范现在被重命名为OpenAPI规范（OAS）。</p>\\n<p><strong>OpenAPI规范标准化了如何创建API设计文档。</strong> 它创建了一个我们可以轻松开发和使用API的RESTful接口。API规范有效地映射了与之相关的所有资源和操作。</p>","autoDesc":true}');export{v as comp,c as data};
