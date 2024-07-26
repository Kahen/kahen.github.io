import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-8nJ1rqSf.js";const e={},o=t('<h1 id="如何在kotlin中从json字符串提取单个值" tabindex="-1"><a class="header-anchor" href="#如何在kotlin中从json字符串提取单个值"><span>如何在Kotlin中从JSON字符串提取单个值</span></a></h1><p>JSON（JavaScript对象表示法）为应用程序之间存储和交换数据提供了一种方便的方式。因此，作为开发人员，我们通常需要执行从JSON字符串中提取单个JSON值的任务。</p><p>在本教程中，我们将探讨在Kotlin中从JSON字符串提取这些单个值的不同方法。</p><h3 id="_2-1-使用kotlinx-serialization库" tabindex="-1"><a class="header-anchor" href="#_2-1-使用kotlinx-serialization库"><span>2.1 使用Kotlinx Serialization库</span></a></h3><p>首先，我们可以利用Kotlin的一个扩展库Kotlinx.serialization。这个库提供了一种将Kotlin对象序列化和反序列化到JSON的简便方法。</p><h4 id="_2-1-1-maven和gradle依赖" tabindex="-1"><a class="header-anchor" href="#_2-1-1-maven和gradle依赖"><span>2.1.1 Maven和Gradle依赖</span></a></h4><p>要使用这个库与Maven，我们需要在_pom.xml_文件中包含它的依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.jetbrains.kotlinx```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```kotlinx-serialization-json-jvm```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```1.6.2```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于Gradle，我们添加依赖到_build.gradle_文件：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code><span class="token function">implementation</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;org.jetbrains.kotlinx:kotlinx-serialization-json-jvm:1.6.2&quot;</span></span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-2-实现" tabindex="-1"><a class="header-anchor" href="#_2-2-实现"><span>2.2 实现</span></a></h4><p>包含Kotlinx.serialization依赖后，我们现在可以反序列化JSON字符串以从中获取特定值。</p><p>要使用这个库，我们需要使用_Json()<em>函数获取解析器的实例。**我们将一个配置lambda传递给这个函数，所以我们将_ignoreUnknownKeys_属性设置为_true</em>，这允许我们忽略在JSON中遇到的任何未知属性。** 虽然在我们的情况下使用_JsonObject_ s不是必需的，但具体类需要设置这个属性，如果JSON对象具有比我们类中更多的属性：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>\n<span class="token keyword">fun</span> <span class="token function">`使用Kotlinx序列化从JSON字符串提取值`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> json <span class="token operator">=</span> Json <span class="token punctuation">{</span> ignoreUnknownKeys <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>\n    <span class="token keyword">val</span> jsonString <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;{ \\&quot;name\\&quot;:\\&quot;John\\&quot;, \\&quot;age\\&quot;:30, \\&quot;city\\&quot;:\\&quot;New York\\&quot;}&quot;</span></span>\n    <span class="token keyword">val</span> jsonObject <span class="token operator">=</span> json<span class="token punctuation">.</span><span class="token function">parseToJsonElement</span><span class="token punctuation">(</span>jsonString<span class="token punctuation">)</span><span class="token punctuation">.</span>jsonObject\n    <span class="token keyword">val</span> name <span class="token operator">=</span> jsonObject<span class="token punctuation">[</span><span class="token string-literal singleline"><span class="token string">&quot;name&quot;</span></span><span class="token punctuation">]</span><span class="token operator">?</span><span class="token punctuation">.</span>jsonPrimitive<span class="token operator">?</span><span class="token punctuation">.</span>content\n    <span class="token keyword">val</span> city <span class="token operator">=</span> jsonObject<span class="token punctuation">[</span><span class="token string-literal singleline"><span class="token string">&quot;city&quot;</span></span><span class="token punctuation">]</span><span class="token operator">?</span><span class="token punctuation">.</span>jsonPrimitive<span class="token operator">?</span><span class="token punctuation">.</span>content\n    <span class="token keyword">val</span> age <span class="token operator">=</span> jsonObject<span class="token punctuation">[</span><span class="token string-literal singleline"><span class="token string">&quot;age&quot;</span></span><span class="token punctuation">]</span><span class="token operator">?</span><span class="token punctuation">.</span>jsonPrimitive<span class="token operator">?</span><span class="token punctuation">.</span>int\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;John&quot;</span></span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;New York&quot;</span></span><span class="token punctuation">,</span> city<span class="token punctuation">)</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> age<span class="token punctuation">)</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;{\\&quot;name\\&quot;:\\&quot;John\\&quot;,\\&quot;age\\&quot;:30,\\&quot;city\\&quot;:\\&quot;New York\\&quot;}&quot;</span></span><span class="token punctuation">,</span> jsonObject<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们使用_parseToJsonElement()<em>方法将JSON字符串解析为_JsonElement</em>。<strong>然后我们从_JsonElement_获取_JsonObject_并使用[]（get）操作符获取任何属性的值作为_JsonPrimitive_</strong>。最后，我们使用_JsonPrimitive_的_content_属性获取属性的值作为_String_。</p><h3 id="_3-使用gson库" tabindex="-1"><a class="header-anchor" href="#_3-使用gson库"><span>3. 使用Gson库</span></a></h3><p>Gson是一个流行的Java库，用于处理JSON。它提供了一种将Java对象序列化和反序列化到JSON的简单方法。</p><h4 id="_3-1-maven和gradle依赖" tabindex="-1"><a class="header-anchor" href="#_3-1-maven和gradle依赖"><span>3.1 Maven和Gradle依赖</span></a></h4><p>要在使用Maven的项目中加入这个依赖，我们应该在_pom.xml_中包含它：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```com.google.code.gson```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```gson```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```2.10.1```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，对于Gradle项目，让我们将依赖添加到_build.gradle_文件：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code><span class="token function">implementation</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;com.google.code.gson:gson:2.10.1&quot;</span></span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3-2-实现" tabindex="-1"><a class="header-anchor" href="#_3-2-实现"><span>3.2 实现</span></a></h4><p>让我们深入了解如何使用Gson库来反序列化JSON字符串并获取单独的属性值：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>\n<span class="token keyword">fun</span> <span class="token function">`使用Gson从JSON字符串提取值`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> gson <span class="token operator">=</span> <span class="token function">Gson</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">val</span> jsonString <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;{ \\&quot;name\\&quot;:\\&quot;John\\&quot;, \\&quot;age\\&quot;:30, \\&quot;city\\&quot;:\\&quot;New York\\&quot;}&quot;</span></span>\n    <span class="token keyword">val</span> jsonObject <span class="token operator">=</span> gson<span class="token punctuation">.</span><span class="token function">fromJson</span><span class="token punctuation">(</span>jsonString<span class="token punctuation">,</span> JsonObject<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">)</span>\n    <span class="token keyword">val</span> name <span class="token operator">=</span> jsonObject<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;name&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>asString\n    <span class="token keyword">val</span> city <span class="token operator">=</span> jsonObject<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;city&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>asString\n    <span class="token keyword">val</span> age <span class="token operator">=</span> jsonObject<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;age&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>asInt\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;John&quot;</span></span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;New York&quot;</span></span><span class="token punctuation">,</span> city<span class="token punctuation">)</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> age<span class="token punctuation">)</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;{\\&quot;name\\&quot;:\\&quot;John\\&quot;,\\&quot;age\\&quot;:30,\\&quot;city\\&quot;:\\&quot;New York\\&quot;}&quot;</span></span><span class="token punctuation">,</span> jsonObject<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，我们首先创建一个_Gson_对象，然后使用它的_fromJson()<em>方法将JSON字符串反序列化为_JsonObject</em>。<strong>然后，我们使用_JsonObject_的_get()_方法来获取特定属性的值</strong>。最后，我们使用_asString_或_asInt_属性将值转换为显式类型。</p><h3 id="_4-使用jackson库" tabindex="-1"><a class="header-anchor" href="#_4-使用jackson库"><span>4. 使用Jackson库</span></a></h3><p>Jackson库是另一个高性能的Java JSON处理器，当然也可以用于Kotlin。它也提供了将JSON解析为Java对象以及反之的方法。</p><h4 id="_4-1-maven和gradle依赖" tabindex="-1"><a class="header-anchor" href="#_4-1-maven和gradle依赖"><span>4.1 Maven和Gradle依赖</span></a></h4><p>要使用Maven中的这个依赖项，让我们将指定的依赖项添加到我们的项目_pom.xml_文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```com.fasterxml.jackson.core```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```jackson-module-kotlin```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```2.16.0```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，对于Gradle项目，让我们将依赖添加到_build.gradle_文件：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code><span class="token function">implementation</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;com.fasterxml.jackson.module:jackson-module-kotlin:2.16.0&quot;</span></span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_4-2-实现" tabindex="-1"><a class="header-anchor" href="#_4-2-实现"><span>4.2 实现</span></a></h4><p>包含Jackson库后，让我们现在看看如何将JSON属性反序列化为字符串：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>\n<span class="token keyword">fun</span> <span class="token function">`使用Jackson库从JSON字符串提取值`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> objectMapper <span class="token operator">=</span> <span class="token function">jacksonObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">val</span> jsonString <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;{ \\&quot;name\\&quot;:\\&quot;John\\&quot;, \\&quot;age\\&quot;:30, \\&quot;city\\&quot;:\\&quot;New York\\&quot;}&quot;</span></span>\n    <span class="token keyword">val</span> jsonObject <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span>readValue<span class="token function">`&lt;JsonNode&gt;`</span><span class="token punctuation">(</span>jsonString<span class="token punctuation">)</span>\n    <span class="token keyword">val</span> name <span class="token operator">=</span> jsonObject<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;name&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">asText</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">val</span> city <span class="token operator">=</span> jsonObject<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;city&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">asText</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">val</span> age <span class="token operator">=</span> jsonObject<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;age&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">asInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;John&quot;</span></span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;New York&quot;</span></span><span class="token punctuation">,</span> city<span class="token punctuation">)</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> age<span class="token punctuation">)</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;{\\&quot;name\\&quot;:\\&quot;John\\&quot;,\\&quot;age\\&quot;:30,\\&quot;city\\&quot;:\\&quot;New York\\&quot;}&quot;</span></span><span class="token punctuation">,</span> jsonObject<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们使用_jacksonObjectMapper()_函数创建一个_ObjectMapper_实例。随后，我们创建一个JSON字符串，并使用_ObjectMapper_的_readValue()<em>方法将其转换为_JsonNode</em>。<strong>最后，我们可以使用_JsonNode_的_get()_方法获取任何特定属性的值</strong>。我们将使用_asText()<em>将属性转换为_String</em>，或使用_asInt()<em>将其转换为_Int</em>。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们讨论了如何在Kotlin中从JSON字符串中获取精确的值。我们探索了三种实现方式，包括_kotlinx.serialization_、<em>Gson_和_Jackson</em>。所有这些库在行业中都有广泛的使用，并具有它们各自的优势和劣势。我们需要选择最适合我们需求的库。</p><p>正如往常一样，本文中使用的代码示例可以在GitHub上找到。</p>',40),p=[o];function l(i,c){return a(),s("div",null,p)}const k=n(e,[["render",l],["__file","2024-07-22-How to Extract Individual Values From a JSON String.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-22/2024-07-22-How%20to%20Extract%20Individual%20Values%20From%20a%20JSON%20String.html","title":"如何在Kotlin中从JSON字符串提取单个值","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","JSON"],"tag":["JSON","Kotlinx Serialization","Gson","Jackson"],"head":[["meta",{"name":"keywords","content":"Kotlin, JSON, Kotlinx Serialization, Gson, Jackson, JSON解析"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-22/2024-07-22-How%20to%20Extract%20Individual%20Values%20From%20a%20JSON%20String.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Kotlin中从JSON字符串提取单个值"}],["meta",{"property":"og:description","content":"如何在Kotlin中从JSON字符串提取单个值 JSON（JavaScript对象表示法）为应用程序之间存储和交换数据提供了一种方便的方式。因此，作为开发人员，我们通常需要执行从JSON字符串中提取单个JSON值的任务。 在本教程中，我们将探讨在Kotlin中从JSON字符串提取这些单个值的不同方法。 2.1 使用Kotlinx Serializati..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T21:45:49.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JSON"}],["meta",{"property":"article:tag","content":"Kotlinx Serialization"}],["meta",{"property":"article:tag","content":"Gson"}],["meta",{"property":"article:tag","content":"Jackson"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T21:45:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Kotlin中从JSON字符串提取单个值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T21:45:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Kotlin中从JSON字符串提取单个值 JSON（JavaScript对象表示法）为应用程序之间存储和交换数据提供了一种方便的方式。因此，作为开发人员，我们通常需要执行从JSON字符串中提取单个JSON值的任务。 在本教程中，我们将探讨在Kotlin中从JSON字符串提取这些单个值的不同方法。 2.1 使用Kotlinx Serializati..."},"headers":[{"level":3,"title":"2.1 使用Kotlinx Serialization库","slug":"_2-1-使用kotlinx-serialization库","link":"#_2-1-使用kotlinx-serialization库","children":[]},{"level":3,"title":"3. 使用Gson库","slug":"_3-使用gson库","link":"#_3-使用gson库","children":[]},{"level":3,"title":"4. 使用Jackson库","slug":"_4-使用jackson库","link":"#_4-使用jackson库","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721684749000,"updatedTime":1721684749000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.21,"words":1264},"filePathRelative":"posts/baeldung/2024-07-22/2024-07-22-How to Extract Individual Values From a JSON String.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>JSON（JavaScript对象表示法）为应用程序之间存储和交换数据提供了一种方便的方式。因此，作为开发人员，我们通常需要执行从JSON字符串中提取单个JSON值的任务。</p>\\n<p>在本教程中，我们将探讨在Kotlin中从JSON字符串提取这些单个值的不同方法。</p>\\n<h3>2.1 使用Kotlinx Serialization库</h3>\\n<p>首先，我们可以利用Kotlin的一个扩展库Kotlinx.serialization。这个库提供了一种将Kotlin对象序列化和反序列化到JSON的简便方法。</p>\\n<h4>2.1.1 Maven和Gradle依赖</h4>\\n<p>要使用这个库与Maven，我们需要在_pom.xml_文件中包含它的依赖：</p>","autoDesc":true}');export{k as comp,d as data};
