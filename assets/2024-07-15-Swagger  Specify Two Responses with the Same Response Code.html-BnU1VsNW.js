import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as i,a}from"./app-DzJ3ruqA.js";const s={},l=a('<hr><h1 id="swagger-指定同一响应代码的两个响应" tabindex="-1"><a class="header-anchor" href="#swagger-指定同一响应代码的两个响应"><span>Swagger：指定同一响应代码的两个响应</span></a></h1><p>在本文中，我们将编写一个允许为同一响应代码返回两个不同对象的API规范。我们将演示如何使用该规范生成Java代码和Swagger文档。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>让我们定义两个对象。一辆汽车（Car）具有所有者和车牌作为属性，两者都是字符串类型。另一方面，自行车（Bike）具有所有者和速度。速度是一个整数。</p><p>使用OpenAPI，这些定义对应于以下描述：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Car:\n  type: object\n  properties:\n    owner:\n      type: string\n    plate:\n      type: string\nBike:\n  type: object\n  properties:\n    owner:\n      type: string\n    speed:\n      type: integer\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们想要描述一个端点/vehicle，它将接受GET请求，并且能够返回一个汽车或自行车。</strong> 也就是说，我们要完成以下描述：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>paths:\n  /vehicle:\n    get:\n      responses:\n        &#39;200&#39;:\n          # 返回汽车或自行车\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将讨论OpenAPI 2和3规范的这个话题。</p><h2 id="_3-在openapi-3中使用两个不同的响应" tabindex="-1"><a class="header-anchor" href="#_3-在openapi-3中使用两个不同的响应"><span>3. 在OpenAPI 3中使用两个不同的响应</span></a></h2><p>OpenAPI版本3引入了_oneOf_，这正是我们所需要的。</p><h3 id="_3-1-构建描述文件" tabindex="-1"><a class="header-anchor" href="#_3-1-构建描述文件"><span>3.1. 构建描述文件</span></a></h3><p><strong>在OpenAPI 3规范中，_oneOf_期望一个对象数组，并表示提供的值应该完全匹配给定对象中的一个：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>schema:\n  oneOf:\n    - $ref: &#39;#/components/schemas/Car&#39;\n    - $ref: &#39;#/components/schemas/Bike&#39;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，OpenAPI 3引入了展示各种响应示例的可能性。为了清晰起见，我们绝对想提供至少一个带有汽车的示例响应和另一个带有自行车的示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>examples:\n  car:\n    summary: 汽车的示例\n    value:\n      owner: baeldung\n      plate: AEX305\n  bike:\n    summary: 自行车的示例\n    value:\n      owner: john doe\n      speed: 25\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们看看我们的整个描述文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>openapi: 3.0.0\ninfo:\n  title: Demo api\n  description: Demo api for the article &#39;specify two responses with same code based on optional parameter&#39;\n  version: 0.1.0\npaths:\n  /vehicle:\n    get:\n      responses:\n        &#39;200&#39;:\n          description: Get a vehicle\n          content:\n            application/json:\n              schema:\n                oneOf:\n                  - $ref: &#39;#/components/schemas/Car&#39;\n                  - $ref: &#39;#/components/schemas/Bike&#39;\n              examples:\n                car:\n                  summary: 汽车的示例\n                  value:\n                    owner: baeldung\n                    plate: AEX305\n                bike:\n                  summary: 自行车的示例\n                  value:\n                    owner: john doe\n                    speed: 25\ncomponents:\n  schemas:\n    Car:\n      type: object\n      properties:\n        owner:\n          type: string\n        plate:\n          type: string\n    Bike:\n      type: object\n      properties:\n        owner:\n          type: string\n        speed:\n          type: integer\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-生成java类" tabindex="-1"><a class="header-anchor" href="#_3-2-生成java类"><span>3.2. 生成Java类</span></a></h3><p><strong>现在，我们将使用我们的YAML文件来生成我们的API接口。</strong> 两个_maven_插件，<em>swagger-codegen_和_openapi-generator</em>，可以用来从_api.yaml_文件生成Java代码。截至6.0.1版本，<em>openapi-generator_不处理_oneOf</em>，所以我们将在本文中坚持使用_swagger-codegen_。</p><p>我们将使用以下配置为swagger-codegen插件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;plugin&gt;``\n    ```&lt;groupId&gt;```io.swagger.codegen.v3```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```swagger-codegen-maven-plugin```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```3.0.52```&lt;/version&gt;```\n    ``&lt;executions&gt;``\n        ``&lt;execution&gt;``\n            ``&lt;goals&gt;``\n                ``&lt;goal&gt;``generate``&lt;/goal&gt;``\n            ``&lt;/goals&gt;``\n            ``&lt;configuration&gt;``\n                ``&lt;inputSpec&gt;``${project.basedir}/src/main/resources/static/api.yaml``&lt;/inputSpec&gt;``\n                ``&lt;language&gt;``spring``&lt;/language&gt;``\n                ``&lt;configOptions&gt;``\n                    ``&lt;java8&gt;``true``&lt;/java8&gt;``\n                    ``&lt;interfaceOnly&gt;``true``&lt;/interfaceOnly&gt;``\n                ``&lt;/configOptions&gt;``\n            ``&lt;/configuration&gt;``\n        ``&lt;/execution&gt;``\n    ``&lt;/executions&gt;``\n``&lt;/plugin&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们注意，我们决定切换选项以仅生成接口，以节省生成许多对我们不太感兴趣的文件。</p><p>现在让我们执行插件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>mvn clean compile\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们现在可以看看生成的文件：</p><ul><li>生成了_Car_和_Bike_对象</li><li>生成了_OneOfinlineResponse200_接口，以表示可以是_Car_或_Bike_的对象，这要归功于使用_@JsonSubTypes_注释</li><li>_InlineResponse200_是_OneOfinlineResponse200_的基类实现</li><li><em>VehicleApi_定义了端点：对这个端点的get请求返回一个_InlineResponse200</em></li></ul><h3 id="_3-3-生成swagger-ui文档" tabindex="-1"><a class="header-anchor" href="#_3-3-生成swagger-ui文档"><span>3.3. 生成Swagger UI文档</span></a></h3><p>要从我们的YAML描述文件生成Swagger UI文档，我们将使用_springdoc-openapi_。让我们将依赖项添加到_pom.xml_中的_springdoc-openapi-ui_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;dependency&gt;`\n    ```&lt;groupId&gt;```org.springdoc```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```springdoc-openapi-ui```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```1.6.10```&lt;/version&gt;```\n`&lt;/dependency&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>_springdoc-openapi-ui_的1.6.10版本依赖于_swagger-ui_版本4.13.2，它正确处理_oneOf_和各种响应示例。</strong></p><p>要从YAML文件生成Swagger UI文档，我们需要声明一个_SpringBootApplication_并添加以下三个bean：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean\nSpringDocConfiguration springDocConfiguration() {\n    return new SpringDocConfiguration();\n}\n\n@Bean\nSpringDocConfigProperties springDocConfigProperties() {\n    return new SpringDocConfigProperties();\n}\n\n@Bean\nObjectMapperProvider objectMapperProvider(SpringDocConfigProperties springDocConfigProperties) {\n    return new ObjectMapperProvider(springDocConfigProperties);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后但同样重要的是，我们需要确保我们的YAML描述在_resources/static_目录中，并更新_application.properties_以指定我们不想从_Controllers_生成Swagger UI，而是从YAML文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>springdoc.api-docs.enabled=false\nspringdoc.swagger-ui.url=/api.yaml\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们现在可以启动我们的应用程序：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>mvn spring-boot:run\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Swagger UI可以通过_http://localhost:8080/swagger-ui/index.html_访问。</p><p>我们可以看到有一个下拉菜单可以在_Car_和_Bike_示例之间导航：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/08/swaggerResponse1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>响应_Schema_也正确呈现：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/08/swaggerResponse2.png.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_4-在openapi-2中使用两个不同的响应" tabindex="-1"><a class="header-anchor" href="#_4-在openapi-2中使用两个不同的响应"><span>4. 在OpenAPI 2中使用两个不同的响应</span></a></h2><p>在OpenAPI 2中，_oneOf_不存在。所以让我们找一个替代方案。</p><h3 id="_4-1-构建描述文件" tabindex="-1"><a class="header-anchor" href="#_4-1-构建描述文件"><span>4.1. 构建描述文件</span></a></h3><p><strong>我们能做的最好的就是定义一个包装对象，它将拥有_Car_和_Bike_的所有属性。</strong> 公共属性将是必需的，而只属于其中一个的属性将保持可选：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>CarOrBike:\n  description: 汽车将拥有所有者和车牌，而自行车拥有所有者和速度\n  type: object\n  required:\n    - owner\n  properties:\n    owner:\n      type: string\n    plate:\n      type: string\n    speed:\n      type: integer\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的API响应将是一个_CarOrBike_对象。我们将在描述中添加更多的见解。不幸的是，我们不能添加各种示例，所以我们决定只给出一个汽车的示例。</p><p>让我们看看结果的_api.yaml_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>swagger: 2.0.0\ninfo:\n  title: Demo api\n  description: Demo api for the article &#39;specify two responses with same code based on optional parameter&#39;\n  version: 0.1.0\npaths:\n  /vehicle:\n    get:\n      responses:\n        &#39;200&#39;:\n          description: Get a vehicle. Can contain either a Car or a Bike\n          schema:\n            $ref: &#39;#/definitions/CarOrBike&#39;\n          examples:\n            application/json:\n              owner: baeldung\n              plate: AEX305\n              speed:\ndefinitions:\n  Car:\n    type: object\n    properties:\n      owner:\n        type: string\n      plate:\n        type: string\n  Bike:\n    type: object\n    properties:\n      owner:\n        type: string\n      speed:\n        type: integer\n  CarOrBike:\n    description: 汽车将拥有所有者和车牌，而自行车拥有所有者和速度\n    type: object\n    required:\n      - owner\n    properties:\n      owner:\n        type: string\n      plate:\n        type: string\n      speed:\n        type: integer\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-生成java类" tabindex="-1"><a class="header-anchor" href="#_4-2-生成java类"><span>4.2. 生成Java类</span></a></h3><p>让我们适应我们的swagger-codegen插件配置以解析OpenAPI 2文件。<strong>为此，我们需要使用插件的2.x版本。</strong> 它也位于另一个包中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;plugin&gt;``\n    ```&lt;groupId&gt;```io.swagger```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```swagger-codegen-maven-plugin```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```2.4.27```&lt;/version&gt;```\n    ``&lt;executions&gt;``\n        ``&lt;execution&gt;``\n            ``&lt;goals&gt;``\n                ``&lt;goal&gt;``generate``&lt;/goal&gt;``\n            ``&lt;/goals&gt;``\n            ``&lt;configuration&gt;``\n                ``&lt;inputSpec&gt;``${project.basedir}/src/main/resources/static/api.yaml``&lt;/inputSpec&gt;``\n                ``&lt;language&gt;``spring``&lt;/language&gt;``\n                ``&lt;configOptions&gt;``\n                    ``&lt;java8&gt;``true``&lt;/java8&gt;``\n                    ``&lt;interfaceOnly&gt;``true``&lt;/interfaceOnly&gt;``\n                ``&lt;/configOptions&gt;``\n            ``&lt;/configuration&gt;``\n        ``&lt;/execution&gt;``\n    ``&lt;/executions&gt;``\n``&lt;/plugin&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们看看生成的文件：</p><ul><li>CarOrBike对象包含了预期的字段，其中owner是_@NotNull_</li><li>VehicleApi定义了端点：对这个端点的get请求返回一个_CarOrBike_</li></ul><h3 id="_4-3-生成swagger-ui文档" tabindex="-1"><a class="header-anchor" href="#_4-3-生成swagger-ui文档"><span>4.3. 生成Swagger UI文档</span></a></h3><p><strong>我们可以像3.3中那样生成文档。</strong></p><p>我们可以看到我们的描述显示出来了：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/08/swaggerResponse3.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们的_CarOrBike_模型也按预期描述：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/08/SwaggerResponse4.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们了解了如何编写一个可以返回一个对象或另一个对象的端点的OpenAPI规范。我们使用YAML描述文件通过_swagger-codegen_生成Java代码，并使用_springdoc-openapi-ui_生成Swagger UI文档。</p><p>像往常一样，代码可以在GitHub上找到。</p><p>OK</p>',66),t=[l];function d(r,c){return i(),n("div",null,t)}const o=e(s,[["render",d],["__file","2024-07-15-Swagger  Specify Two Responses with the Same Response Code.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-15/2024-07-15-Swagger%20%20Specify%20Two%20Responses%20with%20the%20Same%20Response%20Code.html","title":"Swagger：指定同一响应代码的两个响应","lang":"zh-CN","frontmatter":{"date":"2022-08-01T00:00:00.000Z","category":["OpenAPI","Swagger"],"tag":["API","Java","YAML"],"head":[["meta",{"name":"keywords","content":"Swagger, OpenAPI, Java, YAML, API文档, 多态响应"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-15/2024-07-15-Swagger%20%20Specify%20Two%20Responses%20with%20the%20Same%20Response%20Code.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Swagger：指定同一响应代码的两个响应"}],["meta",{"property":"og:description","content":"Swagger：指定同一响应代码的两个响应 在本文中，我们将编写一个允许为同一响应代码返回两个不同对象的API规范。我们将演示如何使用该规范生成Java代码和Swagger文档。 2. 问题介绍 让我们定义两个对象。一辆汽车（Car）具有所有者和车牌作为属性，两者都是字符串类型。另一方面，自行车（Bike）具有所有者和速度。速度是一个整数。 使用Ope..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/08/swaggerResponse1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-15T14:08:12.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"API"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"YAML"}],["meta",{"property":"article:published_time","content":"2022-08-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-15T14:08:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Swagger：指定同一响应代码的两个响应\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/08/swaggerResponse1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/08/swaggerResponse2.png.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/08/swaggerResponse3.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/08/SwaggerResponse4.png\\"],\\"datePublished\\":\\"2022-08-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-15T14:08:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Swagger：指定同一响应代码的两个响应 在本文中，我们将编写一个允许为同一响应代码返回两个不同对象的API规范。我们将演示如何使用该规范生成Java代码和Swagger文档。 2. 问题介绍 让我们定义两个对象。一辆汽车（Car）具有所有者和车牌作为属性，两者都是字符串类型。另一方面，自行车（Bike）具有所有者和速度。速度是一个整数。 使用Ope..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 在OpenAPI 3中使用两个不同的响应","slug":"_3-在openapi-3中使用两个不同的响应","link":"#_3-在openapi-3中使用两个不同的响应","children":[{"level":3,"title":"3.1. 构建描述文件","slug":"_3-1-构建描述文件","link":"#_3-1-构建描述文件","children":[]},{"level":3,"title":"3.2. 生成Java类","slug":"_3-2-生成java类","link":"#_3-2-生成java类","children":[]},{"level":3,"title":"3.3. 生成Swagger UI文档","slug":"_3-3-生成swagger-ui文档","link":"#_3-3-生成swagger-ui文档","children":[]}]},{"level":2,"title":"4. 在OpenAPI 2中使用两个不同的响应","slug":"_4-在openapi-2中使用两个不同的响应","link":"#_4-在openapi-2中使用两个不同的响应","children":[{"level":3,"title":"4.1. 构建描述文件","slug":"_4-1-构建描述文件","link":"#_4-1-构建描述文件","children":[]},{"level":3,"title":"4.2. 生成Java类","slug":"_4-2-生成java类","link":"#_4-2-生成java类","children":[]},{"level":3,"title":"4.3. 生成Swagger UI文档","slug":"_4-3-生成swagger-ui文档","link":"#_4-3-生成swagger-ui文档","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721052492000,"updatedTime":1721052492000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.48,"words":1644},"filePathRelative":"posts/baeldung/2024-07-15/2024-07-15-Swagger  Specify Two Responses with the Same Response Code.md","localizedDate":"2022年8月1日","excerpt":"<hr>\\n<h1>Swagger：指定同一响应代码的两个响应</h1>\\n<p>在本文中，我们将编写一个允许为同一响应代码返回两个不同对象的API规范。我们将演示如何使用该规范生成Java代码和Swagger文档。</p>\\n<h2>2. 问题介绍</h2>\\n<p>让我们定义两个对象。一辆汽车（Car）具有所有者和车牌作为属性，两者都是字符串类型。另一方面，自行车（Bike）具有所有者和速度。速度是一个整数。</p>\\n<p>使用OpenAPI，这些定义对应于以下描述：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>Car:\\n  type: object\\n  properties:\\n    owner:\\n      type: string\\n    plate:\\n      type: string\\nBike:\\n  type: object\\n  properties:\\n    owner:\\n      type: string\\n    speed:\\n      type: integer\\n</code></pre></div>","autoDesc":true}');export{o as comp,g as data};
