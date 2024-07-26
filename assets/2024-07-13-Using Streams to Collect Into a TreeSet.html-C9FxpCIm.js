import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-C4eFoh0f.js";const e={},p=t(`<h1 id="使用stream收集到treeset" tabindex="-1"><a class="header-anchor" href="#使用stream收集到treeset"><span>使用Stream收集到TreeSet</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Java 8中一个重要的新特性是Stream API。Streams允许我们方便地从不同的来源（如数组或集合）处理元素。</p><p>进一步地，使用Stream.collect()方法和相应的Collectors，我们可以将元素重新打包到不同的数据结构中，如Set、Map、List等。</p><p>在本教程中，我们将探讨如何将Stream中的元素收集到TreeSet中。</p><h2 id="_2-使用自然排序收集到treeset" tabindex="-1"><a class="header-anchor" href="#_2-使用自然排序收集到treeset"><span>2. 使用自然排序收集到TreeSet</span></a></h2><p>简单来说，TreeSet是一个排序后的Set。TreeSet中的元素使用它们的自然排序或提供的Comparator进行排序。</p><p>我们首先看看如何使用它们的自然排序收集Stream元素。然后，让我们关注使用自定义Comparator的情况。</p><p>为了简化，我们将使用单元测试断言来验证我们是否得到了预期的TreeSet结果。</p><h3 id="_2-1-将字符串收集到treeset" tabindex="-1"><a class="header-anchor" href="#_2-1-将字符串收集到treeset"><span>2.1. 将字符串收集到TreeSet</span></a></h3><p>由于String实现了Comparable接口，让我们首先以String为例，看看如何将它们收集到TreeSet中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> kotlin <span class="token operator">=</span> <span class="token string">&quot;Kotlin&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> java <span class="token operator">=</span> <span class="token string">&quot;Java&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> python <span class="token operator">=</span> <span class="token string">&quot;Python&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> ruby <span class="token operator">=</span> <span class="token string">&quot;Ruby&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">TreeSet</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` myTreeSet <span class="token operator">=</span> <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>ruby<span class="token punctuation">,</span> java<span class="token punctuation">,</span> kotlin<span class="token punctuation">,</span> python<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toCollection</span><span class="token punctuation">(</span><span class="token class-name">TreeSet</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>myTreeSet<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span>java<span class="token punctuation">,</span> kotlin<span class="token punctuation">,</span> python<span class="token punctuation">,</span> ruby<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的测试所示，要将Stream元素收集到TreeSet，只需将TreeSet的默认构造函数作为方法引用或Lambda表达式传递给Collectors.toCollection()方法即可。</p><p>如果执行此测试，它会通过。</p><p>接下来，让我们看看一个自定义类的类似示例。</p><h3 id="_2-2-按自然排序收集玩家" tabindex="-1"><a class="header-anchor" href="#_2-2-按自然排序收集玩家"><span>2.2. 按自然排序收集玩家</span></a></h3><p>首先，让我们看看我们的Player类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Player</span> <span class="token keyword">implements</span> <span class="token class-name">Comparable</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Player</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> numberOfPlayed<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> numberOfWins<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">,</span> <span class="token keyword">int</span> numberOfPlayed<span class="token punctuation">,</span> <span class="token keyword">int</span> numberOfWins<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>numberOfPlayed <span class="token operator">=</span> numberOfPlayed<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>numberOfWins <span class="token operator">=</span> numberOfWins<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compareTo</span><span class="token punctuation">(</span><span class="token class-name">Player</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>age<span class="token punctuation">,</span> o<span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 省略getters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上类所示，我们的Player类实现了Comparable接口。进一步地，我们在compareTo()方法中定义了它的自然排序：玩家的年龄。</p><p>所以接下来，让我们创建几个Player实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">/*                          name  |  age  | num of played | num of wins
                           --------------------------------------------- */</span>
<span class="token class-name">Player</span> kai <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token string">&quot;Kai&quot;</span><span class="token punctuation">,</span> <span class="token number">26</span><span class="token punctuation">,</span> <span class="token number">28</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Player</span> eric <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> <span class="token number">28</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Player</span> saajan <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token string">&quot;Saajan&quot;</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">66</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Player</span> kevin <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token string">&quot;Kevin&quot;</span><span class="token punctuation">,</span> <span class="token number">24</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">49</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们将在稍后的演示中使用这四个玩家对象，我们将代码以表格格式放置，以便轻松检查每个玩家的属性值。</p><p>现在，让我们将它们收集到TreeSet中，并按自然顺序验证我们是否获得了预期的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">TreeSet</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Player</span><span class="token punctuation">&gt;</span></span>\`\`\`\` myTreeSet <span class="token operator">=</span> <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>saajan<span class="token punctuation">,</span> eric<span class="token punctuation">,</span> kai<span class="token punctuation">,</span> kevin<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toCollection</span><span class="token punctuation">(</span><span class="token class-name">TreeSet</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>myTreeSet<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span>kevin<span class="token punctuation">,</span> kai<span class="token punctuation">,</span> eric<span class="token punctuation">,</span> saajan<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，代码与将字符串收集到TreeSet非常相似。由于Player的compareTo()方法指定了“年龄”属性作为其自然排序，我们验证结果（myTreeSet）以年龄升序排列的玩家。</p><p>值得一提的是，我们使用了AssertJ的containsExactly()方法来验证TreeSet是否精确包含按顺序排列的给定元素，且没有其他元素。</p><p>接下来，我们将看看如何使用自定义Comparator将这些玩家收集到TreeSet中。</p><h2 id="_3-使用自定义comparator收集到treeset" tabindex="-1"><a class="header-anchor" href="#_3-使用自定义comparator收集到treeset"><span>3. 使用自定义Comparator收集到TreeSet</span></a></h2><p>我们已经看到Collectors.toCollection(TreeSet::new)允许我们将Stream中的元素以自然排序收集到TreeSet中。TreeSet还提供了一个接受Comparator对象作为参数的构造函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">TreeSet</span><span class="token punctuation">(</span><span class="token class-name">Comparator</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">E</span><span class="token punctuation">&gt;</span></span>\` comparator<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因此，如果我们希望TreeSet对元素应用不同的排序，我们可以创建一个Comparator对象并将其传递到上面提到的构造函数中。</p><p>接下来，让我们按他们的胜利次数而不是年龄将这些玩家收集到TreeSet中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">TreeSet</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Player</span><span class="token punctuation">&gt;</span></span>\`\`\`\` myTreeSet <span class="token operator">=</span> <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>saajan<span class="token punctuation">,</span> eric<span class="token punctuation">,</span> kai<span class="token punctuation">,</span> kevin<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toCollection</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">TreeSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">comparingInt</span><span class="token punctuation">(</span><span class="token class-name">Player</span><span class="token operator">::</span><span class="token function">getNumberOfWins</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>myTreeSet<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span>kai<span class="token punctuation">,</span> eric<span class="token punctuation">,</span> kevin<span class="token punctuation">,</span> saajan<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这次，我们使用Lambda表达式创建了TreeSet实例。此外，我们使用Comparator.comparingInt()将我们自己的Comparator传递给了TreeSet的构造函数。</p><p>Player::getNumberOfWins引用了我们需要比较玩家的属性值。</p><p>当我们运行测试时，它会通过。</p><p>然而，所需的比较逻辑有时并不像示例所示那样简单，只是比较属性值。例如，我们可能需要比较一些额外计算的结果。</p><p>所以最后，让我们再次将这些玩家收集到TreeSet中。但这次，我们希望他们按胜率（胜利次数/比赛次数）排序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">TreeSet</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Player</span><span class="token punctuation">&gt;</span></span>\`\`\`\` myTreeSet <span class="token operator">=</span> <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>saajan<span class="token punctuation">,</span> eric<span class="token punctuation">,</span> kai<span class="token punctuation">,</span> kevin<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toCollection</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">TreeSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">comparing</span><span class="token punctuation">(</span>player <span class="token operator">-&gt;</span>
    <span class="token class-name">BigDecimal</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>player<span class="token punctuation">.</span><span class="token function">getNumberOfWins</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">divide</span><span class="token punctuation">(</span><span class="token class-name">BigDecimal</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>player<span class="token punctuation">.</span><span class="token function">getNumberOfPlayed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token class-name">RoundingMode</span><span class="token punctuation">.</span><span class="token constant">HALF_UP</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>myTreeSet<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span>kai<span class="token punctuation">,</span> eric<span class="token punctuation">,</span> saajan<span class="token punctuation">,</span> kevin<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的测试所示，我们使用了Comparator.comparing(Function keyExtractor)方法来指定可比较的排序键。在这个例子中，keyExtractor函数是一个Lambda表达式，它计算了玩家的胜率。</p><p>此外，如果我们运行测试，它会通过。所以我们得到了预期的TreeSet。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们通过示例讨论了如何通过自然排序和自定义比较器将Stream中的元素收集到TreeSet中。</p><p>和往常一样，示例的完整源代码可在GitHub上获得。</p>`,44),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-13-Using Streams to Collect Into a TreeSet.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Using%20Streams%20to%20Collect%20Into%20a%20TreeSet.html","title":"使用Stream收集到TreeSet","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Stream API"],"tag":["TreeSet","Java 8"],"head":[["meta",{"name":"keywords","content":"Java Stream API, TreeSet, Java 8, 排序集合"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Using%20Streams%20to%20Collect%20Into%20a%20TreeSet.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Stream收集到TreeSet"}],["meta",{"property":"og:description","content":"使用Stream收集到TreeSet 1. 概述 Java 8中一个重要的新特性是Stream API。Streams允许我们方便地从不同的来源（如数组或集合）处理元素。 进一步地，使用Stream.collect()方法和相应的Collectors，我们可以将元素重新打包到不同的数据结构中，如Set、Map、List等。 在本教程中，我们将探讨如何将..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T21:39:39.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"TreeSet"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T21:39:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Stream收集到TreeSet\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T21:39:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Stream收集到TreeSet 1. 概述 Java 8中一个重要的新特性是Stream API。Streams允许我们方便地从不同的来源（如数组或集合）处理元素。 进一步地，使用Stream.collect()方法和相应的Collectors，我们可以将元素重新打包到不同的数据结构中，如Set、Map、List等。 在本教程中，我们将探讨如何将..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用自然排序收集到TreeSet","slug":"_2-使用自然排序收集到treeset","link":"#_2-使用自然排序收集到treeset","children":[{"level":3,"title":"2.1. 将字符串收集到TreeSet","slug":"_2-1-将字符串收集到treeset","link":"#_2-1-将字符串收集到treeset","children":[]},{"level":3,"title":"2.2. 按自然排序收集玩家","slug":"_2-2-按自然排序收集玩家","link":"#_2-2-按自然排序收集玩家","children":[]}]},{"level":2,"title":"3. 使用自定义Comparator收集到TreeSet","slug":"_3-使用自定义comparator收集到treeset","link":"#_3-使用自定义comparator收集到treeset","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720906779000,"updatedTime":1720906779000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.33,"words":1299},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Using Streams to Collect Into a TreeSet.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>Java 8中一个重要的新特性是Stream API。Streams允许我们方便地从不同的来源（如数组或集合）处理元素。</p>\\n<p>进一步地，使用Stream.collect()方法和相应的Collectors，我们可以将元素重新打包到不同的数据结构中，如Set、Map、List等。</p>\\n<p>在本教程中，我们将探讨如何将Stream中的元素收集到TreeSet中。</p>\\n<h2>2. 使用自然排序收集到TreeSet</h2>\\n<p>简单来说，TreeSet是一个排序后的Set。TreeSet中的元素使用它们的自然排序或提供的Comparator进行排序。</p>","autoDesc":true}');export{k as comp,m as data};
