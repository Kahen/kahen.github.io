import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CE5go3V-.js";const e={},p=t(`<h1 id="通过算法识别和验证信用卡号码" tabindex="-1"><a class="header-anchor" href="#通过算法识别和验证信用卡号码"><span>通过算法识别和验证信用卡号码</span></a></h1><p>在本文中，我们将学习如何使用正则表达式从信用卡号识别信用卡类型。然后，我们将了解Luhn算法以及如何使用它来检查信用卡号是否有效。</p><h2 id="_2-卡号前几位告诉我们什么" tabindex="-1"><a class="header-anchor" href="#_2-卡号前几位告诉我们什么"><span>2. 卡号前几位告诉我们什么？</span></a></h2><p>主账号号码（PAN）是信用卡号的另一个名称。</p><p><strong>PAN通常为16位数字长</strong>，尽管根据发卡机构的不同，数字的数量可能会有所变化。</p><p>目前，<strong>发卡机构识别号（IIN）是PAN的前六位数字</strong>。它由一个前导数字和五个数字组成。</p><p>需要强调的是，这是目前的情况，因为未来可能会发生变化。早在2015年就开始工作，将IIN增加到前八位数字。</p><p>让我们看看如何仅通过查看IIN来确定信用卡的类型。</p><h3 id="_2-1-首位数字告诉我们什么" tabindex="-1"><a class="header-anchor" href="#_2-1-首位数字告诉我们什么"><span>2.1. 首位数字告诉我们什么？</span></a></h3><p><strong>主要行业识别码是卡号的第一位数字</strong>。</p><p>顾名思义，我们可以通过查看卡号的第一位数字来确定卡所属的行业：</p><ul><li>1, 2 – 航空公司（等）</li><li>3 – 旅游和娱乐</li><li>4, 5 – 银行业务</li><li>6 – 零售和银行业务</li><li>7 – 燃料行业</li><li>8 – 医疗保健和电信</li><li>9 – 国家机构</li><li>0 – 其他，为将来保留</li></ul><p>现在，让我们看看如何使用IIN识别发卡机构。</p><h3 id="_2-2-我们如何从iin确定卡类型" tabindex="-1"><a class="header-anchor" href="#_2-2-我们如何从iin确定卡类型"><span>2.2. 我们如何从IIN确定卡类型？</span></a></h3><p>自1989年以来，一直有一个国际标准定义了PAN应该如何分配。官方的IIN注册表不是公开可用的。</p><p>幸运的是，<strong>大多数主要的发卡机构都有广为人知的IIN范围，所以我们可以使用正则表达式将IIN匹配到发卡机构</strong>。</p><p>在我们查看正则表达式之前，让我们记住<strong>IIN范围的列表不断变化</strong>。</p><p>如果我们正在编写一个应用程序来执行此操作，我们需要考虑我们计划如何保持它最新。</p><p>或者，我们可以选择导入几个可用的开源库之一，这些库包含更多的卡类型，并且比我们自己可能管理的更为彻底地测试。例如，使用Stripe API意味着卡处理是由我们管理的。</p><h3 id="_2-3-使用正则表达式识别发卡机构" tabindex="-1"><a class="header-anchor" href="#_2-3-使用正则表达式识别发卡机构"><span>2.3. 使用正则表达式识别发卡机构</span></a></h3><p>让我们尝试识别Visa卡。</p><p>Visa卡号以4开头，因此一个简单的正则表达式来识别Visa卡将是<code>^4[0-9]{0,}$</code>。</p><p>请注意，在我们的示例中，我们没有检查数字的长度。到目前为止，我们假设卡号是有效的，因此长度不是我们在这里验证的内容。</p><p>可以应用类似的模式来识别其他发卡机构的卡。例如，美国运通卡以34或37开头，所以我们可以使用<code>^3[47][0-9]{0,}$</code>来检测它们。</p><p>一些发卡机构有更宽的IIN范围。</p><p>我们发现Mastercard的卡通常以51-55开头，然而，在过去的十年中，他们在BIN范围222100-272099内推出了卡片。</p><p>这给了我们一个正则表达式<code>^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$</code>。</p><p>我们可以使用类似的模式来识别任何已知IIN范围的发卡机构的卡。</p><h2 id="_3-卡号中间的数字告诉我们什么" tabindex="-1"><a class="header-anchor" href="#_3-卡号中间的数字告诉我们什么"><span>3. 卡号中间的数字告诉我们什么？</span></a></h2><p><strong>完整的PAN由三部分组成：发卡机构识别号（IIN），个人账户识别号和校验位</strong>。</p><p>在IIN和最后一个数字之间，我们有个人账户识别号。</p><p>发卡机构定义了这些中间数字的含义，因此它们在不同的发卡机构中将具有不同的含义。</p><p>它们指示与卡号相关联的账户类型的信息。</p><h2 id="_4-卡号最后一个数字告诉我们什么" tabindex="-1"><a class="header-anchor" href="#_4-卡号最后一个数字告诉我们什么"><span>4. 卡号最后一个数字告诉我们什么？</span></a></h2><p><strong>校验位是卡号的最后一个数字</strong>。</p><p>幸运的是，校验位允许我们使用Luhn算法快速识别无效的卡号。</p><p>Hans Peter Luhn在20世纪50年代末开发了Luhn算法。</p><p>它用于生成我们今天使用的每一个现代信用卡号，确保每个卡号都具有特定的属性。</p><p><strong>Luhn算法使用卡号中的每一位数字</strong>，这意味着我们可以使用它轻松地确定给定的卡号是否无效 - 即使只输入了一个数字错误。</p><p>这样做意味着我们可以限制不必要的卡处理功能的数量。如果我们要按我们请求的每笔交易收费，这尤其重要！</p><p>让我们看看如何在Java应用程序中使用Luhn算法。</p><h3 id="_4-1-我们如何使用luhn算法验证卡号" tabindex="-1"><a class="header-anchor" href="#_4-1-我们如何使用luhn算法验证卡号"><span>4.1. 我们如何使用Luhn算法验证卡号？</span></a></h3><p>让我们经历使用Luhn算法验证给定卡号的步骤。</p><p>我们需要获取包括IIN在内的完整信用卡号。</p><p><strong>从最右边的数字开始，我们将所有数字相加，对每第二个数字执行特殊步骤</strong>。</p><p>由于我们从右边开始，我们需要反向循环通过卡号，识别每第二个数字：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> cardNumber<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> digit <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>cardNumber<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>cardNumber<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> i<span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        digit <span class="token operator">=</span> <span class="token function">doubleAndSumDigits</span><span class="token punctuation">(</span>digit<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    sum <span class="token operator">+=</span> digit<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>对于每第二个数字，我们必须将其加倍，然后再加上剩余的数字</strong>。</p><p>让我们通过一个短示例（而不是通常的16位数字）来说明这一点 - 让我们检查数字8642是否是有效的卡号。</p><p>从最右边的数字开始，我们将加倍每第二个数字：</p><ul><li>所以对于2（从右边数的第一个数字），没有变化。</li><li>接下来，我们将第二个数字4加倍，得到8。</li><li>之后，第三个数字6，没有变化。</li><li>最后，我们将第四个数字8加倍，得到16。</li></ul><p><strong>如果加倍的数字结果是两位数，那么我们需要执行一个额外的步骤以回到一位数</strong> - 我们将这些数字相加以产生一位数，所以对于16，这将是1+6=7。</p><p><strong>这一步与减去9相同</strong>，所以我们可以在代码中实现它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">doubleAndSumDigits</span><span class="token punctuation">(</span><span class="token keyword">int</span> digit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> ret <span class="token operator">=</span> digit <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">&gt;</span> <span class="token number">9</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ret <span class="token operator">=</span> digit <span class="token operator">-</span> <span class="token number">9</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，以我们的示例为例，让我们将每个数字相加：2 + 8 + 6 + 7 = 23。</p><p><strong>如果Luhn算法的结果是10的倍数，那么卡号可能是有效的</strong>。</p><p>我们将此作为我们检查的结果返回：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">return</span> sum <span class="token operator">%</span> <span class="token number">10</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在我们的案例中，23不能被10整除，所以8642不是有效的卡号。</p><p>在我们的示例中，最后一个数字，2，将是校验位。</p><p>对于真正的卡号，校验位是使用Luhn算法计算的。</p><p>例如，如果我们将校验位改为9以得到8649，那么Luhn算法的结果是30，可以被10整除，所以8649将通过我们上面的Luhn检查。</p><h3 id="_4-2-luhn算法有什么限制吗" tabindex="-1"><a class="header-anchor" href="#_4-2-luhn算法有什么限制吗"><span>4.2. Luhn算法有什么限制吗？</span></a></h3><p>当然，我们的检查并不意味着8649绝对是有效的卡号。尽管它通过了我们的检查，但它可能没有被相关发卡机构发行为实际的卡。</p><p><strong>我们唯一能够确定卡号是否真实的方法是询问发卡机构</strong>。</p><p>Luhn算法仍然为我们提供了一种有用的方式，以确认给定的卡号绝对无效。</p><p>然而，<strong>有一些边缘情况，我们的Luhn检查将无法检测到卡号中的一个打字错误</strong>。</p><p>幸运的是，这些边缘情况足够罕见，以至于我们不太可能在现实生活中遇到一个。</p><p>最后，<strong>Luhn算法不考虑卡号的长度</strong>。</p><p>实际上，我们知道即使8649通过了我们的Luhn检查，它也太短了，不能是一个真正的信用卡号。</p><p>我们可以对卡号的长度进行额外的检查，但必须记住每个发卡机构的号码长度可能会有所不同。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们查看了卡号的每个部分可以告诉我们关于信用卡账户的什么信息。</p><p>首先，我们学习了如何通过匹配前导数字上的正则表达式模式来识别发卡机构。接下来，我们了解到我们需要发卡机构特定的信息来理解卡号中间告诉我们关于账户的信息。最后，我们看到了Luhn算法的工作原理，并实现了一些代码来验证给定的卡号。</p><p>像往常一样，示例项目可在GitHub上找到。</p>`,75),o=[p];function i(l,r){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","2024-07-15-Algorithm to Identify and Validate a Credit Card Number.html.vue"]]),h=JSON.parse('{"path":"/posts/baeldung/2024-07-15/2024-07-15-Algorithm%20to%20Identify%20and%20Validate%20a%20Credit%20Card%20Number.html","title":"通过算法识别和验证信用卡号码","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Algorithm","Java"],"tag":["Credit Card Validation","Luhn Algorithm"],"head":[["meta",{"name":"keywords","content":"Algorithm, Java, Credit Card, Validation, Luhn Algorithm"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-15/2024-07-15-Algorithm%20to%20Identify%20and%20Validate%20a%20Credit%20Card%20Number.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"通过算法识别和验证信用卡号码"}],["meta",{"property":"og:description","content":"通过算法识别和验证信用卡号码 在本文中，我们将学习如何使用正则表达式从信用卡号识别信用卡类型。然后，我们将了解Luhn算法以及如何使用它来检查信用卡号是否有效。 2. 卡号前几位告诉我们什么？ 主账号号码（PAN）是信用卡号的另一个名称。 PAN通常为16位数字长，尽管根据发卡机构的不同，数字的数量可能会有所变化。 目前，发卡机构识别号（IIN）是PA..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-15T13:18:44.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Credit Card Validation"}],["meta",{"property":"article:tag","content":"Luhn Algorithm"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-15T13:18:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"通过算法识别和验证信用卡号码\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-15T13:18:44.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"通过算法识别和验证信用卡号码 在本文中，我们将学习如何使用正则表达式从信用卡号识别信用卡类型。然后，我们将了解Luhn算法以及如何使用它来检查信用卡号是否有效。 2. 卡号前几位告诉我们什么？ 主账号号码（PAN）是信用卡号的另一个名称。 PAN通常为16位数字长，尽管根据发卡机构的不同，数字的数量可能会有所变化。 目前，发卡机构识别号（IIN）是PA..."},"headers":[{"level":2,"title":"2. 卡号前几位告诉我们什么？","slug":"_2-卡号前几位告诉我们什么","link":"#_2-卡号前几位告诉我们什么","children":[{"level":3,"title":"2.1. 首位数字告诉我们什么？","slug":"_2-1-首位数字告诉我们什么","link":"#_2-1-首位数字告诉我们什么","children":[]},{"level":3,"title":"2.2. 我们如何从IIN确定卡类型？","slug":"_2-2-我们如何从iin确定卡类型","link":"#_2-2-我们如何从iin确定卡类型","children":[]},{"level":3,"title":"2.3. 使用正则表达式识别发卡机构","slug":"_2-3-使用正则表达式识别发卡机构","link":"#_2-3-使用正则表达式识别发卡机构","children":[]}]},{"level":2,"title":"3. 卡号中间的数字告诉我们什么？","slug":"_3-卡号中间的数字告诉我们什么","link":"#_3-卡号中间的数字告诉我们什么","children":[]},{"level":2,"title":"4. 卡号最后一个数字告诉我们什么？","slug":"_4-卡号最后一个数字告诉我们什么","link":"#_4-卡号最后一个数字告诉我们什么","children":[{"level":3,"title":"4.1. 我们如何使用Luhn算法验证卡号？","slug":"_4-1-我们如何使用luhn算法验证卡号","link":"#_4-1-我们如何使用luhn算法验证卡号","children":[]},{"level":3,"title":"4.2. Luhn算法有什么限制吗？","slug":"_4-2-luhn算法有什么限制吗","link":"#_4-2-luhn算法有什么限制吗","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721049524000,"updatedTime":1721049524000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.36,"words":2207},"filePathRelative":"posts/baeldung/2024-07-15/2024-07-15-Algorithm to Identify and Validate a Credit Card Number.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本文中，我们将学习如何使用正则表达式从信用卡号识别信用卡类型。然后，我们将了解Luhn算法以及如何使用它来检查信用卡号是否有效。</p>\\n<h2>2. 卡号前几位告诉我们什么？</h2>\\n<p>主账号号码（PAN）是信用卡号的另一个名称。</p>\\n<p><strong>PAN通常为16位数字长</strong>，尽管根据发卡机构的不同，数字的数量可能会有所变化。</p>\\n<p>目前，<strong>发卡机构识别号（IIN）是PAN的前六位数字</strong>。它由一个前导数字和五个数字组成。</p>\\n<p>需要强调的是，这是目前的情况，因为未来可能会发生变化。早在2015年就开始工作，将IIN增加到前八位数字。</p>","autoDesc":true}');export{d as comp,h as data};
