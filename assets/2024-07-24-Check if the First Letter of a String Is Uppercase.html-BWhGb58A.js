import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-8nJ1rqSf.js";const t={},p=e('<hr><h1 id="检查字符串首字母是否大写" tabindex="-1"><a class="header-anchor" href="#检查字符串首字母是否大写"><span>检查字符串首字母是否大写</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本简短教程中，我们将熟悉在Java中检查字符串首字母是否大写的不同选项。</p><h2 id="_2-示例" tabindex="-1"><a class="header-anchor" href="#_2-示例"><span>2. 示例</span></a></h2><p>首先，我们将定义在所有解决方案中使用的示例字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> example <span class="token operator">=</span> <span class="token string">&quot;Katie&quot;</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因此，示例字符串只是一个大写的名字。现在，让我们检查首字母是否大写的选项。</p><h2 id="_3-核心java解决方案" tabindex="-1"><a class="header-anchor" href="#_3-核心java解决方案"><span>3. 核心Java解决方案</span></a></h2><p>我们将熟悉的第一个解决方案不需要新依赖项。我们将使用来自_java.lang_包中的_Character_类的_isUpperCase_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isUpperCase</span><span class="token punctuation">(</span><span class="token keyword">int</span> codePoint<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>此方法接受一个字符，并确定它是否是大写字符。</strong></p><p>对于我们的情况，我们只需要提取字符串中的第一个字符。首先，我们将使用_charAt_方法进行提取。然后，我们将调用_isUpperCase_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">isUpperCase</span><span class="token punctuation">(</span>example<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>由于示例字符串中的第一个字母是大写字符，因此此断言将通过。</p><h2 id="_4-使用正则表达式" tabindex="-1"><a class="header-anchor" href="#_4-使用正则表达式"><span>4. 使用正则表达式</span></a></h2><p>正则表达式是在输入字符串中查找匹配项的常用解决方案。因此，我们将使用它们来检查字符串中的第一个字符是否为大写。</p><p>与之前的解决方案一样，这种方法不需要添加新依赖项。正则表达式已经在_java.util.regex_包中可用。</p><p>下一步是定义匹配模式。<strong>对于我们的情况，我们需要一个模式，该模式将匹配如果字符串以大写字符开头，而其他字符可以是大写、小写或数字</strong>。然后，我们只需要检查模式是否与我们的示例字符串匹配：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> regEx <span class="token operator">=</span> <span class="token string">&quot;[A-Z]\\\\w*&quot;</span><span class="token punctuation">;</span>\n<span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>example<span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span>regEx<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-guava解决方案" tabindex="-1"><a class="header-anchor" href="#_5-guava解决方案"><span>5. Guava解决方案</span></a></h2><p>另一种解决方案可以在Guava库中找到。<strong>我们将需要使用_Ascii_类的_isUpperCase_方法来检查字符串首字母是否大写。</strong></p><p>第一步是添加Guava依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.google.guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``31.0.1-jre``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们将应用_isUpperCase_方法到我们的示例字符串的第一个字母：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">Ascii</span><span class="token punctuation">.</span><span class="token function">isUpperCase</span><span class="token punctuation">(</span>example<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种方法实际上与第2.1节中的核心Java解决方案相同。如果没有特别的原因，总是最好使用不需要额外依赖项的解决方案。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们检查了检查首字母是否大写的不同解决方案。</p><p>首先，我们讨论了核心Java中可用的解决方案。后来，我们看到了如何使用正则表达式进行检查。最后，我们展示了Guava库中的解决方案。</p><p>一如既往，这些示例的代码可以在GitHub上找到。--- date: 2022-04-01 category:</p><ul><li>Java</li><li>String Manipulation tag:</li><li>Java</li><li>String</li><li>Uppercase head:</li><li><ul><li>meta</li><li>name: keywords content: Java, String, Uppercase</li></ul></li></ul><hr><h1 id="检查字符串首字母是否大写-1" tabindex="-1"><a class="header-anchor" href="#检查字符串首字母是否大写-1"><span>检查字符串首字母是否大写</span></a></h1><h2 id="_1-引言-1" tabindex="-1"><a class="header-anchor" href="#_1-引言-1"><span>1. 引言</span></a></h2><p>在本简短教程中，我们将熟悉在Java中检查字符串首字母是否大写的不同选项。</p><h2 id="_2-示例-1" tabindex="-1"><a class="header-anchor" href="#_2-示例-1"><span>2. 示例</span></a></h2><p>首先，我们将定义在所有解决方案中使用的示例字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> example <span class="token operator">=</span> <span class="token string">&quot;Katie&quot;</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个示例字符串是一个首字母大写的名称。现在，让我们探讨检查首字母是否为大写的不同方法。</p><h2 id="_3-核心java解决方案-1" tabindex="-1"><a class="header-anchor" href="#_3-核心java解决方案-1"><span>3. 核心Java解决方案</span></a></h2><p>我们首先了解的解决方案不需要添加新的依赖。我们将使用<code>java.lang</code>包中<code>Character</code>类的<code>isUpperCase</code>方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isUpperCase</span><span class="token punctuation">(</span><span class="token keyword">int</span> codePoint<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个方法接受一个字符，并判断它是否为大写字母。</p><p>在我们的例子中，我们只需要提取字符串的第一个字符。我们可以使用<code>charAt</code>方法来提取，然后调用<code>isUpperCase</code>方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">isUpperCase</span><span class="token punctuation">(</span>example<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>由于我们示例字符串的第一个字母是大写，这个断言将会通过。</p><h2 id="_4-使用正则表达式-1" tabindex="-1"><a class="header-anchor" href="#_4-使用正则表达式-1"><span>4. 使用正则表达式</span></a></h2><p>正则表达式是检查输入字符串中匹配项的常用方法。我们将使用正则表达式来检查字符串的第一个字符是否为大写。</p><p>和之前的解决方案一样，这个方法不需要添加新的依赖。正则表达式已经在<code>java.util.regex</code>包中可用。</p><p>下一步是定义匹配模式。我们需要一个模式，它能够匹配字符串以大写字母开头的情况，而其他字符可以是大写、小写或数字。然后，我们只需要检查这个模式是否与我们的示例字符串匹配：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> regEx <span class="token operator">=</span> <span class="token string">&quot;^[A-Z].*&quot;</span><span class="token punctuation">;</span>\n<span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>example<span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span>regEx<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-guava解决方案-1" tabindex="-1"><a class="header-anchor" href="#_5-guava解决方案-1"><span>5. Guava解决方案</span></a></h2><p>在Guava库中，我们还可以找到另一种解决方案。我们将使用<code>Ascii</code>类的<code>isUpperCase</code>方法来检查字符串的第一个字母是否为大写。</p><p>首先，我们需要添加Guava依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.google.guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``31.0.1-jre``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们将<code>isUpperCase</code>方法应用于示例字符串的第一个字母：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">Ascii</span><span class="token punctuation">.</span><span class="token function">isUpperCase</span><span class="token punctuation">(</span>example<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种方法实际上与核心Java解决方案非常相似。如果没有特别的理由，最好使用不需要额外依赖的解决方案。</p><h2 id="_6-结论-1" tabindex="-1"><a class="header-anchor" href="#_6-结论-1"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了不同的方法来检查字符串的第一个字母是否为大写。</p><p>首先，我们讨论了Java核心库中的解决方案。接着，我们展示了如何使用正则表达式进行检查。最后，我们介绍了Guava库中的解决方案。</p><p>如常，这些示例的代码可以在GitHub上找到。</p><p>OK</p>',64),c=[p];function l(o,i){return s(),n("div",null,c)}const d=a(t,[["render",l],["__file","2024-07-24-Check if the First Letter of a String Is Uppercase.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-24/2024-07-24-Check%20if%20the%20First%20Letter%20of%20a%20String%20Is%20Uppercase.html","title":"检查字符串首字母是否大写","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","String Manipulation"],"tag":["Java","String","Uppercase"],"head":[["meta",{"name":"keywords","content":"Java, String, Uppercase"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-24/2024-07-24-Check%20if%20the%20First%20Letter%20of%20a%20String%20Is%20Uppercase.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"检查字符串首字母是否大写"}],["meta",{"property":"og:description","content":"检查字符串首字母是否大写 1. 引言 在本简短教程中，我们将熟悉在Java中检查字符串首字母是否大写的不同选项。 2. 示例 首先，我们将定义在所有解决方案中使用的示例字符串： 因此，示例字符串只是一个大写的名字。现在，让我们检查首字母是否大写的选项。 3. 核心Java解决方案 我们将熟悉的第一个解决方案不需要新依赖项。我们将使用来自_java.la..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-24T14:01:34.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:tag","content":"Uppercase"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-24T14:01:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"检查字符串首字母是否大写\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-24T14:01:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"检查字符串首字母是否大写 1. 引言 在本简短教程中，我们将熟悉在Java中检查字符串首字母是否大写的不同选项。 2. 示例 首先，我们将定义在所有解决方案中使用的示例字符串： 因此，示例字符串只是一个大写的名字。现在，让我们检查首字母是否大写的选项。 3. 核心Java解决方案 我们将熟悉的第一个解决方案不需要新依赖项。我们将使用来自_java.la..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 示例","slug":"_2-示例","link":"#_2-示例","children":[]},{"level":2,"title":"3. 核心Java解决方案","slug":"_3-核心java解决方案","link":"#_3-核心java解决方案","children":[]},{"level":2,"title":"4. 使用正则表达式","slug":"_4-使用正则表达式","link":"#_4-使用正则表达式","children":[]},{"level":2,"title":"5. Guava解决方案","slug":"_5-guava解决方案","link":"#_5-guava解决方案","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]},{"level":2,"title":"1. 引言","slug":"_1-引言-1","link":"#_1-引言-1","children":[]},{"level":2,"title":"2. 示例","slug":"_2-示例-1","link":"#_2-示例-1","children":[]},{"level":2,"title":"3. 核心Java解决方案","slug":"_3-核心java解决方案-1","link":"#_3-核心java解决方案-1","children":[]},{"level":2,"title":"4. 使用正则表达式","slug":"_4-使用正则表达式-1","link":"#_4-使用正则表达式-1","children":[]},{"level":2,"title":"5. Guava解决方案","slug":"_5-guava解决方案-1","link":"#_5-guava解决方案-1","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论-1","link":"#_6-结论-1","children":[]}],"git":{"createdTime":1721829694000,"updatedTime":1721829694000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.76,"words":1427},"filePathRelative":"posts/baeldung/2024-07-24/2024-07-24-Check if the First Letter of a String Is Uppercase.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>检查字符串首字母是否大写</h1>\\n<h2>1. 引言</h2>\\n<p>在本简短教程中，我们将熟悉在Java中检查字符串首字母是否大写的不同选项。</p>\\n<h2>2. 示例</h2>\\n<p>首先，我们将定义在所有解决方案中使用的示例字符串：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> example <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"Katie\\"</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
