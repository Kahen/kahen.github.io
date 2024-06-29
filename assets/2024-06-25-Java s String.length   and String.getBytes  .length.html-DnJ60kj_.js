import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-Cjxx-itH.js";const e={},p=t(`<h1 id="java中string-length-与string-getbytes-length的区别" tabindex="-1"><a class="header-anchor" href="#java中string-length-与string-getbytes-length的区别"><span>Java中String.length()与String.getBytes().length的区别</span></a></h1><p>当我们在Java中工作时，操作字符串是一项基本技能。因此，理解与字符串相关的方法是编写高效且无误代码的关键。</p><p>两个常用的方法，String.length()和String.getBytes().length，乍一看可能看起来相似，但它们服务于不同的目的。</p><p>在本教程中，我们将了解这两种方法并探讨它们之间的区别。此外，我们还将讨论何时使用每一种方法。</p><h3 id="string-length-和string-getbytes-length的初步了解" tabindex="-1"><a class="header-anchor" href="#string-length-和string-getbytes-length的初步了解"><span>String.length()和String.getBytes().length的初步了解</span></a></h3><p>正如方法名所暗示的，String.length()方法返回字符串的长度。另一方面，String.getBytes()从给定的字符串中获取默认编码的字节数组。然后，String.getBytes().length报告数组的长度。</p><p>如果我们写一个测试，我们可能会看到它们返回相同的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> s <span class="token operator">=</span> <span class="token string">&quot;beautiful&quot;</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">,</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">,</span> s<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在处理Java中的字符串时，String.length()和String.getBytes().length是否总是产生相同的值？</p><p>接下来，我们来找出答案。</p><h3 id="string-length-和string-getbytes-length可能返回不同的值" tabindex="-1"><a class="header-anchor" href="#string-length-和string-getbytes-length可能返回不同的值"><span>String.length()和String.getBytes().length可能返回不同的值</span></a></h3><p>当前JVM的默认字符编码或字符集在决定String.getBytes().length的结果中起着重要作用。如果我们没有向String.getBytes()传递任何参数，它使用默认的编码方案进行编码。</p><p>我们可以使用Charset.defaultCharset().displayName()方法检查Java环境的默认编码。例如，当前JVM的默认编码是UTF-8：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Charset</span><span class="token punctuation">.</span><span class="token function">defaultCharset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">displayName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 输出：UTF-8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们测试另外两个字符串，看看String.length()和String.getBytes().length是否仍然返回相同的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> de <span class="token operator">=</span> <span class="token string">&quot;schöne&quot;</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> de<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> de<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> cn <span class="token operator">=</span> <span class="token string">&quot;美丽&quot;</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> cn<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> cn<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上述测试所示，我们首先用德语中的“beautiful”（“schöne”）进行了测试，然后我们又取了另一个字符串，这是中文中的“beautiful”（“美丽”）。结果表明，在两次测试中，String.length()和String.getBytes().length都产生了不同的值。</p><p>接下来，让我们找出为什么会发生这种情况。</p><h3 id="字符编码" tabindex="-1"><a class="header-anchor" href="#字符编码"><span>字符编码</span></a></h3><p>在了解为什么String.length()和String.getBytes().length在字符串“schöne”和“美丽”上给出了不同的值之前，让我们快速了解一下字符编码的工作原理。</p><p>有许多字符编码方案，例如UTF-8和UTF-16。我们可以将这些编码方案分为两类：</p><ul><li>可变长度编码</li><li>固定长度编码</li></ul><p>我们不会深入探讨字符编码。然而，对这两种编码技术的一般了解将有助于理解为什么String.getBytes().length可能与String.length()有不同的值。</p><p>接下来，让我们通过示例快速了解这两种编码类型。</p><h4 id="_4-1-固定长度编码" tabindex="-1"><a class="header-anchor" href="#_4-1-固定长度编码"><span>4.1. 固定长度编码</span></a></h4><p>固定长度编码使用相同数量的字节来编码任何字符。固定长度编码的一个典型例子是UTF-32，它总是使用四个字节来编码一个字符。因此，这是用UTF-32编码“beautiful”的方式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">char</span>    byte1 byte2 byte3 byte4
 b        <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">98</span>
 e        <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">101</span>
 a        <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">97</span>
 u        <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">117</span>
 <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
 l        <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">108</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，<strong>当使用UTF-32字符集调用String.getBytes()时，结果字节数组的长度将始终是字符串中字符数量的四倍：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Charset</span> <span class="token constant">UTF_32</span> <span class="token operator">=</span> <span class="token class-name">Charset</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">&quot;UTF_32&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> en <span class="token operator">=</span> <span class="token string">&quot;beautiful&quot;</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">,</span> en<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">9</span> <span class="token operator">*</span> <span class="token number">4</span><span class="token punctuation">,</span> en<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token constant">UTF_32</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> de <span class="token operator">=</span> <span class="token string">&quot;schöne&quot;</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> de<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">6</span> <span class="token operator">*</span> <span class="token number">4</span><span class="token punctuation">,</span> de<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token constant">UTF_32</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> cn <span class="token operator">=</span> <span class="token string">&quot;美丽&quot;</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> cn<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">*</span> <span class="token number">4</span><span class="token punctuation">,</span> cn<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token constant">UTF_32</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是说，<strong>如果UTF-32被设置为JVM的默认编码，String.length()和String.getBytes().length的结果总是不同的</strong>。</p><p>有些人可能会注意到，在存储UTF-32编码的字符时，即使某些字符，如ASCII字符，只需要一个字节，我们仍然分配四个字节，其中三个填充为零。这是有点低效的。</p><p>因此，引入了可变长度字符编码。</p><h4 id="_4-2-可变长度编码" tabindex="-1"><a class="header-anchor" href="#_4-2-可变长度编码"><span>4.2. 可变长度编码</span></a></h4><p><strong>可变长度编码使用不同数量的字节来编码不同的字符</strong>。UTF-8是我们的默认编码。此外，它是可变长度编码方案的一个例子。让我们看看UTF-8是如何编码字符的。</p><p><strong>UTF-8根据字符的代码点使用一到四个字节来编码字符</strong>。代码点是字符的整数表示。例如，&#39;b&#39;的代码点是十进制的98或十六进制的U+0062，这与它的ASCII代码相同。</p><p>接下来，让我们看看UTF-8如何确定用于编码字符的字节数：</p><table><thead><tr><th>代码点范围</th><th>字节数</th></tr></thead><tbody><tr><td>U+0000 to U+007F</td><td>1</td></tr><tr><td>U+0080 to U+07FF</td><td>2</td></tr><tr><td>U+0800 to U+FFFF</td><td>3</td></tr><tr><td>U+10000 to U+10FFFF</td><td>4</td></tr></tbody></table><p>我们知道字符&#39;b&#39;的代码点是U+0062，它在上表的第一行范围内。因此，UTF-8只使用一个字节来编码它。<strong>由于U+0000到U+007F是十进制的0到127，UTF-8使用一个字节来编码所有标准ASCII字符</strong>。这就是为什么在字符串“beautiful”上，String.length()和String.getBytes().length给出了相同的结果（9）。</p><p>然而，如果我们检查&#39;ö&#39;、&#39;美&#39;和&#39;丽&#39;的代码点，我们会看到UTF-8使用不同数量的字节来编码它们：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;f6&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">toHexString</span><span class="token punctuation">(</span><span class="token char">&#39;ö&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// U+00F6 -&gt; 2 bytes</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;7f8e&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">toHexString</span><span class="token punctuation">(</span><span class="token char">&#39;美&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// U+7F8E -&gt; 3 bytes</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;4e3d&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">toHexString</span><span class="token punctuation">(</span><span class="token char">&#39;丽&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// U+4E3D -&gt; 3 bytes</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，“schöne”.getBytes().length返回7（5 + 2），而“美丽”.getBytes().length产生6（3 + 3）。</p><h3 id="如何选择string-length-和string-getbytes-length" tabindex="-1"><a class="header-anchor" href="#如何选择string-length-和string-getbytes-length"><span>如何选择String.length()和String.getBytes().length</span></a></h3><p>现在，我们清楚了String.length()和String.getBytes().length返回相同值的场景以及它们何时不同。然后，可能会出现一个问题：我们应该选择哪种方法？</p><p>在决定这些方法时，我们应该考虑我们任务的上下文：</p><ul><li><strong>String.length() – 当我们使用字符和字符串的逻辑内容</strong>，并想要获得字符串中的总字符数，例如用户输入的最大长度验证或在字符串中移动字符</li><li><strong>String.bytes().length – 当我们处理以字节为单位的操作并需要知道字符串的大小</strong>，例如从文件或网络流中读取或写入</li></ul><p>值得注意的是，当我们使用String.bytes()时，我们应该记住<strong>字符编码起着重要作用</strong>。String.bytes()使用默认的编码方案对字符串进行编码。除此之外，<strong>我们还可以向方法传递所需的字符集来对字符串进行编码</strong>，例如String.bytes(Charset.forName(&quot;UTF_32&quot;))或String.bytes(StandardCharsets.UTF_16)</p><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在本文中，我们一般了解了字符编码的工作原理，并探讨了为什么String.length()和String.getBytes().length可能会产生不同的结果。此外，我们还讨论了如何在String.length()和String.getBytes().length之间进行选择。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>`,49),l=[p];function o(c,i){return a(),s("div",null,l)}const g=n(e,[["render",o],["__file","2024-06-25-Java s String.length   and String.getBytes  .length.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-25/2024-06-25-Java%20s%20String.length%20%20%20and%20String.getBytes%20%20.length.html","title":"Java中String.length()与String.getBytes().length的区别","lang":"zh-CN","frontmatter":{"date":"2024-06-25T00:00:00.000Z","category":["Java","字符串"],"tag":["String.length()","String.getBytes().length"],"head":[["meta",{"name":"keywords","content":"Java, 字符串, 编码, 字符编码, UTF-8, UTF-32"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-25/2024-06-25-Java%20s%20String.length%20%20%20and%20String.getBytes%20%20.length.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中String.length()与String.getBytes().length的区别"}],["meta",{"property":"og:description","content":"Java中String.length()与String.getBytes().length的区别 当我们在Java中工作时，操作字符串是一项基本技能。因此，理解与字符串相关的方法是编写高效且无误代码的关键。 两个常用的方法，String.length()和String.getBytes().length，乍一看可能看起来相似，但它们服务于不同的目的。 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T03:31:57.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"String.length()"}],["meta",{"property":"article:tag","content":"String.getBytes().length"}],["meta",{"property":"article:published_time","content":"2024-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-25T03:31:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中String.length()与String.getBytes().length的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-25T03:31:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中String.length()与String.getBytes().length的区别 当我们在Java中工作时，操作字符串是一项基本技能。因此，理解与字符串相关的方法是编写高效且无误代码的关键。 两个常用的方法，String.length()和String.getBytes().length，乍一看可能看起来相似，但它们服务于不同的目的。 ..."},"headers":[{"level":3,"title":"String.length()和String.getBytes().length的初步了解","slug":"string-length-和string-getbytes-length的初步了解","link":"#string-length-和string-getbytes-length的初步了解","children":[]},{"level":3,"title":"String.length()和String.getBytes().length可能返回不同的值","slug":"string-length-和string-getbytes-length可能返回不同的值","link":"#string-length-和string-getbytes-length可能返回不同的值","children":[]},{"level":3,"title":"字符编码","slug":"字符编码","link":"#字符编码","children":[]},{"level":3,"title":"如何选择String.length()和String.getBytes().length","slug":"如何选择string-length-和string-getbytes-length","link":"#如何选择string-length-和string-getbytes-length","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1719286317000,"updatedTime":1719286317000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.7,"words":1710},"filePathRelative":"posts/baeldung/2024-06-25/2024-06-25-Java s String.length   and String.getBytes  .length.md","localizedDate":"2024年6月25日","excerpt":"\\n<p>当我们在Java中工作时，操作字符串是一项基本技能。因此，理解与字符串相关的方法是编写高效且无误代码的关键。</p>\\n<p>两个常用的方法，String.length()和String.getBytes().length，乍一看可能看起来相似，但它们服务于不同的目的。</p>\\n<p>在本教程中，我们将了解这两种方法并探讨它们之间的区别。此外，我们还将讨论何时使用每一种方法。</p>\\n<h3>String.length()和String.getBytes().length的初步了解</h3>\\n<p>正如方法名所暗示的，String.length()方法返回字符串的长度。另一方面，String.getBytes()从给定的字符串中获取默认编码的字节数组。然后，String.getBytes().length报告数组的长度。</p>","autoDesc":true}');export{g as comp,k as data};
