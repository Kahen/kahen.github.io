import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CtR6X2Br.js";const p={},e=t('<h1 id="在java中将字符串中每个单词的首字母大写" tabindex="-1"><a class="header-anchor" href="#在java中将字符串中每个单词的首字母大写"><span>在Java中将字符串中每个单词的首字母大写</span></a></h1><p>在这篇简短的教程中，我们将展示如何在Java中将特定字符串中每个单词的第一个字符大写。</p><p>首先，我们将解释如何使用JDK内置解决方案来实现这一点。然后，我们将演示如何使用如Apache Commons等外部库来达到相同的结果。</p><h3 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h3><p>这里的主要目标是将给定字符串中每个单词的首字母转换为大写。例如，假设我们有一个输入字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;Hi my name is azhrioun&quot;</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因此，我们期望的输出是每个单词都以大写字符开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> output <span class="token operator">=</span> <span class="token string">&quot;Hi My Name Is Azhrioun&quot;</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>解决问题的基本思想是将输入字符串分割成几个单词</strong>。然后，我们可以使用不同的方法和类来将每个返回的单词的第一个字符大写。</p><p>那么，让我们仔细看看每种方法。</p><h3 id="_3-使用-character-touppercase" tabindex="-1"><a class="header-anchor" href="#_3-使用-character-touppercase"><span>3. 使用 <em>Character#toUpperCase</em></span></a></h3><p><em>toUpperCase()</em> 提供了实现我们目标的最简单方式。<strong>正如其名，这个方法将给定的字符转换为大写</strong>。</p><p>所以在这里，我们将使用它来转换我们字符串中每个单词的第一个字符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">usingCharacterToUpperCaseMethod</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>input <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> input<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">return</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>input<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\s+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>word <span class="token operator">-&gt;</span> <span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span>word<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> word<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">joining</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们首先检查我们的字符串是否为_null_或为空，以避免潜在的_NullPointerExcepiton_。<strong>然后，我们使用_split()_方法将我们的输入字符串分成多个单词</strong>。</p><p>此外，我们使用_charAt(0)<em>来获取每个单词的第一个字符。**然后，我们对返回的字符应用_toUpperCase()</em>**。之后，我们使用_+_运算符和_substring(1)_将大写字符与单词的其余部分连接起来。</p><p>最后，我们使用_Collectors#joining_将每个大写单词再次连接成单个字符串。</p><p>现在，让我们为我们的方法添加一个测试用例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenString_whenUsingCharacterToUpperCaseMethod_thenCapitalizeFirstCharacter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;hello baeldung visitors&quot;</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Hello Baeldung Visitors&quot;</span><span class="token punctuation">,</span> <span class="token class-name">CapitalizeFirstCharacterEachWordUtils</span><span class="token punctuation">.</span><span class="token function">usingCharacterToUpperCaseMethod</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-使用-string-touppercase" tabindex="-1"><a class="header-anchor" href="#_4-使用-string-touppercase"><span>4. 使用 <em>String#toUpperCase</em></span></a></h3><p><em>String</em> 类提供了自己的_toUpperCase()_方法版本。所以，让我们使用_String#toUpperCase_重写前面的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">usingStringToUpperCaseMethod</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>input<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\s+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>word <span class="token operator">-&gt;</span> word<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> word<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">joining</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如上所示，我们使用_substring(0, 1)<em>将每个单词的第一个字符提取为_String</em>。然后，我调用_toUpperCase()_方法将其转换为大写</strong>。随后，我们使用了与之前相同的机制来连接和连接返回的单词。</p><p>让我们为这种方法编写测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenString_whenUsingSubstringMethod_thenCapitalizeFirstCharacter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;Hi, my name is azhrioun&quot;</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Hi, My Name Is Azhrioun&quot;</span><span class="token punctuation">,</span> <span class="token class-name">CapitalizeFirstCharacterEachWordUtils</span><span class="token punctuation">.</span><span class="token function">usingStringToUpperCaseMethod</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，与_String#toUpperCase_不同，<em>Character#toUpperCase_是一个静态方法。另一个关键区别是_String#toUpperCase_产生一个新的_String</em>，而_Character#toUpperCase_返回一个新的_char_原始类型。</p><h3 id="_5-使用-apache-commons-lang3-中的-stringutils" tabindex="-1"><a class="header-anchor" href="#_5-使用-apache-commons-lang3-中的-stringutils"><span>5. 使用 Apache Commons Lang3 中的 <em>StringUtils</em></span></a></h3><p>另外，我们可以使用Apache Commons Lang3库来解决我们的中心问题。首先，我们需要将它的依赖项添加到我们的_pom.xml_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.commons``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``commons-lang3``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``3.14.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个库提供了_StringUtils_类以null安全的方式操作和处理字符串。</p><p>那么，让我们看看如何使用这个工具类来大写特定字符串的每个单词：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">usingStringUtilsClass</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>input<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\s+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token operator">::</span><span class="token function">capitalize</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">joining</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在这里，我们使用了_capitalize()_方法，顾名思义，它将第一个字符转换为大写。给定字符串的其余字符不变</strong>。</p><p>最后，让我们使用一个新的测试用例来确认我们的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenString_whenUsingStringUtilsClass_thenCapitalizeFirstCharacter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;life is short the world is wide&quot;</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Life Is Short The World Is Wide&quot;</span><span class="token punctuation">,</span> <span class="token class-name">CapitalizeFirstCharacterEachWordUtils</span><span class="token punctuation">.</span><span class="token function">usingStringUtilsClass</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-使用-apache-commons-text-中的-wordutils" tabindex="-1"><a class="header-anchor" href="#_6-使用-apache-commons-text-中的-wordutils"><span>6. 使用 Apache Commons Text 中的 <em>WordUtils</em></span></a></h3><p>另一种解决方案是使用Apache Commons Text库。话不多说，让我们将它的依赖项添加到_pom.xml_文件：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.commons``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``commons-text``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``1.10.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通常，这个库带有一组用于字符串操作的现成的类和方法。在这些类中，我们找到了_WordUtils_。</p><p>_WordUtils#capitalizeFully_方法为我们的问题提供了最简洁和直接的方法。<strong>这个方法将所有由空格分隔的单词转换为大写单词</strong>。</p><p>请注意，这个方法优雅地处理_null_输入。所以，我们不需要检查我们的输入字符串是否为_null_或不是。</p><p>现在，让我们添加另一个测试用例以确保一切按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenString_whenUsingWordUtilsClass_thenCapitalizeFirstCharacter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;smile sunshine is good for your teeth&quot;</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Smile Sunshine Is Good For Your Teeth&quot;</span><span class="token punctuation">,</span> <span class="token class-name">WordUtils</span><span class="token punctuation">.</span><span class="token function">capitalizeFully</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h3><p>在这篇短文中，我们探讨了在Java中将给定字符串中每个单词的首字母大写的不同方法。</p><p>首先，我们解释了如何使用JDK来实现这一点。然后，我们展示了如何使用第三方库来回答我们的中心问题。</p><p>正如往常一样，本文中使用的代码可以在GitHub上找到。</p>',47),o=[e];function c(i,l){return s(),a("div",null,o)}const d=n(p,[["render",c],["__file","2024-06-28-Capitalize the First Letter of Each Word in a String.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-Capitalize%20the%20First%20Letter%20of%20Each%20Word%20in%20a%20String.html","title":"在Java中将字符串中每个单词的首字母大写","lang":"zh-CN","frontmatter":{"date":"2024-06-28T00:00:00.000Z","category":["Java","String Manipulation"],"tag":["Capitalize","Java","JDK","Apache Commons"],"head":[["meta",{"name":"keywords","content":"Java, String, Capitalize, Apache Commons, StringUtils, WordUtils"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-Capitalize%20the%20First%20Letter%20of%20Each%20Word%20in%20a%20String.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中将字符串中每个单词的首字母大写"}],["meta",{"property":"og:description","content":"在Java中将字符串中每个单词的首字母大写 在这篇简短的教程中，我们将展示如何在Java中将特定字符串中每个单词的第一个字符大写。 首先，我们将解释如何使用JDK内置解决方案来实现这一点。然后，我们将演示如何使用如Apache Commons等外部库来达到相同的结果。 2. 问题介绍 这里的主要目标是将给定字符串中每个单词的首字母转换为大写。例如，假设..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T13:52:53.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Capitalize"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"JDK"}],["meta",{"property":"article:tag","content":"Apache Commons"}],["meta",{"property":"article:published_time","content":"2024-06-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T13:52:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中将字符串中每个单词的首字母大写\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T13:52:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中将字符串中每个单词的首字母大写 在这篇简短的教程中，我们将展示如何在Java中将特定字符串中每个单词的第一个字符大写。 首先，我们将解释如何使用JDK内置解决方案来实现这一点。然后，我们将演示如何使用如Apache Commons等外部库来达到相同的结果。 2. 问题介绍 这里的主要目标是将给定字符串中每个单词的首字母转换为大写。例如，假设..."},"headers":[{"level":3,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":3,"title":"3. 使用 Character#toUpperCase","slug":"_3-使用-character-touppercase","link":"#_3-使用-character-touppercase","children":[]},{"level":3,"title":"4. 使用 String#toUpperCase","slug":"_4-使用-string-touppercase","link":"#_4-使用-string-touppercase","children":[]},{"level":3,"title":"5. 使用 Apache Commons Lang3 中的 StringUtils","slug":"_5-使用-apache-commons-lang3-中的-stringutils","link":"#_5-使用-apache-commons-lang3-中的-stringutils","children":[]},{"level":3,"title":"6. 使用 Apache Commons Text 中的 WordUtils","slug":"_6-使用-apache-commons-text-中的-wordutils","link":"#_6-使用-apache-commons-text-中的-wordutils","children":[]},{"level":3,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719582773000,"updatedTime":1719582773000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.36,"words":1309},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-Capitalize the First Letter of Each Word in a String.md","localizedDate":"2024年6月28日","excerpt":"\\n<p>在这篇简短的教程中，我们将展示如何在Java中将特定字符串中每个单词的第一个字符大写。</p>\\n<p>首先，我们将解释如何使用JDK内置解决方案来实现这一点。然后，我们将演示如何使用如Apache Commons等外部库来达到相同的结果。</p>\\n<h3>2. 问题介绍</h3>\\n<p>这里的主要目标是将给定字符串中每个单词的首字母转换为大写。例如，假设我们有一个输入字符串：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> input <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"Hi my name is azhrioun\\"</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
