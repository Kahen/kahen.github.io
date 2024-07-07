import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-B0JIQbDY.js";const p={},e=t(`<h1 id="java中hashmap实现同一个键对应多个值" tabindex="-1"><a class="header-anchor" href="#java中hashmap实现同一个键对应多个值"><span>Java中HashMap实现同一个键对应多个值</span></a></h1><p>在Java编程中广泛使用的HashMap数据结构存储键值对，提供基于关联键的快速值访问。然而，在某些情况下，我们可能遇到需要将多个值与单个键关联的场景。</p><p>在本教程中，我们将探讨如何实现一个允许同一个键关联多个值的HashMap。</p><h2 id="_2-概览" tabindex="-1"><a class="header-anchor" href="#_2-概览"><span>2. 概览</span></a></h2><p>大多数编程语言中的标准HashMap实现只允许每个键关联一个值。当我们遇到需要在同一个键下存储多个值的情况时，我们可以考虑采用不同的方法来解决这一挑战。</p><p>一种常见的解决方案是使用像ArrayList、LinkedList或HashSet这样的数据结构来存储每个键的多个值。</p><h2 id="_3-设计支持多个值的hashmap" tabindex="-1"><a class="header-anchor" href="#_3-设计支持多个值的hashmap"><span>3. 设计支持多个值的HashMap</span></a></h2><p>让我们开始设计我们的自定义HashMap类，允许同一个键关联多个值。我们将把它命名为MultiValueHashMap。</p><h3 id="_3-1-类结构" tabindex="-1"><a class="header-anchor" href="#_3-1-类结构"><span>3.1. 类结构</span></a></h3><p>首先，让我们看看我们的MultiValueHashMap类的基本结构：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MultiValueHashMap</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>\` <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">HashMap</span>\`<span class="token operator">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">ArrayList</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token operator">&gt;</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 方法</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的类结构中，我们使用一个私有HashMap来存储键和它们关联的ArrayList值。此外，请注意键类型(K)和值类型(V)是泛型的，使这个类适用于各种数据类型。</p><h3 id="_3-2-为键添加值" tabindex="-1"><a class="header-anchor" href="#_3-2-为键添加值"><span>3.2. 为键添加值</span></a></h3><p>现在，让我们实现一个方法来为特定键添加值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">K</span> key<span class="token punctuation">,</span> <span class="token class-name">V</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    map<span class="token punctuation">.</span><span class="token function">computeIfAbsent</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> k <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>put方法在给定键下向map添加一个值。如果键不存在，它创建一个新的条目，附带一个空列表，然后将值添加到该列表中。这使得在map中存储和管理与同一个键关联的多个值变得容易。</p><h3 id="_3-3-检索键的值" tabindex="-1"><a class="header-anchor" href="#_3-3-检索键的值"><span>3.3. 检索键的值</span></a></h3><p>接下来，让我们实现一个方法来检索与给定键关联的所有值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">K</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> map<span class="token punctuation">.</span><span class="token function">getOrDefault</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>get方法返回与指定键关联的ArrayList，或者如果键不存在，则返回一个空的ArrayList。</p><h3 id="_3-4-移除键值对" tabindex="-1"><a class="header-anchor" href="#_3-4-移除键值对"><span>3.4. 移除键值对</span></a></h3><p>为了完成我们的实现，我们将添加一个方法来移除特定的键值对：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token class-name">K</span> key<span class="token punctuation">,</span> <span class="token class-name">V</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    map<span class="token punctuation">.</span><span class="token function">computeIfPresent</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token punctuation">(</span>k<span class="token punctuation">,</span> v<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        v<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> v<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>remove方法接受一个键和值作为输入，并从map中与该键关联的列表中移除该值，如果它存在的话。这是管理在map中存储在特定键下的列表中特定值的移除的一种直接方法。</p><h2 id="_4-junit测试示例" tabindex="-1"><a class="header-anchor" href="#_4-junit测试示例"><span>4. JUnit测试示例</span></a></h2><p>为了确保我们的MultiValueHashMap按预期工作，我们应该编写全面的JUnit测试用例。让我们看一些测试示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">given_MultiValueHashMap_whenPuttingAndGettingSingleValue_thenValueIsRetrieved</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">MultiValueHashMap</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MultiValueHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;key1&quot;</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;key1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">given_MultiValueHashMap_whenPuttingAndGettingMultipleValues_thenAllValuesAreRetrieved</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">MultiValueHashMap</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MultiValueHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;key2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;key2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;key2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;value1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;key2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">given_MultiValueHashMap_whenGettingNonExistentKey_thenEmptyListIsReturned</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">MultiValueHashMap</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Double</span><span class="token punctuation">&gt;</span></span>\` map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MultiValueHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;nonexistent&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">given_MultiValueHashMap_whenRemovingValue_thenValueIsSuccessfullyRemoved</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">MultiValueHashMap</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MultiValueHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;one&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;uno&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;eins&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    map<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;uno&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;eins&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testRemoveNonExistentValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">MultiValueHashMap</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MultiValueHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;one&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    map<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;nonexistent&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的JUnit测试示例中，我们验证了MultiValueHashMap类在各种场景下的功能，例如为同一个键添加单个和多个值，检索存在和不存在的键的值，以及移除键值对。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了实现支持同一个键关联多个值的HashMap的概念。此外，我们设计了MultiValueHashMap类，并用JUnit测试示例展示了其用法。</p><p>通过使用这种自定义实现，开发者可以高效地管理需要为单个键提供多个值的场景，使他们的代码更加多样化和强大。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p>`,32),o=[e];function c(l,u){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-01-HashMap with Multiple Values for the Same Key.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-HashMap%20with%20Multiple%20Values%20for%20the%20Same%20Key.html","title":"Java中HashMap实现同一个键对应多个值","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","HashMap"],"tag":["Java","HashMap","Multiple Values"],"head":[["meta",{"name":"keywords","content":"Java, HashMap, Multiple Values, Data Structure"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-HashMap%20with%20Multiple%20Values%20for%20the%20Same%20Key.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中HashMap实现同一个键对应多个值"}],["meta",{"property":"og:description","content":"Java中HashMap实现同一个键对应多个值 在Java编程中广泛使用的HashMap数据结构存储键值对，提供基于关联键的快速值访问。然而，在某些情况下，我们可能遇到需要将多个值与单个键关联的场景。 在本教程中，我们将探讨如何实现一个允许同一个键关联多个值的HashMap。 2. 概览 大多数编程语言中的标准HashMap实现只允许每个键关联一个值。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T22:34:02.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"HashMap"}],["meta",{"property":"article:tag","content":"Multiple Values"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T22:34:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中HashMap实现同一个键对应多个值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T22:34:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中HashMap实现同一个键对应多个值 在Java编程中广泛使用的HashMap数据结构存储键值对，提供基于关联键的快速值访问。然而，在某些情况下，我们可能遇到需要将多个值与单个键关联的场景。 在本教程中，我们将探讨如何实现一个允许同一个键关联多个值的HashMap。 2. 概览 大多数编程语言中的标准HashMap实现只允许每个键关联一个值。..."},"headers":[{"level":2,"title":"2. 概览","slug":"_2-概览","link":"#_2-概览","children":[]},{"level":2,"title":"3. 设计支持多个值的HashMap","slug":"_3-设计支持多个值的hashmap","link":"#_3-设计支持多个值的hashmap","children":[{"level":3,"title":"3.1. 类结构","slug":"_3-1-类结构","link":"#_3-1-类结构","children":[]},{"level":3,"title":"3.2. 为键添加值","slug":"_3-2-为键添加值","link":"#_3-2-为键添加值","children":[]},{"level":3,"title":"3.3. 检索键的值","slug":"_3-3-检索键的值","link":"#_3-3-检索键的值","children":[]},{"level":3,"title":"3.4. 移除键值对","slug":"_3-4-移除键值对","link":"#_3-4-移除键值对","children":[]}]},{"level":2,"title":"4. JUnit测试示例","slug":"_4-junit测试示例","link":"#_4-junit测试示例","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719873242000,"updatedTime":1719873242000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.37,"words":1012},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-HashMap with Multiple Values for the Same Key.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在Java编程中广泛使用的HashMap数据结构存储键值对，提供基于关联键的快速值访问。然而，在某些情况下，我们可能遇到需要将多个值与单个键关联的场景。</p>\\n<p>在本教程中，我们将探讨如何实现一个允许同一个键关联多个值的HashMap。</p>\\n<h2>2. 概览</h2>\\n<p>大多数编程语言中的标准HashMap实现只允许每个键关联一个值。当我们遇到需要在同一个键下存储多个值的情况时，我们可以考虑采用不同的方法来解决这一挑战。</p>\\n<p>一种常见的解决方案是使用像ArrayList、LinkedList或HashSet这样的数据结构来存储每个键的多个值。</p>\\n<h2>3. 设计支持多个值的HashMap</h2>","autoDesc":true}');export{r as comp,d as data};
