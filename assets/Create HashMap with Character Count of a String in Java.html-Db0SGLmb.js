import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-B_4lsu_8.js";const e={},p=t(`<h1 id="在java中创建包含字符串字符计数的hashmap-baeldung" tabindex="-1"><a class="header-anchor" href="#在java中创建包含字符串字符计数的hashmap-baeldung"><span>在Java中创建包含字符串字符计数的HashMap | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在各种编程场景中，处理字符串中的字符计数是常见的。一种高效的方法是使用_HashMap_来存储字符串中每个字符的频率。</p><p><strong>在本教程中，我们将探讨如何在Java中创建一个包含给定字符串字符计数的_HashMap_。</strong></p><h2 id="_2-使用传统循环" tabindex="-1"><a class="header-anchor" href="#_2-使用传统循环"><span>2. 使用传统循环</span></a></h2><p>创建一个包含字符串字符计数的_HashMap_的最简单方法之一是使用传统循环。在这种方法中，我们遍历字符串中的每个字符，并相应地在_HashMap_中更新每个字符的计数。</p><p>让我们看看这如何实现：</p><p><code>String str = &quot;abcaadcbcb&quot;;</code></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenString_whenUsingLooping_thenVerifyCounts</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Map</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\` charCount <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">char</span> c <span class="token operator">:</span> str<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        charCount<span class="token punctuation">.</span><span class="token function">merge</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token operator">::</span><span class="token function">sum</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> charCount<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token char">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">intValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在测试方法中，我们首先实例化一个名为_charCount_的映射对象，它将保存字符计数。之后，我们遍历字符串_str_中的每个字符。对于每个字符，我们使用映射接口的_charCount.merge()_方法来更新_charCount_映射中的出现次数计数。</p><p><strong>如果字符是第一次遇到，我们将其计数初始化为1；否则，我们将现有计数增加1。</strong> 最后，我们验证_charCount_映射是否正确存储了字符‘<em>a</em>’的计数为3。</p><h2 id="_3-使用java-streams" tabindex="-1"><a class="header-anchor" href="#_3-使用java-streams"><span>3. 使用Java <em>Streams</em></span></a></h2><p>另外，我们可以利用Java <em>Streams_以更简洁和功能性的方法达到相同的结果。使用_Streams</em>，我们可以轻松地对字符串中的字符进行分组和计数。以下是我们如何使用Java _Streams_来实现它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenString_whenUsingStreams_thenVerifyCounts</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Map</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\` charCount <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">chars</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">boxed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token function">toMap</span><span class="token punctuation">(</span>
          k <span class="token operator">-&gt;</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> k<span class="token punctuation">.</span><span class="token function">intValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          v <span class="token operator">-&gt;</span> <span class="token number">1</span><span class="token punctuation">,</span>
          <span class="token class-name">Integer</span><span class="token operator">::</span><span class="token function">sum</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> charCount<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token char">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">intValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们首先使用_chars()<em>方法将_str_字符串转换为_IntStream</em>。接下来，使用_boxed()<em>方法将每个表示Unicode代码点的整数封装成_Character_对象，得到_Stream<code>&lt;Character&gt;</code></em>。此外，通过使用_collect()_方法，我们将流元素累积到_Map<code>&lt;Character, Integer&gt;</code>_中。</p><p>_toMap()_收集器在映射每个字符到其计数中至关重要。<strong>在这个收集器中，我们定义了三个参数：一个键映射函数，将每个字符转换为_Character_对象；一个值映射函数，为遇到的每个字符分配1的计数；以及一个合并函数，<em>Integer::sum</em>，它通过求和来聚合具有相同键的字符的计数。</strong></p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们创建了一个包含字符串字符计数的_HashMap_。无论是通过传统循环还是利用Java Streams，关键是有效地遍历字符串的字符并在_HashMap_中更新计数。</p><p>如往常一样，本文的完整代码示例可以在GitHub上找到。</p><p>评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。翻译已经结束。</p><p>OK。</p>`,21),o=[p];function c(i,l){return s(),n("div",null,o)}const d=a(e,[["render",c],["__file","Create HashMap with Character Count of a String in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/Create%20HashMap%20with%20Character%20Count%20of%20a%20String%20in%20Java.html","title":"在Java中创建包含字符串字符计数的HashMap | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-17T00:00:00.000Z","category":["Java","编程"],"tag":["HashMap","字符计数","Java 8"],"description":"在Java中创建包含字符串字符计数的HashMap | Baeldung 1. 引言 在各种编程场景中，处理字符串中的字符计数是常见的。一种高效的方法是使用_HashMap_来存储字符串中每个字符的频率。 在本教程中，我们将探讨如何在Java中创建一个包含给定字符串字符计数的_HashMap_。 2. 使用传统循环 创建一个包含字符串字符计数的_Has...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Create%20HashMap%20with%20Character%20Count%20of%20a%20String%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中创建包含字符串字符计数的HashMap | Baeldung"}],["meta",{"property":"og:description","content":"在Java中创建包含字符串字符计数的HashMap | Baeldung 1. 引言 在各种编程场景中，处理字符串中的字符计数是常见的。一种高效的方法是使用_HashMap_来存储字符串中每个字符的频率。 在本教程中，我们将探讨如何在Java中创建一个包含给定字符串字符计数的_HashMap_。 2. 使用传统循环 创建一个包含字符串字符计数的_Has..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"HashMap"}],["meta",{"property":"article:tag","content":"字符计数"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:published_time","content":"2024-06-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中创建包含字符串字符计数的HashMap | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-17T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用传统循环","slug":"_2-使用传统循环","link":"#_2-使用传统循环","children":[]},{"level":2,"title":"3. 使用Java Streams","slug":"_3-使用java-streams","link":"#_3-使用java-streams","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.57,"words":770},"filePathRelative":"posts/baeldung/Archive/Create HashMap with Character Count of a String in Java.md","localizedDate":"2024年6月17日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在各种编程场景中，处理字符串中的字符计数是常见的。一种高效的方法是使用_HashMap_来存储字符串中每个字符的频率。</p>\\n<p><strong>在本教程中，我们将探讨如何在Java中创建一个包含给定字符串字符计数的_HashMap_。</strong></p>\\n<h2>2. 使用传统循环</h2>\\n<p>创建一个包含字符串字符计数的_HashMap_的最简单方法之一是使用传统循环。在这种方法中，我们遍历字符串中的每个字符，并相应地在_HashMap_中更新每个字符的计数。</p>\\n<p>让我们看看这如何实现：</p>\\n<p><code>String str = \\"abcaadcbcb\\";</code></p>","autoDesc":true}');export{d as comp,k as data};
