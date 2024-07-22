import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BMOUrRO4.js";const p={},e=t(`<h1 id="jackson-jr-库指南" tabindex="-1"><a class="header-anchor" href="#jackson-jr-库指南"><span>Jackson-jr 库指南</span></a></h1><p>Jackson-jr 是一个为 Java 设计的轻量级 JSON 处理库，旨在为原始的 Jackson 库提供一个更简单和更小的替代品。凭借其小巧的体积和易于使用的 API，Jackson-jr 是<strong>日常 JSON 读写场景的极佳选择</strong>。</p><p>在本指南中，我们将探索 Jackson-jr 的关键特性和用法，以及示例和最佳实践。</p><h3 id="_2-jackson-jr-入门" tabindex="-1"><a class="header-anchor" href="#_2-jackson-jr-入门"><span>2. Jackson-jr 入门</span></a></h3><p>Jackson-jr 提供了一种轻量级且高效的方式来处理 Java 应用程序中的 JSON 数据。它提供了一个简单的 API 来处理 JSON 对象和数组，使解析、生成和操作 JSON 数据变得更容易。</p><p>首先，我们必须将 Jackson-jr 库包含在我们的项目中。我们可以通过将所需的 Jackson-jr 依赖项版本添加到项目的构建配置文件中来实现这一点。</p><p>对于 Maven，我们可以在 <em>pom.xml</em> 文件中添加依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`com.fasterxml.jackson.jr\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`jackson-jr-all\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`2.15.2\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 Gradle，我们可以在 <em>build.gradle</em> 文件中添加依赖项：</p><div class="language-gradle line-numbers-mode" data-ext="gradle" data-title="gradle"><pre class="language-gradle"><code><span class="token keyword">implementation</span> <span class="token string">&#39;com.fasterxml.jackson.jr:jackson-jr-all:2.15.2&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-使用-json-对象" tabindex="-1"><a class="header-anchor" href="#_3-使用-json-对象"><span>3. 使用 JSON 对象</span></a></h3><p>使用 Jackson-jr 的基础对象是 <em>JSON 对象</em>。关于 <em>JSON</em> 对象的一个非常重要的且不应忘记的事实：<strong>每个 <em>JSON</em> 实例都是完全不可变的且线程安全的</strong>。我们可以随意使用它们，作为单例实例、Spring Bean，甚至构建个别对象。我们可以将同一个实例在不同线程间传递，因为它是完全不可变的。</p><h4 id="_3-1-创建-json-对象和数组" tabindex="-1"><a class="header-anchor" href="#_3-1-创建-json-对象和数组"><span>3.1. 创建 JSON 对象和数组</span></a></h4><p>创建 JSON 对象和数组：Jackson-jr 提供了一个方便的 API 来创建 JSON 对象和数组。我们可以使用 <em>LinkedHashMap</em> 类来表示 JSON 对象，使用 <em>ArrayList</em> 来表示 JSON 数组。</p><p>JSON 对象是一个 <em>LinkedHashMap</em>。我们可以很容易地使用 <em>LinkedHashMap.put()</em> 方法添加属性，并使用 <em>LinkedHashMap.get()</em> 方法获取属性。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span>std
  <span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">JSON<span class="token punctuation">.</span>Feature</span><span class="token punctuation">.</span><span class="token constant">PRETTY_PRINT_OUTPUT</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">asString</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>
      <span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;email&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;johndoe@example.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-jackson-jr-作曲家" tabindex="-1"><a class="header-anchor" href="#_3-2-jackson-jr-作曲家"><span>3.2. Jackson-jr 作曲家</span></a></h4><p>Jackson-jr 的另一个不错的特性是增加了 <em>Composer</em> 接口，用于以构建器样式生成 JSON 内容：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span>std<span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">JSON<span class="token punctuation">.</span>Feature</span><span class="token punctuation">.</span><span class="token constant">PRETTY_PRINT_OUTPUT</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">composeString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">startObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">startArrayField</span><span class="token punctuation">(</span><span class="token string">&quot;objectArray&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">startObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;name1&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">startObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;name2&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">startArrayField</span><span class="token punctuation">(</span><span class="token string">&quot;array&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">startObjectField</span><span class="token punctuation">(</span><span class="token string">&quot;object&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;name3&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;last&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">finish</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个构建器的结果如下 JSON：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;objectArray&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;name1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">11</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;name2&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">12</span>
  <span class="token punctuation">}</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;array&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;object&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;name3&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">13</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;last&quot;</span> <span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-序列化和反序列化" tabindex="-1"><a class="header-anchor" href="#_4-序列化和反序列化"><span>4. 序列化和反序列化</span></a></h2><p>Jackson-jr 允许我们轻松地将 Java 对象转换为 JSON 字符串，反之亦然。我们可以配置写入器以所需的选项，例如美化打印或自定义日期格式，然后使用它将对象写为 JSON 字符串。</p><p>Jackson-jr 支持复杂对象结构，包括嵌套对象和数组。通过正确定义我们的 Java 类及其关系，Jackson-jr 可以处理复杂 JSON 数据的序列化和反序列化。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 序列化</span>
<span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span>std<span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">JSON<span class="token punctuation">.</span>Feature</span><span class="token punctuation">.</span><span class="token constant">PRETTY_PRINT_OUTPUT</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">asString</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 反序列化</span>
json <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;name\\&quot;:\\&quot;John Doe\\&quot;,\\&quot;age\\&quot;:30}&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">Person</span> person1 <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span>std<span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">JSON<span class="token punctuation">.</span>Feature</span><span class="token punctuation">.</span><span class="token constant">PRETTY_PRINT_OUTPUT</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">beanFrom</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> json<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-1-jackson-jr-中的自定义" tabindex="-1"><a class="header-anchor" href="#_4-1-jackson-jr-中的自定义"><span>4.1. Jackson-jr 中的自定义</span></a></h3><p>Jackson-jr 支持各种注解，例如 <em>@JsonProperty</em>，以自定义序列化和反序列化过程。这些注解允许我们控制属性的名称，指定日期和时间格式，并处理其他自定义场景。我们可以在他们的官方 Github 项目中看到所有支持的注解列表。</p><p>Jackson-jr 有一系列特性自定义，我们可以使用它来自定义我们的序列化和反序列化的输入和输出，例如美化打印、写入空属性等。查看它们最简单的方式是在基础代码中。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">JSON</span> jsonMapper <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span>std<span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">JSON<span class="token punctuation">.</span>Feature</span><span class="token punctuation">.</span><span class="token constant">PRETTY_PRINT_OUTPUT</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">JSON<span class="token punctuation">.</span>Feature</span><span class="token punctuation">.</span><span class="token constant">WRITE_NULL_PROPERTIES</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">JSON<span class="token punctuation">.</span>Feature</span><span class="token punctuation">.</span><span class="token constant">FAIL_ON_DUPLICATE_MAP_KEYS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> json <span class="token operator">=</span> jsonMapper<span class="token punctuation">.</span><span class="token function">asString</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Jackson-jr 允许我们创建自定义序列化器和反序列化器来处理特定数据类型或复杂的序列化场景。通过实现适当的接口，<em>ValueWriter</em>，和扩展提供的类，<em>ValueReader 和 ReadWriterProvider</em>，我们可以定义我们的自定义对象应该如何被序列化和反序列化。</p><p>Jackson-jr 不支持 <em>java.time.</em> 包，但我们可以通过自定义序列化器和反序列化器添加它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomDateSerializer</span> <span class="token keyword">implements</span> <span class="token class-name">ValueWriter</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">writeValue</span><span class="token punctuation">(</span><span class="token class-name">JSONWriter</span> jsonWriter<span class="token punctuation">,</span> <span class="token class-name">JsonGenerator</span> jsonGenerator<span class="token punctuation">,</span> <span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        jsonGenerator<span class="token punctuation">.</span><span class="token function">writeString</span><span class="token punctuation">(</span>o<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Class</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token function">valueType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomDateDeserializer</span> <span class="token keyword">extends</span> <span class="token class-name">ValueReader</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">static</span> <span class="token class-name">DateTimeFormatter</span> dtf <span class="token operator">=</span> <span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MMM-dd&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">CustomDateDeserializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token class-name">JSONReader</span> jsonReader<span class="token punctuation">,</span> <span class="token class-name">JsonParser</span> jsonParser<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>jsonParser<span class="token punctuation">.</span><span class="token function">getText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> dtf<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注册它们之后，我们可以开始序列化和反序列化 <em>LocalDate</em> 对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyHandlerProvider</span> <span class="token keyword">extends</span> <span class="token class-name">ReaderWriterProvider</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">ValueWriter</span> <span class="token function">findValueWriter</span><span class="token punctuation">(</span><span class="token class-name">JSONWriter</span> writeContext<span class="token punctuation">,</span> <span class="token class-name">Class</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\`\`\` type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">==</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CustomDateSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">ValueReader</span> <span class="token function">findValueReader</span><span class="token punctuation">(</span><span class="token class-name">JSONReader</span> readContext<span class="token punctuation">,</span> <span class="token class-name">Class</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\`\`\` type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>type<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CustomDateDeserializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Person</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">JSON</span> jsonMapper <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">JacksonJrExtension</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">register</span><span class="token punctuation">(</span><span class="token class-name">ExtensionContext</span> extensionContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        extensionContext<span class="token punctuation">.</span><span class="token function">insertProvider</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MyHandlerProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">JSON<span class="token punctuation">.</span>Feature</span><span class="token punctuation">.</span><span class="token constant">PRETTY_PRINT_OUTPUT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> json <span class="token operator">=</span> jsonMapper<span class="token punctuation">.</span><span class="token function">asString</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Person</span> deserializedPerson <span class="token operator">=</span> jsonMapper<span class="token punctuation">.</span><span class="token function">beanFrom</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> json<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th>Jackson-jr</th><th>Jackson</th></tr></thead><tbody><tr><td>更小的 jar</td><td>更大的 jar</td></tr><tr><td>功能更少</td><td>更复杂的功能</td></tr><tr><td>更适合简单的序列化和反序列化</td><td>更适合更复杂的序列化和反序列化</td></tr><tr><td>启动时间更快</td><td>启动时间更慢</td></tr><tr><td>更简单的 API</td><td>更复杂的 API</td></tr></tbody></table><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>Jackson-jr 为 Java 应用程序中的 JSON 处理提供了一种轻量级和用户友好的方法。凭借其简化的 API、自定义选项和高效的性能，它是需要轻量级 JSON 处理库且不牺牲功能的开发者的极佳选择。</p><p>如常，示例的源代码可在 GitHub 上找到。</p>`,40),o=[e];function c(l,u){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-02-Guide to Java Jackson jr Library.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-Guide%20to%20Java%20Jackson%20jr%20Library.html","title":"Jackson-jr 库指南","lang":"zh-CN","frontmatter":{"date":"2024-07-02T00:00:00.000Z","category":["Java","Jackson-jr"],"tag":["JSON","库","轻量级"],"head":[["meta",{"name":"keywords","content":"Java, Jackson-jr, JSON, 轻量级库"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Guide%20to%20Java%20Jackson%20jr%20Library.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Jackson-jr 库指南"}],["meta",{"property":"og:description","content":"Jackson-jr 库指南 Jackson-jr 是一个为 Java 设计的轻量级 JSON 处理库，旨在为原始的 Jackson 库提供一个更简单和更小的替代品。凭借其小巧的体积和易于使用的 API，Jackson-jr 是日常 JSON 读写场景的极佳选择。 在本指南中，我们将探索 Jackson-jr 的关键特性和用法，以及示例和最佳实践。 2..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T11:55:16.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JSON"}],["meta",{"property":"article:tag","content":"库"}],["meta",{"property":"article:tag","content":"轻量级"}],["meta",{"property":"article:published_time","content":"2024-07-02T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T11:55:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Jackson-jr 库指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-02T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T11:55:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Jackson-jr 库指南 Jackson-jr 是一个为 Java 设计的轻量级 JSON 处理库，旨在为原始的 Jackson 库提供一个更简单和更小的替代品。凭借其小巧的体积和易于使用的 API，Jackson-jr 是日常 JSON 读写场景的极佳选择。 在本指南中，我们将探索 Jackson-jr 的关键特性和用法，以及示例和最佳实践。 2..."},"headers":[{"level":3,"title":"2. Jackson-jr 入门","slug":"_2-jackson-jr-入门","link":"#_2-jackson-jr-入门","children":[]},{"level":3,"title":"3. 使用 JSON 对象","slug":"_3-使用-json-对象","link":"#_3-使用-json-对象","children":[]},{"level":2,"title":"4. 序列化和反序列化","slug":"_4-序列化和反序列化","link":"#_4-序列化和反序列化","children":[{"level":3,"title":"4.1. Jackson-jr 中的自定义","slug":"_4-1-jackson-jr-中的自定义","link":"#_4-1-jackson-jr-中的自定义","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719921316000,"updatedTime":1719921316000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.75,"words":1424},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Guide to Java Jackson jr Library.md","localizedDate":"2024年7月2日","excerpt":"\\n<p>Jackson-jr 是一个为 Java 设计的轻量级 JSON 处理库，旨在为原始的 Jackson 库提供一个更简单和更小的替代品。凭借其小巧的体积和易于使用的 API，Jackson-jr 是<strong>日常 JSON 读写场景的极佳选择</strong>。</p>\\n<p>在本指南中，我们将探索 Jackson-jr 的关键特性和用法，以及示例和最佳实践。</p>\\n<h3>2. Jackson-jr 入门</h3>\\n<p>Jackson-jr 提供了一种轻量级且高效的方式来处理 Java 应用程序中的 JSON 数据。它提供了一个简单的 API 来处理 JSON 对象和数组，使解析、生成和操作 JSON 数据变得更容易。</p>","autoDesc":true}');export{r as comp,d as data};
