import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CJGTm_7y.js";const p={},e=t(`<h1 id="使用java-stream生成map时处理重复键" tabindex="-1"><a class="header-anchor" href="#使用java-stream生成map时处理重复键"><span>使用Java Stream生成Map时处理重复键</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在使用Java Stream生成Map时，可能会遇到重复键的问题。这可能会导致向Map中添加值时出现问题，因为与键关联的先前值可能会被覆盖。</p><p>在本教程中，我们将讨论在使用Stream API生成Map时如何处理重复键。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>像往常一样，我们通过示例来理解问题。假设我们有一个City类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">City</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> locatedIn<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">City</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> locatedIn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>locatedIn <span class="token operator">=</span> locatedIn<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 省略getter方法</span>
    <span class="token comment">// 省略equals()和hashCode()方法</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上类代码所示，City是一个具有两个字符串属性的POJO类。一个是城市名称。另一个提供了更多关于城市所在地的信息。</p><p>此外，该类覆盖了equals()和hashCode()方法。这两个方法检查name和locatedIn属性。为了简单起见，我们没有在代码片段中放入方法的实现。</p><p>接下来，我们创建一个City实例列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">City</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token constant">CITY_INPUT</span> <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>
  <span class="token keyword">new</span> <span class="token class-name">City</span><span class="token punctuation">(</span><span class="token string">&quot;New York City&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;USA&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">new</span> <span class="token class-name">City</span><span class="token punctuation">(</span><span class="token string">&quot;Shanghai&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;China&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">new</span> <span class="token class-name">City</span><span class="token punctuation">(</span><span class="token string">&quot;Hamburg&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Germany&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">new</span> <span class="token class-name">City</span><span class="token punctuation">(</span><span class="token string">&quot;Paris&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;France&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">new</span> <span class="token class-name">City</span><span class="token punctuation">(</span><span class="token string">&quot;Paris&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Texas, USA&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上代码所示，我们从数组初始化一个List<code>&lt;City&gt;</code>以兼容旧版本的Java。CITY_INPUT列表包含五个城市。让我们关注我们打包到列表中的最后两个城市：</p><ul><li>new City(&quot;Paris&quot;, &quot;France&quot;)</li><li>new City(&quot;Paris&quot;, &quot;Texas, USA&quot;)</li></ul><p>两个城市都有相同的名称，&quot;Paris&quot;。然而，它们不同的locatedIn值告诉我们这两个Paris实例是不同的城市。</p><p>现在，假设我们想使用CITY_INPUT列表中的城市名称作为键来生成一个Map。显然，两个Paris城市将具有相同的键。</p><p>接下来，让我们看看如何在使用Java Stream API生成map时处理重复键。</p><p>为了简单起见，我们将使用单元测试断言来验证每种解决方案是否生成了预期的结果。</p><h2 id="_3-使用groupingby-方法生成map-key-list-value" tabindex="-1"><a class="header-anchor" href="#_3-使用groupingby-方法生成map-key-list-value"><span>3. 使用groupingBy()方法生成Map<code>&lt;Key, List&lt;Value&gt;</code>&gt;</span></a></h2><p>处理map中重复键的一个想法是使键关联一个集合中的多个值，例如Map&lt;String, List<code>&lt;City&gt;</code>&gt;。一些流行的库提供了MultiMap类型，例如Guava的Multimap和Apache Commons MultiValuedMap，以更轻松地处理多值映射。</p><p>在本教程中，我们将坚持使用标准Java API。因此，我们将使用groupingBy()收集器生成Map&lt;String, List<code>&lt;City&gt;</code>&gt;结果，因为groupingBy()方法可以根据某些属性作为键对对象进行分组，并将对象存储在Map实例中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">City</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token operator">&gt;</span> resultMap <span class="token operator">=</span> <span class="token constant">CITY_INPUT</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token function">groupingBy</span><span class="token punctuation">(</span><span class="token class-name">City</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> resultMap<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">City</span><span class="token punctuation">(</span><span class="token string">&quot;Paris&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;France&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">City</span><span class="token punctuation">(</span><span class="token string">&quot;Paris&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Texas, USA&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  resultMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;Paris&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上测试所示，由groupingBy()收集器生成的map结果包含四个条目。此外，两个“Paris”城市实例被分组在键“Paris”下。</p><p>因此，使用多值映射方法可以解决键重复问题。然而，这种方法返回Map&lt;String, List<code>&lt;City&gt;</code>&gt;。如果我们要求Map<code>&lt;String, City&gt;</code>作为返回类型，我们就不能再将具有重复键的对象一起分组到集合中了。</p><p>接下来，让我们看看在这种情况下如何处理重复键。</p><h2 id="_4-使用tomap-方法和处理重复键" tabindex="-1"><a class="header-anchor" href="#_4-使用tomap-方法和处理重复键"><span>4. 使用toMap()方法和处理重复键</span></a></h2><p>Stream API提供了toMap()收集器方法，将流收集到Map中。</p><p>此外，toMap()方法允许我们指定一个合并函数，该函数将用于组合与重复键关联的值。</p><p>例如，我们可以使用一个简单的lambda表达式来忽略如果它们的名称已经被收集的后一个City对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">City</span><span class="token punctuation">&gt;</span></span>\`\`\`\` resultMap1 <span class="token operator">=</span> <span class="token constant">CITY_INPUT</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token class-name">City</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">,</span> <span class="token class-name">Function</span><span class="token punctuation">.</span><span class="token function">identity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>first<span class="token punctuation">,</span> second<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> first<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> resultMap1<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">City</span><span class="token punctuation">(</span><span class="token string">&quot;Paris&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;France&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> resultMap1<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;Paris&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上测试所示，由于法国的Paris在输入列表中先于德克萨斯州的Paris，结果map只包含法国的Paris城市。</p><p>或者，如果我们想要在出现重复键时总是覆盖map中的现有条目，我们可以调整lambda表达式以返回第二个City对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">City</span><span class="token punctuation">&gt;</span></span>\`\`\`\` resultMap2 <span class="token operator">=</span> <span class="token constant">CITY_INPUT</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token class-name">City</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">,</span> <span class="token class-name">Function</span><span class="token punctuation">.</span><span class="token function">identity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>first<span class="token punctuation">,</span> second<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> second<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> resultMap2<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">City</span><span class="token punctuation">(</span><span class="token string">&quot;Paris&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Texas, USA&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> resultMap2<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;Paris&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果运行测试，它将通过。所以这次，键“Paris”关联的是德克萨斯州的Paris。</p><p>当然，在实际项目中，我们可能有比简单地跳过或覆盖更复杂的要求。我们总是可以在合并函数中实现所需的合并逻辑。</p><p>最后，让我们再看一个将两个“Paris”城市的locatedIn属性合并为一个新的City实例，并将这个新合并的Paris实例放入map结果的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">City</span><span class="token punctuation">&gt;</span></span>\`\`\`\` resultMap3 <span class="token operator">=</span> <span class="token constant">CITY_INPUT</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token class-name">City</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">,</span> <span class="token class-name">Function</span><span class="token punctuation">.</span><span class="token function">identity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>first<span class="token punctuation">,</span> second<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
      <span class="token class-name">String</span> locations <span class="token operator">=</span> first<span class="token punctuation">.</span><span class="token function">getLocatedIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; and &quot;</span> <span class="token operator">+</span> second<span class="token punctuation">.</span><span class="token function">getLocatedIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">City</span><span class="token punctuation">(</span>first<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> locations<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> resultMap2<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">City</span><span class="token punctuation">(</span><span class="token string">&quot;Paris&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;France and Texas, USA&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> resultMap3<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;Paris&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了在使用Stream API生成Map结果时处理重复键的两种方法：</p><ul><li>groupingBy() - 创建类型为Map<code>&lt;Key, List&lt;Value&gt;</code>&gt;的Map结果</li><li>mapTo() - 允许我们在合并函数中实现合并逻辑</li></ul><p>像往常一样，这里展示的所有代码片段都可以在GitHub上找到。</p><p>OK</p>`,41),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-08-Handle Duplicate Keys When Producing Map Using Java Stream.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Handle%20Duplicate%20Keys%20When%20Producing%20Map%20Using%20Java%20Stream.html","title":"使用Java Stream生成Map时处理重复键","lang":"zh-CN","frontmatter":{"date":"2024-07-08T00:00:00.000Z","category":["Java","Stream API"],"tag":["Map","Duplicate Keys","Java Stream"],"head":[["meta",{"name":"keywords","content":"Java, Stream API, Map, Duplicate Keys, Handling, Tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Handle%20Duplicate%20Keys%20When%20Producing%20Map%20Using%20Java%20Stream.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Java Stream生成Map时处理重复键"}],["meta",{"property":"og:description","content":"使用Java Stream生成Map时处理重复键 1. 概述 在使用Java Stream生成Map时，可能会遇到重复键的问题。这可能会导致向Map中添加值时出现问题，因为与键关联的先前值可能会被覆盖。 在本教程中，我们将讨论在使用Stream API生成Map时如何处理重复键。 2. 问题介绍 像往常一样，我们通过示例来理解问题。假设我们有一个Cit..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T13:59:39.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Map"}],["meta",{"property":"article:tag","content":"Duplicate Keys"}],["meta",{"property":"article:tag","content":"Java Stream"}],["meta",{"property":"article:published_time","content":"2024-07-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T13:59:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Java Stream生成Map时处理重复键\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-08T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T13:59:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Java Stream生成Map时处理重复键 1. 概述 在使用Java Stream生成Map时，可能会遇到重复键的问题。这可能会导致向Map中添加值时出现问题，因为与键关联的先前值可能会被覆盖。 在本教程中，我们将讨论在使用Stream API生成Map时如何处理重复键。 2. 问题介绍 像往常一样，我们通过示例来理解问题。假设我们有一个Cit..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用groupingBy()方法生成Map<Key, List<Value>>","slug":"_3-使用groupingby-方法生成map-key-list-value","link":"#_3-使用groupingby-方法生成map-key-list-value","children":[]},{"level":2,"title":"4. 使用toMap()方法和处理重复键","slug":"_4-使用tomap-方法和处理重复键","link":"#_4-使用tomap-方法和处理重复键","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720447179000,"updatedTime":1720447179000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.38,"words":1314},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Handle Duplicate Keys When Producing Map Using Java Stream.md","localizedDate":"2024年7月8日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在使用Java Stream生成Map时，可能会遇到重复键的问题。这可能会导致向Map中添加值时出现问题，因为与键关联的先前值可能会被覆盖。</p>\\n<p>在本教程中，我们将讨论在使用Stream API生成Map时如何处理重复键。</p>\\n<h2>2. 问题介绍</h2>\\n<p>像往常一样，我们通过示例来理解问题。假设我们有一个City类：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">City</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> name<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> locatedIn<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">City</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span> name<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">String</span> locatedIn<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>name <span class=\\"token operator\\">=</span> name<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>locatedIn <span class=\\"token operator\\">=</span> locatedIn<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token comment\\">// 省略getter方法</span>\\n    <span class=\\"token comment\\">// 省略equals()和hashCode()方法</span>\\n    <span class=\\"token comment\\">// ...</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
