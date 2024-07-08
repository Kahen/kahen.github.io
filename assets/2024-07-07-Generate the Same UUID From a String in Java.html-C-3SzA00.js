import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-C_fPDS1x.js";const e={},p=t(`<h1 id="在java中从字符串生成相同的uuid" tabindex="-1"><a class="header-anchor" href="#在java中从字符串生成相同的uuid"><span>在Java中从字符串生成相同的UUID</span></a></h1><p>我们经常需要在应用程序中为各种目的生成唯一标识符。生成唯一标识符的一种常用方法是使用通用唯一标识符（UUID）。</p><p>在本教程中，我们将探讨如何在Java中从字符串生成相同的UUID。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>当我们谈论从字符串生成UUID时，可能有两种情况：</p><ul><li>场景1 - 输入字符串是标准的UUID字符串格式。</li><li>场景2 - 给定的字符串是一个自由格式的字符串。</li></ul><p>接下来，我们将更详细地了解如何从字符串生成UUID对象。当然，我们将涵盖两种场景。</p><p>为了简化，我们将使用单元测试断言来验证每种方法是否能够产生预期的结果。</p><h2 id="_3-给定字符串是标准的uuid表示" tabindex="-1"><a class="header-anchor" href="#_3-给定字符串是标准的uuid表示"><span>3. 给定字符串是标准的UUID表示</span></a></h2><p><strong>标准UUID字符串格式由五个十六进制数字组组成，由连字符分隔</strong>，例如：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> inputStr <span class="token operator">=</span> <span class="token string">&quot;bbcc4621-d88f-4a94-ae2f-b38072bf5087&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这种情况下，我们希望从给定的字符串中获取一个UUID对象。此外，<strong>生成的UUID对象的字符串表示必须等于输入字符串</strong>。换句话说，这意味着<code>generatedUUID.toString()</code>与输入字符串相同。</p><p>因此，确切地说，我们想要“解析”标准UUID格式的输入字符串，并根据解析后的值构建一个新的UUID对象。</p><p>为了实现这一点，我们可以使用<code>UUID.fromString()</code>方法。接下来，让我们编写一个测试来看看它的工作原理：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> inputStr <span class="token operator">=</span> <span class="token string">&quot;bbcc4621-d88f-4a94-ae2f-b38072bf5087&quot;</span><span class="token punctuation">;</span>

<span class="token class-name">UUID</span> uuid <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">fromString</span><span class="token punctuation">(</span>inputStr<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">UUID</span> uuid2 <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">fromString</span><span class="token punctuation">(</span>inputStr<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">UUID</span> uuid3 <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">fromString</span><span class="token punctuation">(</span>inputStr<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span>inputStr<span class="token punctuation">,</span> uuid<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span>uuid<span class="token punctuation">,</span> uuid2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>uuid<span class="token punctuation">,</span> uuid3<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的测试所示，我们简单地调用了<code>UUID.fromString(inputStr)</code>来生成UUID对象。标准的UUID类负责输入解析和UUID生成。</p><p>此外，在我们的测试中，我们从同一个输入字符串生成了多个UUID对象，结果发现<strong>由输入字符串生成的所有UUID对象都是相等的</strong>。</p><p>使用<code>UUID.fromString()</code>方法很方便。然而，值得一提的是，输入字符串必须是标准的UUID格式。否则，该方法将抛出<code>IllegalArgumentException</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> inputStr <span class="token operator">=</span> <span class="token string">&quot;I am not a standard UUID representation.&quot;</span><span class="token punctuation">;</span>
<span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">fromString</span><span class="token punctuation">(</span>inputStr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-给定输入是自由格式的字符串" tabindex="-1"><a class="header-anchor" href="#_4-给定输入是自由格式的字符串"><span>4. 给定输入是自由格式的字符串</span></a></h2><p>我们已经看到<code>UUID.fromString()</code>可以方便地从标准UUID格式字符串构造UUID对象。让我们看看如何从自由格式的字符串生成UUID对象。</p><p><strong>UUID类为我们提供了<code>nameUUIDFromBytes(byte[] name)</code>方法来构建版本3（也称为基于名称的）UUID对象。</strong></p><p>由于该方法只接受字节数组（<code>byte[]</code>），我们需要将输入字符串转换为字节数组才能使用<code>UUID.nameUUIDFromBytes()</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> inputStr <span class="token operator">=</span> <span class="token string">&quot;I am not a standard UUID representation.&quot;</span><span class="token punctuation">;</span>

<span class="token class-name">UUID</span> uuid <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">nameUUIDFromBytes</span><span class="token punctuation">(</span>inputStr<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">UUID</span> uuid2 <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">nameUUIDFromBytes</span><span class="token punctuation">(</span>inputStr<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">UUID</span> uuid3 <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">nameUUIDFromBytes</span><span class="token punctuation">(</span>inputStr<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertTrue</span><span class="token punctuation">(</span>uuid <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span>uuid<span class="token punctuation">,</span> uuid2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>uuid<span class="token punctuation">,</span> uuid3<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的测试所示，我们通过三次调用<code>UUID.nameUUIDFromBytes()</code>并使用相同的输入字符串生成了三个UUID对象，这三个UUID彼此相等。</p><p>内部地，这个方法<strong>基于输入字节数组的MD5哈希返回一个UUID对象</strong>。因此，对于给定的输入名称，生成的UUID保证是唯一的。</p><p>此外，值得一提的是<strong>由<code>UUID.nameUUIDFromBytes()</code>方法生成的UUID对象是版本3的UUID</strong>。我们可以使用<code>version()</code>方法来验证它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">UUID</span> uuid <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">nameUUIDFromBytes</span><span class="token punctuation">(</span>inputStr<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> uuid<span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**版本5的UUID使用SHA-1（160位）哈希函数而不是MD5。**如果需要版本5的UUID，我们可以直接使用我们在介绍版本3和5的UUID时创建的<code>generateType5UUID(String name)</code>方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> inputStr <span class="token operator">=</span> <span class="token string">&quot;I am not a standard UUID representation.&quot;</span><span class="token punctuation">;</span>

<span class="token class-name">UUID</span> uuid <span class="token operator">=</span> <span class="token class-name">UUIDGenerator</span><span class="token punctuation">.</span><span class="token function">generateType5UUID</span><span class="token punctuation">(</span>inputStr<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">UUID</span> uuid2 <span class="token operator">=</span> <span class="token class-name">UUIDGenerator</span><span class="token punctuation">.</span><span class="token function">generateType5UUID</span><span class="token punctuation">(</span>inputStr<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">UUID</span> uuid3 <span class="token operator">=</span> <span class="token class-name">UUIDGenerator</span><span class="token punctuation">.</span><span class="token function">generateType5UUID</span><span class="token punctuation">(</span>inputStr<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> uuid<span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertTrue</span><span class="token punctuation">(</span>uuid <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span>uuid<span class="token punctuation">,</span> uuid2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>uuid<span class="token punctuation">,</span> uuid3<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了如何从字符串生成相同的UUID对象。我们根据输入格式覆盖了两种场景：</p><ul><li>标准UUID格式字符串 - 使用<code>UUID.fromString()</code></li><li>自由格式字符串 - 使用<code>UUID.nameUUIDFromBytes()</code></li></ul><p>像往常一样，这里展示的所有代码片段都可以在GitHub上找到。</p>`,34),o=[p];function c(i,u){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-07-Generate the Same UUID From a String in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-Generate%20the%20Same%20UUID%20From%20a%20String%20in%20Java.html","title":"在Java中从字符串生成相同的UUID","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["UUID","Java"],"head":[["meta",{"name":"keywords","content":"Java, UUID, 字符串, 唯一标识符"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-Generate%20the%20Same%20UUID%20From%20a%20String%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中从字符串生成相同的UUID"}],["meta",{"property":"og:description","content":"在Java中从字符串生成相同的UUID 我们经常需要在应用程序中为各种目的生成唯一标识符。生成唯一标识符的一种常用方法是使用通用唯一标识符（UUID）。 在本教程中，我们将探讨如何在Java中从字符串生成相同的UUID。 2. 问题介绍 当我们谈论从字符串生成UUID时，可能有两种情况： 场景1 - 输入字符串是标准的UUID字符串格式。 场景2 - ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T18:40:02.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"UUID"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T18:40:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中从字符串生成相同的UUID\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T18:40:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中从字符串生成相同的UUID 我们经常需要在应用程序中为各种目的生成唯一标识符。生成唯一标识符的一种常用方法是使用通用唯一标识符（UUID）。 在本教程中，我们将探讨如何在Java中从字符串生成相同的UUID。 2. 问题介绍 当我们谈论从字符串生成UUID时，可能有两种情况： 场景1 - 输入字符串是标准的UUID字符串格式。 场景2 - ..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 给定字符串是标准的UUID表示","slug":"_3-给定字符串是标准的uuid表示","link":"#_3-给定字符串是标准的uuid表示","children":[]},{"level":2,"title":"4. 给定输入是自由格式的字符串","slug":"_4-给定输入是自由格式的字符串","link":"#_4-给定输入是自由格式的字符串","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720377602000,"updatedTime":1720377602000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.59,"words":1077},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-Generate the Same UUID From a String in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>我们经常需要在应用程序中为各种目的生成唯一标识符。生成唯一标识符的一种常用方法是使用通用唯一标识符（UUID）。</p>\\n<p>在本教程中，我们将探讨如何在Java中从字符串生成相同的UUID。</p>\\n<h2>2. 问题介绍</h2>\\n<p>当我们谈论从字符串生成UUID时，可能有两种情况：</p>\\n<ul>\\n<li>场景1 - 输入字符串是标准的UUID字符串格式。</li>\\n<li>场景2 - 给定的字符串是一个自由格式的字符串。</li>\\n</ul>\\n<p>接下来，我们将更详细地了解如何从字符串生成UUID对象。当然，我们将涵盖两种场景。</p>\\n<p>为了简化，我们将使用单元测试断言来验证每种方法是否能够产生预期的结果。</p>","autoDesc":true}');export{d as comp,k as data};
