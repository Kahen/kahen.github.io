import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CJGTm_7y.js";const e={},p=t('<h1 id="java中封装字符串到整数转换" tabindex="-1"><a class="header-anchor" href="#java中封装字符串到整数转换"><span>Java中封装字符串到整数转换</span></a></h1><p>在本教程中，我们将探索在Java中封装字符串输入转换为整数的不同方法，同时优雅地处理异常。</p><h2 id="问题陈述" tabindex="-1"><a class="header-anchor" href="#问题陈述"><span>问题陈述</span></a></h2><p>通常使用<code>Integer.parseInt()</code>方法来执行字符串到整数的转换，但如果输入不是数字，它会抛出一个异常。</p><p>使用<code>try-catch</code>块来处理这个异常可能会使代码重复且难以阅读：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">NumberFormatException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    logger<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;在将字符串转换为整数时遇到异常&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>相反，我们可以在方法中封装转换，并在发生错误时返回一个合适的值。这还提供了将来修改或更新错误处理逻辑的便利。</p><p>现在让我们探索一些实现封装的方法。</p><h2 id="通过封装进行转换" tabindex="-1"><a class="header-anchor" href="#通过封装进行转换"><span>通过封装进行转换</span></a></h2><p>在这一部分，我们将探索几种封装字符串到整数转换逻辑的方法。我们可以使用<code>Optional</code>来封装由字符串到整数转换得到的<code>Integer</code>值，或者指示转换失败：</p><h3 id="_3-1-使用integer-parseint" tabindex="-1"><a class="header-anchor" href="#_3-1-使用integer-parseint"><span>3.1 使用<code>Integer.parseInt()</code></span></a></h3><p>我们可以使用<code>Integer</code>类提供的<code>parseInt()</code>方法将字符串值转换为整数。<code>try-catch</code>块可以处理所有异常，主要是<code>NumberFormatException</code>，并在出错时返回一个默认值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Optional</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``` <span class="token function">convertStringToIntUsingIntegerParseInt</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">NumberFormatException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法使用自动装箱将基本类型<code>int</code>转换为其对应的包装类<code>Integer</code>。</p><h3 id="_3-2-使用integer-valueof" tabindex="-1"><a class="header-anchor" href="#_3-2-使用integer-valueof"><span>3.2 使用<code>Integer.valueOf()</code></span></a></h3><p>在Java中，<code>valueOf()</code>是一个静态方法，可用于某些类，包括<code>String</code>、<code>Integer</code>、<code>Double</code>等。它用于将值的字符串表示转换为相应类的实例。</p><p>如果用于<code>Integer</code>包装类，它内部调用<code>parseInt()</code>。我们可以使用这个方法来实现转换，并在一个封装的方法中处理错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Optional</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``` <span class="token function">convertStringToIntUsingIntegerValueOf</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">NumberFormatException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-使用integer-decode" tabindex="-1"><a class="header-anchor" href="#_3-3-使用integer-decode"><span>3.3 使用<code>Integer.decode()</code></span></a></h3><p><code>Integer.decode()</code>的工作方式类似于<code>Integer.valueOf()</code>，但它也可以接受一些其他的数字表示，如十进制、十六进制和八进制数字：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Optional</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``` <span class="token function">convertStringToIntUsingIntegerDecode</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-使用apache-commons的numberutils" tabindex="-1"><a class="header-anchor" href="#_3-4-使用apache-commons的numberutils"><span>3.4 使用Apache Commons的<code>NumberUtils</code></span></a></h3><p>我们可以使用Apache Commons Lang 3库中<code>NumberUtils</code>类提供的<code>Integer</code>转换方法。要使用这个库，我们可以在<code>pom.xml</code>文件中添加依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`org.apache.commons`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`commons-lang3`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`3.14.0`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它接受一个默认值，以便在转换失败时返回。我们可以使用<code>toInt()</code>方法来实现我们的封装：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">convertIntToStringUsingNumberUtils</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">,</span> <span class="token class-name">Integer</span> defaultValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token class-name">NumberUtils</span><span class="token punctuation">.</span><span class="token function">toInt</span><span class="token punctuation">(</span>input<span class="token punctuation">,</span> defaultValue<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们查看了将字符串转换为整数的不同方法，处理错误，并处理需要返回默认值或记录错误的情况。</p><p>如常，代码可在GitHub上找到。</p><p>OK</p>',30),c=[p];function o(l,i){return s(),a("div",null,c)}const d=n(e,[["render",o],["__file","2024-07-05-Convert String to Int Using Encapsulation.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Convert%20String%20to%20Int%20Using%20Encapsulation.html","title":"Java中封装字符串到整数转换","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","教程"],"tag":["封装","字符串到整数转换"],"head":[["meta",{"name":"字符串转整数","content":"探索Java中封装字符串到整数转换的不同方法，优雅地处理异常。"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Convert%20String%20to%20Int%20Using%20Encapsulation.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中封装字符串到整数转换"}],["meta",{"property":"og:description","content":"Java中封装字符串到整数转换 在本教程中，我们将探索在Java中封装字符串输入转换为整数的不同方法，同时优雅地处理异常。 问题陈述 通常使用Integer.parseInt()方法来执行字符串到整数的转换，但如果输入不是数字，它会抛出一个异常。 使用try-catch块来处理这个异常可能会使代码重复且难以阅读： 相反，我们可以在方法中封装转换，并在发..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T11:30:12.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"封装"}],["meta",{"property":"article:tag","content":"字符串到整数转换"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T11:30:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中封装字符串到整数转换\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T11:30:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中封装字符串到整数转换 在本教程中，我们将探索在Java中封装字符串输入转换为整数的不同方法，同时优雅地处理异常。 问题陈述 通常使用Integer.parseInt()方法来执行字符串到整数的转换，但如果输入不是数字，它会抛出一个异常。 使用try-catch块来处理这个异常可能会使代码重复且难以阅读： 相反，我们可以在方法中封装转换，并在发..."},"headers":[{"level":2,"title":"问题陈述","slug":"问题陈述","link":"#问题陈述","children":[]},{"level":2,"title":"通过封装进行转换","slug":"通过封装进行转换","link":"#通过封装进行转换","children":[{"level":3,"title":"3.1 使用Integer.parseInt()","slug":"_3-1-使用integer-parseint","link":"#_3-1-使用integer-parseint","children":[]},{"level":3,"title":"3.2 使用Integer.valueOf()","slug":"_3-2-使用integer-valueof","link":"#_3-2-使用integer-valueof","children":[]},{"level":3,"title":"3.3 使用Integer.decode()","slug":"_3-3-使用integer-decode","link":"#_3-3-使用integer-decode","children":[]},{"level":3,"title":"3.4 使用Apache Commons的NumberUtils","slug":"_3-4-使用apache-commons的numberutils","link":"#_3-4-使用apache-commons的numberutils","children":[]}]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720179012000,"updatedTime":1720179012000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.52,"words":757},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Convert String to Int Using Encapsulation.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将探索在Java中封装字符串输入转换为整数的不同方法，同时优雅地处理异常。</p>\\n<h2>问题陈述</h2>\\n<p>通常使用<code>Integer.parseInt()</code>方法来执行字符串到整数的转换，但如果输入不是数字，它会抛出一个异常。</p>\\n<p>使用<code>try-catch</code>块来处理这个异常可能会使代码重复且难以阅读：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">try</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token class-name\\">Integer</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">parseInt</span><span class=\\"token punctuation\\">(</span>input<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">catch</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">NumberFormatException</span> e<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    logger<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">error</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"在将字符串转换为整数时遇到异常\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
