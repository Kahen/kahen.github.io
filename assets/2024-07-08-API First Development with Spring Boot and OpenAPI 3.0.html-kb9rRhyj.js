import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as p}from"./app-DRFG6C5y.js";const a={},i=p('<h1 id="使用spring-boot和openapi-3-0进行api优先开发-baeldung" tabindex="-1"><a class="header-anchor" href="#使用spring-boot和openapi-3-0进行api优先开发-baeldung"><span>使用Spring Boot和OpenAPI 3.0进行API优先开发 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>软件工程行业越来越依赖于Web API。云计算和HTTP的日益使用可能解释了这一点。</p><p>软件开发团队必须确保他们设计的API既有帮助又易于用户使用。<strong>传统开发方法中的主要挑战是在同时设计API契约和实现新产品的业务逻辑时保持敏捷性。</strong></p><p>在本文中，我们将介绍使用Spring Boot和OpenAPI 3.0的API优先开发。<strong>这种方法通过及时的API设计反馈、快速失败流程和并行工作，提高了团队的沟通和敏捷性。</strong></p><h2 id="_2-什么是openapi规范" tabindex="-1"><a class="header-anchor" href="#_2-什么是openapi规范"><span>2. 什么是OpenAPI规范</span></a></h2><p>OpenAPI规范（OAS）标准化了如何创建API设计文档。使用OAS的API优先方法的典型工作流程如下：</p><ul><li>团队创建设计文档并将其分享给相关人员以获取反馈和迭代更改。</li><li>当团队和利益相关者对API设计达成一致时，开发人员使用该文档使用文档生成器工具生成服务器端的骨架代码。</li><li>最后，开发人员开始使用先前生成的代码在API上工作业务逻辑。</li></ul><p>OAS 3.1允许指定HTTP资源、动词、响应代码、数据模型、媒体类型、安全方案和其他API组件。</p><p>敏捷开发是软件行业中使用最广泛的方法之一。敏捷意味着<strong>尽快构建一个小东西，要么快速失败并更改初始设计，要么逐步添加小的更改继续进行。</strong></p><p>从敏捷团队的角度来看，API优先开发有几个优点：</p><ul><li>提供了一种快速反馈API设计的方式。</li><li>创建了一个通向API契约协议的单一沟通渠道。</li><li>允许参与API设计的人员的并行工作。</li></ul><p>为了充分理解API优先方法的优势，我们将比较两个敏捷团队的工作流程场景。第一支团队使用传统方法，而第二支使用API优先开发：</p><h2 id="_4-定义api契约" tabindex="-1"><a class="header-anchor" href="#_4-定义api契约"><span>4. 定义API契约</span></a></h2><p>我们将使用银行演示REST API来说明API优先方法的工作流程。该API允许两个操作：获取余额和存款金额。为了澄清，下表显示了这些操作的资源路径、HTTP动词和响应代码（RC）：</p><table><thead><tr><th></th><th>HTTP动词</th><th>资源</th><th>错误RCs</th><th>成功RC&#39;s</th></tr></thead><tbody><tr><td>获取余额</td><td>GET</td><td>/account</td><td>404 – 账户未找到</td><td>200 – 获取余额信息</td></tr><tr><td>存款金额</td><td>POST</td><td>/account/deposit</td><td>404 – 账户未找到</td><td>204 – 存款操作完成</td></tr></tbody></table><p>现在，我们可以创建OAS API规范文件。我们将使用Swagger在线编辑器，这是一个将YAML解释为Swagger文档的在线解决方案。</p><h3 id="_4-1-api的顶级上下文" tabindex="-1"><a class="header-anchor" href="#_4-1-api的顶级上下文"><span>4.1. API的顶级上下文</span></a></h3><p>让我们首先定义API的顶级上下文。为此，请转到Swagger编辑器，并用以下YAML代码替换编辑器左侧的内容：</p><h3 id="_4-2-公开api路径" tabindex="-1"><a class="header-anchor" href="#_4-2-公开api路径"><span>4.2. 公开API路径</span></a></h3><p>现在，让我们创建前面描述的GET <em>/account</em> 和 POST <em>/account/deposit</em> API端点。为此，请在YAML编辑器的根级别添加以下内容：</p><h3 id="_4-3-定义数据模型组件" tabindex="-1"><a class="header-anchor" href="#_4-3-定义数据模型组件"><span>4.3. 定义数据模型组件</span></a></h3><p>最后，让我们创建我们API的数据模型对象：请求和响应体以及错误消息。为了实现这一点，在YAML编辑器的根级别添加以下结构：</p><h3 id="_4-4-查看api文档" tabindex="-1"><a class="header-anchor" href="#_4-4-查看api文档"><span>4.4. 查看API文档</span></a></h3><p>此时，API可以在线供产品的利益相关者审查。我们知道API优先开发的主要优势是快速失败或成功的能力，而不会在开发阶段浪费时间。因此，<strong>确保每个人在进入开发阶段之前审查和协作提议的API资源、响应代码、数据模型以及API的描述和责任。</strong></p><p>一旦团队就设计达成一致，他们就可以并行地在API上工作。</p><h2 id="_5-导入到spring-boot应用程序" tabindex="-1"><a class="header-anchor" href="#_5-导入到spring-boot应用程序"><span>5. 导入到Spring Boot应用程序</span></a></h2><p>本节展示了开发人员如何将YAML文档导入应用程序并自动生成API骨架代码。</p><p>首先，我们必须在_/src/main/resources_文件夹中创建一个名为_account_api_description.yaml_的空YAML文件。然后，让我们用Swagger在线编辑器中的完整YAML代码替换_account_api_description.yaml_的内容。最后，我们必须将_openapi-generator-maven-plugin_插件添加到Spring Boot应用程序_pom.xml_文件的_<code>&lt;plugins&gt;</code>_标签中：</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们已经看到了如何使用Spring Boot和OAS进行API优先开发。我们还研究了API优先的好处以及它如何帮助现代敏捷软件开发团队。使用API优先的最重要原因是增加敏捷性并减少在创建API时浪费的开发时间。使用这种方法，我们可以起草、迭代更改，并更快地提供设计反馈。</p><p><strong>使用API优先方法的另一个好原因是利益相关者不需要依赖开发人员完成代码才能开始他们的工作。</strong> QA、作家、经理和开发人员可以在创建初始API设计文档后并行工作。</p><p>如常，你可以在GitHub上找到这里使用的代码。</p>',33),o=[i];function r(l,s){return n(),t("div",null,o)}const A=e(a,[["render",r],["__file","2024-07-08-API First Development with Spring Boot and OpenAPI 3.0.html.vue"]]),P=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-API%20First%20Development%20with%20Spring%20Boot%20and%20OpenAPI%203.0.html","title":"使用Spring Boot和OpenAPI 3.0进行API优先开发 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-07-08T00:00:00.000Z","category":["Spring Boot","OpenAPI"],"tag":["API-First Development","Agile Development"],"head":[["meta",{"name":"keywords","content":"Spring Boot, OpenAPI, API-First Development, Agile Development"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-API%20First%20Development%20with%20Spring%20Boot%20and%20OpenAPI%203.0.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Spring Boot和OpenAPI 3.0进行API优先开发 | Baeldung"}],["meta",{"property":"og:description","content":"使用Spring Boot和OpenAPI 3.0进行API优先开发 | Baeldung 1. 引言 软件工程行业越来越依赖于Web API。云计算和HTTP的日益使用可能解释了这一点。 软件开发团队必须确保他们设计的API既有帮助又易于用户使用。传统开发方法中的主要挑战是在同时设计API契约和实现新产品的业务逻辑时保持敏捷性。 在本文中，我们将介绍..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T13:08:19.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"API-First Development"}],["meta",{"property":"article:tag","content":"Agile Development"}],["meta",{"property":"article:published_time","content":"2024-07-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T13:08:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Spring Boot和OpenAPI 3.0进行API优先开发 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-08T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T13:08:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Spring Boot和OpenAPI 3.0进行API优先开发 | Baeldung 1. 引言 软件工程行业越来越依赖于Web API。云计算和HTTP的日益使用可能解释了这一点。 软件开发团队必须确保他们设计的API既有帮助又易于用户使用。传统开发方法中的主要挑战是在同时设计API契约和实现新产品的业务逻辑时保持敏捷性。 在本文中，我们将介绍..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 什么是OpenAPI规范","slug":"_2-什么是openapi规范","link":"#_2-什么是openapi规范","children":[]},{"level":2,"title":"4. 定义API契约","slug":"_4-定义api契约","link":"#_4-定义api契约","children":[{"level":3,"title":"4.1. API的顶级上下文","slug":"_4-1-api的顶级上下文","link":"#_4-1-api的顶级上下文","children":[]},{"level":3,"title":"4.2. 公开API路径","slug":"_4-2-公开api路径","link":"#_4-2-公开api路径","children":[]},{"level":3,"title":"4.3. 定义数据模型组件","slug":"_4-3-定义数据模型组件","link":"#_4-3-定义数据模型组件","children":[]},{"level":3,"title":"4.4. 查看API文档","slug":"_4-4-查看api文档","link":"#_4-4-查看api文档","children":[]}]},{"level":2,"title":"5. 导入到Spring Boot应用程序","slug":"_5-导入到spring-boot应用程序","link":"#_5-导入到spring-boot应用程序","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720444099000,"updatedTime":1720444099000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.45,"words":1334},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-API First Development with Spring Boot and OpenAPI 3.0.md","localizedDate":"2024年7月8日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>软件工程行业越来越依赖于Web API。云计算和HTTP的日益使用可能解释了这一点。</p>\\n<p>软件开发团队必须确保他们设计的API既有帮助又易于用户使用。<strong>传统开发方法中的主要挑战是在同时设计API契约和实现新产品的业务逻辑时保持敏捷性。</strong></p>\\n<p>在本文中，我们将介绍使用Spring Boot和OpenAPI 3.0的API优先开发。<strong>这种方法通过及时的API设计反馈、快速失败流程和并行工作，提高了团队的沟通和敏捷性。</strong></p>\\n<h2>2. 什么是OpenAPI规范</h2>\\n<p>OpenAPI规范（OAS）标准化了如何创建API设计文档。使用OAS的API优先方法的典型工作流程如下：</p>","autoDesc":true}');export{A as comp,P as data};
