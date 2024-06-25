import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DmJfAgU2.js";const e={},p=t(`<hr><h1 id="在java中遮罩电子邮件地址和电话号码" tabindex="-1"><a class="header-anchor" href="#在java中遮罩电子邮件地址和电话号码"><span>在Java中遮罩电子邮件地址和电话号码</span></a></h1><p>隐私和数据安全是软件开发的重要组成部分。遮罩敏感细节，如用户的电子邮件地址和电话号码，通常是保护用户信息和防止其泄露的程序之一。</p><p><strong>在本教程中，我们将探讨如何在Java中遮罩电子邮件地址和电话号码。</strong></p><h3 id="_2-1-使用字符串操作遮罩电子邮件地址" tabindex="-1"><a class="header-anchor" href="#_2-1-使用字符串操作遮罩电子邮件地址"><span>2.1 使用字符串操作遮罩电子邮件地址</span></a></h3><p>字符串操作是隐藏电子邮件的一种方式，通过编辑字符并将其中一些替换为星号。以下是一个简单的Java代码片段，演示了这种方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> email <span class="token operator">=</span> <span class="token string">&quot;testemailaddress@example.com&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> expectedMaskedEmail <span class="token operator">=</span> <span class="token string">&quot;te**************@example.com&quot;</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenEmailAddress_whenUsingStringManipulation_thenMaskEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> atIndex <span class="token operator">=</span> email<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token char">&#39;@&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> repeatedString <span class="token operator">=</span> <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> atIndex <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mapToObj</span><span class="token punctuation">(</span>i <span class="token operator">-&gt;</span> <span class="token string">&quot;*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">joining</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> maskedPart <span class="token operator">=</span> email<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> atIndex <span class="token operator">-</span> repeatedString<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> repeatedString<span class="token punctuation">;</span>
    <span class="token class-name">String</span> maskedEmail <span class="token operator">=</span> maskedPart <span class="token operator">+</span> email<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>atIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedMaskedEmail<span class="token punctuation">,</span> maskedEmail<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在给出的例子中，我们首先找到电子邮件地址中“@”字符的索引。然后，我们使用Java的Stream API和字符串操作生成一个长度等于atIndex-2的星号字符串。<strong>请注意，我们从atIndex减去2个数字，以保留电子邮件的前两位数字。</strong></p><p><strong>生成的_maskedPart_电子邮件部分是通过结合“@”符号之前的字符和生成的星号字符串来生成的。</strong></p><p>然后通过连接_maskedPart_和生成的星号来获取电子邮件地址。最后，我们使用_assertEquals()_方法验证_maskedEmail_是否与_expectedMaskedEmail_相同。</p><h3 id="_2-2-使用正则表达式遮罩电子邮件地址" tabindex="-1"><a class="header-anchor" href="#_2-2-使用正则表达式遮罩电子邮件地址"><span>2.2 使用正则表达式遮罩电子邮件地址</span></a></h3><p>另一种方法是实现正则表达式来隐藏电子邮件地址。以下是一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenEmailAddress_whenUsingRegex_thenMaskEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> atIndex <span class="token operator">=</span> email<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token char">&#39;@&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> regex <span class="token operator">=</span> <span class="token string">&quot;(.{2})(.*)(@.*)&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> repeatedAsterisks <span class="token operator">=</span> <span class="token string">&quot;*&quot;</span><span class="token punctuation">.</span><span class="token function">repeat</span><span class="token punctuation">(</span>atIndex <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> maskedEmail <span class="token operator">=</span> email<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span>regex<span class="token punctuation">,</span> <span class="token string">&quot;$1&quot;</span> <span class="token operator">+</span> repeatedAsterisks <span class="token operator">+</span> <span class="token string">&quot;$3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedMaskedEmail<span class="token punctuation">,</span> maskedEmail<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的测试方法中，我们首先使用_indexOf()<em>方法确定_email_中的“@”符号的索引。然后，我们使用正则表达式_regex</em>“(.{2})(.<em>)(@.</em>)”来捕获三组：前两个字符，它们和“@”符号之间的字符，以及“@”符号后的字符。</p><p><strong>随后，变量_repeatedAsterisks_被赋予一个长度等于atIndex-2的星号字符串。最后，_replaceAll()_方法应用_regex_模式，用生成的星号替换_email_的中间部分。</strong></p><h3 id="_3-1-使用字符串操作遮罩电话号码" tabindex="-1"><a class="header-anchor" href="#_3-1-使用字符串操作遮罩电话号码"><span>3.1 使用字符串操作遮罩电话号码</span></a></h3><p>我们也可以通过对字符进行一些操作来遮罩电话号码。以下是一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> phoneNumber <span class="token operator">=</span> <span class="token string">&quot;+1234567890&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> expectedMaskedPhoneNumber <span class="token operator">=</span> <span class="token string">&quot;+******7890&quot;</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenPhoneNumber_whenUsingStringManipulation_thenMaskPhone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> maskedPhoneNumber <span class="token operator">=</span> phoneNumber<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\d(?=\\\\d{4})&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedMaskedPhoneNumber<span class="token punctuation">,</span> maskedPhoneNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们将正则表达式“\\d(?=\\d{4})”传递给_replaceAll()_方法，目的是识别并替换所有后面还有四个数字的数字字符为星号。</p><h3 id="_3-2-使用正则表达式遮罩电话号码" tabindex="-1"><a class="header-anchor" href="#_3-2-使用正则表达式遮罩电话号码"><span>3.2 使用正则表达式遮罩电话号码</span></a></h3><p>与用于遮罩电子邮件地址的方法类似，正则表达式可以被实现以正确地隐藏电话号码。以下是一个演示这种方法的Java代码片段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenPhoneNumber_whenUsingRegex_thenMaskPhone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> lastDigitsIndex <span class="token operator">=</span> phoneNumber<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">5</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> regex <span class="token operator">=</span> <span class="token string">&quot;(\\\\+)(\\\\d+)(\\\\d{4})&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> repeatedAsterisks <span class="token operator">=</span> <span class="token string">&quot;*&quot;</span><span class="token punctuation">.</span><span class="token function">repeat</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> lastDigitsIndex<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> maskedPhoneNumber <span class="token operator">=</span> phoneNumber<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span>regex<span class="token punctuation">,</span> <span class="token string">&quot;$1&quot;</span> <span class="token operator">+</span> repeatedAsterisks <span class="token operator">+</span> <span class="token string">&quot;$3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedMaskedPhoneNumber<span class="token punctuation">,</span> maskedPhoneNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码片段中，我们定义了一个正则表达式_regex_“(\\+)(\\d+)(\\d{4})”，它捕获了三组：加号，前导数字和最后四个数字。</p><p>随后，我们根据计算出的_lastDigitsIndex_生成一个_repeatedAsterisks_星号字符串。然后，我们使用_replaceAll()_方法应用_regex_模式，用星号替换中间数字。</p><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>总之，遮罩敏感信息对于保护用户隐私和遵守数据安全法规至关重要。因此，我们在本教程中看到了如何利用诸如字符串操作和正则表达式等机制来遮罩电子邮件地址和电话号码。如往常一样，本文的完整代码示例可以在GitHub上找到。</p>`,26),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-22-Mask an Email Address and Phone Number in Java.html.vue"]]),d=JSON.parse(`{"path":"/posts/baeldung/2024-06-22/2024-06-22-Mask%20an%20Email%20Address%20and%20Phone%20Number%20in%20Java.html","title":"在Java中遮罩电子邮件地址和电话号码","lang":"zh-CN","frontmatter":{"date":"2024-06-22T00:00:00.000Z","category":["Java","编程"],"tag":["邮箱地址","电话号码","脱敏","正则表达式"],"head":[["meta",{"name":"关键词","content":"Java, 邮箱地址脱敏, 电话号码脱敏, 正则表达式"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-Mask%20an%20Email%20Address%20and%20Phone%20Number%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中遮罩电子邮件地址和电话号码"}],["meta",{"property":"og:description","content":"在Java中遮罩电子邮件地址和电话号码 隐私和数据安全是软件开发的重要组成部分。遮罩敏感细节，如用户的电子邮件地址和电话号码，通常是保护用户信息和防止其泄露的程序之一。 在本教程中，我们将探讨如何在Java中遮罩电子邮件地址和电话号码。 2.1 使用字符串操作遮罩电子邮件地址 字符串操作是隐藏电子邮件的一种方式，通过编辑字符并将其中一些替换为星号。以下..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T10:33:57.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"邮箱地址"}],["meta",{"property":"article:tag","content":"电话号码"}],["meta",{"property":"article:tag","content":"脱敏"}],["meta",{"property":"article:tag","content":"正则表达式"}],["meta",{"property":"article:published_time","content":"2024-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T10:33:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中遮罩电子邮件地址和电话号码\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T10:33:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中遮罩电子邮件地址和电话号码 隐私和数据安全是软件开发的重要组成部分。遮罩敏感细节，如用户的电子邮件地址和电话号码，通常是保护用户信息和防止其泄露的程序之一。 在本教程中，我们将探讨如何在Java中遮罩电子邮件地址和电话号码。 2.1 使用字符串操作遮罩电子邮件地址 字符串操作是隐藏电子邮件的一种方式，通过编辑字符并将其中一些替换为星号。以下..."},"headers":[{"level":3,"title":"2.1 使用字符串操作遮罩电子邮件地址","slug":"_2-1-使用字符串操作遮罩电子邮件地址","link":"#_2-1-使用字符串操作遮罩电子邮件地址","children":[]},{"level":3,"title":"2.2 使用正则表达式遮罩电子邮件地址","slug":"_2-2-使用正则表达式遮罩电子邮件地址","link":"#_2-2-使用正则表达式遮罩电子邮件地址","children":[]},{"level":3,"title":"3.1 使用字符串操作遮罩电话号码","slug":"_3-1-使用字符串操作遮罩电话号码","link":"#_3-1-使用字符串操作遮罩电话号码","children":[]},{"level":3,"title":"3.2 使用正则表达式遮罩电话号码","slug":"_3-2-使用正则表达式遮罩电话号码","link":"#_3-2-使用正则表达式遮罩电话号码","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719052437000,"updatedTime":1719052437000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.39,"words":1018},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-Mask an Email Address and Phone Number in Java.md","localizedDate":"2024年6月22日","excerpt":"<hr>\\n<h1>在Java中遮罩电子邮件地址和电话号码</h1>\\n<p>隐私和数据安全是软件开发的重要组成部分。遮罩敏感细节，如用户的电子邮件地址和电话号码，通常是保护用户信息和防止其泄露的程序之一。</p>\\n<p><strong>在本教程中，我们将探讨如何在Java中遮罩电子邮件地址和电话号码。</strong></p>\\n<h3>2.1 使用字符串操作遮罩电子邮件地址</h3>\\n<p>字符串操作是隐藏电子邮件的一种方式，通过编辑字符并将其中一些替换为星号。以下是一个简单的Java代码片段，演示了这种方法：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> email <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"testemailaddress@example.com\\"</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token class-name\\">String</span> expectedMaskedEmail <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"te**************@example.com\\"</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenEmailAddress_whenUsingStringManipulation_thenMaskEmail</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">int</span> atIndex <span class=\\"token operator\\">=</span> email<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">indexOf</span><span class=\\"token punctuation\\">(</span><span class=\\"token char\\">'@'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">String</span> repeatedString <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">IntStream</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">range</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">,</span> atIndex <span class=\\"token operator\\">-</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">mapToObj</span><span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">-&gt;</span> <span class=\\"token string\\">\\"*\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">collect</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Collectors</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">joining</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">String</span> maskedPart <span class=\\"token operator\\">=</span> email<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">substring</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">,</span> atIndex <span class=\\"token operator\\">-</span> repeatedString<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">length</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">+</span> repeatedString<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">String</span> maskedEmail <span class=\\"token operator\\">=</span> maskedPart <span class=\\"token operator\\">+</span> email<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">substring</span><span class=\\"token punctuation\\">(</span>atIndex<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span>expectedMaskedEmail<span class=\\"token punctuation\\">,</span> maskedEmail<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}`);export{k as comp,d as data};
