import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-B0JIQbDY.js";const t={},p=e(`<h1 id="java-21中的字符串模板-baeldung" tabindex="-1"><a class="header-anchor" href="#java-21中的字符串模板-baeldung"><span>Java 21中的字符串模板 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将专注于Java对字符串插值的解决方案，即字符串模板。这个预览版特性作为JEP 430的一部分，被引入到Java 21中。</p><h2 id="_2-java中的字符串组合" tabindex="-1"><a class="header-anchor" href="#_2-java中的字符串组合"><span>2. Java中的字符串组合</span></a></h2><p>我们在代码中使用_字符串_来表示数字、字母和符号的序列作为文本。_字符串_在编程中无处不在，我们经常需要组合字符串以在代码中使用。有几种方法可以做到这一点，每种技术都有其缺点。</p><h3 id="_2-1-字符串连接" tabindex="-1"><a class="header-anchor" href="#_2-1-字符串连接"><span>2.1. 字符串连接</span></a></h3><p>字符串连接是我们用来构建字符串的最基本操作。我们采用字符串字面量和表达式，然后使用_+_符号将它们组合在一起：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">composeUsingPlus</span><span class="token punctuation">(</span><span class="token class-name">String</span> feelsLike<span class="token punctuation">,</span> <span class="token class-name">String</span> temperature<span class="token punctuation">,</span> <span class="token class-name">String</span> unit<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;Today&#39;s weather is &quot;</span> <span class="token operator">+</span> feelsLike <span class="token operator">+</span>
      <span class="token string">&quot;, with a temperature of &quot;</span> <span class="token operator">+</span> temperature <span class="token operator">+</span> <span class="token string">&quot; degrees &quot;</span> <span class="token operator">+</span> unit<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这段代码实现了所需的功能，但由于所有的加号符号，阅读起来很困难，也很难维护和更改。</strong></p><h3 id="_2-2-stringbuffer-或-stringbuilder" tabindex="-1"><a class="header-anchor" href="#_2-2-stringbuffer-或-stringbuilder"><span>2.2. <em>StringBuffer</em> 或 <em>StringBuilder</em></span></a></h3><p>我们还可以使用Java提供的实用类，如_StringBuilder_和_StringBuffer_类。这些类提供了_append()<em>库函数来组合字符串，从而消除了字符串组合中对</em>+_的使用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">composeUsingStringBuilder</span><span class="token punctuation">(</span><span class="token class-name">String</span> feelsLike<span class="token punctuation">,</span> <span class="token class-name">String</span> temperature<span class="token punctuation">,</span> <span class="token class-name">String</span> unit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;Today&#39;s weather is &quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>feelsLike<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;, with a temperature of &quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>temperature<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot; degrees &quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>unit<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_StringBuilder_和_StringBuffer_类提供了高效的字符串操作和组合技术，同时减少了内存开销。<strong>然而，它们遵循_构建者_设计模式，因此变得相当冗长。</strong></p><h3 id="_2-3-字符串格式化器" tabindex="-1"><a class="header-anchor" href="#_2-3-字符串格式化器"><span>2.3. 字符串格式化器</span></a></h3><p>Java提供了将字符串的静态部分与参数（如_temperature_和_unit_）分离的能力，使用_String.format()_或_formatted()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">composeUsingFormatters</span><span class="token punctuation">(</span><span class="token class-name">String</span> feelsLike<span class="token punctuation">,</span> <span class="token class-name">String</span> temperature<span class="token punctuation">,</span> <span class="token class-name">String</span> unit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;Today&#39;s weather is %s, with a temperature of %s degrees %s&quot;</span><span class="token punctuation">,</span>
      feelsLike<span class="token punctuation">,</span> temperature<span class="token punctuation">,</span> unit<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>基本模板字符串保持静态。然而，这里传递的参数的顺序和数量对于响应的正确性至关重要。</strong></p><h3 id="_2-4-messageformat-类" tabindex="-1"><a class="header-anchor" href="#_2-4-messageformat-类"><span>2.4. _MessageFormat_类</span></a></h3><p>Java提供了一个_MessageFormat_类，它属于_Java.text_包，有助于使用动态数据的占位符来组合文本消息。<em>本地化_和_国际化_大量使用这个。我们可以在普通字符串组合中使用_MessageFormat.format()</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">composeUsingMessageFormatter</span><span class="token punctuation">(</span><span class="token class-name">String</span> feelsLike<span class="token punctuation">,</span> <span class="token class-name">String</span> temperature<span class="token punctuation">,</span> <span class="token class-name">String</span> unit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">MessageFormat</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;Today&#39;s weather is {0}, with a temperature of {1} degrees {2}&quot;</span><span class="token punctuation">,</span>
      feelsLike<span class="token punctuation">,</span> temperature<span class="token punctuation">,</span> unit<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种技术与上述选项有类似的缺陷。此外，语法结构与我们在代码中编写和使用字符串的方式不同。</p><h2 id="_3-字符串模板介绍" tabindex="-1"><a class="header-anchor" href="#_3-字符串模板介绍"><span>3. 字符串模板介绍</span></a></h2><p>正如我们所看到的，上述提到的所有字符串组合技术都有其不足之处。现在让我们看看字符串模板如何帮助解决这些问题。</p><h3 id="_3-1-目标" tabindex="-1"><a class="header-anchor" href="#_3-1-目标"><span>3.1. 目标</span></a></h3><p>字符串模板被引入到Java编程生态系统中，具有以下目标：</p><ul><li>简化在运行时编译的值表达式_字符串_的过程</li><li>提高_字符串_组合的可读性，克服与_StringBuilder_和_StringBuffer_类相关的冗长</li><li>克服其他编程语言允许的_字符串_插值技术的安全问题，以牺牲少量的不便</li><li>允许Java库定义结果字符串字面量的自定义格式化语法</li></ul><h3 id="_3-2-模板表达式" tabindex="-1"><a class="header-anchor" href="#_3-2-模板表达式"><span>3.2. 模板表达式</span></a></h3><p>字符串模板的最重要概念围绕着模板表达式，这是Java中的新型可编程表达式。<strong>可编程模板表达式可以执行插值，还为我们提供了安全高效地组合字符串的灵活性。</strong></p><p><strong>模板表达式可以将结构化文本转换为任何对象，它们不仅限于字符串。</strong></p><p>模板表达式有三个组成部分：</p><ul><li>一个处理器</li><li>一个包含嵌入表达式的数据的模板</li><li>一个点（.）字符</li></ul><h2 id="_4-模板处理器" tabindex="-1"><a class="header-anchor" href="#_4-模板处理器"><span>4. 模板处理器</span></a></h2><p><strong>模板处理器负责评估嵌入表达式（模板），并在运行时将其与_字符串_字面量组合，以产生最终的_字符串_。</strong> Java提供了使用Java提供的内置模板处理器的能力，或者可以切换为我们自己的自定义处理器。</p><p>这是Java 21中的一个预览特性；因此，我们需要启用预览模式。</p><h3 id="_4-1-str-模板处理器" tabindex="-1"><a class="header-anchor" href="#_4-1-str-模板处理器"><span>4.1. _STR_模板处理器</span></a></h3><p>Java提供了一些现成的模板处理器。<strong>_STR_模板处理器通过迭代替换提供的模板中的每个嵌入表达式为该表达式的字符串化值来执行字符串插值。</strong> 我们将在这里应用_STR_处理器字符串模板到我们之前的例子中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">interpolationUsingSTRProcessor</span><span class="token punctuation">(</span><span class="token class-name">String</span> feelsLike<span class="token punctuation">,</span> <span class="token class-name">String</span> temperature<span class="token punctuation">,</span> <span class="token class-name">String</span> unit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token constant">STR</span>
      <span class="token punctuation">.</span> <span class="token string">&quot;Today&#39;s weather is { feelsLike }, with a temperature of { temperature } degrees { unit }&quot;</span> <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>_STR_是一个公共静态最终字段，并且会自动导入到每个Java编译单元中。</strong></p><p>我们可以将上述实现扩展到不仅仅是单行字符串，还可以扩展到多行表达式。对于多行文本块，我们用_“””_将文本块包围起来。让我们以插值一个表示JSON的字符串为例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">interpolationOfJSONBlock</span><span class="token punctuation">(</span><span class="token class-name">String</span> feelsLike<span class="token punctuation">,</span> <span class="token class-name">String</span> temperature<span class="token punctuation">,</span> <span class="token class-name">String</span> unit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token constant">STR</span>
      <span class="token punctuation">.</span> <span class="token triple-quoted-string string">&quot;&quot;&quot;
      {
        &quot;feelsLike&quot;: &quot;{ feelsLike }&quot;,
        &quot;temperature&quot;: &quot;{ temperature }&quot;,
        &quot;unit&quot;: &quot;{ unit }&quot;
      }
      &quot;&quot;&quot;</span> <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们还可以内联注入表达式，这将运行时编译：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">interpolationWithExpressions</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token constant">STR</span>
      <span class="token punctuation">.</span> <span class="token string">&quot;Today&#39;s weather is { getFeelsLike() }, with a temperature of { getTemperature() } degrees { getUnit() }&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-fmt-模板处理器" tabindex="-1"><a class="header-anchor" href="#_4-2-fmt-模板处理器"><span>4.2. _FMT_模板处理器</span></a></h3><p>Java提供的另一个处理器是_FMT_模板处理器。<strong>它增加了对处理器提供的格式化程序的理解，这些格式化程序根据提供的格式化样式格式化数据。</strong></p><p>提供的_格式化程序_应该类似于_java.util.Formatter_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">interpolationOfJSONBlockWithFMT</span><span class="token punctuation">(</span><span class="token class-name">String</span> feelsLike<span class="token punctuation">,</span> <span class="token keyword">float</span> temperature<span class="token punctuation">,</span> <span class="token class-name">String</span> unit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token constant">FMT</span>
      <span class="token punctuation">.</span> <span class="token triple-quoted-string string">&quot;&quot;&quot;
      {
        &quot;feelsLike&quot;: &quot;%1s{ feelsLike }&quot;,
        &quot;temperature&quot;: &quot;%2.2f{ temperature }&quot;,
        &quot;unit&quot;: &quot;%1s{ unit }&quot;
      }
      &quot;&quot;&quot;</span> <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这里，我们使用_%s_和_%f_以特定格式格式化字符串和温度。</strong></p><h3 id="_4-3-模板表达式的评估" tabindex="-1"><a class="header-anchor" href="#_4-3-模板表达式的评估"><span>4.3. 模板表达式的评估</span></a></h3><p>评估模板表达式涉及几个步骤：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token constant">STR</span>
  <span class="token punctuation">.</span> <span class="token string">&quot;Today&#39;s weather is { feelsLike }, with a temperature of { temperature } degrees { unit }&quot;</span> <span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上述是几个步骤的简写。</p><p>首先，通过评估点左侧的实例，获得模板处理器_StringTemplate.Processor<code>&lt;R, E&gt;</code>_的实例。在我们的例子中，它是_STR_模板处理器。</p><p>接下来，通过评估点右侧的实例，获得模板_StringTemplate_的实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">StringTemplate</span> str <span class="token operator">=</span> <span class="token constant">RAW</span>
  <span class="token punctuation">.</span> <span class="token string">&quot;Today&#39;s weather is { getFeelsLike() }, with a temperature of { getTemperature() } degrees { getUnit() }&quot;</span> <span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>_RAW_是产生未处理_StringTemplate_类型对象的标准模板处理器。</p><p>最后，我们将_StringTemplate str_实例传递给处理器（在我们的例子中是_STR）的process()方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">return</span> <span class="token constant">STR</span><span class="token punctuation">.</span><span class="token function">process</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-字符串插值和字符串模板" tabindex="-1"><a class="header-anchor" href="#_5-字符串插值和字符串模板"><span>5. 字符串插值和字符串模板</span></a></h2><p>现在我们已经看到了使用字符串模板作为字符串组合技术的例子，我们可以看到它与字符串插值非常相似。然而，字符串模板提供了通常在其他平台上不保证的安全性。</p><p><strong>模板表达式故意设计得无法将包含嵌入表达式的字符串字面量或文本块直接插值到输出字符串中。</strong> 处理器的存在确保了危险或错误的字符串不会在代码中传播。<strong>处理器的责任是验证插值是否安全和正确。</strong></p><p><strong>缺少任何模板处理器将生成编译时错误。此外，如果处理器无法插值，它可以生成_Exception_。</strong></p><p>Java根据嵌入表达式的存在来决定_“<code>&lt;some text&gt;</code>”<em>是被视为_StringLiteral_还是_StringTemplate</em>。对于_“””<code>&lt;some text&gt;</code>”””<em>，同样用于区分_TextBlock_和_TextBlockTemplate</em>。<strong>这种区分对Java很重要，因为即使在这两种情况下它都被双引号(<em>“”</em>)包围，字符串模板是类型_java.lang.StringTemplate_，一个接口，而不是_java.lang.String._</strong></p><h2 id="_6-结在本文中-我们讨论了几种字符串组合技术-并考察了字符串插值的概念。我们还看到了java如何通过字符串模板引入字符串插值的概念。最后-我们看到了字符串模板比一般的字符串插值更好、更安全。" tabindex="-1"><a class="header-anchor" href="#_6-结在本文中-我们讨论了几种字符串组合技术-并考察了字符串插值的概念。我们还看到了java如何通过字符串模板引入字符串插值的概念。最后-我们看到了字符串模板比一般的字符串插值更好、更安全。"><span>6. 结在本文中，我们讨论了几种字符串组合技术，并考察了字符串插值的概念。我们还看到了Java如何通过字符串模板引入字符串插值的概念。最后，我们看到了字符串模板比一般的字符串插值更好、更安全。</span></a></h2><p>如常，代码可以在GitHub上找到。</p><p><a href="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" target="_blank" rel="noopener noreferrer">Baeldung logo</a><a href="https://secure.gravatar.com/avatar/0f08492941896785c081f90c7a231caa?s=50&amp;r=g" target="_blank" rel="noopener noreferrer">Gravatar image</a><a href="https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&amp;r=g" target="_blank" rel="noopener noreferrer">Gravatar image</a><a href="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" target="_blank" rel="noopener noreferrer">Announcement icon</a><a href="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" target="_blank" rel="noopener noreferrer">Baeldung REST post footer</a><a href="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" target="_blank" rel="noopener noreferrer">Baeldung REST post footer icon</a></p><p>OK</p>`,66),i=[p];function o(l,r){return s(),n("div",null,i)}const d=a(t,[["render",o],["__file","2024-06-29-String Templates in Java 21.html.vue"]]),v=JSON.parse(`{"path":"/posts/baeldung/2024-06-29/2024-06-29-String%20Templates%20in%20Java%2021.html","title":"Java 21中的字符串模板 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2023-04-01T00:00:00.000Z","category":["Java","String Templates"],"tag":["Java 21","JEP 430"],"head":[["meta",{"name":"keywords","content":"Java 21, String Templates, JEP 430, String Interpolation"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-String%20Templates%20in%20Java%2021.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 21中的字符串模板 | Baeldung"}],["meta",{"property":"og:description","content":"Java 21中的字符串模板 | Baeldung 1. 引言 在本教程中，我们将专注于Java对字符串插值的解决方案，即字符串模板。这个预览版特性作为JEP 430的一部分，被引入到Java 21中。 2. Java中的字符串组合 我们在代码中使用_字符串_来表示数字、字母和符号的序列作为文本。_字符串_在编程中无处不在，我们经常需要组合字符串以在代..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T22:53:35.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 21"}],["meta",{"property":"article:tag","content":"JEP 430"}],["meta",{"property":"article:published_time","content":"2023-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T22:53:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 21中的字符串模板 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T22:53:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 21中的字符串模板 | Baeldung 1. 引言 在本教程中，我们将专注于Java对字符串插值的解决方案，即字符串模板。这个预览版特性作为JEP 430的一部分，被引入到Java 21中。 2. Java中的字符串组合 我们在代码中使用_字符串_来表示数字、字母和符号的序列作为文本。_字符串_在编程中无处不在，我们经常需要组合字符串以在代..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. Java中的字符串组合","slug":"_2-java中的字符串组合","link":"#_2-java中的字符串组合","children":[{"level":3,"title":"2.1. 字符串连接","slug":"_2-1-字符串连接","link":"#_2-1-字符串连接","children":[]},{"level":3,"title":"2.2. StringBuffer 或 StringBuilder","slug":"_2-2-stringbuffer-或-stringbuilder","link":"#_2-2-stringbuffer-或-stringbuilder","children":[]},{"level":3,"title":"2.3. 字符串格式化器","slug":"_2-3-字符串格式化器","link":"#_2-3-字符串格式化器","children":[]},{"level":3,"title":"2.4. _MessageFormat_类","slug":"_2-4-messageformat-类","link":"#_2-4-messageformat-类","children":[]}]},{"level":2,"title":"3. 字符串模板介绍","slug":"_3-字符串模板介绍","link":"#_3-字符串模板介绍","children":[{"level":3,"title":"3.1. 目标","slug":"_3-1-目标","link":"#_3-1-目标","children":[]},{"level":3,"title":"3.2. 模板表达式","slug":"_3-2-模板表达式","link":"#_3-2-模板表达式","children":[]}]},{"level":2,"title":"4. 模板处理器","slug":"_4-模板处理器","link":"#_4-模板处理器","children":[{"level":3,"title":"4.1. _STR_模板处理器","slug":"_4-1-str-模板处理器","link":"#_4-1-str-模板处理器","children":[]},{"level":3,"title":"4.2. _FMT_模板处理器","slug":"_4-2-fmt-模板处理器","link":"#_4-2-fmt-模板处理器","children":[]},{"level":3,"title":"4.3. 模板表达式的评估","slug":"_4-3-模板表达式的评估","link":"#_4-3-模板表达式的评估","children":[]}]},{"level":2,"title":"5. 字符串插值和字符串模板","slug":"_5-字符串插值和字符串模板","link":"#_5-字符串插值和字符串模板","children":[]},{"level":2,"title":"6. 结在本文中，我们讨论了几种字符串组合技术，并考察了字符串插值的概念。我们还看到了Java如何通过字符串模板引入字符串插值的概念。最后，我们看到了字符串模板比一般的字符串插值更好、更安全。","slug":"_6-结在本文中-我们讨论了几种字符串组合技术-并考察了字符串插值的概念。我们还看到了java如何通过字符串模板引入字符串插值的概念。最后-我们看到了字符串模板比一般的字符串插值更好、更安全。","link":"#_6-结在本文中-我们讨论了几种字符串组合技术-并考察了字符串插值的概念。我们还看到了java如何通过字符串模板引入字符串插值的概念。最后-我们看到了字符串模板比一般的字符串插值更好、更安全。","children":[]}],"git":{"createdTime":1719701615000,"updatedTime":1719701615000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.1,"words":2131},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-String Templates in Java 21.md","localizedDate":"2023年4月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将专注于Java对字符串插值的解决方案，即字符串模板。这个预览版特性作为JEP 430的一部分，被引入到Java 21中。</p>\\n<h2>2. Java中的字符串组合</h2>\\n<p>我们在代码中使用_字符串_来表示数字、字母和符号的序列作为文本。_字符串_在编程中无处不在，我们经常需要组合字符串以在代码中使用。有几种方法可以做到这一点，每种技术都有其缺点。</p>\\n<h3>2.1. 字符串连接</h3>\\n<p>字符串连接是我们用来构建字符串的最基本操作。我们采用字符串字面量和表达式，然后使用_+_符号将它们组合在一起：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> <span class=\\"token function\\">composeUsingPlus</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span> feelsLike<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">String</span> temperature<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">String</span> unit<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token string\\">\\"Today's weather is \\"</span> <span class=\\"token operator\\">+</span> feelsLike <span class=\\"token operator\\">+</span>\\n      <span class=\\"token string\\">\\", with a temperature of \\"</span> <span class=\\"token operator\\">+</span> temperature <span class=\\"token operator\\">+</span> <span class=\\"token string\\">\\" degrees \\"</span> <span class=\\"token operator\\">+</span> unit<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}`);export{d as comp,v as data};
