import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-8nJ1rqSf.js";const e={},p=t('<h1 id="在java中检查字符串是否为有效的json" tabindex="-1"><a class="header-anchor" href="#在java中检查字符串是否为有效的json"><span>在Java中检查字符串是否为有效的JSON</span></a></h1><p>当在Java中使用原始JSON值时，有时需要检查它是否有效。有几个库可以帮助我们完成这项工作：Gson、JSON API和Jackson。每个工具都有其自身的优势和限制。</p><p>在本教程中，我们将使用它们中的每一个来实现JSON字符串验证，并仔细查看方法之间的主要差异以及实际示例。</p><h2 id="_2-使用json-api进行验证" tabindex="-1"><a class="header-anchor" href="#_2-使用json-api进行验证"><span>2. 使用JSON API进行验证</span></a></h2><p>最轻量级和简单的库是JSON API。</p><p>检查一个字符串是否为有效JSON的通用方法是异常处理。因此，我们委托JSON解析并在出现不正确的值时处理特定类型的错误，或者假设如果没有异常发生，则值是正确的。</p><h3 id="_2-1-maven依赖" tabindex="-1"><a class="header-anchor" href="#_2-1-maven依赖"><span>2.1. <strong>Maven依赖</strong></span></a></h3><p>首先，我们需要在我们的_pom.xml_中包含_json_依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.json```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```json```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```20211205```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-使用-jsonobject-进行验证" tabindex="-1"><a class="header-anchor" href="#_2-2-使用-jsonobject-进行验证"><span>2.2. <strong>使用_JSONObject_进行验证</strong></span></a></h3><p>首先，为了检查字符串是否为JSON，我们将尝试创建一个_JSONObject_。进一步地，在非有效值的情况下，我们将得到一个_JSONException_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isValid</span><span class="token punctuation">(</span><span class="token class-name">String</span> json<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">JSONException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们用一个简单的例子来试试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;email\\&quot;: \\&quot;example@com\\&quot;, \\&quot;name\\&quot;: \\&quot;John\\&quot;}&quot;</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>validator<span class="token punctuation">.</span><span class="token function">isValid</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;Invalid_Json&quot;</span><span class="token punctuation">;</span>\n<span class="token function">assertFalse</span><span class="token punctuation">(</span>validator<span class="token punctuation">.</span><span class="token function">isValid</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，这种方法的缺点是字符串只能是对象而不能是使用_JSONObject_的数组。</p><p>例如，让我们看看它如何处理数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;[{\\&quot;email\\&quot;: \\&quot;example@com\\&quot;, \\&quot;name\\&quot;: \\&quot;John\\&quot;}]&quot;</span><span class="token punctuation">;</span>\n<span class="token function">assertFalse</span><span class="token punctuation">(</span>validator<span class="token punctuation">.</span><span class="token function">isValid</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-使用-jsonarray-进行验证" tabindex="-1"><a class="header-anchor" href="#_2-3-使用-jsonarray-进行验证"><span>2.3. <strong>使用_JSONArray_进行验证</strong></span></a></h3><p>为了验证无论字符串是对象还是数组，我们需要在_JSONObject_创建失败时添加一个额外的条件。类似地，如果字符串不适合JSON数组，<em>JSONArray_也会抛出一个_JSONException</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isValid</span><span class="token punctuation">(</span><span class="token class-name">String</span> json<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">JSONException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">try</span> <span class="token punctuation">{</span>\n            <span class="token keyword">new</span> <span class="token class-name">JSONArray</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">JSONException</span> ne<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果，我们可以验证任何值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;[{\\&quot;email\\&quot;: \\&quot;example@com\\&quot;, \\&quot;name\\&quot;: \\&quot;John\\&quot;}]&quot;</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>validator<span class="token punctuation">.</span><span class="token function">isValid</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用jackson进行验证" tabindex="-1"><a class="header-anchor" href="#_3-使用jackson进行验证"><span>3. 使用Jackson进行验证</span></a></h2><p>类似地，Jackson库提供了基于_异常_处理的JSON验证方式。它是一个更复杂的工具，具有许多类型的解析策略。然而，它更容易使用。</p><h3 id="_3-1-maven依赖" tabindex="-1"><a class="header-anchor" href="#_3-1-maven依赖"><span>3.1. <strong>Maven依赖</strong></span></a></h3><p>让我们添加_jackson-databind_ Maven依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```com.fasterxml.jackson.core```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```jackson-databind```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```2.13.0```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-使用-objectmapper-进行验证" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-objectmapper-进行验证"><span>3.2. <strong>使用_ObjectMapper_进行验证</strong></span></a></h3><p>我们使用_readTree()<em>方法读取整个JSON并在语法不正确时得到一个_JacksonException</em>。</p><p>换句话说，我们不需要提供额外的检查。它适用于对象和数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ObjectMapper</span> mapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">enable</span><span class="token punctuation">(</span><span class="token class-name">DeserializationFeature</span><span class="token punctuation">.</span><span class="token constant">FAIL_ON_TRAILING_TOKENS</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isValid</span><span class="token punctuation">(</span><span class="token class-name">String</span> json<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        mapper<span class="token punctuation">.</span><span class="token function">readTree</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">JacksonException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看如何用示例使用这个：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;email\\&quot;: \\&quot;example@com\\&quot;, \\&quot;name\\&quot;: \\&quot;John\\&quot;}&quot;</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>validator<span class="token punctuation">.</span><span class="token function">isValid</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;[{\\&quot;email\\&quot;: \\&quot;example@com\\&quot;, \\&quot;name\\&quot;: \\&quot;John\\&quot;}]&quot;</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>validator<span class="token punctuation">.</span><span class="token function">isValid</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;Invalid_Json&quot;</span><span class="token punctuation">;</span>\n<span class="token function">assertFalse</span><span class="token punctuation">(</span>validator<span class="token punctuation">.</span><span class="token function">isValid</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，我们还启用了FAIL_ON_TRAILING_TOKENS选项，以确保如果有效JSON之后有任何文本（除了空格），验证将失败。</p><p>如果不使用此选项，形式为_{“email”:”example@com”}text_的JSON仍然会被视为有效，即使它不是。</p><h2 id="_4-使用gson进行验证" tabindex="-1"><a class="header-anchor" href="#_4-使用gson进行验证"><span>4. 使用Gson进行验证</span></a></h2><p>Gson是另一个常见的库，允许我们使用相同的方法验证原始JSON值。它是一个复杂的工具，用于Java对象映射和不同类型的JSON处理。</p><h3 id="_4-1-maven依赖" tabindex="-1"><a class="header-anchor" href="#_4-1-maven依赖"><span>4.1. <strong>Maven依赖</strong></span></a></h3><p>让我们添加_gson_ Maven依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```com.google.code.gson```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```gson```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```2.11.0```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-非严格验证" tabindex="-1"><a class="header-anchor" href="#_4-2-非严格验证"><span>4.2. 非严格<strong>验证</strong></span></a></h3><p>Gson提供了_JsonParser_来读取指定的JSON到_JsonElement_的树中。因此，如果读取时出现错误，它保证我们会得到_JsonSyntaxException_。</p><p>因此，我们可以使用_parse()<em>方法计算_String_并在JSON值格式错误时处理_Exception</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isValid</span><span class="token punctuation">(</span><span class="token class-name">String</span> json<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token class-name">JsonParser</span><span class="token punctuation">.</span><span class="token function">parseString</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">JsonSyntaxException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们编写一些测试来检查主要情况：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;email\\&quot;: \\&quot;example@com\\&quot;, \\&quot;name\\&quot;: \\&quot;John\\&quot;}&quot;</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>validator<span class="token punctuation">.</span><span class="token function">isValid</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;[{\\&quot;email\\&quot;: \\&quot;example@com\\&quot;, \\&quot;name\\&quot;: \\&quot;John\\&quot;}]&quot;</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>validator<span class="token punctuation">.</span><span class="token function">isValid</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这种方法的主要区别是Gson的默认策略认为单独的字符串和数值值作为_JsonElement_节点的一部分是有效的。换句话说，它认为一个单独的字符串或数字与JSON对象一样有效。</strong></p><p>例如，让我们看看它如何处理一个单独的字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;Invalid_Json&quot;</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>validator<span class="token punctuation">.</span><span class="token function">isValid</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，如果我们想将这样的值视为格式错误，我们需要在我们的_JsonParser_上执行严格的类型策略。</p><h3 id="_4-3-严格验证" tabindex="-1"><a class="header-anchor" href="#_4-3-严格验证"><span>4.3. 严格<strong>验证</strong></span></a></h3><p>要实现严格的类型策略，我们创建一个_TypeAdapter_并定义_JsonElement_类作为必需的类型匹配。结果，如果类型不是JSON对象或数组，<em>JsonParser_将抛出_JsonSyntaxException</em>。</p><p>我们可以调用_fromJson()_方法使用特定的_TypeAdapter_读取原始JSON：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">TypeAdapter</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">JsonElement</span><span class="token punctuation">&gt;</span></span>` strictAdapter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Gson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAdapter</span><span class="token punctuation">(</span><span class="token class-name">JsonElement</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isValid</span><span class="token punctuation">(</span><span class="token class-name">String</span> json<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        strictAdapter<span class="token punctuation">.</span><span class="token function">fromJson</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">JsonSyntaxException</span> <span class="token operator">|</span> <span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们可以检查JSON是否有效：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;Invalid_Json&quot;</span><span class="token punctuation">;</span>\n<span class="token function">assertFalse</span><span class="token punctuation">(</span>validator<span class="token punctuation">.</span><span class="token function">isValid</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们看到了检查一个_String_是否为有效JSON的不同方式。</p><p>每种方法都有其优势和限制。<strong>虽然JSON API可以用于简单的对象验证，Gson可以更可扩展地用于JSON对象中的原始值验证。然而，Jackson更易于使用。因此，我们应该使用最适合的那一个。</strong></p><p>此外，我们还应该检查是否已经有库在使用中，或者是否适用于其他目标。</p><p>如常，示例的源代码可以在GitHub上找到。</p>',62),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-19-Check Whether a String Is Valid JSON in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Check%20Whether%20a%20String%20Is%20Valid%20JSON%20in%20Java.html","title":"在Java中检查字符串是否为有效的JSON","lang":"zh-CN","frontmatter":{"date":"2024-07-19T00:00:00.000Z","category":["Java","JSON"],"tag":["JSON验证","Java"],"head":[["meta",{"name":"keywords","content":"Java, JSON, 验证, Gson, Jackson, JSON API"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Check%20Whether%20a%20String%20Is%20Valid%20JSON%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中检查字符串是否为有效的JSON"}],["meta",{"property":"og:description","content":"在Java中检查字符串是否为有效的JSON 当在Java中使用原始JSON值时，有时需要检查它是否有效。有几个库可以帮助我们完成这项工作：Gson、JSON API和Jackson。每个工具都有其自身的优势和限制。 在本教程中，我们将使用它们中的每一个来实现JSON字符串验证，并仔细查看方法之间的主要差异以及实际示例。 2. 使用JSON API进行验..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T08:36:40.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JSON验证"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2024-07-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T08:36:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中检查字符串是否为有效的JSON\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T08:36:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中检查字符串是否为有效的JSON 当在Java中使用原始JSON值时，有时需要检查它是否有效。有几个库可以帮助我们完成这项工作：Gson、JSON API和Jackson。每个工具都有其自身的优势和限制。 在本教程中，我们将使用它们中的每一个来实现JSON字符串验证，并仔细查看方法之间的主要差异以及实际示例。 2. 使用JSON API进行验..."},"headers":[{"level":2,"title":"2. 使用JSON API进行验证","slug":"_2-使用json-api进行验证","link":"#_2-使用json-api进行验证","children":[{"level":3,"title":"2.1. Maven依赖","slug":"_2-1-maven依赖","link":"#_2-1-maven依赖","children":[]},{"level":3,"title":"2.2. 使用_JSONObject_进行验证","slug":"_2-2-使用-jsonobject-进行验证","link":"#_2-2-使用-jsonobject-进行验证","children":[]},{"level":3,"title":"2.3. 使用_JSONArray_进行验证","slug":"_2-3-使用-jsonarray-进行验证","link":"#_2-3-使用-jsonarray-进行验证","children":[]}]},{"level":2,"title":"3. 使用Jackson进行验证","slug":"_3-使用jackson进行验证","link":"#_3-使用jackson进行验证","children":[{"level":3,"title":"3.1. Maven依赖","slug":"_3-1-maven依赖","link":"#_3-1-maven依赖","children":[]},{"level":3,"title":"3.2. 使用_ObjectMapper_进行验证","slug":"_3-2-使用-objectmapper-进行验证","link":"#_3-2-使用-objectmapper-进行验证","children":[]}]},{"level":2,"title":"4. 使用Gson进行验证","slug":"_4-使用gson进行验证","link":"#_4-使用gson进行验证","children":[{"level":3,"title":"4.1. Maven依赖","slug":"_4-1-maven依赖","link":"#_4-1-maven依赖","children":[]},{"level":3,"title":"4.2. 非严格验证","slug":"_4-2-非严格验证","link":"#_4-2-非严格验证","children":[]},{"level":3,"title":"4.3. 严格验证","slug":"_4-3-严格验证","link":"#_4-3-严格验证","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721378200000,"updatedTime":1721378200000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.67,"words":1402},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Check Whether a String Is Valid JSON in Java.md","localizedDate":"2024年7月19日","excerpt":"\\n<p>当在Java中使用原始JSON值时，有时需要检查它是否有效。有几个库可以帮助我们完成这项工作：Gson、JSON API和Jackson。每个工具都有其自身的优势和限制。</p>\\n<p>在本教程中，我们将使用它们中的每一个来实现JSON字符串验证，并仔细查看方法之间的主要差异以及实际示例。</p>\\n<h2>2. 使用JSON API进行验证</h2>\\n<p>最轻量级和简单的库是JSON API。</p>\\n<p>检查一个字符串是否为有效JSON的通用方法是异常处理。因此，我们委托JSON解析并在出现不正确的值时处理特定类型的错误，或者假设如果没有异常发生，则值是正确的。</p>\\n<h3>2.1. <strong>Maven依赖</strong></h3>","autoDesc":true}');export{d as comp,k as data};
