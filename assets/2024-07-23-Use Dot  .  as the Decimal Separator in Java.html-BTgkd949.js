import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-LwwahXlT.js";const t={},o=e(`<h1 id="java中使用点-作为小数分隔符" tabindex="-1"><a class="header-anchor" href="#java中使用点-作为小数分隔符"><span>Java中使用点“.”作为小数分隔符</span></a></h1><p>在这个简短的教程中，我们将看到如何在Java中格式化数字输出时使用点“.”作为小数分隔符。</p><h3 id="_2-使用string-format-方法" tabindex="-1"><a class="header-anchor" href="#_2-使用string-format-方法"><span>2. 使用<code>String.format()</code>方法</span></a></h3><p>通常，我们只需要使用<code>String.format()</code>方法，如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">double</span> d <span class="token operator">=</span> <span class="token number">10.01d</span><span class="token punctuation">;</span>
<span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%.2f&quot;</span><span class="token punctuation">,</span> d<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法使用我们JVM的默认<code>Locale</code>来选择小数分隔符。例如，对于美国<code>Locale</code>，它将是一个点，而对于德国，它将是一个逗号。</p><p>如果它不是一个点，我们可以<strong>使用这个方法的重载版本，其中我们传入我们自定义的<code>Locale</code></strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token class-name">Locale</span><span class="token punctuation">.</span><span class="token constant">US</span><span class="token punctuation">,</span> <span class="token string">&quot;%.2f&quot;</span><span class="token punctuation">,</span> d<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-使用decimalformat对象" tabindex="-1"><a class="header-anchor" href="#_3-使用decimalformat对象"><span>3. 使用<code>DecimalFormat</code>对象</span></a></h3><p>我们可以使用<code>DecimalFormat</code>对象的<code>format()</code>方法来达到相同的目标：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">DecimalFormatSymbols</span> decimalFormatSymbols <span class="token operator">=</span> <span class="token class-name">DecimalFormatSymbols</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
decimalFormatSymbols<span class="token punctuation">.</span><span class="token function">setDecimalSeparator</span><span class="token punctuation">(</span><span class="token char">&#39;.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">new</span> <span class="token class-name">DecimalFormat</span><span class="token punctuation">(</span><span class="token string">&quot;0.00&quot;</span><span class="token punctuation">,</span> decimalFormatSymbols<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-使用formatter对象" tabindex="-1"><a class="header-anchor" href="#_4-使用formatter对象"><span>4. 使用<code>Formatter</code>对象</span></a></h3><p>我们也可以使用<code>Formatter</code>对象的<code>format()</code>方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">new</span> <span class="token class-name">Formatter</span><span class="token punctuation">(</span><span class="token class-name">Locale</span><span class="token punctuation">.</span><span class="token constant">US</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%.2f&quot;</span><span class="token punctuation">,</span> d<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-使用locale-setdefault-方法" tabindex="-1"><a class="header-anchor" href="#_5-使用locale-setdefault-方法"><span>5. 使用<code>Locale.setDefault()</code>方法</span></a></h3><p>当然，我们可以手动为我们的应用程序配置<code>Locale</code>，但是<strong>更改默认的<code>Locale</code>是不被推荐的</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Locale</span><span class="token punctuation">.</span><span class="token function">setDefault</span><span class="token punctuation">(</span><span class="token class-name">Locale</span><span class="token punctuation">.</span><span class="token constant">US</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%.2f&quot;</span><span class="token punctuation">,</span> d<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-使用vm选项" tabindex="-1"><a class="header-anchor" href="#_6-使用vm选项"><span>6. 使用VM选项</span></a></h3><p>通过设置<code>user.language</code>和<code>user.region</code>VM选项，我们还可以为我们的应用程序配置<code>Locale</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token operator">-</span><span class="token class-name">Duser</span><span class="token punctuation">.</span>language<span class="token operator">=</span>en <span class="token operator">-</span><span class="token class-name">Duser</span><span class="token punctuation">.</span>region<span class="token operator">=</span><span class="token constant">US</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_7-使用printf-方法" tabindex="-1"><a class="header-anchor" href="#_7-使用printf-方法"><span>7. 使用<code>printf()</code>方法</span></a></h3><p>如果我们不需要获取格式化字符串的值，而只是打印它，我们可以使用<code>printf()</code>方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token class-name">Locale</span><span class="token punctuation">.</span><span class="token constant">US</span><span class="token punctuation">,</span> <span class="token string">&quot;%.2f&quot;</span><span class="token punctuation">,</span> d<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h3><p>总结来说，我们学习了在Java中使用点“.”作为小数分隔符的不同方法。</p>`,25),c=[o];function p(l,i){return s(),n("div",null,c)}const u=a(t,[["render",p],["__file","2024-07-23-Use Dot  .  as the Decimal Separator in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-23/2024-07-23-Use%20Dot%20%20.%20%20as%20the%20Decimal%20Separator%20in%20Java.html","title":"Java中使用点“.”作为小数分隔符","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Java","Locale","DecimalFormat"],"head":[["meta",{"name":"keywords","content":"Java, Locale, DecimalFormat, String.format"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-23/2024-07-23-Use%20Dot%20%20.%20%20as%20the%20Decimal%20Separator%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中使用点“.”作为小数分隔符"}],["meta",{"property":"og:description","content":"Java中使用点“.”作为小数分隔符 在这个简短的教程中，我们将看到如何在Java中格式化数字输出时使用点“.”作为小数分隔符。 2. 使用String.format()方法 通常，我们只需要使用String.format()方法，如下所示： 这个方法使用我们JVM的默认Locale来选择小数分隔符。例如，对于美国Locale，它将是一个点，而对于德国..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T05:25:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Locale"}],["meta",{"property":"article:tag","content":"DecimalFormat"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T05:25:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中使用点“.”作为小数分隔符\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-23T05:25:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中使用点“.”作为小数分隔符 在这个简短的教程中，我们将看到如何在Java中格式化数字输出时使用点“.”作为小数分隔符。 2. 使用String.format()方法 通常，我们只需要使用String.format()方法，如下所示： 这个方法使用我们JVM的默认Locale来选择小数分隔符。例如，对于美国Locale，它将是一个点，而对于德国..."},"headers":[{"level":3,"title":"2. 使用String.format()方法","slug":"_2-使用string-format-方法","link":"#_2-使用string-format-方法","children":[]},{"level":3,"title":"3. 使用DecimalFormat对象","slug":"_3-使用decimalformat对象","link":"#_3-使用decimalformat对象","children":[]},{"level":3,"title":"4. 使用Formatter对象","slug":"_4-使用formatter对象","link":"#_4-使用formatter对象","children":[]},{"level":3,"title":"5. 使用Locale.setDefault()方法","slug":"_5-使用locale-setdefault-方法","link":"#_5-使用locale-setdefault-方法","children":[]},{"level":3,"title":"6. 使用VM选项","slug":"_6-使用vm选项","link":"#_6-使用vm选项","children":[]},{"level":3,"title":"7. 使用printf()方法","slug":"_7-使用printf-方法","link":"#_7-使用printf-方法","children":[]},{"level":3,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1721712306000,"updatedTime":1721712306000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.36,"words":409},"filePathRelative":"posts/baeldung/2024-07-23/2024-07-23-Use Dot  .  as the Decimal Separator in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这个简短的教程中，我们将看到如何在Java中格式化数字输出时使用点“.”作为小数分隔符。</p>\\n<h3>2. 使用<code>String.format()</code>方法</h3>\\n<p>通常，我们只需要使用<code>String.format()</code>方法，如下所示：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">double</span> d <span class=\\"token operator\\">=</span> <span class=\\"token number\\">10.01d</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">format</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"%.2f\\"</span><span class=\\"token punctuation\\">,</span> d<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{u as comp,m as data};
