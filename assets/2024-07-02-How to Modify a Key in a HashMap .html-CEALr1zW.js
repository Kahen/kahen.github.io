import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CJGTm_7y.js";const p={},e=t(`<h1 id="如何在java的hashmap中修改键" tabindex="-1"><a class="header-anchor" href="#如何在java的hashmap中修改键"><span>如何在Java的HashMap中修改键？</span></a></h1><p>在Java中，HashMap是一种广泛使用的数据结构，它以键值对的形式存储元素，提供了快速的数据访问和检索。有时在使用HashMap时，我们可能想要修改现有条目的键。</p><p>在本教程中，我们将探讨如何在Java中的HashMap修改键。</p><h2 id="_2-使用remove-然后put" tabindex="-1"><a class="header-anchor" href="#_2-使用remove-然后put"><span>2. 使用remove()然后put()</span></a></h2><p>首先，让我们看看HashMap是如何存储键值对的。HashMap内部使用Node类型来维护键值对：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Node</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token keyword">implements</span> <span class="token class-name">Map<span class="token punctuation">.</span>Entry</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token punctuation">{</span>
    <span class="token keyword">final</span> <span class="token keyword">int</span> hash<span class="token punctuation">;</span>
    <span class="token keyword">final</span> <span class="token class-name">K</span> key<span class="token punctuation">;</span>
    <span class="token class-name">V</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，键声明有final关键字。因此，我们不能在将键对象放入HashMap后重新分配它。</p><p>虽然我们不能简单地替换一个键，但我们仍然可以通过其他方式实现我们期望的结果。接下来，让我们从不同的角度来看我们的问题。</p><p>假设我们在HashMap中有一个条目K1 -&gt; V，现在我们想将K1更改为K2，以得到K2 -&gt; V。实际上，实现这一点的最直接想法是找到K1的条目，并将键K1替换为K2。然而，我们也可以通过移除K1 -&gt; V的关联，并添加一个新的K2 -&gt; V条目来实现。</p><p>Map接口提供了remove(key)方法，通过其键从映射中移除一个条目。此外，remove()方法返回从映射中移除的值。</p><p>接下来，让我们通过一个例子来看看这种方法是如何工作的。为了简单起见，我们将使用单元测试断言来验证结果是否符合我们的预期：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` playerMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
playerMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Kai&quot;</span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
playerMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Amanda&quot;</span><span class="token punctuation">,</span> <span class="token number">88</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
playerMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Tom&quot;</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的简单代码显示了一个HashMap，它保存了一些球员名字（String）及其得分（Integer）的关联。接下来，让我们将条目&quot;Kai&quot; -&gt; 42中的&quot;Kai&quot;替换为&quot;Eric&quot;：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 用Eric替换Kai</span>
playerMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> playerMap<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token string">&quot;Kai&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertFalse</span><span class="token punctuation">(</span>playerMap<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span><span class="token string">&quot;Kai&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>playerMap<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span><span class="token string">&quot;Eric&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">,</span> playerMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;Eric&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，单行语句playerMap.put(&quot;Eric&quot;, playerMap.remove(&quot;Kai&quot;));做了两件事。它移除了键为&quot;Kai&quot;的条目，取出其值（42），并添加了一个新的&quot;Eric&quot; -&gt; 42条目。</p><p>当我们运行测试时，它通过了。所以这种方法按预期工作。</p><p>虽然我们的问题解决了，但有一个潜在的问题。我们知道HashMap的键是一个final变量。所以我们不能重新分配变量。但我们可以通过修改final对象的值来解决问题吗？嗯，在我们的playerMap例子中，键是String。我们不能改变它的值，因为String是不可变的。但如果键是一个可变对象，我们能通过修改键来解决问题吗？</p><p>接下来，让我们找出答案。</p><h2 id="_3-永远不要在hashmap中修改键" tabindex="-1"><a class="header-anchor" href="#_3-永远不要在hashmap中修改键"><span>3. 永远不要在HashMap中修改键</span></a></h2><p>首先，我们不应该在Java的HashMap中使用可变对象作为键，这可能导致潜在的问题和意外的行为。</p><p>这是因为HashMap中的键对象用于计算一个哈希码，该哈希码决定了相应值将被存储的桶。如果键是可变的并且在用作HashMap中的键后被更改，哈希码也可能改变。结果，我们将无法正确地检索与键关联的值，因为它将位于错误的桶中。</p><p>接下来，让我们通过一个例子来理解它。</p><p>首先，我们创建一个只有一个属性name的Player类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Player</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// getter和setter方法省略</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">==</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>o <span class="token keyword">instanceof</span> <span class="token class-name">Player</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Player</span> player <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Player</span><span class="token punctuation">)</span> o<span class="token punctuation">;</span>
        <span class="token keyword">return</span> name<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>player<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，Player类有一个name属性的setter。所以它是可变的。此外，hashCode()方法使用name属性来计算哈希码。这意味着改变Player对象的name可以使它具有不同的哈希码。</p><p>接下来，我们创建一个映射并使用Player对象作为键添加一些条目：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Player</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` myMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Player</span> kai <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token string">&quot;Kai&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Player</span> tom <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token string">&quot;Tom&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Player</span> amanda <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token string">&quot;Amanda&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
myMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>kai<span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
myMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>amanda<span class="token punctuation">,</span> <span class="token number">88</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
myMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>tom<span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>myMap<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>kai<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们将球员kai的名字从&quot;Kai&quot;更改为&quot;Eric&quot;，然后验证我们是否能得到预期的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 将Kai的名字更改为Eric</span>
kai<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;Eric&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> kai<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Player</span> eric <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token string">&quot;Eric&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>eric<span class="token punctuation">,</span> kai<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 现在，映射中既不包含Kai也不包含Eric：</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span>myMap<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>kai<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span>myMap<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>eric<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上述测试所示，将kai的名字更改为&quot;Eric&quot;后，我们无法再使用kai或eric检索条目&quot;Eric&quot; -&gt; 42。然而，对象Player(&quot;Eric&quot;)作为键存在于映射中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 尽管Player(&quot;Eric&quot;)存在：</span>
<span class="token keyword">long</span> ericCount <span class="token operator">=</span> myMap<span class="token punctuation">.</span><span class="token function">keySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>player <span class="token operator">-&gt;</span> player<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;Eric&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> ericCount<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要理解为什么会这样，我们首先需要了解HashMap的工作原理。</p><p>HashMap维护一个内部哈希表来存储键的哈希码，当它们被添加到映射中时。一个哈希码引用一个映射条目。当我们检索一个条目，例如，使用get(key)方法，HashMap计算给定键对象的哈希码，并在哈希表中查找该哈希码。</p><p>在上面的例子中，我们将kai(&quot;Kai&quot;)放入映射中。因此，哈希码是基于字符串&quot;Kai&quot;计算的。HashMap存储了结果，比如说&quot;hash-kai&quot;，在哈希表中。后来，我们将kai(&quot;Kai&quot;)更改为kai(&quot;Eric&quot;)。当我们尝试使用kai(&quot;Eric&quot;)检索条目时，HashMap计算&quot;hash-eric&quot;作为哈希码。然后，它在哈希表中查找它。当然，它找不到。</p><p>不难想象，如果我们在真实应用中这样做，这种意外行为的根本原因可能很难找到。</p><p>因此，我们不应该在HashMap中使用可变对象作为键。此外，我们永远不应该修改键。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们学习了使用&quot;remove()然后put()&quot;方法来替换HashMap中的键。此外，我们通过一个例子讨论了为什么我们应该避免在HashMap中使用可变对象作为键，以及为什么我们永远不应该在HashMap中修改键。</p><p>如往常一样，示例的完整源代码可在GitHub上找到。</p>`,39),o=[e];function c(l,u){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-02-How to Modify a Key in a HashMap .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-How%20to%20Modify%20a%20Key%20in%20a%20HashMap%20.html","title":"如何在Java的HashMap中修改键？","lang":"zh-CN","frontmatter":{"date":"2024-07-02T00:00:00.000Z","category":["Java","HashMap"],"tag":["HashMap","Java"],"head":[["meta",{"name":"keywords","content":"Java, HashMap, 键值对, 修改键"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-How%20to%20Modify%20a%20Key%20in%20a%20HashMap%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Java的HashMap中修改键？"}],["meta",{"property":"og:description","content":"如何在Java的HashMap中修改键？ 在Java中，HashMap是一种广泛使用的数据结构，它以键值对的形式存储元素，提供了快速的数据访问和检索。有时在使用HashMap时，我们可能想要修改现有条目的键。 在本教程中，我们将探讨如何在Java中的HashMap修改键。 2. 使用remove()然后put() 首先，让我们看看HashMap是如何存..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T12:49:37.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"HashMap"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2024-07-02T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T12:49:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Java的HashMap中修改键？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-02T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T12:49:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Java的HashMap中修改键？ 在Java中，HashMap是一种广泛使用的数据结构，它以键值对的形式存储元素，提供了快速的数据访问和检索。有时在使用HashMap时，我们可能想要修改现有条目的键。 在本教程中，我们将探讨如何在Java中的HashMap修改键。 2. 使用remove()然后put() 首先，让我们看看HashMap是如何存..."},"headers":[{"level":2,"title":"2. 使用remove()然后put()","slug":"_2-使用remove-然后put","link":"#_2-使用remove-然后put","children":[]},{"level":2,"title":"3. 永远不要在HashMap中修改键","slug":"_3-永远不要在hashmap中修改键","link":"#_3-永远不要在hashmap中修改键","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719924577000,"updatedTime":1719924577000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.31,"words":1592},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-How to Modify a Key in a HashMap .md","localizedDate":"2024年7月2日","excerpt":"\\n<p>在Java中，HashMap是一种广泛使用的数据结构，它以键值对的形式存储元素，提供了快速的数据访问和检索。有时在使用HashMap时，我们可能想要修改现有条目的键。</p>\\n<p>在本教程中，我们将探讨如何在Java中的HashMap修改键。</p>\\n<h2>2. 使用remove()然后put()</h2>\\n<p>首先，让我们看看HashMap是如何存储键值对的。HashMap内部使用Node类型来维护键值对：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Node</span>``<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">K</span><span class=\\"token punctuation\\">,</span><span class=\\"token class-name\\">V</span><span class=\\"token punctuation\\">&gt;</span></span>`` <span class=\\"token keyword\\">implements</span> <span class=\\"token class-name\\">Map<span class=\\"token punctuation\\">.</span>Entry</span>``<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">K</span><span class=\\"token punctuation\\">,</span><span class=\\"token class-name\\">V</span><span class=\\"token punctuation\\">&gt;</span></span>`` <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">final</span> <span class=\\"token keyword\\">int</span> hash<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">K</span> key<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">V</span> value<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">.</span><span class=\\"token punctuation\\">.</span><span class=\\"token punctuation\\">.</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
