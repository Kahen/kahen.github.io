import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DpYLEM_u.js";const e={},p=t('<hr><h1 id="在java中将所有枚举值填充到列表" tabindex="-1"><a class="header-anchor" href="#在java中将所有枚举值填充到列表"><span>在Java中将所有枚举值填充到列表</span></a></h1><p>Java在1.5版本中引入了枚举（enum）。将常量定义为枚举可以使代码更易读，并允许编译时检查。</p><p>在这个快速教程中，让我们探讨如何获取一个包含枚举类型所有实例的列表。</p><h3 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h3><p>像往常一样，我们通过一个例子来理解问题。</p><p>首先，我们创建一个名为<code>MagicNumber</code>的枚举类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">enum</span> <span class="token class-name">MagicNumber</span> <span class="token punctuation">{</span>\n    <span class="token constant">ONE</span><span class="token punctuation">,</span> <span class="token constant">TWO</span><span class="token punctuation">,</span> <span class="token constant">THREE</span><span class="token punctuation">,</span> <span class="token constant">FOUR</span><span class="token punctuation">,</span> <span class="token constant">FIVE</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们的目标是获取一个填充了所有<code>MagicNumber</code>枚举实例的列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MagicNumber</span><span class="token punctuation">&gt;</span></span>````` <span class="token constant">EXPECTED_LIST</span> <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token constant">ONE</span><span class="token punctuation">,</span> <span class="token constant">TWO</span><span class="token punctuation">,</span> <span class="token constant">THREE</span><span class="token punctuation">,</span> <span class="token constant">FOUR</span><span class="token punctuation">,</span> <span class="token constant">FIVE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里，我们使用<code>Arrays.asList()</code>方法从数组初始化列表。</p><p>接下来，我们将探索几种不同的方法来获得预期的结果。最后，为了简单起见，我们将使用单元测试断言来验证每种方法是否给出了期望的结果。</p><p>那么，接下来让我们看看它们是如何工作的。</p><h3 id="_3-使用enumtype-values-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用enumtype-values-方法"><span>3. 使用<code>EnumType.values()</code>方法</span></a></h3><p>当我们准备<code>EXPECTED_LIST</code>时，我们从数组中初始化它。因此，如果我们能够以数组的形式获取枚举的所有实例，我们就可以构建列表并解决问题。</p><p><strong>每个枚举类型都提供了标准的<code>values()</code>方法来返回所有实例的数组</strong>。所以接下来，让我们从<code>MagicNumber.values()</code>构建一个列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MagicNumber</span><span class="token punctuation">&gt;</span></span>````` result <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token class-name">MagicNumber</span><span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_LIST</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它会通过。所以，我们已经得到了预期的列表。</p><h3 id="_4-使用enumtype-class-getenumconstants-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用enumtype-class-getenumconstants-方法"><span>4. 使用<code>EnumType.class.getEnumConstants()</code>方法</span></a></h3><p>我们已经看到了使用枚举类型的<code>values()</code>来获取所有枚举实例的数组，这是一种标准且直接的方法。然而，我们需要确切知道枚举类型的名称，并在代码中硬编码，例如<code>MagicNumber.values()</code>。换句话说，这样我们就不能构建一个适用于所有枚举类型的工具方法。</p><p>自Java 1.5以来，<strong>类对象提供了<code>getEnumConstants()</code>方法来从枚举类对象中获取所有枚举实例</strong>。因此，我们可以让<code>getEnumConstants()</code>提供枚举实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MagicNumber</span><span class="token punctuation">&gt;</span></span>````` result <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token class-name">MagicNumber</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getEnumConstants</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_LIST</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上述测试所示，我们使用<code>MagicNumber.class.getEnumConstants()</code>来提供枚举实例数组。此外，它很容易构建一个适用于所有枚举类型的工具方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> ```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>``` <span class="token class-name">List</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>``` <span class="token function">enumValuesInList</span><span class="token punctuation">(</span><span class="token class-name">Class</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>``` enumCls<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">T</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> enumCls<span class="token punctuation">.</span><span class="token function">getEnumConstants</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> arr <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">emptyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得一提的是，<strong>如果类对象不是枚举类型，<code>getEnumConstants()</code>方法返回<code>null</code></strong>。正如我们所看到的，我们在这种情况下返回一个空的列表。</p><p>接下来，让我们创建一个测试来验证<code>enumValuesInList()</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MagicNumber</span><span class="token punctuation">&gt;</span></span>````` result1 <span class="token operator">=</span> <span class="token function">enumValuesInList</span><span class="token punctuation">(</span><span class="token class-name">MagicNumber</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_LIST</span><span class="token punctuation">,</span> result1<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">List</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>` result2 <span class="token operator">=</span> <span class="token function">enumValuesInList</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>result2<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它会通过。正如我们所看到的，如果类对象不是枚举类型，我们有一个空的列表。</p><h3 id="_5-使用enumset-allof-方法" tabindex="-1"><a class="header-anchor" href="#_5-使用enumset-allof-方法"><span>5. 使用<code>EnumSet.allOf()</code>方法</span></a></h3><p>自1.5版本以来，Java引入了一种特殊的<code>Set</code>来与枚举类一起工作：<code>EnumSet</code>。进一步地，<strong><code>EnumSet</code>有<code>allOf()</code>方法来加载给定枚举类型的所有实例</strong>。</p><p>因此，我们可以使用<code>ArrayList()</code>构造函数和填充的<code>EnumSet</code>来构建一个<code>List</code>对象。接下来，让我们通过一个测试来看看它是如何工作的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MagicNumber</span><span class="token punctuation">&gt;</span></span>````` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">EnumSet</span><span class="token punctuation">.</span><span class="token function">allOf</span><span class="token punctuation">(</span><span class="token class-name">MagicNumber</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_LIST</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>值得一提的是，<strong>调用<code>allOf()</code>方法会按照自然顺序存储枚举的实例</strong>。</p><h3 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h3><p>在这篇文章中，我们学习了三种获取包含所有枚举实例的<code>List</code>对象的方法。</p><p>像往常一样，这里展示的所有代码片段都可以在GitHub上找到。</p>',36),c=[p];function o(l,u){return s(),a("div",null,c)}const d=n(e,[["render",o],["__file","2024-07-12-Filling a List With All Enum Values in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Filling%20a%20List%20With%20All%20Enum%20Values%20in%20Java.html","title":"在Java中将所有枚举值填充到列表","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Enums"],"tag":["Java","Enum","List"],"head":[["meta",{"name":"keywords","content":"Java, Enum, List, Enum values, Arrays, EnumSet"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Filling%20a%20List%20With%20All%20Enum%20Values%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中将所有枚举值填充到列表"}],["meta",{"property":"og:description","content":"在Java中将所有枚举值填充到列表 Java在1.5版本中引入了枚举（enum）。将常量定义为枚举可以使代码更易读，并允许编译时检查。 在这个快速教程中，让我们探讨如何获取一个包含枚举类型所有实例的列表。 2. 问题介绍 像往常一样，我们通过一个例子来理解问题。 首先，我们创建一个名为MagicNumber的枚举类型： 然后，我们的目标是获取一个填充了..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T15:41:21.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Enum"}],["meta",{"property":"article:tag","content":"List"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T15:41:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中将所有枚举值填充到列表\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T15:41:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中将所有枚举值填充到列表 Java在1.5版本中引入了枚举（enum）。将常量定义为枚举可以使代码更易读，并允许编译时检查。 在这个快速教程中，让我们探讨如何获取一个包含枚举类型所有实例的列表。 2. 问题介绍 像往常一样，我们通过一个例子来理解问题。 首先，我们创建一个名为MagicNumber的枚举类型： 然后，我们的目标是获取一个填充了..."},"headers":[{"level":3,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":3,"title":"3. 使用EnumType.values()方法","slug":"_3-使用enumtype-values-方法","link":"#_3-使用enumtype-values-方法","children":[]},{"level":3,"title":"4. 使用EnumType.class.getEnumConstants()方法","slug":"_4-使用enumtype-class-getenumconstants-方法","link":"#_4-使用enumtype-class-getenumconstants-方法","children":[]},{"level":3,"title":"5. 使用EnumSet.allOf()方法","slug":"_5-使用enumset-allof-方法","link":"#_5-使用enumset-allof-方法","children":[]},{"level":3,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720798881000,"updatedTime":1720798881000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.17,"words":952},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Filling a List With All Enum Values in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>在Java中将所有枚举值填充到列表</h1>\\n<p>Java在1.5版本中引入了枚举（enum）。将常量定义为枚举可以使代码更易读，并允许编译时检查。</p>\\n<p>在这个快速教程中，让我们探讨如何获取一个包含枚举类型所有实例的列表。</p>\\n<h3>2. 问题介绍</h3>\\n<p>像往常一样，我们通过一个例子来理解问题。</p>\\n<p>首先，我们创建一个名为<code>MagicNumber</code>的枚举类型：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">enum</span> <span class=\\"token class-name\\">MagicNumber</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token constant\\">ONE</span><span class=\\"token punctuation\\">,</span> <span class=\\"token constant\\">TWO</span><span class=\\"token punctuation\\">,</span> <span class=\\"token constant\\">THREE</span><span class=\\"token punctuation\\">,</span> <span class=\\"token constant\\">FOUR</span><span class=\\"token punctuation\\">,</span> <span class=\\"token constant\\">FIVE</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
