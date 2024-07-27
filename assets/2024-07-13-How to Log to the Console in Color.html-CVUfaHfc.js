import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CBerKIce.js";const e={},o=t(`<ul><li></li></ul><h1 id="如何在控制台中以彩色记录日志" tabindex="-1"><a class="header-anchor" href="#如何在控制台中以彩色记录日志"><span>如何在控制台中以彩色记录日志</span></a></h1><p>添加一些颜色可以使日志记录更容易阅读。</p><p>在本文中，我们将看到如何为我们的日志添加颜色，适用于Visual Studio Code终端、Linux和Windows命令提示符等控制台。</p><p>在我们开始之前，让我们注意，遗憾的是，Eclipse IDE控制台中的颜色设置非常有限。Eclipse IDE内的控制台不支持由Java代码确定的颜色，因此<strong>本文中介绍的解决方案在Eclipse IDE控制台中将不起作用。</strong></p><h3 id="如何使用ansi代码为日志着色" tabindex="-1"><a class="header-anchor" href="#如何使用ansi代码为日志着色"><span>如何使用ANSI代码为日志着色</span></a></h3><p>**实现彩色日志记录的最简单方式是使用ANSI转义序列，**通常称为ANSI代码。</p><p>ANSI代码是一些特殊的字节序列，一些终端将其解释为命令。</p><p>让我们用一个ANSI代码记录出来：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Here&#39;s some text&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\\033[31m&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;and now the text is red&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在输出中，我们看到ANSI代码没有被打印出来，字体的颜色变为了红色：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Here&#39;s some text
and now the text is red
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>让我们注意，我们需要确保我们在记录完毕后重置字体颜色。</strong></p><p>幸运的是，这很容易。我们可以简单地打印<code>\\033[31m</code>，这是ANSI重置命令。</p><p>重置命令将把控制台重置为其默认颜色。注意，这不一定是黑色，它可能是白色，或者是控制台配置的任何其他颜色。例如：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Here&#39;s some text&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\\033[31m&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;and now the text is red&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;\\033[0m&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;and now back to the default&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>给出的输出是：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Here&#39;s some text
and now the text is red
and now back to the default
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>大多数日志库会遵循ANSI代码，这允许我们构建一些彩色的记录器。</p><p>例如，我们可以快速构建一个使用不同颜色表示不同日志级别的记录器。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ColorLogger</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> <span class="token constant">LOGGER</span> <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">ColorLogger</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">logDebug</span><span class="token punctuation">(</span><span class="token class-name">String</span> logging<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&quot;\\033[34m&quot;</span> <span class="token operator">+</span> logging <span class="token operator">+</span> <span class="token string">&quot;\\033[0m&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">logInfo</span><span class="token punctuation">(</span><span class="token class-name">String</span> logging<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;\\033[32m&quot;</span> <span class="token operator">+</span> logging <span class="token operator">+</span> <span class="token string">&quot;\\033[0m&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">logError</span><span class="token punctuation">(</span><span class="token class-name">String</span> logging<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;\\033[31m&quot;</span> <span class="token operator">+</span> logging <span class="token operator">+</span> <span class="token string">&quot;\\033[0m&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们使用这个在控制台打印一些颜色：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ColorLogger</span> colorLogger <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ColorLogger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
colorLogger<span class="token punctuation">.</span><span class="token function">logDebug</span><span class="token punctuation">(</span><span class="token string">&quot;Some debug logging&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
colorLogger<span class="token punctuation">.</span><span class="token function">logInfo</span><span class="token punctuation">(</span><span class="token string">&quot;Some info logging&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
colorLogger<span class="token punctuation">.</span><span class="token function">logError</span><span class="token punctuation">(</span><span class="token string">&quot;Some error logging&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>[main] DEBUG com.baeldung.color.ColorLogger - Some debug logging
[main] INFO com.baeldung.color.ColorLogger - Some info logging
[main] ERROR com.baeldung.color.ColorLogger - Some error logging
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到，每个日志级别都有不同的颜色，使我们的日志更加易于阅读。</p><p>最后，ANSI代码不仅可以用于控制字体颜色——我们可以控制背景颜色和字体粗细以及样式。示例项目中有一些这些ANSI代码的选择。</p><h3 id="如何在windows命令提示符中为日志着色" tabindex="-1"><a class="header-anchor" href="#如何在windows命令提示符中为日志着色"><span>如何在Windows命令提示符中为日志着色</span></a></h3><p>不幸的是，一些终端不支持ANSI代码。一个典型的例子是Windows命令提示符，上述方法将不起作用。因此，我们需要一个更复杂的解决方案。</p><p>然而，而不是试图自己实现它，我们可以利用一个已建立的库叫做JANSI到我们的pom.xml：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.fusesource.jansi\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`jansi\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`2.4.0\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在要记录颜色，我们可以简单地调用JANSI提供的ANSI API：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">logColorUsingJANSI</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">AnsiConsole</span><span class="token punctuation">.</span><span class="token function">systemInstall</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">ansi</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">fgRed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">a</span><span class="token punctuation">(</span><span class="token string">&quot;Some red text&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">fgBlue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">a</span><span class="token punctuation">(</span><span class="token string">&quot; and some blue text&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">AnsiConsole</span><span class="token punctuation">.</span><span class="token function">systemUninstall</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这产生了文本：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Some red text and some blue text
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们注意，<strong>我们必须首先安装_AnsiConsole_，一旦我们完成就卸载它。</strong></p><p>和ANSI代码一样，JANSI也提供了大量的记录格式。</p><p>JANSI通过检测正在使用的终端并调用所需的适当平台特定API来实现此功能。这意味着，当JANSI检测到Windows命令提示符时，它不是使用不起作用的ANSI代码，而是调用使用Java本地接口（JNI）方法的库。</p><p>此外，JANSI不仅仅适用于Windows命令提示符——它能够覆盖大多数终端（尽管由于Eclipse中对彩色文本的设置有限，Eclipse IDE控制台不是其中之一）。</p><p>最后，JANSI还将确保在环境不需要它们时剥离不需要的ANSI代码，帮助我们保持日志的清洁和整洁。</p><p>总的来说，JANSI为我们提供了一种强大且方便的方式来记录大多数环境和终端的颜色。</p><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在本文中，我们学习了如何使用ANSI代码来控制控制台字体的颜色，并看到了如何使用颜色区分日志级别的示例。</p><p>最后，我们发现并非所有控制台都支持ANSI代码，并强调了一个这样的库，JANSI，它提供了更复杂的支持。</p><p>如往常一样，示例项目可在GitHub上找到。</p>`,44),p=[o];function l(c,i){return a(),s("div",null,p)}const d=n(e,[["render",l],["__file","2024-07-13-How to Log to the Console in Color.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-How%20to%20Log%20to%20the%20Console%20in%20Color.html","title":"如何在控制台中以彩色记录日志","lang":"zh-CN","frontmatter":{"date":"2024-07-13T00:00:00.000Z","category":["Java","Logging"],"tag":["ANSI","Color","Console"],"head":[["meta",{"name":"keywords","content":"Java, Logging, ANSI, Color, Console"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-How%20to%20Log%20to%20the%20Console%20in%20Color.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在控制台中以彩色记录日志"}],["meta",{"property":"og:description","content":"如何在控制台中以彩色记录日志 添加一些颜色可以使日志记录更容易阅读。 在本文中，我们将看到如何为我们的日志添加颜色，适用于Visual Studio Code终端、Linux和Windows命令提示符等控制台。 在我们开始之前，让我们注意，遗憾的是，Eclipse IDE控制台中的颜色设置非常有限。Eclipse IDE内的控制台不支持由Java代码确..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T11:04:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"ANSI"}],["meta",{"property":"article:tag","content":"Color"}],["meta",{"property":"article:tag","content":"Console"}],["meta",{"property":"article:published_time","content":"2024-07-13T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T11:04:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在控制台中以彩色记录日志\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-13T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T11:04:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在控制台中以彩色记录日志 添加一些颜色可以使日志记录更容易阅读。 在本文中，我们将看到如何为我们的日志添加颜色，适用于Visual Studio Code终端、Linux和Windows命令提示符等控制台。 在我们开始之前，让我们注意，遗憾的是，Eclipse IDE控制台中的颜色设置非常有限。Eclipse IDE内的控制台不支持由Java代码确..."},"headers":[{"level":3,"title":"如何使用ANSI代码为日志着色","slug":"如何使用ansi代码为日志着色","link":"#如何使用ansi代码为日志着色","children":[]},{"level":3,"title":"如何在Windows命令提示符中为日志着色","slug":"如何在windows命令提示符中为日志着色","link":"#如何在windows命令提示符中为日志着色","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720868646000,"updatedTime":1720868646000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.99,"words":1198},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-How to Log to the Console in Color.md","localizedDate":"2024年7月13日","excerpt":"<ul>\\n<li></li>\\n</ul>\\n<h1>如何在控制台中以彩色记录日志</h1>\\n<p>添加一些颜色可以使日志记录更容易阅读。</p>\\n<p>在本文中，我们将看到如何为我们的日志添加颜色，适用于Visual Studio Code终端、Linux和Windows命令提示符等控制台。</p>\\n<p>在我们开始之前，让我们注意，遗憾的是，Eclipse IDE控制台中的颜色设置非常有限。Eclipse IDE内的控制台不支持由Java代码确定的颜色，因此<strong>本文中介绍的解决方案在Eclipse IDE控制台中将不起作用。</strong></p>\\n<h3>如何使用ANSI代码为日志着色</h3>","autoDesc":true}');export{d as comp,k as data};
