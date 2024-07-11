import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as a,a as e}from"./app-Ckd2YV4o.js";const t={},p=e(`<h1 id="使用assertj在java中提取值" tabindex="-1"><a class="header-anchor" href="#使用assertj在java中提取值"><span>使用AssertJ在Java中提取值</span></a></h1><p>AssertJ是Java的一个断言库，它允许我们流畅地编写断言，同时也使它们更易于阅读。</p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将探索AssertJ的提取方法，以便在不中断测试断言流程的情况下流畅地进行检查。</p><h2 id="_2-实现" tabindex="-1"><a class="header-anchor" href="#_2-实现"><span>2. 实现</span></a></h2><p>让我们从一个_Person_示例类开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Address</span> address<span class="token punctuation">;</span>

    <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">,</span> <span class="token class-name">String</span> lastName<span class="token punctuation">,</span> <span class="token class-name">Address</span> address<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>firstName <span class="token operator">=</span> firstName<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>lastName <span class="token operator">=</span> lastName<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>address <span class="token operator">=</span> address<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 省略getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每个_Person_将与一些_Address_关联：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Address</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> street<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> city<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">ZipCode</span> zipCode<span class="token punctuation">;</span>

    <span class="token class-name">Address</span><span class="token punctuation">(</span><span class="token class-name">String</span> street<span class="token punctuation">,</span> <span class="token class-name">String</span> city<span class="token punctuation">,</span> <span class="token class-name">ZipCode</span> zipCode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>street <span class="token operator">=</span> street<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>city <span class="token operator">=</span> city<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>zipCode <span class="token operator">=</span> zipCode<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 省略getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并且每个_Address_将包含一个_ZipCode_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">ZipCode</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> zipcode<span class="token punctuation">;</span>

    <span class="token class-name">ZipCode</span><span class="token punctuation">(</span><span class="token keyword">long</span> zipcode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>zipcode <span class="token operator">=</span> zipcode<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 省略getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在假设在创建了_Person_对象之后，我们需要测试以下情况：</p><ul><li><em>Address_不是_null</em></li><li>_Address_不在受限地址列表中</li><li><em>ZipCode_对象不是_null</em></li><li>_ZipCode_值在1000到100000之间</li></ul><h2 id="_3-使用assertj进行常见断言" tabindex="-1"><a class="header-anchor" href="#_3-使用assertj进行常见断言"><span>3. 使用AssertJ进行常见断言</span></a></h2><p>给定以下_Person_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Person</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;aName&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;aLastName&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Address</span><span class="token punctuation">(</span><span class="token string">&quot;aStreet&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;aCity&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">ZipCode</span><span class="token punctuation">(</span><span class="token number">90210</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以提取_Address_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Address</span> address <span class="token operator">=</span> person<span class="token punctuation">.</span><span class="token function">getAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后我们可以断言_Address_不是null：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span>address<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNotNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们还可以检查_Address_是否不在受限地址列表中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span>address<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNotIn</span><span class="token punctuation">(</span><span class="token constant">RESTRICTED_ADDRESSES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来是检查_ZipCode_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ZipCode</span> zipCode <span class="token operator">=</span> address<span class="token punctuation">.</span><span class="token function">getZipCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>并断言它不是null：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span>zipCode<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNotNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，我们可以提取_ZipCode_值并断言它在1000到100000之间：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span>zipCode<span class="token punctuation">.</span><span class="token function">getZipcode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isBetween</span><span class="token punctuation">(</span><span class="token number">1000L</span><span class="token punctuation">,</span> <span class="token number">100_000L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述代码很直接，但我们需要帮助以流畅地阅读它，因为它需要多行来处理。我们还需要分配变量，以便稍后能够断言它们，这不是一个干净的代码体验。</p><p>现在让我们看看提取方法如何帮助我们：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">extracting</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token operator">::</span><span class="token function">getAddress</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">isNotNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">isNotIn</span><span class="token punctuation">(</span><span class="token constant">RESTRICTED_ADDRESSES</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">extracting</span><span class="token punctuation">(</span><span class="token class-name">Address</span><span class="token operator">::</span><span class="token function">getZipCode</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">isNotNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">extracting</span><span class="token punctuation">(</span><span class="token class-name">ZipCode</span><span class="token operator">::</span><span class="token function">getZipcode</span><span class="token punctuation">,</span> <span class="token function">as</span><span class="token punctuation">(</span><span class="token class-name">InstanceOfAssertFactories</span><span class="token punctuation">.</span><span class="token constant">LONG</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">isBetween</span><span class="token punctuation">(</span><span class="token number">1_000L</span><span class="token punctuation">,</span> <span class="token number">100_000L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，代码并没有太大的不同，但它是流畅的，更容易阅读。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们能够看到两种提取对象值进行断言的方法：</p><ul><li>提取到稍后断言的变量中</li><li>使用AssertJ的提取方法以流畅的方式提取</li></ul><p>本文中使用的例子可以在GitHub上找到。</p>`,36),o=[p];function c(l,i){return a(),n("div",null,o)}const d=s(t,[["render",c],["__file","2024-07-11-Extract Values using AssertJ in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Extract%20Values%20using%20AssertJ%20in%20Java.html","title":"使用AssertJ在Java中提取值","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Testing"],"tag":["AssertJ","Testing"],"head":[["meta",{"name":"keywords","content":"AssertJ, Java, Testing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Extract%20Values%20using%20AssertJ%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用AssertJ在Java中提取值"}],["meta",{"property":"og:description","content":"使用AssertJ在Java中提取值 AssertJ是Java的一个断言库，它允许我们流畅地编写断言，同时也使它们更易于阅读。 1. 概述 在本教程中，我们将探索AssertJ的提取方法，以便在不中断测试断言流程的情况下流畅地进行检查。 2. 实现 让我们从一个_Person_示例类开始： 每个_Person_将与一些_Address_关联： 并且每个..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T08:43:07.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"AssertJ"}],["meta",{"property":"article:tag","content":"Testing"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T08:43:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用AssertJ在Java中提取值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T08:43:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用AssertJ在Java中提取值 AssertJ是Java的一个断言库，它允许我们流畅地编写断言，同时也使它们更易于阅读。 1. 概述 在本教程中，我们将探索AssertJ的提取方法，以便在不中断测试断言流程的情况下流畅地进行检查。 2. 实现 让我们从一个_Person_示例类开始： 每个_Person_将与一些_Address_关联： 并且每个..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 实现","slug":"_2-实现","link":"#_2-实现","children":[]},{"level":2,"title":"3. 使用AssertJ进行常见断言","slug":"_3-使用assertj进行常见断言","link":"#_3-使用assertj进行常见断言","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720687387000,"updatedTime":1720687387000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.99,"words":598},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Extract Values using AssertJ in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>AssertJ是Java的一个断言库，它允许我们流畅地编写断言，同时也使它们更易于阅读。</p>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将探索AssertJ的提取方法，以便在不中断测试断言流程的情况下流畅地进行检查。</p>\\n<h2>2. 实现</h2>\\n<p>让我们从一个_Person_示例类开始：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Person</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> firstName<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> lastName<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">Address</span> address<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token class-name\\">Person</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span> firstName<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">String</span> lastName<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">Address</span> address<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>firstName <span class=\\"token operator\\">=</span> firstName<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>lastName <span class=\\"token operator\\">=</span> lastName<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>address <span class=\\"token operator\\">=</span> address<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token comment\\">// 省略getter和setter</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
