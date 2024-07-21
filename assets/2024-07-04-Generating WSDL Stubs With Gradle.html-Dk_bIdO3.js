import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-CXN34Kw1.js";const t={},i=e(`<h1 id="使用gradle生成wsdl存根" tabindex="-1"><a class="header-anchor" href="#使用gradle生成wsdl存根"><span>使用Gradle生成WSDL存根</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>简单来说，<strong>Web服务描述语言（WSDL）是一种基于XML的语言，用于描述Web服务提供的功能</strong>。WSDL存根是从WSDL文件生成的代理类，使得与Web服务的交互更加容易，无需手动创建和管理SOAP消息。</p><p>在本教程中，我们将学习如何使用Gradle生成WSDL存根。同时，我们将看到一个示例WSDL文件并从中生成存根。</p><h2 id="_2-示例设置" tabindex="-1"><a class="header-anchor" href="#_2-示例设置"><span>2. 示例设置</span></a></h2><p>要开始生成，让我们创建一个新的Gradle项目，该项目从WSDL文件生成WSDL存根。接下来，我们将为WSDL文件创建目录结构：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> src/main/resources/wsdl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们将使用一个公共WSDL文件，该文件将数字转换为其文字等价物。让我们下载WSDL文件并将其放置在_wdsl_文件夹中：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-o</span> src/main/resources/wsdl/NumberConversion.wsdl https://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述命令从_dataacess.com_下载WSDL文件并将其放置在指定的文件夹中。</p><p>在下一节中，我们将配置_build.gradle_以生成我们可以在示例程序中交互的类。</p><h2 id="_3-gradle配置" tabindex="-1"><a class="header-anchor" href="#_3-gradle配置"><span>3. Gradle配置</span></a></h2><p>要从WSDL文件生成Java类，我们需要一个使用Apache CXF库的插件。这样的插件之一是_com.github.bjornvester.wsdl2java_，我们将在本教程中使用。这个插件简化了过程，并允许我们配置_gradle.build_：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>plugins <span class="token punctuation">{</span>
    id <span class="token string">&#39;java&#39;</span>
    <span class="token function">id</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;com.github.bjornvester.wsdl2java&quot;</span></span><span class="token punctuation">)</span> version <span class="token interpolation-string"><span class="token string">&quot;1.2&quot;</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>项目需要两个插件。Java插件帮助我们编译代码、运行测试和创建JAR文件。WSDL插件帮助我们从WSDL文件生成Java类。我们知道，WSDL文件是描述Web服务的XML文档。</p><p>我们可以使用_wsdl2java_扩展配置WSDL插件：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>wsdl2java <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们可以配置CXF版本：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>wsdl2java <span class="token punctuation">{</span>
    cxfVersion<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;3.4.4&quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>默认情况下，插件在_resources_文件夹中为所有WSDL文件创建存根</strong>。我们还可以通过指定其位置来配置它以创建特定WSDL文件的存根：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>wsdl2java <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    includes <span class="token operator">=</span> <span class="token punctuation">[</span>
        <span class="token interpolation-string"><span class="token string">&quot;src/main/resources/wsdl/NumberConversion.wsdl&quot;</span></span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>此外，生成的类保存在_build/generated/sources/wsdl2java_文件夹中</strong>，但我们可以通过指定自己的文件夹来覆盖它：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>wsdl2java <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    generatedSourceDir<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>layout<span class="token punctuation">.</span>projectDirectory<span class="token punctuation">.</span><span class="token function">dir</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;src/generated/wsdl2java&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们指定了存储生成类的地点，而不是使用默认文件夹。</p><p>配置完成后，我们需要运行Gradle _wsdl2java_命令以生成存根：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ ./gradlew wsdl2java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面的命令生成了Java类，我们现在可以在程序中与它们交互。</p><h2 id="_4-从wsdl文件生成wsdl存根" tabindex="-1"><a class="header-anchor" href="#_4-从wsdl文件生成wsdl存根"><span>4. 从WSDL文件生成WSDL存根</span></a></h2><p>首先，让我们检查我们示例项目的_build.gradle_文件：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>plugins <span class="token punctuation">{</span>
    id <span class="token string">&#39;java&#39;</span>
    <span class="token function">id</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;com.github.bjornvester.wsdl2java&quot;</span></span><span class="token punctuation">)</span> version <span class="token interpolation-string"><span class="token string">&quot;1.2&quot;</span></span>
<span class="token punctuation">}</span>
repositories <span class="token punctuation">{</span>
    <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
dependencies <span class="token punctuation">{</span>
    implementation <span class="token string">&#39;com.sun.xml.ws:jaxws-ri:4.0.1&#39;</span>
    testImplementation <span class="token string">&#39;org.junit.jupiter:junit-jupiter-api:5.8.2&#39;</span>
    testRuntimeOnly <span class="token string">&#39;org.junit.jupiter:junit-jupiter-engine:5.8.2&#39;</span>
<span class="token punctuation">}</span>
test <span class="token punctuation">{</span>
    <span class="token function">useJUnitPlatform</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
wsdl2java <span class="token punctuation">{</span>
    cxfVersion<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;3.4.4&quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的示例代码展示了如何配置WSDL插件以使用CXF版本3.4.4。插件在默认位置生成存根，并在_src/main/resources/wsdl_中查找WSDL文件。这是我们之前放置WSDL文件的地方。</p><p>此外，我们需要Java API for XML Web Services (JAX-WS)依赖项来与服务交互并执行单元测试。</p><p>要从WSDL文件生成Java类，我们可以执行Gradle _wsdl2java_命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ ./gradlew wsdl2java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里是生成的Java类：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/06/stubs-generated-from-wsdl.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>生成的类存储在默认位置。接下来，让我们通过编写单元测试与类交互：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenNumberConversionService_whenConvertingNumberToWords_thenReturnCorrectWords</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">NumberConversion</span> service <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">NumberConversion</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">NumberConversionSoapType</span> numberConversionSoapType <span class="token operator">=</span> service<span class="token punctuation">.</span><span class="token function">getNumberConversionSoap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> numberInWords <span class="token operator">=</span> numberConversionSoapType<span class="token punctuation">.</span><span class="token function">numberToWords</span><span class="token punctuation">(</span><span class="token class-name">BigInteger</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token number">10000000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;ten million&quot;</span><span class="token punctuation">,</span> numberInWords<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例单元测试中，我们创建了一个新的_NumberConversion_实例，并在_service_对象上调用_getNumberConversionSoap()_方法以获取对_NumberConversionSoapType_对象的引用。</p><p>此外，我们在_numberConversionSoapType_上调用_numberToWords()_方法，并将值_1000000_作为参数传递。</p><p>最后，我们断言预期值等于输出。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何使用Gradle生成WSDL存根。此外，我们看到了如何自定义插件配置，例如指定CXF版本和生成类的输出目录。我们还讨论了如何通过编写单元测试与生成的类交互。</p><p>如常，示例的完整源代码可在GitHub上找到。</p><p>OK</p>`,45),o=[i];function p(l,r){return s(),a("div",null,o)}const u=n(t,[["render",p],["__file","2024-07-04-Generating WSDL Stubs With Gradle.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Generating%20WSDL%20Stubs%20With%20Gradle.html","title":"使用Gradle生成WSDL存根","lang":"zh-CN","frontmatter":{"date":"2023-06-01T00:00:00.000Z","category":["Java","Web Services"],"tag":["WSDL","Gradle","Web Services"],"head":[["meta",{"name":"keywords","content":"WSDL, Gradle, Web Services, Java, Stubs Generation"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Generating%20WSDL%20Stubs%20With%20Gradle.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Gradle生成WSDL存根"}],["meta",{"property":"og:description","content":"使用Gradle生成WSDL存根 1. 概述 简单来说，Web服务描述语言（WSDL）是一种基于XML的语言，用于描述Web服务提供的功能。WSDL存根是从WSDL文件生成的代理类，使得与Web服务的交互更加容易，无需手动创建和管理SOAP消息。 在本教程中，我们将学习如何使用Gradle生成WSDL存根。同时，我们将看到一个示例WSDL文件并从中生成..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/06/stubs-generated-from-wsdl.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T13:35:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"WSDL"}],["meta",{"property":"article:tag","content":"Gradle"}],["meta",{"property":"article:tag","content":"Web Services"}],["meta",{"property":"article:published_time","content":"2023-06-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T13:35:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Gradle生成WSDL存根\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/06/stubs-generated-from-wsdl.png\\"],\\"datePublished\\":\\"2023-06-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T13:35:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Gradle生成WSDL存根 1. 概述 简单来说，Web服务描述语言（WSDL）是一种基于XML的语言，用于描述Web服务提供的功能。WSDL存根是从WSDL文件生成的代理类，使得与Web服务的交互更加容易，无需手动创建和管理SOAP消息。 在本教程中，我们将学习如何使用Gradle生成WSDL存根。同时，我们将看到一个示例WSDL文件并从中生成..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 示例设置","slug":"_2-示例设置","link":"#_2-示例设置","children":[]},{"level":2,"title":"3. Gradle配置","slug":"_3-gradle配置","link":"#_3-gradle配置","children":[]},{"level":2,"title":"4. 从WSDL文件生成WSDL存根","slug":"_4-从wsdl文件生成wsdl存根","link":"#_4-从wsdl文件生成wsdl存根","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720100106000,"updatedTime":1720100106000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.54,"words":1061},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Generating WSDL Stubs With Gradle.md","localizedDate":"2023年6月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>简单来说，<strong>Web服务描述语言（WSDL）是一种基于XML的语言，用于描述Web服务提供的功能</strong>。WSDL存根是从WSDL文件生成的代理类，使得与Web服务的交互更加容易，无需手动创建和管理SOAP消息。</p>\\n<p>在本教程中，我们将学习如何使用Gradle生成WSDL存根。同时，我们将看到一个示例WSDL文件并从中生成存根。</p>\\n<h2>2. 示例设置</h2>\\n<p>要开始生成，让我们创建一个新的Gradle项目，该项目从WSDL文件生成WSDL存根。接下来，我们将为WSDL文件创建目录结构：</p>\\n<div class=\\"language-bash\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code>$ <span class=\\"token function\\">mkdir</span> <span class=\\"token parameter variable\\">-p</span> src/main/resources/wsdl\\n</code></pre></div>","autoDesc":true}');export{u as comp,v as data};
