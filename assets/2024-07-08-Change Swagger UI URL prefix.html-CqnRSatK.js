import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as i,a}from"./app-B6f8H54y.js";const t={},r=a('<h1 id="修改swagger-ui-url前缀-baeldung" tabindex="-1"><a class="header-anchor" href="#修改swagger-ui-url前缀-baeldung"><span>修改Swagger-UI URL前缀 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>作为优秀的开发者，我们知道文档对于构建REST API至关重要，因为它帮助API的用户无缝工作。如今，大多数Java开发者都在使用Spring Boot。截至今日，有两种工具可以通过Springfox和SpringDoc简化Swagger API文档的生成和维护。</p><p>在本教程中，<strong>我们将讨论如何通过这些工具默认提供的Swagger-UI URL前缀进行修改。</strong></p><h2 id="_2-使用springdoc更改swagger-ui-url前缀" tabindex="-1"><a class="header-anchor" href="#_2-使用springdoc更改swagger-ui-url前缀"><span>2. 使用Springdoc更改Swagger UI URL前缀</span></a></h2><p>首先，我们来查看如何使用OpenAPI 3.0设置REST API文档。</p><p>根据上述文章，我们需要添加SpringDoc的依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n   ``&lt;groupId&gt;``org.springdoc``&lt;/groupId&gt;``\n   ``&lt;artifactId&gt;``springdoc-openapi-starter-webmvc-ui``&lt;/artifactId&gt;``\n   ``&lt;version&gt;``2.0.2``&lt;/version&gt;``\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>swagger-ui的默认URL将是_http://localhost:8080/swagger-ui.html_。</p><p>现在让我们看看两种自定义swagger-UI URL的方法。我们从_/myproject_开始。</p><h3 id="_2-1-使用-application-properties-文件" tabindex="-1"><a class="header-anchor" href="#_2-1-使用-application-properties-文件"><span>2.1. 使用_application.properties_文件</span></a></h3><p>由于我们已经熟悉了Spring中的许多不同属性，我们需要在_application.properties_文件中添加以下属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>springdoc.swagger-ui.disable-swagger-default-url=true\nspringdoc.swagger-ui.path=/myproject\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-使用配置类" tabindex="-1"><a class="header-anchor" href="#_2-2-使用配置类"><span>2.2. 使用配置类</span></a></h3><p>我们还可以在配置文件中进行此更改：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Component\npublic class SwaggerConfiguration implements ApplicationListener`&lt;ApplicationPreparedEvent&gt;` {\n\n    @Override\n    public void onApplicationEvent(final ApplicationPreparedEvent event) {\n        ConfigurableEnvironment environment = event.getApplicationContext().getEnvironment();\n        Properties props = new Properties();\n        props.put(&quot;springdoc.swagger-ui.path&quot;, swaggerPath());\n        environment.getPropertySources()\n          .addFirst(new PropertiesPropertySource(&quot;programmatically&quot;, props));\n    }\n\n    private String swaggerPath() {\n        return &quot;/myproject&quot;; // TODO: 在这里实现你的逻辑。\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们需要在应用程序启动之前注册监听器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static void main(String[] args) {\n    SpringApplication application = new SpringApplication(SampleApplication.class);\n    application.addListeners(new SwaggerConfiguration());\n    application.run(args);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用springfox更改swagger-ui-url前缀" tabindex="-1"><a class="header-anchor" href="#_3-使用springfox更改swagger-ui-url前缀"><span>3. 使用Springfox更改Swagger UI URL前缀</span></a></h2><p>我们可以查看如何通过设置示例和描述来设置Swagger，并使用Springfox在Spring REST API中设置Swagger 2。</p><p>首先，根据上述文章，我们需要添加Springfox的依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n    ``&lt;groupId&gt;``io.springfox``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``springfox-swagger2``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``3.0.0``&lt;/version&gt;``\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在假设我们想要将此URL更改为http://localhost:8080/myproject/swagger-ui/index.html。让我们回顾两种可以帮助我们实现这一点的方法。</p><h3 id="_3-1-使用-application-properties-文件" tabindex="-1"><a class="header-anchor" href="#_3-1-使用-application-properties-文件"><span>3.1. 使用_application.properties_文件</span></a></h3><p>类似于上述SpringDoc的示例，在_application.properties_文件中添加以下属性将有助于我们成功更改它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>springfox.documentation.swagger-ui.base-url=myproject\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-2-使用配置中的-docket-bean" tabindex="-1"><a class="header-anchor" href="#_3-2-使用配置中的-docket-bean"><span>3.2. 使用配置中的_Docket_ Bean</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean\npublic Docket api() {\n    return new Docket(DocumentationType.SWAGGER_2)\n      .select()\n      .apis(RequestHandlerSelectors.any())\n      .paths(PathSelectors.any())\n      .build();\n}\n\n@Override\npublic void addViewControllers(ViewControllerRegistry registry) {\n   registry.addRedirectViewController(&quot;/myproject&quot;, &quot;/&quot;);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-添加重定向控制器" tabindex="-1"><a class="header-anchor" href="#_4-添加重定向控制器"><span>4. 添加重定向控制器</span></a></h2><p>我们还可以向API端点添加重定向逻辑。在这种情况下，无论我们使用SpringDoc还是Springfox：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Controller\npublic class SwaggerController {\n\n@RequestMapping(&quot;/myproject&quot;)\npublic String getRedirectUrl() {\n       return &quot;redirect:swagger-ui/&quot;;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何使用Springfox和SpringDoc更改REST API文档的默认swagger-ui URL。</p><p>本文的Springfox完整代码示例可以在GitHub上找到，而SpringDoc的代码示例也可以在这里找到。抱歉，由于原文内容较长，我将翻译剩余部分：</p><h2 id="_5-结论-1" tabindex="-1"><a class="header-anchor" href="#_5-结论-1"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何使用Springfox和SpringDoc更改REST API文档的默认swagger-ui URL。</p><p>Springfox的完整代码示例可以在GitHub上找到，SpringDoc的代码示例也可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/74d85e58eea7ae3bd05956bff5cb1b49?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>',39),l=[r];function s(d,p){return i(),n("div",null,l)}const c=e(t,[["render",s],["__file","2024-07-08-Change Swagger UI URL prefix.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Change%20Swagger%20UI%20URL%20prefix.html","title":"修改Swagger-UI URL前缀 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-07-08T00:00:00.000Z","category":["Spring Boot","Swagger"],"tag":["Swagger-UI","URL Prefix"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Swagger, Swagger-UI, URL Prefix, REST API, Springfox, SpringDoc"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Change%20Swagger%20UI%20URL%20prefix.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"修改Swagger-UI URL前缀 | Baeldung"}],["meta",{"property":"og:description","content":"修改Swagger-UI URL前缀 | Baeldung 1. 概述 作为优秀的开发者，我们知道文档对于构建REST API至关重要，因为它帮助API的用户无缝工作。如今，大多数Java开发者都在使用Spring Boot。截至今日，有两种工具可以通过Springfox和SpringDoc简化Swagger API文档的生成和维护。 在本教程中，我们..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T04:59:08.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Swagger-UI"}],["meta",{"property":"article:tag","content":"URL Prefix"}],["meta",{"property":"article:published_time","content":"2024-07-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T04:59:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"修改Swagger-UI URL前缀 | Baeldung\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/74d85e58eea7ae3bd05956bff5cb1b49?s=50&r=g\\",\\"https://wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2024-07-08T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T04:59:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"修改Swagger-UI URL前缀 | Baeldung 1. 概述 作为优秀的开发者，我们知道文档对于构建REST API至关重要，因为它帮助API的用户无缝工作。如今，大多数Java开发者都在使用Spring Boot。截至今日，有两种工具可以通过Springfox和SpringDoc简化Swagger API文档的生成和维护。 在本教程中，我们..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用Springdoc更改Swagger UI URL前缀","slug":"_2-使用springdoc更改swagger-ui-url前缀","link":"#_2-使用springdoc更改swagger-ui-url前缀","children":[{"level":3,"title":"2.1. 使用_application.properties_文件","slug":"_2-1-使用-application-properties-文件","link":"#_2-1-使用-application-properties-文件","children":[]},{"level":3,"title":"2.2. 使用配置类","slug":"_2-2-使用配置类","link":"#_2-2-使用配置类","children":[]}]},{"level":2,"title":"3. 使用Springfox更改Swagger UI URL前缀","slug":"_3-使用springfox更改swagger-ui-url前缀","link":"#_3-使用springfox更改swagger-ui-url前缀","children":[{"level":3,"title":"3.1. 使用_application.properties_文件","slug":"_3-1-使用-application-properties-文件","link":"#_3-1-使用-application-properties-文件","children":[]},{"level":3,"title":"3.2. 使用配置中的_Docket_ Bean","slug":"_3-2-使用配置中的-docket-bean","link":"#_3-2-使用配置中的-docket-bean","children":[]}]},{"level":2,"title":"4. 添加重定向控制器","slug":"_4-添加重定向控制器","link":"#_4-添加重定向控制器","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论-1","link":"#_5-结论-1","children":[]}],"git":{"createdTime":1720414748000,"updatedTime":1720414748000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.78,"words":833},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Change Swagger UI URL prefix.md","localizedDate":"2024年7月8日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>作为优秀的开发者，我们知道文档对于构建REST API至关重要，因为它帮助API的用户无缝工作。如今，大多数Java开发者都在使用Spring Boot。截至今日，有两种工具可以通过Springfox和SpringDoc简化Swagger API文档的生成和维护。</p>\\n<p>在本教程中，<strong>我们将讨论如何通过这些工具默认提供的Swagger-UI URL前缀进行修改。</strong></p>\\n<h2>2. 使用Springdoc更改Swagger UI URL前缀</h2>\\n<p>首先，我们来查看如何使用OpenAPI 3.0设置REST API文档。</p>","autoDesc":true}');export{c as comp,u as data};
