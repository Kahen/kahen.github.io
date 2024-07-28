import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-D4B8YWfq.js";const p={},e=t(`<h1 id="java中找出字符串中第一个不重复的字符" tabindex="-1"><a class="header-anchor" href="#java中找出字符串中第一个不重复的字符"><span>Java中找出字符串中第一个不重复的字符</span></a></h1><p>在本教程中，我们将探讨在Java中找出字符串中第一个不重复字符的不同方法。我们还将尝试分析这些解决方案的运行时间复杂度。</p><h2 id="问题陈述" tabindex="-1"><a class="header-anchor" href="#问题陈述"><span>问题陈述</span></a></h2><p><strong>给定一个字符字符串作为输入，找出字符串中的第一个不重复的字符</strong>。以下是一些示例：</p><p>示例 1: <em>Lullaby</em> 在这个例子中，L重复了三次。当我们遇到字符_u_时，遇到了第一个不重复的字符。</p><p>示例 2: <em>Baeldung</em> 在这个例子中，所有字符都是不重复的。根据问题陈述，我们取第一个，B。</p><p>示例 3: <em>mahimahi</em> 在这个例子中，没有不重复的字符 - 所有字符都只重复一次。因此，这里的输出是_null_。</p><p>最后，这里有一些关于问题的额外要点需要注意：</p><ul><li>输入字符串可以是任何长度，并且<strong>可以包含大写和小写字符的混合</strong></li><li>我们的解决方案应该处理空或null输入</li><li><strong>输入字符串可能没有不重复的字符</strong>，或者换句话说，可能有输入所有字符至少重复一次的情况，在这种情况下输出是_null_</li></ul><p>有了这个理解，让我们尝试解决问题。</p><h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案"><span>解决方案</span></a></h2><h3 id="_3-1-暴力解决方案" tabindex="-1"><a class="header-anchor" href="#_3-1-暴力解决方案"><span>3.1. 暴力解决方案</span></a></h3><p>首先，我们尝试找出一个暴力解决方案来找出字符串的第一个不重复字符。我们从字符串的开头开始，每次取一个字符，并将其与字符串中的每个其他字符进行比较。如果我们找到一个匹配项，那意味着这个字符在字符串中的其他地方重复了，所以我们继续下一个字符。如果没有字符的匹配项，我们已经找到了我们的解决方案，并以该字符退出程序。</p><p>代码如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Character</span> <span class="token function">firstNonRepeatingCharBruteForceNaive</span><span class="token punctuation">(</span><span class="token class-name">String</span> inputString<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">==</span> inputString <span class="token operator">||</span> inputString<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> outer <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> outer \`<span class="token operator">&lt;</span> inputString<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> outer<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">boolean</span> repeat <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> inner <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> inner <span class="token operator">&lt;</span> inputString<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> inner<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>inner <span class="token operator">!=</span> outer <span class="token operator">&amp;&amp;</span> inputString<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>outer<span class="token punctuation">)</span> <span class="token operator">==</span> inputString<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>inner<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                repeat <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>repeat<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> inputString<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>outer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>上述解决方案的时间复杂度是O(n²)</strong>，因为我们有两个嵌套循环。对于我们访问的每个字符，我们都在访问输入字符串中的所有字符。</p><p>下面还提供了相同代码的更简洁解决方案，它利用了_String_类的_lastIndexOf_方法。<strong>当我们找到一个字符，它在字符串中的第一个索引也是最后一个索引时，这就确立了该字符仅在该索引处存在于字符串中，因此成为第一个不重复的字符。</strong></p><p>这个的时间复杂度也是O(n)。应该指出的是，_lastIndexOf_方法本身运行在另一个O(n)时间内，除了我们已经在运行的外部循环，我们正在逐个字符地取，从而使这成为一个O(n²)解决方案，与之前的解决方案类似。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Character</span> <span class="token function">firstNonRepeatingCharBruteForce</span><span class="token punctuation">(</span><span class="token class-name">String</span> inputString<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">==</span> inputString <span class="token operator">||</span> inputString<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Character</span> c <span class="token operator">:</span> inputString<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> indexOfC <span class="token operator">=</span> inputString<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>indexOfC <span class="token operator">==</span> inputString<span class="token punctuation">.</span><span class="token function">lastIndexOf</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> c<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-优化解决方案" tabindex="-1"><a class="header-anchor" href="#_3-2-优化解决方案"><span>3.2. 优化解决方案</span></a></h3><p>让我们看看是否可以做得更好。我们讨论的方法的瓶颈是我们正在将每个字符与字符串中出现的每个其他字符进行比较，我们继续这样做，直到我们到达字符串的末尾或找到答案。相反，如果我们能够记住每个字符出现的次数，我们就不需要每次都进行比较，而是只需查找字符的频率。我们可以使用_Map_为此目的，更具体地说，是_HashMap_。</p><p>该映射将存储字符作为键和其频率作为值。当我们访问每个字符时，我们有两个选择：</p><ol><li>如果字符已经出现在映射中，我们将当前位置附加到它的值</li><li>如果字符尚未出现在迄今为止构建的映射中，这是一个新的字符，我们增加字符被看到的次数</li></ol><p>完成对整个字符串的计算后，我们有一个映射，告诉我们字符串中每个字符的计数。我们现在所要做的就是再次遍历字符串，映射中值的大小为一的第一个字符就是我们的答案。</p><p>代码如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Character</span> <span class="token function">firstNonRepeatingCharWithMap</span><span class="token punctuation">(</span><span class="token class-name">String</span> inputString<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">==</span> inputString <span class="token operator">||</span> inputString<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` frequency <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> outer <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> outer <span class="token operator">&lt;</span> inputString<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> outer<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">char</span> character <span class="token operator">=</span> inputString<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>outer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        frequency<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>character<span class="token punctuation">,</span> frequency<span class="token punctuation">.</span><span class="token function">getOrDefault</span><span class="token punctuation">(</span>character<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Character</span> c <span class="token operator">:</span> inputString<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>frequency<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> c<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述解决方案要快得多，<strong>考虑到在映射上的查找是常数时间操作，或O(1)</strong>。这意味着获取结果的时间不会随着输入字符串大小的增加而增加。</p><h3 id="_3-3-关于优化解决方案的附加说明" tabindex="-1"><a class="header-anchor" href="#_3-3-关于优化解决方案的附加说明"><span>3.3. 关于优化解决方案的附加说明</span></a></h3><p>我们应该讨论我们之前讨论的优化解决方案的一些注意事项。原始问题假设输入可以是任何长度，并且可以包含任何字符。这使得_Map_用于查找目的的效率。</p><p><strong>然而，如果我们能够将输入字符集限制为仅小写字符/大写字符/英文字母字符等，使用固定大小的数组而不是映射将是更好的设计选择。</strong></p><p>例如，如果输入仅限于小写英文字符，我们可以有一个大小为26的数组，其中数组中的每个索引引用一个字母，并且值可以表示字符串中字符的频率。最后，字符串中值在数组中为1的第一个字符就是答案。这是它的代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Character</span> <span class="token function">firstNonRepeatingCharWithArray</span><span class="token punctuation">(</span><span class="token class-name">String</span> inputString<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">==</span> inputString <span class="token operator">||</span> inputString<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> frequency <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token number">26</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> outer <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> outer <span class="token operator">&lt;</span> inputString<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> outer<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">char</span> character <span class="token operator">=</span> inputString<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>outer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        frequency<span class="token punctuation">[</span>character <span class="token operator">-</span> <span class="token char">&#39;a&#39;</span><span class="token punctuation">]</span><span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Character</span> c <span class="token operator">:</span> inputString<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>frequency<span class="token punctuation">[</span>c <span class="token operator">-</span> <span class="token char">&#39;a&#39;</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> c<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**注意，时间复杂度仍然是O(n)，但我们将空间复杂度提高到了常数空间。**这是因为，无论字符串的长度如何，我们用来存储频率的辅助空间（数组）的长度都将是常数。</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们讨论了找出字符串中第一个不重复字符的不同方法。</p><p>如往常一样，你可以在GitHub上找到所有的代码样本。</p>`,36),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-12-Find the First Non Repeating Character in a String in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Find%20the%20First%20Non%20Repeating%20Character%20in%20a%20String%20in%20Java.html","title":"Java中找出字符串中第一个不重复的字符","lang":"zh-CN","frontmatter":{"date":"2023-04-06T00:00:00.000Z","category":["Java","Algorithm"],"tag":["String","Non-Repeating Character"],"head":[["meta",{"name":"keywords","content":"Java, Algorithm, String, Non-Repeating Character"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Find%20the%20First%20Non%20Repeating%20Character%20in%20a%20String%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中找出字符串中第一个不重复的字符"}],["meta",{"property":"og:description","content":"Java中找出字符串中第一个不重复的字符 在本教程中，我们将探讨在Java中找出字符串中第一个不重复字符的不同方法。我们还将尝试分析这些解决方案的运行时间复杂度。 问题陈述 给定一个字符字符串作为输入，找出字符串中的第一个不重复的字符。以下是一些示例： 示例 1: Lullaby 在这个例子中，L重复了三次。当我们遇到字符_u_时，遇到了第一个不重复的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T05:03:25.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:tag","content":"Non-Repeating Character"}],["meta",{"property":"article:published_time","content":"2023-04-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T05:03:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中找出字符串中第一个不重复的字符\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-04-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T05:03:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中找出字符串中第一个不重复的字符 在本教程中，我们将探讨在Java中找出字符串中第一个不重复字符的不同方法。我们还将尝试分析这些解决方案的运行时间复杂度。 问题陈述 给定一个字符字符串作为输入，找出字符串中的第一个不重复的字符。以下是一些示例： 示例 1: Lullaby 在这个例子中，L重复了三次。当我们遇到字符_u_时，遇到了第一个不重复的..."},"headers":[{"level":2,"title":"问题陈述","slug":"问题陈述","link":"#问题陈述","children":[]},{"level":2,"title":"解决方案","slug":"解决方案","link":"#解决方案","children":[{"level":3,"title":"3.1. 暴力解决方案","slug":"_3-1-暴力解决方案","link":"#_3-1-暴力解决方案","children":[]},{"level":3,"title":"3.2. 优化解决方案","slug":"_3-2-优化解决方案","link":"#_3-2-优化解决方案","children":[]},{"level":3,"title":"3.3. 关于优化解决方案的附加说明","slug":"_3-3-关于优化解决方案的附加说明","link":"#_3-3-关于优化解决方案的附加说明","children":[]}]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720760605000,"updatedTime":1720760605000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.47,"words":1642},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Find the First Non Repeating Character in a String in Java.md","localizedDate":"2023年4月6日","excerpt":"\\n<p>在本教程中，我们将探讨在Java中找出字符串中第一个不重复字符的不同方法。我们还将尝试分析这些解决方案的运行时间复杂度。</p>\\n<h2>问题陈述</h2>\\n<p><strong>给定一个字符字符串作为输入，找出字符串中的第一个不重复的字符</strong>。以下是一些示例：</p>\\n<p>示例 1: <em>Lullaby</em>\\n在这个例子中，L重复了三次。当我们遇到字符_u_时，遇到了第一个不重复的字符。</p>\\n<p>示例 2: <em>Baeldung</em>\\n在这个例子中，所有字符都是不重复的。根据问题陈述，我们取第一个，B。</p>\\n<p>示例 3: <em>mahimahi</em>\\n在这个例子中，没有不重复的字符 - 所有字符都只重复一次。因此，这里的输出是_null_。</p>","autoDesc":true}');export{k as comp,d as data};
