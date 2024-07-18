import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CE5go3V-.js";const e={},p=t(`<h1 id="如何在java-8中实现elvis操作符-baeldung" tabindex="-1"><a class="header-anchor" href="#如何在java-8中实现elvis操作符-baeldung"><span>如何在Java 8中实现Elvis操作符 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在Java 8中，并没有像Groovy或Kotlin中内置的Elvis操作符。然而，我们可以使用方法引用和三元运算符来实现我们自己的Elvis操作符。在本教程中，我们将探讨如何在Java 8中实现Elvis操作符。</p><h2 id="_2-理解elvis操作符" tabindex="-1"><a class="header-anchor" href="#_2-理解elvis操作符"><span>2. 理解Elvis操作符</span></a></h2><p>Elvis操作符通常在Groovy和Kotlin等语言中使用。它由<code>?:</code>符号表示，用于在原始值为<code>null</code>时提供一个默认值。</p><p><strong>操作符评估其左侧的表达式，如果它不是<code>null</code>，则返回它。如果左侧的表达式评估为<code>null</code>，则返回右侧的表达式。</strong></p><p>例如，在Kotlin中，我们可以写<code>val name = person.name?: &quot;Unknown&quot;</code>来返回人的名字，如果它不是<code>null</code>，或者如果它是<code>null</code>，则返回“Unknown”。</p><h2 id="_3-使用三元运算符" tabindex="-1"><a class="header-anchor" href="#_3-使用三元运算符"><span>3. 使用三元运算符</span></a></h2><p>三元运算符(<code>?:</code>)允许在表达式内进行简洁的<code>if</code>-<code>else</code>结构。虽然它不是Elvis操作符，但它实现了类似的<code>null</code>检查和默认赋值。</p><p>让我们考虑一个场景，我们有一个方法从数据库中检索用户的名称。如果找不到用户，该方法可能会返回<code>null</code>。传统上，我们会使用三元运算符进行<code>null</code>检查并分配一个默认值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 模拟从数据库返回的用户对象</span>
<span class="token class-name">String</span> greeting <span class="token operator">=</span> <span class="token punctuation">(</span>user <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> user<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> user<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token string">&quot;Hello, Stranger&quot;</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> greeting<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> greeting <span class="token operator">=</span> <span class="token punctuation">(</span>user <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> user<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> user<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token string">&quot;Hello, Stranger&quot;</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, Stranger&quot;</span><span class="token punctuation">,</span> greeting<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>三元运算符提供了一种在表达式内处理<code>null</code>检查和默认赋值的简洁而富有表现力的方式。然而，对于嵌套的<code>null</code>检查，它变得笨拙：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> address <span class="token operator">=</span> user <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> user<span class="token punctuation">.</span><span class="token function">getAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> user<span class="token punctuation">.</span><span class="token function">getAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getCity</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-使用optional类" tabindex="-1"><a class="header-anchor" href="#_4-使用optional类"><span>4. 使用Optional类</span></a></h2><p>Java 8中引入的Optional类是安全处理<code>null</code>引用的强大工具。它表示值的存在或不存在。</p><p><strong>我们可以使用像<code>ofNullable()</code>这样的方法从可能为<code>null</code>的值创建一个Optional，然后链式调用<code>map()</code>操作来在值存在时对其执行操作。</strong> 最后，我们使用<code>orElse()</code>来指定一个默认值，以防Optional为空：</p><p>现在，我们想要将用户的名称转换为大写，如果存在，或者返回“Hello Stranger”：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> greeting <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token operator">::</span><span class="token function">toUpperCase</span><span class="token punctuation">)</span> <span class="token comment">// 如果存在则转换</span>
  <span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token string">&quot;Hello Stranger&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;BAELDUNG&quot;</span><span class="token punctuation">,</span> greeting<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在这段代码中，<code>Optional.ofNullable(user.getName())</code>从用户的名称创建了一个Optional，处理了<code>null</code>的可能性。</strong> 然后我们使用<code>map(String::toUpperCase)</code>在名称存在时将其转换为大写。最后，<code>orElse(&quot;Hello Stranger&quot;)</code>指定了如果名称为<code>null</code>时的默认问候语：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> greeting <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token operator">::</span><span class="token function">toUpperCase</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token string">&quot;Hello Stranger&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Hello Stranger&quot;</span><span class="token punctuation">,</span> greeting<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这种方法促进了<code>null</code>安全性，并避免了潜在的NullPointerException。</strong></p><h2 id="_5-使用自定义方法" tabindex="-1"><a class="header-anchor" href="#_5-使用自定义方法"><span>5. 使用自定义方法</span></a></h2><p>我们可以创建一组实用方法，它们接受目标对象和函数，如果目标对象不是<code>null</code>，则对目标对象应用该函数。<strong>我们甚至可以将这些方法链接在一起，创建一系列<code>null</code>合并操作。</strong></p><p>为了创建一个模仿Elvis操作符的自定义实用方法，我们定义了一个带有泛型的通用方法来处理不同类型的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> \`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\` <span class="token class-name">T</span> <span class="token function">elvis</span><span class="token punctuation">(</span><span class="token class-name">T</span> value<span class="token punctuation">,</span> <span class="token class-name">T</span> defaultValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> value <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> value <span class="token operator">:</span> defaultValue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法接受两个参数：要检查<code>null</code>的值和如果值为<code>null</code>时要返回的默认值。<strong>然后，该方法根据<code>null</code>检查返回<code>value</code>或<code>defaultValue</code>：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> greeting <span class="token operator">=</span> <span class="token function">elvis</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;Hello Stranger&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> greeting<span class="token punctuation">)</span><span class="token punctuation">;</span>

user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> greeting <span class="token operator">=</span> <span class="token function">elvis</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;Hello Stranger&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Hello Stranger&quot;</span><span class="token punctuation">,</span> greeting<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用像<code>elvis()</code>这样的自定义实用方法比嵌套的三元运算符有几个好处。<strong>它通过将<code>null</code>检查逻辑封装在单独的方法中来提高代码组织，从而提高代码的可读性和可维护性。</strong></p><p>让我们看看这个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
user<span class="token punctuation">.</span><span class="token function">setAddress</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Address</span><span class="token punctuation">(</span><span class="token string">&quot;Singapore&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> cityName <span class="token operator">=</span> <span class="token function">elvis</span><span class="token punctuation">(</span><span class="token function">elvis</span><span class="token punctuation">(</span>user<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;Stranger&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Address</span><span class="token punctuation">(</span><span class="token string">&quot;Default City&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getCity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Singapore&quot;</span><span class="token punctuation">,</span> cityName<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们检查<code>user</code>是否为<code>null</code>。如果是，它返回一个带有默认值“Stranger”的新User对象。接下来，我们从user对象中检索<code>address</code>。如果<code>getAddress()</code>返回<code>null</code>，我们返回一个带有默认城市名称“Default City”的新Address对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
user<span class="token punctuation">.</span><span class="token function">setAddress</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> cityName <span class="token operator">=</span> <span class="token function">elvis</span><span class="token punctuation">(</span><span class="token function">elvis</span><span class="token punctuation">(</span>user<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;Stranger&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Address</span><span class="token punctuation">(</span><span class="token string">&quot;Default City&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getCity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Default City&quot;</span><span class="token punctuation">,</span> cityName<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这种使用<code>elvis()</code>方法的链接方法允许我们以简洁和可读的方式处理嵌套的<code>null</code>检查，确保我们的代码在不使用冗长的if-else结构的情况下优雅地处理<code>null</code>场景。</strong></p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们使用Optional类和三元运算符在Java 8中实现了Elvis操作符。此外，我们创建了一个自定义实用方法<code>elvis()</code>来处理<code>null</code>检查和默认赋值。通过将逻辑封装在方法中，我们可以提高代码的可读性和可维护性，同时促进代码的可重用性。</p><p>如常，示例的源代码可在GitHub上找到。</p><p>评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,37),o=[p];function c(l,u){return a(),s("div",null,o)}const d=n(e,[["render",c],["__file","How to Implement Elvis Operator in Java 8.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/How%20to%20Implement%20Elvis%20Operator%20in%20Java%208.html","title":"如何在Java 8中实现Elvis操作符 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-16T00:00:00.000Z","category":["Java","Programming"],"tag":["Java 8","Elvis Operator"],"description":"如何在Java 8中实现Elvis操作符 | Baeldung 1. 引言 在Java 8中，并没有像Groovy或Kotlin中内置的Elvis操作符。然而，我们可以使用方法引用和三元运算符来实现我们自己的Elvis操作符。在本教程中，我们将探讨如何在Java 8中实现Elvis操作符。 2. 理解Elvis操作符 Elvis操作符通常在Groovy...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/How%20to%20Implement%20Elvis%20Operator%20in%20Java%208.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Java 8中实现Elvis操作符 | Baeldung"}],["meta",{"property":"og:description","content":"如何在Java 8中实现Elvis操作符 | Baeldung 1. 引言 在Java 8中，并没有像Groovy或Kotlin中内置的Elvis操作符。然而，我们可以使用方法引用和三元运算符来实现我们自己的Elvis操作符。在本教程中，我们将探讨如何在Java 8中实现Elvis操作符。 2. 理解Elvis操作符 Elvis操作符通常在Groovy..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:tag","content":"Elvis Operator"}],["meta",{"property":"article:published_time","content":"2024-06-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Java 8中实现Elvis操作符 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 理解Elvis操作符","slug":"_2-理解elvis操作符","link":"#_2-理解elvis操作符","children":[]},{"level":2,"title":"3. 使用三元运算符","slug":"_3-使用三元运算符","link":"#_3-使用三元运算符","children":[]},{"level":2,"title":"4. 使用Optional类","slug":"_4-使用optional类","link":"#_4-使用optional类","children":[]},{"level":2,"title":"5. 使用自定义方法","slug":"_5-使用自定义方法","link":"#_5-使用自定义方法","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.5,"words":1350},"filePathRelative":"posts/baeldung/Archive/How to Implement Elvis Operator in Java 8.md","localizedDate":"2024年6月16日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在Java 8中，并没有像Groovy或Kotlin中内置的Elvis操作符。然而，我们可以使用方法引用和三元运算符来实现我们自己的Elvis操作符。在本教程中，我们将探讨如何在Java 8中实现Elvis操作符。</p>\\n<h2>2. 理解Elvis操作符</h2>\\n<p>Elvis操作符通常在Groovy和Kotlin等语言中使用。它由<code>?:</code>符号表示，用于在原始值为<code>null</code>时提供一个默认值。</p>\\n<p><strong>操作符评估其左侧的表达式，如果它不是<code>null</code>，则返回它。如果左侧的表达式评估为<code>null</code>，则返回右侧的表达式。</strong></p>","autoDesc":true}');export{d as comp,k as data};
