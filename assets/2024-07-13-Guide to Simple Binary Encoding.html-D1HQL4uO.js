import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-CJGTm_7y.js";const e={},p=t('<h1 id="simple-binary-encoding-指南" tabindex="-1"><a class="header-anchor" href="#simple-binary-encoding-指南"><span>Simple Binary Encoding 指南</span></a></h1><p>效率和性能是现代数据服务的两个重要方面，尤其是当我们流式传输大量数据时。当然，通过高效的编码来减小消息大小是实现这一目标的关键。</p><p>然而，自行开发的编码/解码算法可能既繁琐又脆弱，这使得它们在长期维护中变得困难。</p><p>幸运的是，Simple Binary Encoding（SBE）可以帮助我们以实际的方式实现和维护一个量身定制的编码/解码系统。</p><p>在本教程中，我们将讨论Simple Binary Encoding（SBE）是什么以及如何使用它，以及代码示例。</p><h2 id="_2-sbe-是什么" tabindex="-1"><a class="header-anchor" href="#_2-sbe-是什么"><span>2. SBE 是什么？</span></a></h2><p>SBE 是一种二进制表示，用于编码/解码消息以支持低延迟流式传输。它也是FIX SBE标准的参考实现，这是金融数据编码的标准。</p><h3 id="_2-1-消息结构" tabindex="-1"><a class="header-anchor" href="#_2-1-消息结构"><span>2.1. 消息结构</span></a></h3><p>为了保持流式传输的语义，<strong>消息必须能够顺序读写，不回头</strong>。这消除了额外的操作——比如解引用、处理位置指针、管理附加状态等——并更好地利用硬件支持，以保持最大性能和效率。</p><p>让我们看看SBE中消息是如何结构化的：<img src="https://www.baeldung.com/wp-content/uploads/2022/10/sbe-message-structure.png" alt="img" loading="lazy"></p><ul><li>头部：包含消息版本等必填字段。必要时也可以包含更多字段。</li><li>根字段：消息的静态字段。它们的块大小是预定义的，不能更改。它们也可以被定义为可选的。</li><li>重复组：这些表示集合类型的呈现。组可以包含字段以及内部组，以能够表示更复杂的结构。</li><li>可变数据字段：这些是我们无法提前确定大小的字段。字符串和Blob数据类型是两个例子。它们将位于消息的末尾。</li></ul><p>接下来，我们将看到为什么这种消息结构很重要。</p><h3 id="_2-2-sbe何时-不-有用" tabindex="-1"><a class="header-anchor" href="#_2-2-sbe何时-不-有用"><span>2.2. SBE何时（不）有用？</span></a></h3><p>SBE的强大之处源于其消息结构。它针对数据的顺序访问进行了优化。因此，<strong>SBE非常适合固定大小的数据，如数字、位集、枚举和数组</strong>。</p><p>SBE的一个常见用例是金融数据流——主要包含数字和枚举——SBE专门为此设计。</p><p>另一方面，<strong>SBE不适合像字符串和blob这样的可变长度数据类型</strong>。原因是我们很可能事先不知道确切的数据大小。因此，这将在流式传输时进行额外的计算以检测消息中数据的边界。毫不奇怪，如果我们谈论的是毫秒级的延迟，这可能会影响我们的业务。</p><p>尽管SBE仍然支持字符串和Blob数据类型，<strong>它们总是被放在消息的末尾，以将可变长度计算的影响降到最低</strong>。</p><h2 id="_3-设置库" tabindex="-1"><a class="header-anchor" href="#_3-设置库"><span>3. 设置库</span></a></h2><p>要使用SBE库，让我们在_pom.xml_文件中添加以下Maven依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`uk.co.real-logic`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`sbe-all`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`1.27.0`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-生成java存根" tabindex="-1"><a class="header-anchor" href="#_4-生成java存根"><span>4. 生成Java存根</span></a></h2><p>在我们生成Java存根之前，显然，我们需要形成我们的消息模式。<strong>SBE提供了通过XML定义我们模式的能力</strong>。</p><p>接下来，我们将看到如何为我们的消息定义一个模式，该消息传输样本市场交易数据。</p><h3 id="_4-1-创建消息模式" tabindex="-1"><a class="header-anchor" href="#_4-1-创建消息模式"><span>4.1. 创建消息模式</span></a></h3><p>我们的模式将是一个基于FIX协议特殊XSD的XML文件。它将定义我们的消息格式。</p><p>那么，让我们创建我们的模式文件：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">sbe:</span>messageSchema</span> <span class="token attr-name"><span class="token namespace">xmlns:</span>sbe</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://fixprotocol.io/2016/sbe<span class="token punctuation">&quot;</span></span>\n  <span class="token attr-name">package</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>com.baeldung.sbe.stub<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1<span class="token punctuation">&quot;</span></span> <span class="token attr-name">version</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>0<span class="token punctuation">&quot;</span></span> <span class="token attr-name">semanticVersion</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>5.2<span class="token punctuation">&quot;</span></span>\n  <span class="token attr-name">description</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>A schema represents stock market data.<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n  `<span class="token comment">&lt;!-- 省略类型定义和消息定义 --&gt;</span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">sbe:</span>messageSchema</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们详细查看模式，我们会发现它有两个主要部分，<em>types_和_sbe:message</em>。我们将首先定义_types_。</p><p>作为我们的第一种类型，我们创建_messageHeader_。它是必需的，并且还有四个必需字段：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>composite</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>messageHeader<span class="token punctuation">&quot;</span></span> <span class="token attr-name">description</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Message identifiers and length of message root.<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n  ```<span class="token comment">&lt;!-- 省略字段定义 --&gt;</span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>composite</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><em>blockLength</em>: 表示消息中根字段保留的总空间。它不包括重复字段或可变长度字段，如字符串和blob。</li><li><em>templateId</em>: 消息模板的标识符。</li><li><em>schemaId</em>: 消息模式的标识符。一个模式总是包含一个模板。</li><li><em>version</em>: 定义消息时的消息模式版本。</li></ul><p>接下来，我们定义一个枚举，<em>Market</em>：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>enum</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Market<span class="token punctuation">&quot;</span></span> <span class="token attr-name">encodingType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>uint8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n  ``<span class="token comment">&lt;!-- 省略有效值定义 --&gt;</span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>enum</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的目标是保存一些众所周知的交易所名称，我们可以在模式文件中硬编码。它们不经常改变或增加。因此，类型_<code>&lt;enum&gt;</code>_在这里是一个很好的选择。</p><p>通过设置_encodingType=&quot;uint8&quot;_，我们为单个消息中存储市场名称预留了8位空间。这使我们能够支持_2^8 = 256_个不同的市场（0到255）——一个无符号8位整数的大小。</p><p>紧接着，我们定义了另一种类型_Symbol_。这将是一个3或4个字符的字符串，用于标识像AAPL（苹果）、MSFT（微软）等金融工具：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>type</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Symbol<span class="token punctuation">&quot;</span></span> <span class="token attr-name">primitiveType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>char<span class="token punctuation">&quot;</span></span> <span class="token attr-name">length</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>4<span class="token punctuation">&quot;</span></span> <span class="token attr-name">characterEncoding</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ASCII<span class="token punctuation">&quot;</span></span> <span class="token attr-name">description</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Instrument symbol<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如我们所看到的，我们用_characterEncoding=&quot;ASCII&quot;_限制了字符——7位，最多128个字符——我们用_length=&quot;4&quot;_设置了一个上限，不允许超过4个字符。因此，我们可以尽可能地减小大小。</p><p>之后，我们需要一个复合类型用于价格数据。所以，我们创建了类型_Decimal_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>composite</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Decimal<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n  ```<span class="token comment">&lt;!-- 省略字段定义 --&gt;</span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>composite</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_Decimal_由两种类型组成：</p><ul><li><em>mantissa</em>: 一个十进制数的有效数字</li><li><em>exponent</em>: 一个十进制数的标度</li></ul><p>例如，值_mantissa=98765_和_exponent=-3_表示数字98.765。</p><p>接下来，非常类似于_Market_，我们创建了另一个_<code>&lt;enum&gt;</code><em>来表示_Currency</em>，其值被映射为_uint8_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>enum</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Currency<span class="token punctuation">&quot;</span></span> <span class="token attr-name">encodingType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>uint8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n  ``<span class="token comment">&lt;!-- 省略有效值定义 --&gt;</span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>enum</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们通过组合我们之前创建的其他类型来定义_Quote_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>composite</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Quote<span class="token punctuation">&quot;</span></span> <span class="token attr-name">description</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>A quote represents the price of an instrument in a market<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n  `<span class="token comment">&lt;!-- 省略引用定义 --&gt;</span>`\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>composite</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们完成了类型定义。</p><p>然而，我们仍然需要定义一个消息。所以，让我们定义我们的_TradeData_消息：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">sbe:</span>message</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>TradeData<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1<span class="token punctuation">&quot;</span></span> <span class="token attr-name">description</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Represents a quote and amount of trade<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n  ```<span class="token comment">&lt;!-- 省略字段定义 --&gt;</span>```\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">sbe:</span>message</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，在类型方面，我们可以从规范中找到更多细节。</p><p>在接下来的两节中，我们将讨论如何使用我们的模式来生成我们最终用于编码/解码消息的Java代码。</p><h3 id="_4-2-使用-sbetool" tabindex="-1"><a class="header-anchor" href="#_4-2-使用-sbetool"><span>4.2. 使用_SbeTool_</span></a></h3><p>使用SBE jar文件生成Java存根的一个简单方法是自动运行实用程序类_SbeTool_：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-jar</span> <span class="token parameter variable">-Dsbe.output.dir</span><span class="token operator">=</span>target/generated-sources/java `<span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>local-maven-directory<span class="token operator">&gt;</span><span class="token variable">`</span></span>`/repository/uk/co/real-logic/sbe-all/1.26.0/sbe-all-1.26.0.jar src/main/resources/schema.xml\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们应该注意到，我们必须用我们的本地Maven路径调整占位符_<code>&lt;local-maven-directory&gt;</code>_来运行命令。</p><p>生成成功后，我们将在_folder target/generated-sources/java_中看到生成的Java代码。</p><h3 id="_4-3-在maven中使用-sbetool" tabindex="-1"><a class="header-anchor" href="#_4-3-在maven中使用-sbetool"><span>4.3. 在Maven中使用_SbeTool_</span></a></h3><p>使用_SbeTool_已经足够容易了，但我们甚至可以通过将其集成到Maven中使其更加实用。</p><p>那么，让我们在_pom.xml_中添加以下Maven插件：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token comment">&lt;!-- 省略插件配置 --&gt;</span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>结果，一个典型的Maven _clean install_命令会自动为我们生成Java存根。</p><p>此外，我们始终可以查看SBE的Maven文档以获取更多配置选项。</p><h2 id="_5-基本消息传递" tabindex="-1"><a class="header-anchor" href="#_5-基本消息传递"><span>5. 基本消息传递</span></a></h2><p>由于我们的Java存根已经准备好了，让我们看看如何使用它们。</p><p>首先，我们需要一些数据进行测试。因此，我们创建了一个类，<em>MarketData</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MarketData</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">int</span> amount<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token keyword">double</span> price<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">Market</span> market<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">Currency</span> currency<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> symbol<span class="token punctuation">;</span>\n\n    <span class="token comment">// 构造函数，getter和setter</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意到我们的_MarketData_由SBE为我们生成的_Market_和_Currency_类组成。</p><p>接下来，让我们</p>',69),l=[p];function o(c,i){return s(),n("div",null,l)}const d=a(e,[["render",o],["__file","2024-07-13-Guide to Simple Binary Encoding.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Guide%20to%20Simple%20Binary%20Encoding.html","title":"Simple Binary Encoding 指南","lang":"zh-CN","frontmatter":{"date":"2022-10-01T00:00:00.000Z","category":["Java","SBE"],"tag":["Simple Binary Encoding","Java编码"],"head":[["meta",{"name":"keywords","content":"Java, SBE, Simple Binary Encoding, 编码, 解码, 金融数据, 消息结构"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Guide%20to%20Simple%20Binary%20Encoding.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Simple Binary Encoding 指南"}],["meta",{"property":"og:description","content":"Simple Binary Encoding 指南 效率和性能是现代数据服务的两个重要方面，尤其是当我们流式传输大量数据时。当然，通过高效的编码来减小消息大小是实现这一目标的关键。 然而，自行开发的编码/解码算法可能既繁琐又脆弱，这使得它们在长期维护中变得困难。 幸运的是，Simple Binary Encoding（SBE）可以帮助我们以实际的方式实..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/10/sbe-message-structure.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T10:04:45.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Simple Binary Encoding"}],["meta",{"property":"article:tag","content":"Java编码"}],["meta",{"property":"article:published_time","content":"2022-10-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T10:04:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Simple Binary Encoding 指南\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/10/sbe-message-structure.png\\"],\\"datePublished\\":\\"2022-10-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T10:04:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Simple Binary Encoding 指南 效率和性能是现代数据服务的两个重要方面，尤其是当我们流式传输大量数据时。当然，通过高效的编码来减小消息大小是实现这一目标的关键。 然而，自行开发的编码/解码算法可能既繁琐又脆弱，这使得它们在长期维护中变得困难。 幸运的是，Simple Binary Encoding（SBE）可以帮助我们以实际的方式实..."},"headers":[{"level":2,"title":"2. SBE 是什么？","slug":"_2-sbe-是什么","link":"#_2-sbe-是什么","children":[{"level":3,"title":"2.1. 消息结构","slug":"_2-1-消息结构","link":"#_2-1-消息结构","children":[]},{"level":3,"title":"2.2. SBE何时（不）有用？","slug":"_2-2-sbe何时-不-有用","link":"#_2-2-sbe何时-不-有用","children":[]}]},{"level":2,"title":"3. 设置库","slug":"_3-设置库","link":"#_3-设置库","children":[]},{"level":2,"title":"4. 生成Java存根","slug":"_4-生成java存根","link":"#_4-生成java存根","children":[{"level":3,"title":"4.1. 创建消息模式","slug":"_4-1-创建消息模式","link":"#_4-1-创建消息模式","children":[]},{"level":3,"title":"4.2. 使用_SbeTool_","slug":"_4-2-使用-sbetool","link":"#_4-2-使用-sbetool","children":[]},{"level":3,"title":"4.3. 在Maven中使用_SbeTool_","slug":"_4-3-在maven中使用-sbetool","link":"#_4-3-在maven中使用-sbetool","children":[]}]},{"level":2,"title":"5. 基本消息传递","slug":"_5-基本消息传递","link":"#_5-基本消息传递","children":[]}],"git":{"createdTime":1720865085000,"updatedTime":1720865085000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.77,"words":2031},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Guide to Simple Binary Encoding.md","localizedDate":"2022年10月1日","excerpt":"\\n<p>效率和性能是现代数据服务的两个重要方面，尤其是当我们流式传输大量数据时。当然，通过高效的编码来减小消息大小是实现这一目标的关键。</p>\\n<p>然而，自行开发的编码/解码算法可能既繁琐又脆弱，这使得它们在长期维护中变得困难。</p>\\n<p>幸运的是，Simple Binary Encoding（SBE）可以帮助我们以实际的方式实现和维护一个量身定制的编码/解码系统。</p>\\n<p>在本教程中，我们将讨论Simple Binary Encoding（SBE）是什么以及如何使用它，以及代码示例。</p>\\n<h2>2. SBE 是什么？</h2>\\n<p>SBE 是一种二进制表示，用于编码/解码消息以支持低延迟流式传输。它也是FIX SBE标准的参考实现，这是金融数据编码的标准。</p>","autoDesc":true}');export{d as comp,m as data};
