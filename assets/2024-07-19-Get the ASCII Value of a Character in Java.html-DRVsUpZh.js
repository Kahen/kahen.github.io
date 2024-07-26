import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-C4eFoh0f.js";const t={},p=e(`<hr><h1 id="在java中获取字符的ascii值" tabindex="-1"><a class="header-anchor" href="#在java中获取字符的ascii值"><span>在Java中获取字符的ASCII值</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在这篇简短的教程中，我们将看到如何在Java中<strong>获取字符的ASCII值</strong>以及<strong>将ASCII值转换为其字符等价物</strong>。</p><h3 id="_2-1-使用强制类型转换" tabindex="-1"><a class="header-anchor" href="#_2-1-使用强制类型转换"><span>2.1. 使用强制类型转换</span></a></h3><p>要获取字符的ASCII值，我们可以简单地将我们的_char_强制转换为_int_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">char</span> c <span class="token operator">=</span> <span class="token char">&#39;a&#39;</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这里是输出结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token number">97</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>记住，Java中的_char_可以是Unicode字符。因此<strong>我们的角色必须是一个ASCII字符</strong>，才能获得其正确的ASCII数值。</p><h3 id="_2-2-字符串中的字符" tabindex="-1"><a class="header-anchor" href="#_2-2-字符串中的字符"><span>2.2. 字符串中的字符</span></a></h3><p>如果我们的_char_在_String_中，我们可以使用_charAt()_方法来检索它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">&quot;abc&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">char</span> c <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-获取ascii值对应的字符" tabindex="-1"><a class="header-anchor" href="#_3-获取ascii值对应的字符"><span>3. 获取ASCII值对应的字符</span></a></h2><p>简单来说，我们可以通过强制类型转换将ASCII值转换为其等价的_char_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> value <span class="token operator">=</span> <span class="token number">65</span><span class="token punctuation">;</span>
<span class="token keyword">char</span> c <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> value<span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是代码的输出结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">A</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>值得注意的是，我们需要提供一个在ASCII值范围内（<em>0</em>– <em>127</em>）的整数，才能获得相应的ASCII字符。任何超出ASCII范围的整数不会返回_null_，而是返回该整数值在Unicode字符集中的字符表示。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在这篇文章中，我们学习了如何在Java中获取字符的ASCII值。此外，我们还看到了如何获取ASCII值对应的字符。</p>`,21),c=[p];function o(i,l){return s(),n("div",null,c)}const d=a(t,[["render",o],["__file","2024-07-19-Get the ASCII Value of a Character in Java.html.vue"]]),h=JSON.parse(`{"path":"/posts/baeldung/2024-07-19/2024-07-19-Get%20the%20ASCII%20Value%20of%20a%20Character%20in%20Java.html","title":"在Java中获取字符的ASCII值","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","ASCII"],"tag":["Java","ASCII","Character"],"head":[["meta",{"name":"keywords","content":"Java, ASCII, Character"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Get%20the%20ASCII%20Value%20of%20a%20Character%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中获取字符的ASCII值"}],["meta",{"property":"og:description","content":"在Java中获取字符的ASCII值 1. 概述 在这篇简短的教程中，我们将看到如何在Java中获取字符的ASCII值以及将ASCII值转换为其字符等价物。 2.1. 使用强制类型转换 要获取字符的ASCII值，我们可以简单地将我们的_char_强制转换为_int_： 这里是输出结果： 记住，Java中的_char_可以是Unicode字符。因此我们的角..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T07:34:31.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"ASCII"}],["meta",{"property":"article:tag","content":"Character"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T07:34:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中获取字符的ASCII值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T07:34:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中获取字符的ASCII值 1. 概述 在这篇简短的教程中，我们将看到如何在Java中获取字符的ASCII值以及将ASCII值转换为其字符等价物。 2.1. 使用强制类型转换 要获取字符的ASCII值，我们可以简单地将我们的_char_强制转换为_int_： 这里是输出结果： 记住，Java中的_char_可以是Unicode字符。因此我们的角..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[{"level":3,"title":"2.1. 使用强制类型转换","slug":"_2-1-使用强制类型转换","link":"#_2-1-使用强制类型转换","children":[]},{"level":3,"title":"2.2. 字符串中的字符","slug":"_2-2-字符串中的字符","link":"#_2-2-字符串中的字符","children":[]}]},{"level":2,"title":"3. 获取ASCII值对应的字符","slug":"_3-获取ascii值对应的字符","link":"#_3-获取ascii值对应的字符","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721374471000,"updatedTime":1721374471000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.25,"words":375},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Get the ASCII Value of a Character in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>在Java中获取字符的ASCII值</h1>\\n<h2>1. 概述</h2>\\n<p>在这篇简短的教程中，我们将看到如何在Java中<strong>获取字符的ASCII值</strong>以及<strong>将ASCII值转换为其字符等价物</strong>。</p>\\n<h3>2.1. 使用强制类型转换</h3>\\n<p>要获取字符的ASCII值，我们可以简单地将我们的_char_强制转换为_int_：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">char</span> c <span class=\\"token operator\\">=</span> <span class=\\"token char\\">'a'</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">)</span> c<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}`);export{d as comp,h as data};
