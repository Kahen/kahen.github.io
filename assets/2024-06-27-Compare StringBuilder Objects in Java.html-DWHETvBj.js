import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-C2EXT5sr.js";const e={},p=t(`<hr><h1 id="java中比较stringbuilder对象" tabindex="-1"><a class="header-anchor" href="#java中比较stringbuilder对象"><span>Java中比较StringBuilder对象</span></a></h1><p>在Java中，StringBuilder类允许我们创建一个可变的字符序列对象。这使得我们可以轻松地更新对象，而不需要每次都从头开始构建，这在使用标准String类时是必需的。本教程将介绍如何在Java 11发布前后比较两个StringBuilder对象。</p><h3 id="_1-java-11之前" tabindex="-1"><a class="header-anchor" href="#_1-java-11之前"><span>1. Java 11之前</span></a></h3><p>在Java 11之前，StringBuilder并没有内置的比较方法。因此，我们需要编写自己的比较方法。首先检查两个被比较对象的长度是否相同。如果不同，我们可以立即判断它们不匹配。</p><p>一旦我们知道它们长度相同，我们可以利用StringBuilder实现了CharSequence这一事实来访问charAt()方法，并逐个比较每个字符。让我们将这两个步骤合并成一个我们可以使用的单一方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token class-name">StringBuilder</span> one<span class="token punctuation">,</span> <span class="token class-name">StringBuilder</span> two<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>one<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> two<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> one<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>one<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">!=</span> two<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以使用这个方法进行一些测试。让我们看看它是否能确认两个StringBuilder是否相同：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingJavaEight_givenTwoIdenticalStringBuilders_thenCorrectlyMatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StringBuilder</span> one <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">StringBuilder</span> two <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">boolean</span> result <span class="token operator">=</span> <span class="token class-name">StringBuilderCompare</span><span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>one<span class="token punctuation">,</span> two<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了完成检查，现在让我们看看它能否检测到两个不同的StringBuilder：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingJavaEight_givenTwoDifferentStringBuilders_thenCorrectlyIdentifyDifference</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StringBuilder</span> one <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">StringBuilder</span> two <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">&quot;World&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">boolean</span> result <span class="token operator">=</span> <span class="token class-name">StringBuilderCompare</span><span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>one<span class="token punctuation">,</span> two<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二个测试中的示例具有相同的长度，因此我们将使用charAt()进行比较。</p><h3 id="_3-java-11之后" tabindex="-1"><a class="header-anchor" href="#_3-java-11之后"><span>3. Java 11之后</span></a></h3><p>随着Java 11的发布，StringBuilder现在实现了Comparable接口。这使我们可以使用compareTo()方法，该方法返回一个整数。如果匹配，则返回值为零；如果StringBuilder不同，则返回非零值。让我们用两个具有相同值的StringBuilder来看它在实际中如何工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingJavaEleven_givenTwoIdenticalStringBuilders_thenCorrectlyMatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">StringBuilder</span> one <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">StringBuilder</span> two <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> one<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>two<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们尝试两个不同的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingJavaEleven_givenTwoDifferentStringBuilders_thenCorrectlyIdentifyDifference</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">StringBuilder</span> one <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">StringBuilder</span> two <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">&quot;World&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNotSame</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> one<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>two<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这比Java 11之前要容易得多。返回的整数告诉我们比较的两个是否按字典顺序不同。我们还能够知道差异是正数还是负数，这在某些应用中可能很有用。</p><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>在本文中，我们探讨了两种比较StringBuilder对象的方法。我们看到了，如果我们使用的Java版本早于11，我们将需要编写自己的比较方法。然而，从Java 11开始，我们提供了方便的compareTo()方法，它实现了相同的结果。</p><p>如常，示例的完整代码可以在GitHub上找到。</p>`,21),o=[p];function i(c,l){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","2024-06-27-Compare StringBuilder Objects in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-Compare%20StringBuilder%20Objects%20in%20Java.html","title":"Java中比较StringBuilder对象","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","StringBuilder"],"tag":["Java","StringBuilder","Comparison"],"head":[["meta",{"name":"keywords","content":"Java, StringBuilder, 对比"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-Compare%20StringBuilder%20Objects%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中比较StringBuilder对象"}],["meta",{"property":"og:description","content":"Java中比较StringBuilder对象 在Java中，StringBuilder类允许我们创建一个可变的字符序列对象。这使得我们可以轻松地更新对象，而不需要每次都从头开始构建，这在使用标准String类时是必需的。本教程将介绍如何在Java 11发布前后比较两个StringBuilder对象。 1. Java 11之前 在Java 11之前，St..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T21:26:36.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"StringBuilder"}],["meta",{"property":"article:tag","content":"Comparison"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T21:26:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中比较StringBuilder对象\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T21:26:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中比较StringBuilder对象 在Java中，StringBuilder类允许我们创建一个可变的字符序列对象。这使得我们可以轻松地更新对象，而不需要每次都从头开始构建，这在使用标准String类时是必需的。本教程将介绍如何在Java 11发布前后比较两个StringBuilder对象。 1. Java 11之前 在Java 11之前，St..."},"headers":[{"level":3,"title":"1. Java 11之前","slug":"_1-java-11之前","link":"#_1-java-11之前","children":[]},{"level":3,"title":"3. Java 11之后","slug":"_3-java-11之后","link":"#_3-java-11之后","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719523596000,"updatedTime":1719523596000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.35,"words":706},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-Compare StringBuilder Objects in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中比较StringBuilder对象</h1>\\n<p>在Java中，StringBuilder类允许我们创建一个可变的字符序列对象。这使得我们可以轻松地更新对象，而不需要每次都从头开始构建，这在使用标准String类时是必需的。本教程将介绍如何在Java 11发布前后比较两个StringBuilder对象。</p>\\n<h3>1. Java 11之前</h3>\\n<p>在Java 11之前，StringBuilder并没有内置的比较方法。因此，我们需要编写自己的比较方法。首先检查两个被比较对象的长度是否相同。如果不同，我们可以立即判断它们不匹配。</p>\\n<p>一旦我们知道它们长度相同，我们可以利用StringBuilder实现了CharSequence这一事实来访问charAt()方法，并逐个比较每个字符。让我们将这两个步骤合并成一个我们可以使用的单一方法：</p>","autoDesc":true}');export{d as comp,k as data};
