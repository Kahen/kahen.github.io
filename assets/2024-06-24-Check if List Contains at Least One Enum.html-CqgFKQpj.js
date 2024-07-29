import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BUAgDejY.js";const p={},e=t(`<h1 id="java中检查列表是否至少包含一个枚举值" tabindex="-1"><a class="header-anchor" href="#java中检查列表是否至少包含一个枚举值"><span>Java中检查列表是否至少包含一个枚举值</span></a></h1><p>在Java中，枚举（enums）是一种强大且类型安全的方式来表示一组固定的常量。此外，当我们使用像列表（Lists）这样的集合时，我们可能会遇到需要检查列表是否至少包含一个特定枚举类型元素的场景。</p><p>在本文中，我们将探索在Java中实现这一点的各种方法，并提供代码示例。</p><h2 id="问题陈述" tabindex="-1"><a class="header-anchor" href="#问题陈述"><span>问题陈述</span></a></h2><p>在深入主题之前，让我们简要回顾一下Java中的枚举基础。枚举是一种特殊数据类型，允许我们定义一组命名常量，这些常量代表一组固定、预定义的值。此外，枚举提供了比使用原始常量或整数更好的类型安全性和可读性。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">Position</span> <span class="token punctuation">{</span>
    <span class="token constant">DEVELOPER</span><span class="token punctuation">,</span> <span class="token constant">MANAGER</span><span class="token punctuation">,</span> <span class="token constant">ANALYST</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们声明了一个名为_Position_的枚举，其中包含三个常量：<em>DEVELOPER</em>、<em>MANAGER_和_ANALYST</em>。</p><p>现在，让我们在这个上下文中探索代码片段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CheckIfListContainsEnumUnitTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">List</span>\`<span class="token operator">&lt;</span><span class="token class-name">Map</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\`\`<span class="token operator">&gt;</span> data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">CheckIfListContainsEnumUnitTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Map</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\` map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;John&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Age&quot;</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Position&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Position</span><span class="token punctuation">.</span><span class="token constant">DEVELOPER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        data<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>map<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个代码片段中，我们定义了一个名为_data_的列表，用于存储包含键值对的映射。此外，<em>CheckIfListContainsEnumUnitTest_类还包括一个包含个人详细信息的_map_的实例化，例如_Name</em>、<em>Age_和_Position</em>。</p><p><strong>请记住，这为探索有效检查列表是否至少包含一个枚举值的方法奠定了基础。</strong></p><h2 id="传统方法" tabindex="-1"><a class="header-anchor" href="#传统方法"><span>传统方法</span></a></h2><p>传统方法涉及遍历列表并检查每个元素是否符合枚举常量。让我们来看一个基本示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenDataList_whenUsingLoop_thenCheckIfListContainsEnum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">boolean</span> containsEnumValue <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Map</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\` entry <span class="token operator">:</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Object</span> positionValue <span class="token operator">=</span> entry<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;Position&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token class-name">Position</span><span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>positionValue<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            containsEnumValue <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>containsEnumValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试方法中，给定一个_data_列表，该方法通过循环遍历每个条目，检索_PositionValue_，并检查它是否在枚举类型_Position_中。此外，由_containsEnumValue_布尔变量捕获的结果表示数据列表中至少有一个匹配项。最后，断言验证列表中至少有一个条目包含匹配的枚举值。</p><h2 id="使用-anymatch-方法" tabindex="-1"><a class="header-anchor" href="#使用-anymatch-方法"><span>使用_anyMatch()_方法</span></a></h2><p>我们可以利用_anyMatch()_方法来检查流中至少有一个元素是否符合指定条件。以下是一个示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenDataList_whenUsingStream_thenCheckIfListContainsEnum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">boolean</span> containsEnumValue <span class="token operator">=</span> data<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>entry <span class="token operator">-&gt;</span> entry<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;Position&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">anyMatch</span><span class="token punctuation">(</span>position <span class="token operator">-&gt;</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token class-name">Position</span><span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>position<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>containsEnumValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述测试方法通过从每个条目中提取_Position_值来转换_data_列表，并随后使用_anyMatch()_方法来确定这些值中是否有任何一个存在于枚举类型_Position_中。<strong>这种简化的方法用简洁且富有表现力的流操作取代了传统的迭代循环。</strong></p><h2 id="使用-collections-disjoint-方法" tabindex="-1"><a class="header-anchor" href="#使用-collections-disjoint-方法"><span>使用_Collections.disjoint()_方法</span></a></h2><p>另一种方法使用_Collections.disjoint()_方法来确定两个列表之间是否存在任何共同性。让我们尝试以下代码示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenDataList_whenUsingDisjointMethod_thenCheckIfListContainsEnum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Position</span><span class="token punctuation">&gt;</span></span>\` positionValues <span class="token operator">=</span> data<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>entry <span class="token operator">-&gt;</span> <span class="token punctuation">(</span><span class="token class-name">Position</span><span class="token punctuation">)</span> entry<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;Position&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">boolean</span> containsEnumValue <span class="token operator">=</span> <span class="token operator">!</span><span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">disjoint</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token class-name">Position</span><span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> positionValues<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>containsEnumValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种方法中，我们利用_Collections.disjoint()<em>方法来确定原始列表（假定名为_list</em>）和新创建的_Position_值列表（假定名为_positionValues_）之间是否存在任何共同性。</p><p><strong>然后，_containsEnumValue_布尔变量被分配为否定_Collections.disjoint()_结果，并表示两个列表之间不存在不相交的情况。</strong></p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们探索了在Java中检查列表是否至少包含一个枚举的不同方法。此外，方法的选择取决于我们的特定需求和编码风格偏好。</p><p>如常，随附的源代码可以在GitHub上找到。</p>`,27),o=[e];function c(i,l){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-06-24-Check if List Contains at Least One Enum.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Check%20if%20List%20Contains%20at%20Least%20One%20Enum.html","title":"Java中检查列表是否至少包含一个枚举值","lang":"zh-CN","frontmatter":{"date":"2024-06-25T00:00:00.000Z","category":["Java","编程"],"tag":["Java","枚举","集合"],"head":[["meta",{"name":"keywords","content":"Java, 枚举, 集合, 检查"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Check%20if%20List%20Contains%20at%20Least%20One%20Enum.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中检查列表是否至少包含一个枚举值"}],["meta",{"property":"og:description","content":"Java中检查列表是否至少包含一个枚举值 在Java中，枚举（enums）是一种强大且类型安全的方式来表示一组固定的常量。此外，当我们使用像列表（Lists）这样的集合时，我们可能会遇到需要检查列表是否至少包含一个特定枚举类型元素的场景。 在本文中，我们将探索在Java中实现这一点的各种方法，并提供代码示例。 问题陈述 在深入主题之前，让我们简要回顾一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T20:50:45.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"枚举"}],["meta",{"property":"article:tag","content":"集合"}],["meta",{"property":"article:published_time","content":"2024-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T20:50:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中检查列表是否至少包含一个枚举值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T20:50:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中检查列表是否至少包含一个枚举值 在Java中，枚举（enums）是一种强大且类型安全的方式来表示一组固定的常量。此外，当我们使用像列表（Lists）这样的集合时，我们可能会遇到需要检查列表是否至少包含一个特定枚举类型元素的场景。 在本文中，我们将探索在Java中实现这一点的各种方法，并提供代码示例。 问题陈述 在深入主题之前，让我们简要回顾一..."},"headers":[{"level":2,"title":"问题陈述","slug":"问题陈述","link":"#问题陈述","children":[]},{"level":2,"title":"传统方法","slug":"传统方法","link":"#传统方法","children":[]},{"level":2,"title":"使用_anyMatch()_方法","slug":"使用-anymatch-方法","link":"#使用-anymatch-方法","children":[]},{"level":2,"title":"使用_Collections.disjoint()_方法","slug":"使用-collections-disjoint-方法","link":"#使用-collections-disjoint-方法","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1719262245000,"updatedTime":1719262245000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.21,"words":962},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Check if List Contains at Least One Enum.md","localizedDate":"2024年6月25日","excerpt":"\\n<p>在Java中，枚举（enums）是一种强大且类型安全的方式来表示一组固定的常量。此外，当我们使用像列表（Lists）这样的集合时，我们可能会遇到需要检查列表是否至少包含一个特定枚举类型元素的场景。</p>\\n<p>在本文中，我们将探索在Java中实现这一点的各种方法，并提供代码示例。</p>\\n<h2>问题陈述</h2>\\n<p>在深入主题之前，让我们简要回顾一下Java中的枚举基础。枚举是一种特殊数据类型，允许我们定义一组命名常量，这些常量代表一组固定、预定义的值。此外，枚举提供了比使用原始常量或整数更好的类型安全性和可读性。</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">enum</span> <span class=\\"token class-name\\">Position</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token constant\\">DEVELOPER</span><span class=\\"token punctuation\\">,</span> <span class=\\"token constant\\">MANAGER</span><span class=\\"token punctuation\\">,</span> <span class=\\"token constant\\">ANALYST</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
