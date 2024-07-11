import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-uizvaz9h.js";const e={},p=t('<h1 id="如何覆盖cucumber选项值" tabindex="-1"><a class="header-anchor" href="#如何覆盖cucumber选项值"><span>如何覆盖Cucumber选项值</span></a></h1><p>在本教程中，我们将学习三种不同的方法来覆盖Cucumber选项值。从优先级的角度来看，Cucumber将解析并覆盖以下来源的选项：</p><ul><li>系统属性、环境变量和_cucumber.properties_文件</li><li>_@CucumberOptions_注解</li><li>命令行参数</li></ul><p>为了展示每种方法，我们将运行一个简单的特性文件，包含两个场景，并覆盖Cucumber的_tags_选项。</p><h2 id="_2-设置" tabindex="-1"><a class="header-anchor" href="#_2-设置"><span>2. 设置</span></a></h2><p>在介绍每种方法之前，我们需要做一些初始设置。首先，让我们添加_cucumber-java, cucumber-junit, cucumber-spring,_和_junit-vintage-engine_依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````io.cucumber````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````cucumber-java````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````7.14.0````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>````test````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````io.cucumber````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````cucumber-junit````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````7.14.0````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>````test````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````io.cucumber````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````cucumber-spring````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````7.14.0````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>````test````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````org.junit.vintage````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````junit-vintage-engine````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````5.10.0````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>````test````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们实现一个简单的控制器，包含两个端点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HealthCheckController</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>path <span class="token operator">=</span> <span class="token string">&quot;/v1/status&quot;</span><span class="token punctuation">,</span> produces <span class="token operator">=</span> <span class="token constant">APPLICATION_JSON_VALUE</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">HttpStatus</span> <span class="token function">getV1Status</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getStatusCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>path <span class="token operator">=</span> <span class="token string">&quot;/v2/status&quot;</span><span class="token punctuation">,</span> produces <span class="token operator">=</span> <span class="token constant">APPLICATION_JSON_VALUE</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">HttpStatus</span> <span class="token function">getV2Status</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getStatusCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以添加特性文件和两个场景：</p><div class="language-gherkin line-numbers-mode" data-ext="gherkin" data-title="gherkin"><pre class="language-gherkin"><code><span class="token feature"><span class="token keyword">Feature:</span><span class="token important"> 状态端点可以被验证</span>\n    </span><span class="token tag">@v1</span>\n    <span class="token scenario"><span class="token keyword">Scenario:</span><span class="token important"> v1状态是健康的</span></span>\n        <span class="token atrule">When</span> the client calls /v1/status\n        <span class="token atrule">Then</span> the client receives 200 status code\n\n    <span class="token tag">@v2</span>\n    <span class="token scenario"><span class="token keyword">Scenario:</span><span class="token important"> v2状态是健康的</span></span>\n        <span class="token atrule">When</span> the client calls /v2/status\n        <span class="token atrule">Then</span> the client receives 200 status code\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们添加所需的Cucumber粘合代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@When</span><span class="token punctuation">(</span><span class="token string">&quot;^the client calls /v1/status$&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">checkV1Status</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>\n    <span class="token function">executeGet</span><span class="token punctuation">(</span><span class="token string">&quot;http://localhost:8082/v1/status&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token annotation punctuation">@When</span><span class="token punctuation">(</span><span class="token string">&quot;^the client calls /v2/status$&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">checkV2Status</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>\n    <span class="token function">executeGet</span><span class="token punctuation">(</span><span class="token string">&quot;http://localhost:8082/v2/status&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token annotation punctuation">@Then</span><span class="token punctuation">(</span><span class="token string">&quot;^the client receives (\\\\d+) status code$&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">verifyStatusCode</span><span class="token punctuation">(</span><span class="token keyword">int</span> statusCode<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>\n    <span class="token keyword">final</span> <span class="token class-name">HttpStatus</span> currentStatusCode <span class="token operator">=</span> latestResponse<span class="token punctuation">.</span><span class="token function">getStatusCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>currentStatusCode<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">is</span><span class="token punctuation">(</span>statusCode<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下，如果不特别指定，Cucumber将运行所有场景。让我们通过运行测试来验证这种行为：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mvn <span class="token builtin class-name">test</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如预期的那样，两个场景都被执行了：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Tests run: <span class="token number">2</span>, Failures: <span class="token number">0</span>, Errors: <span class="token number">0</span>, Skipped: <span class="token number">0</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们现在准备好了，可以介绍三种不同的方法来覆盖Cucumber选项值。</p><h2 id="_3-使用-cucumber-properties-文件" tabindex="-1"><a class="header-anchor" href="#_3-使用-cucumber-properties-文件"><span>3. 使用 <em>cucumber.properties</em> 文件</span></a></h2><p>第一种方法从系统属性、环境变量和_cucumber.properties_文件中加载Cucumber选项。</p><p>让我们在_cucumber.properties_文件中添加_cucumber.filter.tags_属性：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">cucumber.filter.tags</span><span class="token punctuation">=</span><span class="token value attr-value">@v1</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这次运行测试将只执行 <em>@v1</em> 场景：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Tests run: <span class="token number">1</span>, Failures: <span class="token number">0</span>, Errors: <span class="token number">0</span>, Skipped: <span class="token number">0</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-使用-cucumberoptions-注解" tabindex="-1"><a class="header-anchor" href="#_4-使用-cucumberoptions-注解"><span>4. 使用 <em>@CucumberOptions</em> 注解</span></a></h2><p>第二种方法使用 <em>@CucumberOptions</em> 注解。让我们添加_tags_字段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@CucumberOptions</span><span class="token punctuation">(</span>tags <span class="token operator">=</span> <span class="token string">&quot;@v1&quot;</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>再次运行测试将只执行 <em>@v1</em> 场景：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Tests run: <span class="token number">1</span>, Failures: <span class="token number">0</span>, Errors: <span class="token number">0</span>, Skipped: <span class="token number">0</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>请注意，这种方法将覆盖使用系统属性、环境变量以及_cucumber.properties_文件提供的任何值。</strong></p><h2 id="_5-使用命令行参数" tabindex="-1"><a class="header-anchor" href="#_5-使用命令行参数"><span>5. 使用命令行参数</span></a></h2><p>最后一种方法使用Cucumber CLI运行器和_tags_参数。确保使用正确的类路径，以便它包括编译后的类和资源以及所有依赖项（包括_test_范围的依赖项）：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-cp</span> <span class="token punctuation">..</span>. io.cucumber.core.cli.Main <span class="token parameter variable">--tags</span> @v1\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如预期的那样，只有 <em>@v1</em> 场景被执行：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token number">1</span> Scenarios <span class="token punctuation">(</span><span class="token number">1</span> passed<span class="token punctuation">)</span>\n<span class="token number">2</span> Steps <span class="token punctuation">(</span><span class="token number">2</span> passed<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>请注意，这种方法将覆盖通过_cucumber.properties_文件或 <em>@CucumberOptions</em> 注解提供的选项。</strong></p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了三种覆盖Cucumber选项值的方法。</p><p>第一种方法考虑了作为系统属性、环境变量和_cucumber.properties_文件中提供的选项。第二种方法考虑了作为 <em>@CucumberOptions</em> 注解字段提供的选项，并覆盖了第一种方法提供的任何选项。最后一种方法使用命令行参数，并覆盖了使用任何先前方法提供的选项。</p><p>如常，完整的代码可以在GitHub上找到。</p>',40),c=[p];function o(l,u){return a(),s("div",null,c)}const d=n(e,[["render",o],["__file","2024-06-28-Overriding Cucumber Option Values.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-Overriding%20Cucumber%20Option%20Values.html","title":"如何覆盖Cucumber选项值","lang":"zh-CN","frontmatter":{"date":"2024-06-28T00:00:00.000Z","category":["Java","Cucumber"],"tag":["测试","配置"],"head":[["meta",{"name":"keywords","content":"Cucumber, 测试, Java, 配置, 选项覆盖"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-Overriding%20Cucumber%20Option%20Values.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何覆盖Cucumber选项值"}],["meta",{"property":"og:description","content":"如何覆盖Cucumber选项值 在本教程中，我们将学习三种不同的方法来覆盖Cucumber选项值。从优先级的角度来看，Cucumber将解析并覆盖以下来源的选项： 系统属性、环境变量和_cucumber.properties_文件 _@CucumberOptions_注解 命令行参数 为了展示每种方法，我们将运行一个简单的特性文件，包含两个场景，并覆盖..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T08:32:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"测试"}],["meta",{"property":"article:tag","content":"配置"}],["meta",{"property":"article:published_time","content":"2024-06-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T08:32:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何覆盖Cucumber选项值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T08:32:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何覆盖Cucumber选项值 在本教程中，我们将学习三种不同的方法来覆盖Cucumber选项值。从优先级的角度来看，Cucumber将解析并覆盖以下来源的选项： 系统属性、环境变量和_cucumber.properties_文件 _@CucumberOptions_注解 命令行参数 为了展示每种方法，我们将运行一个简单的特性文件，包含两个场景，并覆盖..."},"headers":[{"level":2,"title":"2. 设置","slug":"_2-设置","link":"#_2-设置","children":[]},{"level":2,"title":"3. 使用 cucumber.properties 文件","slug":"_3-使用-cucumber-properties-文件","link":"#_3-使用-cucumber-properties-文件","children":[]},{"level":2,"title":"4. 使用 @CucumberOptions 注解","slug":"_4-使用-cucumberoptions-注解","link":"#_4-使用-cucumberoptions-注解","children":[]},{"level":2,"title":"5. 使用命令行参数","slug":"_5-使用命令行参数","link":"#_5-使用命令行参数","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719563576000,"updatedTime":1719563576000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.09,"words":926},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-Overriding Cucumber Option Values.md","localizedDate":"2024年6月28日","excerpt":"\\n<p>在本教程中，我们将学习三种不同的方法来覆盖Cucumber选项值。从优先级的角度来看，Cucumber将解析并覆盖以下来源的选项：</p>\\n<ul>\\n<li>系统属性、环境变量和_cucumber.properties_文件</li>\\n<li>_@CucumberOptions_注解</li>\\n<li>命令行参数</li>\\n</ul>\\n<p>为了展示每种方法，我们将运行一个简单的特性文件，包含两个场景，并覆盖Cucumber的_tags_选项。</p>\\n<h2>2. 设置</h2>\\n<p>在介绍每种方法之前，我们需要做一些初始设置。首先，让我们添加_cucumber-java, cucumber-junit, cucumber-spring,_和_junit-vintage-engine_依赖项：</p>","autoDesc":true}');export{d as comp,k as data};
