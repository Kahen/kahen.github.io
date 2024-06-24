import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DTROHq0C.js";const e={},p=t(`<h1 id="java中hashcode-方法的单元测试-baeldung" tabindex="-1"><a class="header-anchor" href="#java中hashcode-方法的单元测试-baeldung"><span>Java中hashCode()方法的单元测试 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在Java中，我们可以使用_hashCode()_方法为对象生成一个哈希码值。这个值通常用于各种目的，比如存储在像_HashMap_或_HashSet_这样的集合中，其中高效的检索和存储至关重要。</p><p>除此之外，为_hashCode()_方法编写单元测试确保它产生一致且正确的哈希码，这对于基于哈希的数据结构的正确功能至关重要。</p><p><strong>在本文中，我们将深入探讨Java中_hashCode()_方法单元测试的重要性。</strong></p><h2 id="_2-理解-hashcode-方法" tabindex="-1"><a class="header-anchor" href="#_2-理解-hashcode-方法"><span>2. 理解_hashCode()_方法</span></a></h2><p>在Java中，每个对象都从_Object_类继承了_hashCode()_方法，该方法基于对象的内部状态为对象生成一个唯一的整型哈希码值。通常，这个哈希码是使用内存地址或某些对象属性计算的，旨在提供一种快速有效的方式来识别对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> value<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token class-name">String</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> value <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> value<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们定义了一个简单的_MyClass_类，它有一个_value_字段。_hashCode()_方法被重写以基于该字段的值计算哈希码。</p><p><strong>这种实现确保了具有相同值的对象产生相同的哈希码，这是基于哈希的数据结构的一个基本要求。</strong></p><h2 id="_3-测试一致性" tabindex="-1"><a class="header-anchor" href="#_3-测试一致性"><span>3. 测试一致性</span></a></h2><p>_hashCode()_方法的一个基本要求是一致性。只要对象的状态保持不变，对象的哈希码在多次调用中应该保持不变。以下是一个测试一致性的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenObject_whenTestingHashCodeConsistency_thenConsistentHashCodeReturned</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">MyClass</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> hashCode1 <span class="token operator">=</span> obj<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> hashCode2 <span class="token operator">=</span> obj<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>hashCode1<span class="token punctuation">,</span> hashCode2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个名为_obj_的_MyClass_对象实例，具有特定的_value_。然后我们两次检索_obj_的哈希码，将结果存储在变量_hashCode1_和_hashCode2_中。</p><p><strong>最后，我们使用_assertEquals()_方法断言两个哈希码相等，确认对于状态不变的对象，哈希码在多次调用中保持一致。</strong></p><h2 id="_4-测试相等性" tabindex="-1"><a class="header-anchor" href="#_4-测试相等性"><span>4. 测试相等性</span></a></h2><p>具有相同状态的对象应该产生相同的哈希码。因此，验证具有相同状态的对象生成相同的哈希码至关重要。以下是我们如何测试相等性的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenTwoEqualObjects_whenTestingHashCodeEquality_thenEqualHashCodesReturned</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">MyClass</span> obj1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">MyClass</span> obj2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>obj1<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> obj2<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个测试验证了_hashCode()_方法为具有相同状态的对象产生一致的哈希码。通过确认相等对象的哈希码的相等性，我们确保基于哈希的集合能够正确识别和管理具有相同状态的对象。</p><h2 id="_5-测试分布" tabindex="-1"><a class="header-anchor" href="#_5-测试分布"><span>5. 测试分布</span></a></h2><p>一个好的哈希函数应该产生在可能值范围内均匀分布的哈希码。为了测试分布，我们可以分析为大量对象生成的哈希码的分布：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenMultipleObjects_whenTestingHashCodeDistribution_thenEvenDistributionOfHashCodes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MyClass</span><span class="token punctuation">&gt;</span></span>\` objects <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        objects<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` hashCodes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">MyClass</span> obj <span class="token operator">:</span> objects<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        hashCodes<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>objects<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> hashCodes<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试中，我们创建了一个名为_objects_的_MyClass_对象列表，包含1000个元素。此外，每个对象都使用从迭代索引派生的唯一的_value_初始化。然后我们遍历列表，并将每个对象的哈希码添加到一个集合中。</p><p>由于集合不能包含重复元素，我们期望集合的大小( <em>hashCodes.size()</em> )等于对象的数量( <em>objects.size()</em> )。容差值10允许哈希码分布的轻微变化。</p><p><strong>通过比较集合的大小与对象的数量，我们验证了为对象生成的哈希码表现出均匀分布。</strong></p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>单元测试_hashCode()_方法是确保其正确性、一致性和分布的关键。通过遵循有效的测试策略，如测试一致性、相等性和分布，我们可以验证_hashCode()_方法的行为，并确保Java应用程序中基于哈希的数据结构的可靠性。</p><p>像往常一样，相关的源代码可以在GitHub上找到。</p><p>评论在文章发布后30天内开放。对于超过此日期的任何问题，请使用网站上的联系表单。</p>`,29),o=[p];function c(l,i){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","Unit Test for hashCode   in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/Unit%20Test%20for%20hashCode%20%20%20in%20Java.html","title":"Java中hashCode()方法的单元测试 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-18T00:00:00.000Z","category":["Java","Unit Testing"],"tag":["hashCode","Java","Unit Test"],"description":"Java中hashCode()方法的单元测试 | Baeldung 1. 引言 在Java中，我们可以使用_hashCode()_方法为对象生成一个哈希码值。这个值通常用于各种目的，比如存储在像_HashMap_或_HashSet_这样的集合中，其中高效的检索和存储至关重要。 除此之外，为_hashCode()_方法编写单元测试确保它产生一致且正确的哈...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Unit%20Test%20for%20hashCode%20%20%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中hashCode()方法的单元测试 | Baeldung"}],["meta",{"property":"og:description","content":"Java中hashCode()方法的单元测试 | Baeldung 1. 引言 在Java中，我们可以使用_hashCode()_方法为对象生成一个哈希码值。这个值通常用于各种目的，比如存储在像_HashMap_或_HashSet_这样的集合中，其中高效的检索和存储至关重要。 除此之外，为_hashCode()_方法编写单元测试确保它产生一致且正确的哈..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"hashCode"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Unit Test"}],["meta",{"property":"article:published_time","content":"2024-06-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中hashCode()方法的单元测试 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 理解_hashCode()_方法","slug":"_2-理解-hashcode-方法","link":"#_2-理解-hashcode-方法","children":[]},{"level":2,"title":"3. 测试一致性","slug":"_3-测试一致性","link":"#_3-测试一致性","children":[]},{"level":2,"title":"4. 测试相等性","slug":"_4-测试相等性","link":"#_4-测试相等性","children":[]},{"level":2,"title":"5. 测试分布","slug":"_5-测试分布","link":"#_5-测试分布","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.65,"words":1094},"filePathRelative":"posts/baeldung/Archive/Unit Test for hashCode   in Java.md","localizedDate":"2024年6月18日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在Java中，我们可以使用_hashCode()_方法为对象生成一个哈希码值。这个值通常用于各种目的，比如存储在像_HashMap_或_HashSet_这样的集合中，其中高效的检索和存储至关重要。</p>\\n<p>除此之外，为_hashCode()_方法编写单元测试确保它产生一致且正确的哈希码，这对于基于哈希的数据结构的正确功能至关重要。</p>\\n<p><strong>在本文中，我们将深入探讨Java中_hashCode()_方法单元测试的重要性。</strong></p>\\n<h2>2. 理解_hashCode()_方法</h2>\\n<p>在Java中，每个对象都从_Object_类继承了_hashCode()_方法，该方法基于对象的内部状态为对象生成一个唯一的整型哈希码值。通常，这个哈希码是使用内存地址或某些对象属性计算的，旨在提供一种快速有效的方式来识别对象：</p>","autoDesc":true}');export{r as comp,k as data};
