import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-B5SPsEv6.js";const e={},p=t(`<h1 id="使用gson将json反序列化为java记录" tabindex="-1"><a class="header-anchor" href="#使用gson将json反序列化为java记录"><span>使用Gson将JSON反序列化为Java记录</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>反序列化过程涉及将对象（或数据）的JSON表示转换为编程语言中的等效对象，例如Java对象。Gson是一个流行的Java库，用于JSON序列化和反序列化，简化了这一过程。</p><p><strong>在本教程中，我们将探讨如何使用Gson将JSON数据反序列化为Java记录。</strong></p><h2 id="_2-创建java记录" tabindex="-1"><a class="header-anchor" href="#_2-创建java记录"><span>2. 创建Java记录</span></a></h2><p>在深入代码示例之前，我们需要确保已经将Gson库添加到我们的项目中。<strong>我们可以将其作为构建工具的依赖项添加，例如Maven或Gradle。对于Maven，我们添加以下依赖项：</strong></p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`com.google.code.gson\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`gson\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`2.8.9\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们通过定义一个简单的Java _记录_来开始，我们将用于反序列化。例如，考虑一个具有 <em>名称</em>、<em>年龄</em> 和 <em>地址</em> 字段的 <em>Person</em> 记录：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">record</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">,</span> <span class="token class-name">String</span> address<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 不需要显式定义构造函数、getter或其他方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-将json反序列化为java记录" tabindex="-1"><a class="header-anchor" href="#_3-将json反序列化为java记录"><span>3. 将JSON反序列化为Java记录</span></a></h2><p>现在，让我们看看如何使用Gson将JSON数据反序列化为我们的 <em>Person</em> 记录。假设我们有以下JSON表示的 <em>person</em>：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;123 Main St&quot;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们使用Gson的 <em>fromJson()</em> 方法将此JSON字符串转换为 <em>Person</em> 记录：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenJsonString_whenDeserialized_thenPersonRecordCreated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;name\\&quot;:\\&quot;John Doe\\&quot;,\\&quot;age\\&quot;:30,\\&quot;address\\&quot;:\\&quot;123 Main St\\&quot;}&quot;</span><span class="token punctuation">;</span>

    <span class="token class-name">Person</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Gson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fromJson</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span> person<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> person<span class="token punctuation">.</span><span class="token function">age</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;123 Main St&quot;</span><span class="token punctuation">,</span> person<span class="token punctuation">.</span><span class="token function">address</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，<em>fromJson()</em> 方法接受JSON字符串和类类型（ <em>Person.class</em>），JSON应该转换为该类型。随后，Gson自动将JSON字段映射到相应的记录组件。</p><h2 id="_4-处理嵌套对象" tabindex="-1"><a class="header-anchor" href="#_4-处理嵌套对象"><span>4. 处理嵌套对象</span></a></h2><p>如果我们有一个包含嵌套对象的JSON怎么办？Gson也可以处理它们！</p><p>让我们扩展我们的 <em>Person</em> 记录，以包括一个 <em>Contact</em> 记录，用于存储人的联系信息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">record</span> <span class="token class-name">Contact</span><span class="token punctuation">(</span><span class="token class-name">String</span> email<span class="token punctuation">,</span> <span class="token class-name">String</span> phone<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 构造函数、getter和其他方法将自动生成</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">record</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">,</span> <span class="token class-name">String</span> address<span class="token punctuation">,</span> <span class="token class-name">Contact</span> contact<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 构造函数、getter和其他方法将自动生成</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们考虑一个包含联系信息的JSON表示：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;123 Main St&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;contact&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token string">&quot;john.doe@example.com&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;phone&quot;</span><span class="token operator">:</span> <span class="token string">&quot;555-1234&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>反序列化代码几乎保持不变，Gson处理嵌套对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenNestedJsonString_whenDeserialized_thenPersonRecordCreated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;name\\&quot;:\\&quot;John Doe\\&quot;,\\&quot;age\\&quot;:30,\\&quot;address\\&quot;:\\&quot;123 Main St\\&quot;,\\&quot;contact\\&quot;:{\\&quot;email\\&quot;:\\&quot;john.doe@example.com\\&quot;,\\&quot;phone\\&quot;:\\&quot;555-1234\\&quot;}}&quot;</span><span class="token punctuation">;</span>

    <span class="token class-name">Person</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Gson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fromJson</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span> person<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> person<span class="token punctuation">.</span><span class="token function">age</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;123 Main St&quot;</span><span class="token punctuation">,</span> person<span class="token punctuation">.</span><span class="token function">address</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Contact</span> contact <span class="token operator">=</span> person<span class="token punctuation">.</span><span class="token function">contact</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>contact<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;john.doe@example.com&quot;</span><span class="token punctuation">,</span> contact<span class="token punctuation">.</span><span class="token function">email</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;555-1234&quot;</span><span class="token punctuation">,</span> contact<span class="token punctuation">.</span><span class="token function">phone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>总之，Gson和Java记录的结合提供了一种简洁而富有表现力的方式来处理JSON反序列化，即使是嵌套结构也是如此。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p><p>OK</p>`,27),o=[p];function c(l,i){return a(),s("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-26-Deserializing JSON to Java Record using Gson.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Deserializing%20JSON%20to%20Java%20Record%20using%20Gson.html","title":"使用Gson将JSON反序列化为Java记录","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Java","JSON"],"tag":["Gson","Deserialization"],"head":[["meta",{"name":"keywords","content":"Java, JSON, Deserialization, Gson, Records"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Deserializing%20JSON%20to%20Java%20Record%20using%20Gson.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Gson将JSON反序列化为Java记录"}],["meta",{"property":"og:description","content":"使用Gson将JSON反序列化为Java记录 1. 引言 反序列化过程涉及将对象（或数据）的JSON表示转换为编程语言中的等效对象，例如Java对象。Gson是一个流行的Java库，用于JSON序列化和反序列化，简化了这一过程。 在本教程中，我们将探讨如何使用Gson将JSON数据反序列化为Java记录。 2. 创建Java记录 在深入代码示例之前，我..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T07:51:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Gson"}],["meta",{"property":"article:tag","content":"Deserialization"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T07:51:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Gson将JSON反序列化为Java记录\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T07:51:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Gson将JSON反序列化为Java记录 1. 引言 反序列化过程涉及将对象（或数据）的JSON表示转换为编程语言中的等效对象，例如Java对象。Gson是一个流行的Java库，用于JSON序列化和反序列化，简化了这一过程。 在本教程中，我们将探讨如何使用Gson将JSON数据反序列化为Java记录。 2. 创建Java记录 在深入代码示例之前，我..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 创建Java记录","slug":"_2-创建java记录","link":"#_2-创建java记录","children":[]},{"level":2,"title":"3. 将JSON反序列化为Java记录","slug":"_3-将json反序列化为java记录","link":"#_3-将json反序列化为java记录","children":[]},{"level":2,"title":"4. 处理嵌套对象","slug":"_4-处理嵌套对象","link":"#_4-处理嵌套对象","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719388319000,"updatedTime":1719388319000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.49,"words":748},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Deserializing JSON to Java Record using Gson.md","localizedDate":"2024年6月26日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>反序列化过程涉及将对象（或数据）的JSON表示转换为编程语言中的等效对象，例如Java对象。Gson是一个流行的Java库，用于JSON序列化和反序列化，简化了这一过程。</p>\\n<p><strong>在本教程中，我们将探讨如何使用Gson将JSON数据反序列化为Java记录。</strong></p>\\n<h2>2. 创建Java记录</h2>\\n<p>在深入代码示例之前，我们需要确保已经将Gson库添加到我们的项目中。<strong>我们可以将其作为构建工具的依赖项添加，例如Maven或Gradle。对于Maven，我们添加以下依赖项：</strong></p>","autoDesc":true}');export{d as comp,k as data};
