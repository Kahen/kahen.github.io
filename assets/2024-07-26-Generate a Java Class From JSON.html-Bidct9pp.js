import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BUAgDejY.js";const p={},e=t(`<h1 id="从json生成java类-baeldung" tabindex="-1"><a class="header-anchor" href="#从json生成java类-baeldung"><span>从JSON生成Java类 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在某些情况下，我们需要使用JSON文件创建Java类，也称为POJO。使用一个方便的<strong>jsonschema2pojo</strong>库，我们可以不必从头开始编写整个类。</p><p>在本教程中，我们将看到如何使用这个库从JSON对象创建Java类。</p><h2 id="_2-设置" tabindex="-1"><a class="header-anchor" href="#_2-设置"><span>2. 设置</span></a></h2><p><strong>我们可以使用_jsonschema2pojo-core_依赖项将JSON对象转换为Java类：</strong></p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.jsonschema2pojo\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`jsonschema2pojo-core\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`1.1.1\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-json到java类转换" tabindex="-1"><a class="header-anchor" href="#_3-json到java类转换"><span>3. JSON到Java类转换</span></a></h2><p>让我们看看如何使用_jsonschema2pojo_库编写一个程序，该程序将JSON文件转换为POJO类。</p><p>首先，我们将创建一个名为_convertJsonToJavaClass_的方法，该方法将JSON文件转换为POJO类，并接受四个参数：</p><ul><li>一个_inputJson_文件URL</li><li>一个_outputJavaClassDirectory_，POJO将在此生成</li><li>一个_packageName_，POJO类将属于此包</li><li>一个输出POJO的_className_。</li></ul><p>然后，我们将在这个方法中定义步骤：</p><ul><li>我们将从创建一个_JCodeModel_类的对象开始，该对象将生成Java类</li><li>然后，我们将为_jsonschema2pojo_定义配置，这使得程序能够识别输入源文件是JSON（_getSourceType_方法）</li><li>此外，我们将将此配置传递给一个_RuleFactory_，它将用于为此映射创建类型生成规则</li><li>我们将使用此工厂以及_SchemaGenerator_对象创建一个_SchemaMapper_，该对象从提供的JSON生成Java类型</li><li>最后，我们将调用_JCodeModel_的_build_方法来创建输出类</li></ul><p>让我们看看实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">convertJsonToJavaClass</span><span class="token punctuation">(</span><span class="token class-name">URL</span> inputJsonUrl<span class="token punctuation">,</span> <span class="token class-name">File</span> outputJavaClassDirectory<span class="token punctuation">,</span> <span class="token class-name">String</span> packageName<span class="token punctuation">,</span> <span class="token class-name">String</span> javaClassName<span class="token punctuation">)</span>
  <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">JCodeModel</span> jcodeModel <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JCodeModel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">GenerationConfig</span> config <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultGenerationConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isGenerateBuilders</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token class-name">SourceType</span> <span class="token function">getSourceType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">SourceType</span><span class="token punctuation">.</span><span class="token constant">JSON</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token class-name">SchemaMapper</span> mapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SchemaMapper</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RuleFactory</span><span class="token punctuation">(</span>config<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Jackson2Annotator</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">SchemaStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">SchemaGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    mapper<span class="token punctuation">.</span><span class="token function">generate</span><span class="token punctuation">(</span>jcodeModel<span class="token punctuation">,</span> javaClassName<span class="token punctuation">,</span> packageName<span class="token punctuation">,</span> inputJsonUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>

    jcodeModel<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span>outputJavaClassDirectory<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-输入和输出" tabindex="-1"><a class="header-anchor" href="#_4-输入和输出"><span>4. 输入和输出</span></a></h2><p>让我们使用这个示例JSON来执行程序：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;area&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tech blogs&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;author&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Eugen&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">32134</span><span class="token punctuation">,</span>
  <span class="token property">&quot;topics&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;java&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;kotlin&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;cs&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;linux&quot;</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;city&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Bucharest&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;country&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Romania&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦我们执行程序，它将在给定目录中创建以下Java类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@JsonInclude</span><span class="token punctuation">(</span><span class="token class-name">JsonInclude<span class="token punctuation">.</span>Include</span><span class="token punctuation">.</span><span class="token constant">NON_NULL</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@JsonPropertyOrder</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;area&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;author&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;topics&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;address&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Generated</span><span class="token punctuation">(</span><span class="token string">&quot;jsonschema2pojo&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Input</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">&quot;area&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> area<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">&quot;author&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> author<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">&quot;topics&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` topics <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">&quot;address&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Address</span> address<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@JsonIgnore</span>
    <span class="token keyword">private</span> <span class="token class-name">Map</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\`\`\` additionalProperties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\`\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// getters &amp; setters</span>
    <span class="token comment">// hashCode &amp; equals</span>
    <span class="token comment">// toString</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>请注意，它还相应地为嵌套的JSON对象创建了一个新的_Address_类：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@JsonInclude</span><span class="token punctuation">(</span><span class="token class-name">JsonInclude<span class="token punctuation">.</span>Include</span><span class="token punctuation">.</span><span class="token constant">NON_NULL</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@JsonPropertyOrder</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;city&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;country&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Generated</span><span class="token punctuation">(</span><span class="token string">&quot;jsonschema2pojo&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Address</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">&quot;city&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> city<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@JsonProperty</span><span class="token punctuation">(</span><span class="token string">&quot;country&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> country<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@JsonIgnore</span>
    <span class="token keyword">private</span> <span class="token class-name">Map</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\`\`\` additionalProperties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\`\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// getters &amp; setters</span>
    <span class="token comment">// hashCode &amp; equals</span>
    <span class="token comment">// toString</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还可以通过简单地访问jsonschema2pojo.org来实现所有这些。_jsonschema2pojo_工具接受一个JSON（或YAML）模式文档，并生成DTO风格的Java类。它提供了许多选项，你可以选择在Java类中包含，包括构造函数以及_hashCode, equals,_和_toString_方法。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们涵盖了如何使用_jsonschema2pojo_库从JSON创建Java类，并提供了使用该库的示例。</p><p>像往常一样，代码片段可以在GitHub上找到。</p>`,26),o=[e];function c(l,i){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-26-Generate a Java Class From JSON.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-26/2024-07-26-Generate%20a%20Java%20Class%20From%20JSON.html","title":"从JSON生成Java类 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","JSON"],"tag":["jsonschema2pojo","Java类","POJO"],"head":[["meta",{"name":"keywords","content":"Java类生成, JSON, jsonschema2pojo, POJO"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-26/2024-07-26-Generate%20a%20Java%20Class%20From%20JSON.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"从JSON生成Java类 | Baeldung"}],["meta",{"property":"og:description","content":"从JSON生成Java类 | Baeldung 1. 概述 在某些情况下，我们需要使用JSON文件创建Java类，也称为POJO。使用一个方便的jsonschema2pojo库，我们可以不必从头开始编写整个类。 在本教程中，我们将看到如何使用这个库从JSON对象创建Java类。 2. 设置 我们可以使用_jsonschema2pojo-core_依赖项..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-26T08:24:54.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"jsonschema2pojo"}],["meta",{"property":"article:tag","content":"Java类"}],["meta",{"property":"article:tag","content":"POJO"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-26T08:24:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"从JSON生成Java类 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-26T08:24:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"从JSON生成Java类 | Baeldung 1. 概述 在某些情况下，我们需要使用JSON文件创建Java类，也称为POJO。使用一个方便的jsonschema2pojo库，我们可以不必从头开始编写整个类。 在本教程中，我们将看到如何使用这个库从JSON对象创建Java类。 2. 设置 我们可以使用_jsonschema2pojo-core_依赖项..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 设置","slug":"_2-设置","link":"#_2-设置","children":[]},{"level":2,"title":"3. JSON到Java类转换","slug":"_3-json到java类转换","link":"#_3-json到java类转换","children":[]},{"level":2,"title":"4. 输入和输出","slug":"_4-输入和输出","link":"#_4-输入和输出","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721982294000,"updatedTime":1721982294000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.59,"words":776},"filePathRelative":"posts/baeldung/2024-07-26/2024-07-26-Generate a Java Class From JSON.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在某些情况下，我们需要使用JSON文件创建Java类，也称为POJO。使用一个方便的<strong>jsonschema2pojo</strong>库，我们可以不必从头开始编写整个类。</p>\\n<p>在本教程中，我们将看到如何使用这个库从JSON对象创建Java类。</p>\\n<h2>2. 设置</h2>\\n<p><strong>我们可以使用_jsonschema2pojo-core_依赖项将JSON对象转换为Java类：</strong></p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`org.jsonschema2pojo`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`jsonschema2pojo-core`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`1.1.1`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
