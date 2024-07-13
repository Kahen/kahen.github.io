import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-BDZ-trJf.js";const t={},p=e(`<h1 id="jackson中-jsonmerge注解的使用" tabindex="-1"><a class="header-anchor" href="#jackson中-jsonmerge注解的使用"><span>Jackson中@JsonMerge注解的使用</span></a></h1><p>在本教程中，我们将探讨Jackson Java库中的@JsonMerge注解。Jackson以其在Java应用程序中处理JSON的能力而闻名。这个注解允许我们将新数据合并到嵌套的POJO（普通旧Java对象）或Map中的对象。我们将先看看没有使用注解时的现有功能，然后看看使用它在我们的代码中会产生什么不同。</p><h2 id="jsonmerge的作用" tabindex="-1"><a class="header-anchor" href="#jsonmerge的作用"><span>@JsonMerge的作用</span></a></h2><p>ObjectMapper是Jackson最常用的特性之一，它允许我们将JSON映射到我们的Java对象，并进行反向操作。ObjectMapper的一个能力是读取一个对象，并用JSON字符串中的新数据更新它，假设JSON结构正确。在引入@JsonMerge之前，更新能力的局限性在于它会覆盖POJO和Map。有了这个注解，嵌套POJO和Map中的属性在更新时会被合并。</p><p>让我们看看如何在实践中使用@JsonMerge。我们将创建两个对象，首先是键盘：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Keyboard</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> style<span class="token punctuation">;</span>
    <span class="token class-name">String</span> layout<span class="token punctuation">;</span>
    <span class="token comment">// 标准getter、setter和构造函数</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其次是将使用键盘的程序员：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">ProgrammerNotAnnotated</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token class-name">String</span> favouriteLanguage<span class="token punctuation">;</span>
    <span class="token class-name">Keyboard</span> keyboard<span class="token punctuation">;</span>
    <span class="token comment">// 标准getter、setter和构造函数</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>稍后我们将添加@JsonMerge注解，但现在我们已经准备好了。</p><h2 id="不使用-jsonmerge的合并" tabindex="-1"><a class="header-anchor" href="#不使用-jsonmerge的合并"><span>不使用@JsonMerge的合并</span></a></h2><p>要更新一个对象，我们首先需要一个表示我们想要合并的新数据的JSON字符串：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code>String newData = <span class="token string">&quot;{\\&quot;favouriteLanguage\\&quot;:\\&quot;Java\\&quot;,\\&quot;keyboard\\&quot;:{\\&quot;style\\&quot;:\\&quot;Mechanical\\&quot;}}&quot;</span>;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后我们需要创建我们想要用新数据更新的对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ProgrammerNotAnnotated</span> programmerToUpdate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProgrammerNotAnnotated</span><span class="token punctuation">(</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C++&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Keyboard</span><span class="token punctuation">(</span><span class="token string">&quot;Membrane&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;US&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们使用我们刚刚定义的字符串和对象，看看没有注解会发生什么。我们首先创建一个ObjectMapper实例，然后使用它创建一个ObjectReader。ObjectReader是一个轻量级、线程安全的我们可以用于许多与ObjectMapper相同功能的实例，但开销更少。我们可以在每次序列化/反序列化的基础上使用ObjectReader实例，因为它们制作和配置都非常便宜。</p><p>我们将使用ObjectMapper.readerForUpdating()创建ObjectReader，传入我们想要更新的对象作为唯一参数。这是一个专门为返回将用JSON字符串中的新数据更新给定对象的ObjectReader实例的工厂方法。一旦我们有了ObjectReader，我们只需调用readValue()并传入我们的新数据：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAnObjectAndJson_whenNotUsingJsonMerge_thenExpectNoUpdateInPOJO</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
    <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ObjectReader</span> objectReader <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readerForUpdating</span><span class="token punctuation">(</span>programmerToUpdate<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ProgrammerNotAnnotated</span> update <span class="token operator">=</span> objectReader<span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>newData<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">assert</span><span class="token punctuation">(</span>update<span class="token punctuation">.</span><span class="token function">getFavouriteLanguage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;Java&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNull</span><span class="token punctuation">(</span>update<span class="token punctuation">.</span><span class="token function">getKeyboard</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">getLayout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，我们可以打印出update，清楚地看到我们最终得到了什么：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>name=&#39;John&#39;<span class="token punctuation">,</span> favouriteLanguage=&#39;Java&#39;<span class="token punctuation">,</span> keyboard=Keyboard<span class="token punctuation">{</span>style=&#39;Mechanical&#39;<span class="token punctuation">,</span> layout=&#39;<span class="token null keyword">null</span>&#39;<span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们从测试断言和JSON中可以看出，我们的programmerToUpdate接收到了顶层更新，他最喜欢的语言现在是Java。然而，我们完全覆盖了嵌套的Keyboard对象，即使新数据只包含了一个样式，我们还是丢失了布局属性。像Keyboard这样的POJO合并能力是@JsonMerge注解的主要好处之一，正如我们将在下一节中看到的。</p><h2 id="使用-jsonmerge的合并" tabindex="-1"><a class="header-anchor" href="#使用-jsonmerge的合并"><span>使用@JsonMerge的合并</span></a></h2><p>现在让我们创建一个新的带有@JsonMerge注解的程序员对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">ProgrammerAnnotated</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token class-name">String</span> favouriteLanguage<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@JsonMerge</span>
    <span class="token class-name">Keyboard</span> keyboard<span class="token punctuation">;</span>
    <span class="token comment">// 标准getter、setter和构造函数</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们像上面一样使用这个对象，我们会得到一个不同的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAnObjectAndJson_whenUsingJsonMerge_thenExpectUpdateInPOJO</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> newData <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;favouriteLanguage\\&quot;:\\&quot;Java\\&quot;,\\&quot;keyboard\\&quot;:{\\&quot;style\\&quot;:\\&quot;Mechanical\\&quot;}}&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">ProgrammerAnnotated</span> programmerToUpdate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProgrammerAnnotated</span><span class="token punctuation">(</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C++&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Keyboard</span><span class="token punctuation">(</span><span class="token string">&quot;Membrane&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;US&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ProgrammerAnnotated</span> update <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readerForUpdating</span><span class="token punctuation">(</span>programmerToUpdate<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>newData<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">assert</span><span class="token punctuation">(</span>update<span class="token punctuation">.</span><span class="token function">getFavouriteLanguage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;Java&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 只有在注解下才有效</span>
    <span class="token keyword">assert</span><span class="token punctuation">(</span>update<span class="token punctuation">.</span><span class="token function">getKeyboard</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getLayout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;US&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们可以再次打印出update，看看这次我们更新了嵌套的Keyboard POJO：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>name=&#39;John&#39;<span class="token punctuation">,</span> favouriteLanguage=&#39;Java&#39;<span class="token punctuation">,</span> keyboard=Keyboard<span class="token punctuation">{</span>style=&#39;Mechanical&#39;<span class="token punctuation">,</span> layout=&#39;US&#39;<span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里清楚地看到了注解的行为。嵌套对象中的传入字段覆盖了现有的字段。新数据中没有匹配的字段则保持不变。</p><h2 id="使用-jsonmerge合并map" tabindex="-1"><a class="header-anchor" href="#使用-jsonmerge合并map"><span>使用@JsonMerge合并Map</span></a></h2><p>合并Map的过程与我们已经看到的非常相似。让我们创建一个带有Map的对象，我们可以用它来演示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">ObjectWithMap</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@JsonMerge</span>
    <span class="token class-name">Map</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` stringPairs<span class="token punctuation">;</span>
    <span class="token comment">// 标准getter、setter和构造函数</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，让我们创建一个包含我们将更新对象的Map的起始JSON字符串：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code>String newData = <span class="token string">&quot;{\\&quot;stringPairs\\&quot;:{\\&quot;field1\\&quot;:\\&quot;value1\\&quot;,\\&quot;field2\\&quot;:\\&quot;value2\\&quot;}}&quot;</span>;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，我们需要实例化ObjectWithMap，我们想要更新：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;field3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ObjectWithMap</span> objectToUpdateWith <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectWithMap</span><span class="token punctuation">(</span><span class="token string">&quot;James&quot;</span><span class="token punctuation">,</span> map<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以使用我们之前使用过的相同过程来更新我们的对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAnObjectWithAMap_whenUsingJsonMerge_thenExpectAllFieldsInMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
    <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ObjectWithMap</span> update <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readerForUpdating</span><span class="token punctuation">(</span>objectToUpdateWith<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>newData<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertTrue</span><span class="token punctuation">(</span>update<span class="token punctuation">.</span><span class="token function">getStringPairs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span><span class="token string">&quot;field1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>update<span class="token punctuation">.</span><span class="token function">getStringPairs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span><span class="token string">&quot;field2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>update<span class="token punctuation">.</span><span class="token function">getStringPairs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span><span class="token string">&quot;field3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们再次打印出update以查看最终结果，它看起来像这样：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>name=&#39;James&#39;<span class="token punctuation">,</span> something=<span class="token punctuation">{</span>field1=value1<span class="token punctuation">,</span> field3=value3<span class="token punctuation">,</span> field2=value2<span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们从测试和打印输出中看到，使用注解已经导致Map中的所有三对键值存在。如果没有注解，我们只会有新数据中的键值对。</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们看到了我们可以使用Jackson用新的传入JSON数据更新现有对象。此外，通过在我们的Java对象中使用@JsonMerge注解，我们可以让Jackson合并嵌套的POJO和Map。如果没有注解，Jackson将覆盖它们，所以它的有用性取决于我们的用例。</p><p>如常，示例的完整代码可在GitHub上找到。</p>`,43),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(t,[["render",c],["__file","2024-07-04- JsonMerge Annotation in Jackson.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-%20JsonMerge%20Annotation%20in%20Jackson.html","title":"Jackson中@JsonMerge注解的使用","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Jackson","Java"],"tag":["Jackson","JSON","Java"],"head":[["meta",{"name":"keywords","content":"Jackson, JSON, Java, @JsonMerge, 合并"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-%20JsonMerge%20Annotation%20in%20Jackson.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Jackson中@JsonMerge注解的使用"}],["meta",{"property":"og:description","content":"Jackson中@JsonMerge注解的使用 在本教程中，我们将探讨Jackson Java库中的@JsonMerge注解。Jackson以其在Java应用程序中处理JSON的能力而闻名。这个注解允许我们将新数据合并到嵌套的POJO（普通旧Java对象）或Map中的对象。我们将先看看没有使用注解时的现有功能，然后看看使用它在我们的代码中会产生什么不同..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T11:33:31.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Jackson"}],["meta",{"property":"article:tag","content":"JSON"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T11:33:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Jackson中@JsonMerge注解的使用\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T11:33:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Jackson中@JsonMerge注解的使用 在本教程中，我们将探讨Jackson Java库中的@JsonMerge注解。Jackson以其在Java应用程序中处理JSON的能力而闻名。这个注解允许我们将新数据合并到嵌套的POJO（普通旧Java对象）或Map中的对象。我们将先看看没有使用注解时的现有功能，然后看看使用它在我们的代码中会产生什么不同..."},"headers":[{"level":2,"title":"@JsonMerge的作用","slug":"jsonmerge的作用","link":"#jsonmerge的作用","children":[]},{"level":2,"title":"不使用@JsonMerge的合并","slug":"不使用-jsonmerge的合并","link":"#不使用-jsonmerge的合并","children":[]},{"level":2,"title":"使用@JsonMerge的合并","slug":"使用-jsonmerge的合并","link":"#使用-jsonmerge的合并","children":[]},{"level":2,"title":"使用@JsonMerge合并Map","slug":"使用-jsonmerge合并map","link":"#使用-jsonmerge合并map","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720092811000,"updatedTime":1720092811000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.66,"words":1397},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04- JsonMerge Annotation in Jackson.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将探讨Jackson Java库中的@JsonMerge注解。Jackson以其在Java应用程序中处理JSON的能力而闻名。这个注解允许我们将新数据合并到嵌套的POJO（普通旧Java对象）或Map中的对象。我们将先看看没有使用注解时的现有功能，然后看看使用它在我们的代码中会产生什么不同。</p>\\n<h2>@JsonMerge的作用</h2>\\n<p>ObjectMapper是Jackson最常用的特性之一，它允许我们将JSON映射到我们的Java对象，并进行反向操作。ObjectMapper的一个能力是读取一个对象，并用JSON字符串中的新数据更新它，假设JSON结构正确。在引入@JsonMerge之前，更新能力的局限性在于它会覆盖POJO和Map。有了这个注解，嵌套POJO和Map中的属性在更新时会被合并。</p>","autoDesc":true}');export{d as comp,k as data};
