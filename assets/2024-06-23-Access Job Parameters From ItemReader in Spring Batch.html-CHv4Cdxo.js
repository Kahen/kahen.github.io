import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as r}from"./app-CSOndlfc.js";const n={},i=r('<h1 id="spring-batch中从itemreader访问作业参数" tabindex="-1"><a class="header-anchor" href="#spring-batch中从itemreader访问作业参数"><span>Spring Batch中从ItemReader访问作业参数</span></a></h1><p>Spring Batch是一个功能强大的Java批处理框架，因此成为数据处理活动和计划作业运行的热门选择。根据业务逻辑的复杂性，作业可能依赖不同的配置值和动态参数。</p><p>在本文中，我们将探讨如何使用_JobParameters_以及如何从关键的批处理组件中访问它们。</p><h3 id="_2-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-1-依赖项"><span>2.1. 依赖项</span></a></h3><p>要开始演示应用程序，<strong>我们需要添加Spring Batch和H2依赖项：</strong></p><h3 id="_2-2-准备测试数据" tabindex="-1"><a class="header-anchor" href="#_2-2-准备测试数据"><span>2.2. 准备测试数据</span></a></h3><p>让我们通过定义_schema-all.sql_中的模式开始：</p><h3 id="_2-3-medicine-领域类" tabindex="-1"><a class="header-anchor" href="#_2-3-medicine-领域类"><span>2.3. <em>Medicine</em> 领域类</span></a></h3><p>对于我们的服务，<strong>我们需要一个简单的_Medicine_实体类：</strong></p><h3 id="_2-4-应用程序属性" tabindex="-1"><a class="header-anchor" href="#_2-4-应用程序属性"><span>2.4. 应用程序属性</span></a></h3><p>应用程序需要在_src/main/resources/application.properties_文件中的多个属性：</p><h3 id="_3-1-stepscope-和-jobscope" tabindex="-1"><a class="header-anchor" href="#_3-1-stepscope-和-jobscope"><span>3.1. <em>StepScope_和_JobScope</em></span></a></h3><p>除了常规Spring中众所周知的bean作用域外，<strong>Spring Batch引入了两个额外的作用域：<em>StepScope_和_JobScope</em></strong>。有了这些作用域，就可以为工作流中的每个步骤或作业创建独特的bean。Spring确保与特定步骤/作业相关联的资源在其整个生命周期中被隔离和管理。</p><h3 id="_3-2-在计划执行中填充作业参数" tabindex="-1"><a class="header-anchor" href="#_3-2-在计划执行中填充作业参数"><span>3.2. 在计划执行中填充作业参数</span></a></h3><p>让我们定义_MedExpirationBatchRunner_类，该类将通过cron表达式（在我们的例子中每1分钟）启动我们的作业。<strong>我们应该使用_@EnableScheduling_注解类，并定义适当的_@Scheduled_入口方法：</strong></p><h3 id="_3-3-在bean定义中读取作业参数" tabindex="-1"><a class="header-anchor" href="#_3-3-在bean定义中读取作业参数"><span>3.3. 在Bean定义中读取作业参数</span></a></h3><p>**使用SpEL我们可以从我们的配置类中的bean定义访问作业参数。**Spring将所有参数合并为一个常规的_String_到_Object_映射：</p><h3 id="_3-4-直接在服务中读取作业参数" tabindex="-1"><a class="header-anchor" href="#_3-4-直接在服务中读取作业参数"><span>3.4. 直接在服务中读取作业参数</span></a></h3><p>**另一个选择是在_ItemReader_本身中使用setter注入。**我们可以通过SpEL表达式像从任何其他映射一样获取确切的参数值：</p><h3 id="_3-5-通过before-step读取作业参数" tabindex="-1"><a class="header-anchor" href="#_3-5-通过before-step读取作业参数"><span>3.5. 通过Before Step读取作业参数</span></a></h3><p>**Spring Batch提供了一个_StepExecutionListener_接口，允许我们监听步骤执行阶段：在步骤开始之前和步骤完成后。**我们可以利用这个特性，在步骤开始之前访问属性，并执行任何自定义逻辑。最简单的方法是使用_@BeforeStep_注解，它对应于_StepExecutionListener_中的_beforeStep()_方法：</p><h2 id="_4-作业配置" tabindex="-1"><a class="header-anchor" href="#_4-作业配置"><span>4. 作业配置</span></a></h2><p>让我们将所有部分结合起来看看全貌。</p><h3 id="_4-1-配置-itemreader" tabindex="-1"><a class="header-anchor" href="#_4-1-配置-itemreader"><span>4.1. 配置_ItemReader_</span></a></h3><p>首先，我们想要配置_ExpiresSoonMedicineReader_并丰富通用参数：</p><h3 id="_4-2-配置-itemprocessor-和-itemwriter" tabindex="-1"><a class="header-anchor" href="#_4-2-配置-itemprocessor-和-itemwriter"><span>4.2. 配置_ItemProcessor_和_ItemWriter_</span></a></h3><p>_ItemProcessor_和_ItemWriter_遵循与_ItemReader_相同的方法。因此，它们不需要任何特定的配置来访问参数。bean定义逻辑通过_enrichWithJobParameters()_方法初始化通用参数。其他参数，由单个类使用且不需要在所有组件中填充的，是通过Spring在相应类中的setter注入来丰富的。</p><h3 id="_4-3-配置完整流程" tabindex="-1"><a class="header-anchor" href="#_4-3-配置完整流程"><span>4.3. 配置完整流程</span></a></h3><p>我们不需要采取任何特定操作来配置带有参数的作业。因此，我们只需要组合所有的bean：</p><h2 id="_5-运行应用程序" tabindex="-1"><a class="header-anchor" href="#_5-运行应用程序"><span>5. 运行应用程序</span></a></h2><p>**让我们运行一个完整的例子，看看应用程序如何使用所有参数。**我们需要从_SpringBatchExpireMedicationApplication_类启动Spring Boot应用程序。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了如何在Spring Batch中使用作业参数。<em>ItemReader</em>、<em>ItemProcessor_和_ItemWriter_可以在bean初始化期间手动用参数丰富，或者可以通过</em>@BeforeStep_或setter注入由Spring丰富。</p><p>如常，完整的示例可以在GitHub上找到。</p>',34),p=[i];function s(c,o){return a(),t("div",null,p)}const l=e(n,[["render",s],["__file","2024-06-23-Access Job Parameters From ItemReader in Spring Batch.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Access%20Job%20Parameters%20From%20ItemReader%20in%20Spring%20Batch.html","title":"Spring Batch中从ItemReader访问作业参数","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Spring Batch","Java"],"tag":["JobParameters","ItemReader"],"head":[["meta",{"name":"keywords","content":"Spring Batch, Java, JobParameters, ItemReader"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Access%20Job%20Parameters%20From%20ItemReader%20in%20Spring%20Batch.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Batch中从ItemReader访问作业参数"}],["meta",{"property":"og:description","content":"Spring Batch中从ItemReader访问作业参数 Spring Batch是一个功能强大的Java批处理框架，因此成为数据处理活动和计划作业运行的热门选择。根据业务逻辑的复杂性，作业可能依赖不同的配置值和动态参数。 在本文中，我们将探讨如何使用_JobParameters_以及如何从关键的批处理组件中访问它们。 2.1. 依赖项 要开始演示..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T06:34:14.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JobParameters"}],["meta",{"property":"article:tag","content":"ItemReader"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T06:34:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Batch中从ItemReader访问作业参数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T06:34:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Batch中从ItemReader访问作业参数 Spring Batch是一个功能强大的Java批处理框架，因此成为数据处理活动和计划作业运行的热门选择。根据业务逻辑的复杂性，作业可能依赖不同的配置值和动态参数。 在本文中，我们将探讨如何使用_JobParameters_以及如何从关键的批处理组件中访问它们。 2.1. 依赖项 要开始演示..."},"headers":[{"level":3,"title":"2.1. 依赖项","slug":"_2-1-依赖项","link":"#_2-1-依赖项","children":[]},{"level":3,"title":"2.2. 准备测试数据","slug":"_2-2-准备测试数据","link":"#_2-2-准备测试数据","children":[]},{"level":3,"title":"2.3. Medicine 领域类","slug":"_2-3-medicine-领域类","link":"#_2-3-medicine-领域类","children":[]},{"level":3,"title":"2.4. 应用程序属性","slug":"_2-4-应用程序属性","link":"#_2-4-应用程序属性","children":[]},{"level":3,"title":"3.1. StepScope_和_JobScope","slug":"_3-1-stepscope-和-jobscope","link":"#_3-1-stepscope-和-jobscope","children":[]},{"level":3,"title":"3.2. 在计划执行中填充作业参数","slug":"_3-2-在计划执行中填充作业参数","link":"#_3-2-在计划执行中填充作业参数","children":[]},{"level":3,"title":"3.3. 在Bean定义中读取作业参数","slug":"_3-3-在bean定义中读取作业参数","link":"#_3-3-在bean定义中读取作业参数","children":[]},{"level":3,"title":"3.4. 直接在服务中读取作业参数","slug":"_3-4-直接在服务中读取作业参数","link":"#_3-4-直接在服务中读取作业参数","children":[]},{"level":3,"title":"3.5. 通过Before Step读取作业参数","slug":"_3-5-通过before-step读取作业参数","link":"#_3-5-通过before-step读取作业参数","children":[]},{"level":2,"title":"4. 作业配置","slug":"_4-作业配置","link":"#_4-作业配置","children":[{"level":3,"title":"4.1. 配置_ItemReader_","slug":"_4-1-配置-itemreader","link":"#_4-1-配置-itemreader","children":[]},{"level":3,"title":"4.2. 配置_ItemProcessor_和_ItemWriter_","slug":"_4-2-配置-itemprocessor-和-itemwriter","link":"#_4-2-配置-itemprocessor-和-itemwriter","children":[]},{"level":3,"title":"4.3. 配置完整流程","slug":"_4-3-配置完整流程","link":"#_4-3-配置完整流程","children":[]}]},{"level":2,"title":"5. 运行应用程序","slug":"_5-运行应用程序","link":"#_5-运行应用程序","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719124454000,"updatedTime":1719124454000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.01,"words":903},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Access Job Parameters From ItemReader in Spring Batch.md","localizedDate":"2024年6月23日","excerpt":"\\n<p>Spring Batch是一个功能强大的Java批处理框架，因此成为数据处理活动和计划作业运行的热门选择。根据业务逻辑的复杂性，作业可能依赖不同的配置值和动态参数。</p>\\n<p>在本文中，我们将探讨如何使用_JobParameters_以及如何从关键的批处理组件中访问它们。</p>\\n<h3>2.1. 依赖项</h3>\\n<p>要开始演示应用程序，<strong>我们需要添加Spring Batch和H2依赖项：</strong></p>\\n<h3>2.2. 准备测试数据</h3>\\n<p>让我们通过定义_schema-all.sql_中的模式开始：</p>\\n<h3>2.3. <em>Medicine</em> 领域类</h3>","autoDesc":true}');export{l as comp,d as data};
