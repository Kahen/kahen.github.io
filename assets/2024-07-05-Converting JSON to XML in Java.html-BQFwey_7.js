import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-ConjvFaO.js";const e={},p=t('<h1 id="java中将json转换为xml" tabindex="-1"><a class="header-anchor" href="#java中将json转换为xml"><span>Java中将JSON转换为XML</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>JSON和XML是两种流行的数据交换格式。在实际应用中，我们经常需要在它们之间进行转换。</p><p>在本教程中，我们将探讨在Java中将JSON转换为XML的不同方法。</p><h2 id="_2-json-java库" tabindex="-1"><a class="header-anchor" href="#_2-json-java库"><span>2. JSON-Java库</span></a></h2><p>首先，JSON-Java库提供了一种简单的方法将JSON转换为XML。</p><h3 id="_2-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-1-依赖项"><span>2.1. 依赖项</span></a></h3><p>让我们从向我们的_pom.xml_添加JSON-Java依赖项开始：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.json```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```json```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```20240303```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-代码示例" tabindex="-1"><a class="header-anchor" href="#_2-2-代码示例"><span>2.2. 代码示例</span></a></h3><p>我们可以使用测试用例来演示转换。让我们创建一个测试用例，将JSON字符串转换为XML：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenJsonString_whenConvertToXMLUsingJsonJava_thenConverted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> jsonString <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;name\\&quot;:\\&quot;John\\&quot;, \\&quot;age\\&quot;:20, \\&quot;address\\&quot;:{\\&quot;street\\&quot;:\\&quot;Wall Street\\&quot;, \\&quot;city\\&quot;:\\&quot;New York\\&quot;}}&quot;</span><span class="token punctuation">;</span>\n    <span class="token class-name">JSONObject</span> jsonObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span>jsonString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">String</span> xmlString <span class="token operator">=</span> <span class="token constant">XML</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>jsonObject<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;``&lt;address&gt;````&lt;city&gt;``New York```&lt;/city&gt;``````&lt;street&gt;```Wall Street```&lt;/street&gt;``````&lt;/address&gt;````````&lt;name&gt;`````John`````&lt;/name&gt;`````````&lt;age&gt;````20`````&lt;/age&gt;`````&quot;</span><span class="token punctuation">,</span> xmlString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，我们可以使用_XML.toString()_方法将JSON字符串转换为XML。此方法接受一个_JSONObject_作为参数，并返回一个XML字符串。然后我们断言字符串符合预期。</p><p>此方法创建了一个紧凑的XML字符串，其中每个键都转换为XML标签，值是标签的文本内容。</p><h2 id="_3-jackson" tabindex="-1"><a class="header-anchor" href="#_3-jackson"><span>3. Jackson</span></a></h2><p>Jackson是Java的一个流行的JSON库。它也可以用来将JSON转换为XML。</p><h3 id="_3-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_3-1-依赖项"><span>3.1. 依赖项</span></a></h3><p>让我们从向我们的_pom.xml_添加Jackson依赖项开始：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```com.fasterxml.jackson.core```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```jackson-databind```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```2.15.2```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-代码示例" tabindex="-1"><a class="header-anchor" href="#_3-2-代码示例"><span>3.2. 代码示例</span></a></h3><p>接下来，我们将创建一个测试用例，使用Jackson将JSON字符串转换为XML：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenJsonString_whenConvertToXMLUsingJackson_thenConverted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> jsonString <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;name\\&quot;:\\&quot;John\\&quot;, \\&quot;age\\&quot;:20, \\&quot;address\\&quot;:{\\&quot;street\\&quot;:\\&quot;Wall Street\\&quot;, \\&quot;city\\&quot;:\\&quot;New York\\&quot;}}&quot;</span><span class="token punctuation">;</span>\n    <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">JsonNode</span> jsonNode <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readTree</span><span class="token punctuation">(</span>jsonString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">String</span> xmlString <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XmlMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>jsonNode<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;`&lt;ObjectNode&gt;``````&lt;name&gt;`````John`````&lt;/name&gt;`````````&lt;age&gt;````20`````&lt;/age&gt;`````(address)```&lt;street&gt;```Wall Street```&lt;/street&gt;```(city)New York```&lt;/city&gt;``````&lt;/address&gt;````&lt;/ObjectNode&gt;`&quot;</span><span class="token punctuation">,</span> xmlString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，我们可以使用_XmlMapper_类将JSON字符串转换为XML。该类有一个_writeValueAsString()_方法，它接受一个_JsonNode_作为参数，并返回一个XML字符串。此外，输出标签被包装在_ObjectNode_标签中。</p><h3 id="_3-3-自定义输出" tabindex="-1"><a class="header-anchor" href="#_3-3-自定义输出"><span>3.3. 自定义输出</span></a></h3><p>在前一个示例中，我们看到输出的XML字符串没有格式化，没有XML声明，根标签是_ObjectNode_。由于这不符合XML标准，<strong>我们可以自定义输出以使其更具可读性和符合标准。</strong></p><p>让我们向_XmlMapper_对象添加一些配置选项以自定义输出：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenJsonString_whenConvertToXMLUsingJacksonWithXMLDeclarationAndRoot_thenConverted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> jsonString <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;name\\&quot;:\\&quot;John\\&quot;, \\&quot;age\\&quot;:20, \\&quot;address\\&quot;:{\\&quot;street\\&quot;:\\&quot;Wall Street\\&quot;, \\&quot;city\\&quot;:\\&quot;New York\\&quot;}}&quot;</span><span class="token punctuation">;</span>\n    <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">JsonNode</span> jsonNode <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readTree</span><span class="token punctuation">(</span>jsonString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">XmlMapper</span> xmlMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XmlMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    xmlMapper<span class="token punctuation">.</span><span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">SerializationFeature</span><span class="token punctuation">.</span><span class="token constant">INDENT_OUTPUT</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    xmlMapper<span class="token punctuation">.</span><span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">ToXmlGenerator<span class="token punctuation">.</span>Feature</span><span class="token punctuation">.</span><span class="token constant">WRITE_XML_DECLARATION</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    xmlMapper<span class="token punctuation">.</span><span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">ToXmlGenerator<span class="token punctuation">.</span>Feature</span><span class="token punctuation">.</span><span class="token constant">WRITE_XML_1_1</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">String</span> xmlString <span class="token operator">=</span> xmlMapper<span class="token punctuation">.</span><span class="token function">writer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withRootName</span><span class="token punctuation">(</span><span class="token string">&quot;root&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>jsonNode<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;`&lt;?xml version=&#39;1.1&#39; encoding=&#39;UTF-8&#39;?&gt;`&quot;</span> <span class="token operator">+</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">lineSeparator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span>\n        <span class="token string">&quot;```&lt;root&gt;```&quot;</span> <span class="token operator">+</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">lineSeparator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span>\n        <span class="token string">&quot;  `````&lt;name&gt;`````John`````&lt;/name&gt;`````&quot;</span> <span class="token operator">+</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">lineSeparator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span>\n        <span class="token string">&quot;  ````&lt;age&gt;````20`````&lt;/age&gt;`````&quot;</span> <span class="token operator">+</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">lineSeparator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span>\n        <span class="token string">&quot;  ``&lt;address&gt;``&quot;</span> <span class="token operator">+</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">lineSeparator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span>\n        <span class="token string">&quot;    ```&lt;street&gt;```Wall Street```&lt;/street&gt;```&quot;</span> <span class="token operator">+</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">lineSeparator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span>\n        <span class="token string">&quot;    ``&lt;city&gt;``New York```&lt;/city&gt;```&quot;</span> <span class="token operator">+</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">lineSeparator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span>\n        <span class="token string">&quot;  ```&lt;/address&gt;```&quot;</span> <span class="token operator">+</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">lineSeparator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span>\n        <span class="token string">&quot;```&lt;/root&gt;```&quot;</span> <span class="token operator">+</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">lineSeparator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> xmlString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们向_XmlMapper_对象添加了一些配置选项：</p><ul><li><em>SerializationFeature.INDENT_OUTPUT</em> 缩进输出的XML字符串，使其更易读</li><li><em>ToXmlGenerator.Feature.WRITE_XML_DECLARATION</em> 在输出的XML字符串中添加XML声明</li><li><em>ToXmlGenerator.Feature.WRITE_XML_1_1</em> 在XML声明中添加XML版本1.1</li><li><em>withRootName()</em> 将根标签名称设置为root而不是_ObjectNode_</li></ul><p>如我们所见，输出的XML字符串现在已格式化，具有XML声明，根标签是_root_。</p><h2 id="_4-使用underscore-java" tabindex="-1"><a class="header-anchor" href="#_4-使用underscore-java"><span>4. 使用Underscore-java</span></a></h2><p>Underscore-java是一个实用程序库，提供了将JSON转换为XML的方法。值得注意的是，<strong>它需要Java 11或更高版本才能工作</strong>。</p><p>在Jackson示例中，我们必须向_XmlMapper_对象添加一些配置选项以自定义输出以符合XML标准。<strong>Underscore-java默认遵循XML标准</strong>，不需要这些配置选项。</p><h3 id="_4-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_4-1-依赖项"><span>4.1. 依赖项</span></a></h3><p>让我们从向我们的_pom.xml_添加Underscore-java依赖项开始：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```com.github.javadev```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```underscore-java```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```1.89```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-代码示例" tabindex="-1"><a class="header-anchor" href="#_4-2-代码示例"><span>4.2. 代码示例</span></a></h3><p>接下来，让我们创建一个测试用例，使用Underscore-java将JSON字符串转换为XML：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenJsonString_whenConvertToXMLUsingUnderscoreJava_thenConverted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> jsonString <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;name\\&quot;:\\&quot;John\\&quot;, \\&quot;age\\&quot;:20}&quot;</span><span class="token punctuation">;</span>\n    <span class="token class-name">String</span> xmlString <span class="token operator">=</span> <span class="token class-name">U</span><span class="token punctuation">.</span><span class="token function">jsonToXml</span><span class="token punctuation">(</span>jsonString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;``&lt;?xml version=\\&quot;1.0\\&quot; encoding=\\&quot;UTF-8\\&quot;?&gt;``\\n&quot;</span> <span class="token operator">+</span>\n        <span class="token string">&quot;```&lt;root&gt;```\\n&quot;</span> <span class="token operator">+</span>\n        <span class="token string">&quot;  `````&lt;name&gt;`````John`````&lt;/name&gt;`````\\n&quot;</span> <span class="token operator">+</span>\n        <span class="token string">&quot;  `&lt;age number=\\&quot;true\\&quot;&gt;`20`````&lt;/age&gt;`````\\n&quot;</span> <span class="token operator">+</span>\n        <span class="token string">&quot;```&lt;/root&gt;```&quot;</span><span class="token punctuation">,</span> xmlString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，我们可以使用_U.jsonToXml()_方法将JSON字符串转换为XML。</p><p>它还**添加了_root_元素和声明到XML字符串。**与其他库不同，输出默认为格式化，以提高可读性。</p><p>**对于所有非字符串字段，它在标签上添加了一个类型属性。**例如，它在_age_元素上添加了_number_属性。<strong>这使得将XML字符串重新解析为JSON（如果需要）更加容易。</strong></p><p>如果我们不需要属性，我们可以使用_U.JsonToXmlMode.REMOVE_ATTRIBUTES_选项禁用它们：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenJsonString_whenConvertToXMLUsingUnderscoreJavaWithoutAttributes_thenConverted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> jsonString <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;name\\&quot;:\\&quot;John\\&quot;, \\&quot;age\\&quot;:20}&quot;</span><span class="token punctuation">;</span>\n    <span class="token class-name">String</span> xmlString <span class="token operator">=</span> <span class="token class-name">U</span><span class="token punctuation">.</span><span class="token function">jsonToXml</span><span class="token punctuation">(</span>jsonString<span class="token punctuation">,</span> <span class="token class-name">U<span class="token punctuation">.</span>JsonToXmlMode</span><span class="token punctuation">.</span><span class="token constant">REMOVE_ATTRIBUTES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;``&lt;?xml version=\\&quot;1.0\\&quot; encoding=\\&quot;UTF-8\\&quot;?&gt;``\\n&quot;</span> <span class="token operator">+</span>\n        <span class="token string">&quot;```&lt;root&gt;```\\n&quot;</span> <span class="token operator">+</span>\n        <span class="token string">&quot;  `````&lt;name&gt;`````John`````&lt;/name&gt;`````\\n&quot;</span> <span class="token operator">+</span>\n        <span class="token string">&quot;  ````&lt;age&gt;````20`````&lt;/age&gt;`````\\n&quot;</span> <span class="token operator">+</span>\n        <span class="token string">&quot;```&lt;/root&gt;```&quot;</span><span class="token punctuation">,</span> xmlString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，_age_元素上不再添加_number_属性了。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了Java中将JSON转换为XML的不同方法。我们还查看了一些测试用例来理解转换。</p><p>如常，代码示例可在GitHub上找到。</p><p>OK</p>',49),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-05-Converting JSON to XML in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Converting%20JSON%20to%20XML%20in%20Java.html","title":"Java中将JSON转换为XML","lang":"zh-CN","frontmatter":{"date":"2024-07-05T00:00:00.000Z","category":["Java","XML"],"tag":["JSON","XML","数据转换"],"head":[["meta",{"name":"keywords","content":"Java, JSON, XML, 数据转换"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Converting%20JSON%20to%20XML%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将JSON转换为XML"}],["meta",{"property":"og:description","content":"Java中将JSON转换为XML 1. 概述 JSON和XML是两种流行的数据交换格式。在实际应用中，我们经常需要在它们之间进行转换。 在本教程中，我们将探讨在Java中将JSON转换为XML的不同方法。 2. JSON-Java库 首先，JSON-Java库提供了一种简单的方法将JSON转换为XML。 2.1. 依赖项 让我们从向我们的_pom.xm..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T02:58:47.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JSON"}],["meta",{"property":"article:tag","content":"XML"}],["meta",{"property":"article:tag","content":"数据转换"}],["meta",{"property":"article:published_time","content":"2024-07-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T02:58:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将JSON转换为XML\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-05T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T02:58:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将JSON转换为XML 1. 概述 JSON和XML是两种流行的数据交换格式。在实际应用中，我们经常需要在它们之间进行转换。 在本教程中，我们将探讨在Java中将JSON转换为XML的不同方法。 2. JSON-Java库 首先，JSON-Java库提供了一种简单的方法将JSON转换为XML。 2.1. 依赖项 让我们从向我们的_pom.xm..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. JSON-Java库","slug":"_2-json-java库","link":"#_2-json-java库","children":[{"level":3,"title":"2.1. 依赖项","slug":"_2-1-依赖项","link":"#_2-1-依赖项","children":[]},{"level":3,"title":"2.2. 代码示例","slug":"_2-2-代码示例","link":"#_2-2-代码示例","children":[]}]},{"level":2,"title":"3. Jackson","slug":"_3-jackson","link":"#_3-jackson","children":[{"level":3,"title":"3.1. 依赖项","slug":"_3-1-依赖项","link":"#_3-1-依赖项","children":[]},{"level":3,"title":"3.2. 代码示例","slug":"_3-2-代码示例","link":"#_3-2-代码示例","children":[]},{"level":3,"title":"3.3. 自定义输出","slug":"_3-3-自定义输出","link":"#_3-3-自定义输出","children":[]}]},{"level":2,"title":"4. 使用Underscore-java","slug":"_4-使用underscore-java","link":"#_4-使用underscore-java","children":[{"level":3,"title":"4.1. 依赖项","slug":"_4-1-依赖项","link":"#_4-1-依赖项","children":[]},{"level":3,"title":"4.2. 代码示例","slug":"_4-2-代码示例","link":"#_4-2-代码示例","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720148327000,"updatedTime":1720148327000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.24,"words":1273},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Converting JSON to XML in Java.md","localizedDate":"2024年7月5日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>JSON和XML是两种流行的数据交换格式。在实际应用中，我们经常需要在它们之间进行转换。</p>\\n<p>在本教程中，我们将探讨在Java中将JSON转换为XML的不同方法。</p>\\n<h2>2. JSON-Java库</h2>\\n<p>首先，JSON-Java库提供了一种简单的方法将JSON转换为XML。</p>\\n<h3>2.1. 依赖项</h3>\\n<p>让我们从向我们的_pom.xml_添加JSON-Java依赖项开始：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n    ```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>```org.json```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n    ```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>```json```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n    ```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>```20240303```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
