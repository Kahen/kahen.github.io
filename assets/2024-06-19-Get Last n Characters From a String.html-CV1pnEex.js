import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CnPmfeyP.js";const e={},p=t(`<h1 id="从字符串获取最后n个字符的几种方法" tabindex="-1"><a class="header-anchor" href="#从字符串获取最后n个字符的几种方法"><span>从字符串获取最后n个字符的几种方法</span></a></h1><p>在本教程中，我们将探讨几种不同的方法来从字符串中获取最后n个字符。</p><p>假设我们有以下字符串，其值表示一个日期：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> s <span class="token operator">=</span> <span class="token string">&quot;10-03-2024&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>从这个字符串中，我们想要提取年份。换句话说，我们只想要最后四个字符，所以n是：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> n <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-使用substring-方法" tabindex="-1"><a class="header-anchor" href="#_2-使用substring-方法"><span>2. 使用substring()方法</span></a></h3><p>我们可以使用substring()方法的一个重载版本，该方法从beginIndex（包括）开始获取字符，并在endIndex（不包括）结束：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenString_whenUsingTwoArgSubstringMethod_thenObtainLastNCharacters</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> beginIndex <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> n<span class="token punctuation">;</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>beginIndex<span class="token punctuation">,</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;2024&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们想要最后n个字符，我们首先通过从字符串的长度中减去n来确定beginIndex。最后，我们将endIndex简单地设置为字符串的长度。</p><p>由于我们只对最后n个字符感兴趣，我们可以利用substring()方法的更方便的重载版本，它只将beginIndex作为方法参数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenString_whenUsingOneArgSubstringMethod_thenObtainLastNCharacters</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> beginIndex <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> n<span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>beginIndex<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;2024&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法返回从beginIndex（包括）开始到字符串末尾的字符。</p><p>最后，值得一提的是String类的subSequence()方法，它在后台使用substring()。尽管它可以用来解决我们的用例，但从可读性的角度来看，使用substring()方法更为合适。</p><h3 id="_3-使用apache-commons-lang-3中的stringutils-right-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用apache-commons-lang-3中的stringutils-right-方法"><span>3. 使用Apache Commons Lang 3中的StringUtils.right()方法</span></a></h3><p>要使用Apache Commons Lang 3，我们需要将其依赖项添加到我们的pom.xml中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.apache.commons\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`commons-lang3\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`3.14.0\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以使用StringUtils.right()方法来获取最后n个字符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenString_whenUsingStringUtilsRight_thenObtainLastNCharacters</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">right</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;2024&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们只需要提供要处理的字符串和我们想要从字符串末尾返回的字符数。因此，这将是我们的用例的首选解决方案，因为我们消除了计算索引的需要，从而产生了更易于维护和无错误的代码。</p><h3 id="_4-使用stream-api" tabindex="-1"><a class="header-anchor" href="#_4-使用stream-api"><span>4. 使用Stream API</span></a></h3><p>现在，让我们探讨一下函数式编程解决方案可能是什么样子。</p><p>我们的Stream源的一个选项可能是使用chars()方法。该方法返回一个IntStream，其原始int元素表示字符串中的字符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenString_whenUsingIntStreamAsStreamSource_thenObtainLastNCharacters</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">chars</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">mapToObj</span><span class="token punctuation">(</span>c <span class="token operator">-&gt;</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> c<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">skip</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> n<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token operator">::</span><span class="token function">valueOf</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">joining</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;2024&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用mapToObj()中间操作将每个int元素转换为Character对象。现在我们有了Character流，我们可以使用skip()操作来仅保留某个索引之后的元素。</p><p>接下来，我们使用String::valueOf方法引用的map()操作。我们将每个Character元素转换为String，因为我们想使用Collectors.joining()静态方法的终端collect()操作。</p><p>另一种函数式方法最初使用toCharArray()方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenString_whenUsingStreamOfCharactersAsSource_thenObtainLastNCharacters</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token class-name">ArrayUtils</span><span class="token punctuation">.</span><span class="token function">toObject</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">skip</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> n<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token operator">::</span><span class="token function">valueOf</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">joining</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;2024&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法返回一个char原始数组。我们可以使用Apache Commons Lang 3中的ArrayUtils.toObject()将我们的数组转换为Character元素数组。最后，我们使用静态方法Arrays.stream()获得一个Character流。从这里开始，我们的逻辑保持不变，以获取最后n个字符。</p><p>正如我们上面看到的，使用函数式编程方法实现我们的目标需要做很多工作。这突显了只有在适当的时候才应该使用函数式编程。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们探讨了从字符串中获取最后n个字符的几种不同方法。我们强调了命令式方法比函数式方法提供了更简洁和易读的解决方案。<strong>我们应该注意，本文中探索的从字符串中提取年份的示例仅用于演示目的。</strong> 更合适的方法是将字符串解析为LocalDate并使用getYear()方法。</p><p>如往常一样，本文中使用的代码示例可在GitHub上找到。</p><p>文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,34),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-19-Get Last n Characters From a String.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-19-Get%20Last%20n%20Characters%20From%20a%20String.html","title":"从字符串获取最后n个字符的几种方法","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Java","String Manipulation"],"tag":["substring","StringUtils","Stream API"],"head":[["meta",{"name":"keywords","content":"Java, String, substring, StringUtils, Stream API"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-19-Get%20Last%20n%20Characters%20From%20a%20String.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"从字符串获取最后n个字符的几种方法"}],["meta",{"property":"og:description","content":"从字符串获取最后n个字符的几种方法 在本教程中，我们将探讨几种不同的方法来从字符串中获取最后n个字符。 假设我们有以下字符串，其值表示一个日期： 从这个字符串中，我们想要提取年份。换句话说，我们只想要最后四个字符，所以n是： 2. 使用substring()方法 我们可以使用substring()方法的一个重载版本，该方法从beginIndex（包括）..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"substring"}],["meta",{"property":"article:tag","content":"StringUtils"}],["meta",{"property":"article:tag","content":"Stream API"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"从字符串获取最后n个字符的几种方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"从字符串获取最后n个字符的几种方法 在本教程中，我们将探讨几种不同的方法来从字符串中获取最后n个字符。 假设我们有以下字符串，其值表示一个日期： 从这个字符串中，我们想要提取年份。换句话说，我们只想要最后四个字符，所以n是： 2. 使用substring()方法 我们可以使用substring()方法的一个重载版本，该方法从beginIndex（包括）..."},"headers":[{"level":3,"title":"2. 使用substring()方法","slug":"_2-使用substring-方法","link":"#_2-使用substring-方法","children":[]},{"level":3,"title":"3. 使用Apache Commons Lang 3中的StringUtils.right()方法","slug":"_3-使用apache-commons-lang-3中的stringutils-right-方法","link":"#_3-使用apache-commons-lang-3中的stringutils-right-方法","children":[]},{"level":3,"title":"4. 使用Stream API","slug":"_4-使用stream-api","link":"#_4-使用stream-api","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.57,"words":1070},"filePathRelative":"posts/baeldung/Archive/2024-06-19-Get Last n Characters From a String.md","localizedDate":"2024年6月20日","excerpt":"\\n<p>在本教程中，我们将探讨几种不同的方法来从字符串中获取最后n个字符。</p>\\n<p>假设我们有以下字符串，其值表示一个日期：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> s <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"10-03-2024\\"</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
