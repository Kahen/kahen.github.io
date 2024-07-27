import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CBerKIce.js";const p={},e=t(`<h1 id="在java中查找给定字符串中的最长单词-baeldung" tabindex="-1"><a class="header-anchor" href="#在java中查找给定字符串中的最长单词-baeldung"><span>在Java中查找给定字符串中的最长单词 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将寻找一个句子中的一个或所有最长的单词。</p><p>一个句子是一组单词。我们将用Java的_String_来表示它。此外，我们假设每个非空白字符都是单词的一部分。最后，我们将强调技术边缘情况：null、空或空白的_String_没有最长的单词。</p><h2 id="_2-查找一个最长的单词" tabindex="-1"><a class="header-anchor" href="#_2-查找一个最长的单词"><span>2. 查找一个最长的单词</span></a></h2><p>首先，让我们找到句子中的最长单词。例如，在句子：“<em>This is a phrase with words</em>”，最长的单词是_phrase_。如果有多个单词具有相同的长度，任何一个都是可接受的答案。如果句子中没有单词，则没有结果。因此，我们的方法返回一个_Optional_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Optional</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">findLongestWord</span><span class="token punctuation">(</span><span class="token class-name">String</span> sentence<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>sentence<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>string <span class="token operator">-&gt;</span> <span class="token operator">!</span>string<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>string <span class="token operator">-&gt;</span> string<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\s&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token operator">::</span><span class="token function">asList</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>list <span class="token operator">-&gt;</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>list<span class="token punctuation">,</span> <span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">comparingInt</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token operator">::</span><span class="token function">length</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们首先将句子包装在一个_Optional_中，并过滤掉所有空和空白的_String_。接下来，我们应用_String_的_split()<em>方法来检索单词数组。我们需要将‘</em>\\s_’作为参数传递，以使用空格作为分隔符。然后，我们通过_Arrays.asList()<em>将数组转换为_List</em>。最后，我们使用_Collections.max()_来获取最长的单词。这个方法有两个属性：</p><ul><li>确定最大值的列表</li><li>用于确定最大值的_Comparator_</li></ul><p>在这种情况下，我们通过它们的长度来比较单词。我们将类命名为_LongestWordFinder_，现在我们可以对示例句子进行单元测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAPhraseWithALongestWord_whenFindLongestWord_thenLongestWordOfThePhrase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">LongestWordFinder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">findLongestWord</span><span class="token punctuation">(</span><span class="token string">&quot;This is a phrase with words&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasValue</span><span class="token punctuation">(</span><span class="token string">&quot;phrase&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-查找所有最长的单词" tabindex="-1"><a class="header-anchor" href="#_3-查找所有最长的单词"><span>3. 查找所有最长的单词</span></a></h2><p>现在我们将列出所有最长的单词。例如，_Baeldung_和_sentence_是句子：“<em>Baeldung is another word of size eight in this sentence</em>”中的两个最长的单词。</p><p>首先，我们将处理没有单词的边缘情况，并在这种情况下返回一个空列表。此外，我们将再次将句子分割成一个单词数组。但这次我们的目标是<strong>首先计算最大长度，并使用它来找到所有具有此长度的单词</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">findLongestWords</span><span class="token punctuation">(</span><span class="token class-name">String</span> sentence<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>sentence <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> sentence<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">emptyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> words <span class="token operator">=</span> sentence<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\s&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> maxWordLength <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>words<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">mapToInt</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token operator">::</span><span class="token function">length</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>words<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>word <span class="token operator">-&gt;</span> word<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> maxWordLength<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，为了计算最大长度，我们首先从单词数组创建了一个_Stream_。然后，我们应用了_mapToInt()<em>中间操作，并使用_String::length_作为参数。这样，我们将_Stream_转换为单词长度的_Stream</em>。最后，我们得到了_Stream_的最大值。</p><p>总之，我们所要做的就是过滤出具有这个最大长度的单词。我们使用另一个_Stream_来做到这一点，并将匹配的单词收集到结果列表中。现在让我们检查_findLongestWords()_是否为我们的示例句子返回了预期的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAPhraseWithVariousWordsOfMaxLength_whenFindLongestWords_thenAllLongestsWords</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">LongestWordFinder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">findLongestWords</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung is another word of size eight in this sentence&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;sentence&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们将句子分割成单词列表，并使用Collections API来找到一个最长的单词。我们还看到了如何使用Java Streams来找到它们全部。</p><p>一如既往，代码可以在GitHub上找到。</p>`,21),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-06-Find the Longest Word in a Given String in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Find%20the%20Longest%20Word%20in%20a%20Given%20String%20in%20Java.html","title":"在Java中查找给定字符串中的最长单词 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","String"],"tag":["Longest Word","Java String"],"head":[["meta",{"name":"keywords","content":"Java, Longest Word, String Manipulation"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Find%20the%20Longest%20Word%20in%20a%20Given%20String%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中查找给定字符串中的最长单词 | Baeldung"}],["meta",{"property":"og:description","content":"在Java中查找给定字符串中的最长单词 | Baeldung 1. 概述 在本教程中，我们将寻找一个句子中的一个或所有最长的单词。 一个句子是一组单词。我们将用Java的_String_来表示它。此外，我们假设每个非空白字符都是单词的一部分。最后，我们将强调技术边缘情况：null、空或空白的_String_没有最长的单词。 2. 查找一个最长的单词 首..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T02:30:30.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Longest Word"}],["meta",{"property":"article:tag","content":"Java String"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T02:30:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中查找给定字符串中的最长单词 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T02:30:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中查找给定字符串中的最长单词 | Baeldung 1. 概述 在本教程中，我们将寻找一个句子中的一个或所有最长的单词。 一个句子是一组单词。我们将用Java的_String_来表示它。此外，我们假设每个非空白字符都是单词的一部分。最后，我们将强调技术边缘情况：null、空或空白的_String_没有最长的单词。 2. 查找一个最长的单词 首..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 查找一个最长的单词","slug":"_2-查找一个最长的单词","link":"#_2-查找一个最长的单词","children":[]},{"level":2,"title":"3. 查找所有最长的单词","slug":"_3-查找所有最长的单词","link":"#_3-查找所有最长的单词","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720233030000,"updatedTime":1720233030000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.88,"words":863},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Find the Longest Word in a Given String in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将寻找一个句子中的一个或所有最长的单词。</p>\\n<p>一个句子是一组单词。我们将用Java的_String_来表示它。此外，我们假设每个非空白字符都是单词的一部分。最后，我们将强调技术边缘情况：null、空或空白的_String_没有最长的单词。</p>\\n<h2>2. 查找一个最长的单词</h2>\\n<p>首先，让我们找到句子中的最长单词。例如，在句子：“<em>This is a phrase with words</em>”，最长的单词是_phrase_。如果有多个单词具有相同的长度，任何一个都是可接受的答案。如果句子中没有单词，则没有结果。因此，我们的方法返回一个_Optional_：</p>","autoDesc":true}');export{k as comp,d as data};
