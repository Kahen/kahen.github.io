import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BA-MSwOu.js";const e={},p=t(`<h1 id="java正则表达式中的z和z锚点对比" tabindex="-1"><a class="header-anchor" href="#java正则表达式中的z和z锚点对比"><span>Java正则表达式中的z和Z锚点对比</span></a></h1><p>正则表达式是Java中用于匹配和操作文本的强大工具。它们允许我们指定模式以匹配文本中的特定字符、单词或短语。在Java中，正则表达式通过java.util.regex包得到支持。</p><p>此外，\\z和\\Z以及$是三个常见的正则表达式锚点，它们可以匹配字符串的结尾。</p><p><strong>在本教程中，我们将探讨这两种锚点的区别，它们的工作原理以及何时使用它们。</strong></p><p>正则表达式锚点是一个或多个字符的序列，可以指定文本中应该发生匹配的位置。</p><p><strong>所有\\z、\\Z和$都是正则表达式锚点，可以精确匹配字符串的结尾。但是，当字符串以行终止符（如换行符）结尾时，它们的行为不同。</strong></p><p>通常，\\z锚点用于确保正则表达式匹配字符串的绝对结尾，无论它是否以行终止符结尾。<strong>这有助于确保匹配模式之后没有更多的文本。</strong></p><p>另一方面，\\Z用于确保正则表达式匹配字符串的结尾或行的结尾（如果字符串以行终止符结尾）。<strong>这在我们要匹配多行字符串中每一行末尾的模式时非常有用。</strong></p><p><strong>$在功能上等同于\\z，并且不考虑行终止符，匹配字符串的结尾。</strong></p><h3 id="_3-1-使用-z的示例" tabindex="-1"><a class="header-anchor" href="#_3-1-使用-z的示例"><span>3.1. 使用\\z的示例</span></a></h3><p><strong>在验证信用卡号时，我们希望确保卡号之后没有额外的数字或字符。</strong> 为了实现这一点，我们可以使用\\z正则表达式。它确保模式只匹配完整的信用卡号，而不是之后可能出现的任何额外文本。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenCreditCardNumber_thenReturnIfMatched</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> creditCardNumber <span class="token operator">=</span> <span class="token string">&quot;1234567890123456&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> pattern <span class="token operator">=</span> <span class="token string">&quot;\\\\d{16}\\\\z&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>pattern<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>creditCardNumber<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法使用\\z正则表达式验证给定的信用卡号是否正好包含16位数字。</p><p><strong>另一方面，当解析日志文件时，我们可能希望匹配每一行末尾的模式。但我们不想包括下一行的任何文本。</strong> 在这种情况下，我们可以使用\\z正则表达式确保模式只匹配行尾的文本。即使行以行终止符结尾，\\z也确保模式只匹配最后一行。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenLogOutput_thenReturnIfMatched</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> logLine <span class="token operator">=</span> <span class="token string">&quot;2022-05-01 14:30:00,123 INFO Some log message&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> pattern <span class="token operator">=</span> <span class="token string">&quot;.*message\\\\z&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>pattern<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>logLine<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法定义了一个日志行。然后它检查它们是否以单词“message”结尾，紧接着是字符串的结尾\\z。</p><h3 id="_3-2-使用-z的示例" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-z的示例"><span>3.2. 使用\\Z的示例</span></a></h3><p><strong>在解析电子邮件消息时，我们通常只想匹配消息正文最末尾的模式，不包括电子邮件签名中的任何文本。</strong> 为了实现这一点，我们可以使用正则表达式中的\\Z符号，它确保模式只匹配消息正文最末尾的文本。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenEmailMessage_thenReturnIfMatched</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> myMessage <span class="token operator">=</span> <span class="token string">&quot;Hello HR, I hope i can write to Baeldung\\n&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> pattern <span class="token operator">=</span> <span class="token string">&quot;.*Baeldung\\\\Z&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>pattern<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>myMessage<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法检查字符串消息是否以模式“Baeldung”结尾，后面是可选的空白字符，然后是字符串的结尾\\Z。</p><p><strong>类似地，当匹配文件扩展名时，我们可能要确保正则表达式只匹配文件名最末尾的扩展名。</strong> 再次，我们可以使用正则表达式中的\\Z符号，以确保它只匹配文件名末尾的扩展名。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenFileExtension_thenReturnIfMatched</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> fileName <span class="token operator">=</span> <span class="token string">&quot;image.jpeg\\n&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> pattern <span class="token operator">=</span> <span class="token string">&quot;.*\\\\.jpeg\\\\Z&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>pattern<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码使用\\Z正则表达式测试文件名是否以特定文件扩展名结尾。方法givenFileExtension_thenReturnIfMatched检查字符串文件名fileName是否以.jpeg结尾。</p><h3 id="_3-3-使用-的示例" tabindex="-1"><a class="header-anchor" href="#_3-3-使用-的示例"><span>3.3. 使用$的示例</span></a></h3><p><strong>在处理URL时，我们可能想要验证URL是否匹配特定的端点。</strong> 因此，$锚点可以帮助确保模式仅在表示URL的结尾时匹配：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenURL_thenReturnIfMatched</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> url <span class="token operator">=</span> <span class="token string">&quot;https://www.example.com/api/endpoint\\n&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> pattern <span class="token operator">=</span> <span class="token string">&quot;.*/endpoint$&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>pattern<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们使用模式来匹配“/endpoint”之前的任何字符，并确保它出现在不考虑到是否有行终止符的确切字符串的末尾。</p><p><strong>此外，当我们想要验证一个句子是否以正确的标点结束，例如句号、问号或感叹号时：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenSentence_thenReturnIfMatched</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> sentence <span class="token operator">=</span> <span class="token string">&quot;Hello, how are you?&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> pattern <span class="token operator">=</span> <span class="token string">&quot;.*[.?!]$&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>pattern<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>sentence<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法检查给定的句子是否以句号、问号或感叹号结尾。此外，前面代码中使用的模式匹配任何字符后跟一个句号、问号或感叹号，确保它出现在字符串的末尾。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>总之，正则表达式锚点在Java中用于匹配文本中的模式非常有用。\\z和\\Z是两个匹配字符串结尾的锚点，但当字符串以行终止符结尾时，它们的行为不同。\\z确保正则表达式匹配字符串的绝对结尾，而\\Z匹配字符串的结尾或行的结尾。另一方面，$锚点是一个正则表达式结构，专门用于匹配字符串的结尾。</p><p>通过使用适当的锚点，我们可以确保我们的正则表达式只匹配我们想要的文本，而不是之后可能出现的任何额外文本。</p><p><strong>理解\\z、\\Z和$之间的区别将帮助我们在Java代码中编写更准确的正则表达式。</strong></p><p>本教程的完整源代码可在GitHub上找到。</p><p>OK</p>`,36),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-05-Regular Expression   z vs  Z Anchors in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Regular%20Expression%20%20%20z%20vs%20%20Z%20Anchors%20in%20Java.html","title":"Java正则表达式中的z和Z锚点对比","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Regular Expressions","Java"],"tag":["regex","java","anchors"],"head":[["meta",{"name":"keywords","content":"Java, Regular Expressions, z, Z, anchors, text matching"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Regular%20Expression%20%20%20z%20vs%20%20Z%20Anchors%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java正则表达式中的z和Z锚点对比"}],["meta",{"property":"og:description","content":"Java正则表达式中的z和Z锚点对比 正则表达式是Java中用于匹配和操作文本的强大工具。它们允许我们指定模式以匹配文本中的特定字符、单词或短语。在Java中，正则表达式通过java.util.regex包得到支持。 此外，\\\\z和\\\\Z以及$是三个常见的正则表达式锚点，它们可以匹配字符串的结尾。 在本教程中，我们将探讨这两种锚点的区别，它们的工作原理以及..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T20:34:36.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"regex"}],["meta",{"property":"article:tag","content":"java"}],["meta",{"property":"article:tag","content":"anchors"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T20:34:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java正则表达式中的z和Z锚点对比\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T20:34:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java正则表达式中的z和Z锚点对比 正则表达式是Java中用于匹配和操作文本的强大工具。它们允许我们指定模式以匹配文本中的特定字符、单词或短语。在Java中，正则表达式通过java.util.regex包得到支持。 此外，\\\\z和\\\\Z以及$是三个常见的正则表达式锚点，它们可以匹配字符串的结尾。 在本教程中，我们将探讨这两种锚点的区别，它们的工作原理以及..."},"headers":[{"level":3,"title":"3.1. 使用\\\\z的示例","slug":"_3-1-使用-z的示例","link":"#_3-1-使用-z的示例","children":[]},{"level":3,"title":"3.2. 使用\\\\Z的示例","slug":"_3-2-使用-z的示例","link":"#_3-2-使用-z的示例","children":[]},{"level":3,"title":"3.3. 使用$的示例","slug":"_3-3-使用-的示例","link":"#_3-3-使用-的示例","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720211676000,"updatedTime":1720211676000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.86,"words":1458},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Regular Expression   z vs  Z Anchors in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>正则表达式是Java中用于匹配和操作文本的强大工具。它们允许我们指定模式以匹配文本中的特定字符、单词或短语。在Java中，正则表达式通过java.util.regex包得到支持。</p>\\n<p>此外，\\\\z和\\\\Z以及$是三个常见的正则表达式锚点，它们可以匹配字符串的结尾。</p>\\n<p><strong>在本教程中，我们将探讨这两种锚点的区别，它们的工作原理以及何时使用它们。</strong></p>\\n<p>正则表达式锚点是一个或多个字符的序列，可以指定文本中应该发生匹配的位置。</p>\\n<p><strong>所有\\\\z、\\\\Z和$都是正则表达式锚点，可以精确匹配字符串的结尾。但是，当字符串以行终止符（如换行符）结尾时，它们的行为不同。</strong></p>","autoDesc":true}');export{d as comp,k as data};
