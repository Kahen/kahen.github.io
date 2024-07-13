import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a as i}from"./app-BDZ-trJf.js";const a={},r=i(`<h1 id="java中的游程编码及其解码" tabindex="-1"><a class="header-anchor" href="#java中的游程编码及其解码"><span>Java中的游程编码及其解码</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在计算机科学中，数据压缩技术在优化存储和传输效率方面扮演着重要角色。其中一种历经时间考验的技术是游程编码（Run-length Encoding，简称RLE）。</p><p>在本教程中，我们将理解RLE，并探索如何在Java中实现编码和解码。</p><h2 id="_2-理解游程编码" tabindex="-1"><a class="header-anchor" href="#_2-理解游程编码"><span>2. 理解游程编码</span></a></h2><p>游程编码是一种简单但有效的无损数据压缩形式。RLE的基本思想是<strong>通过单个值及其计数来表示数据流中连续相同的元素，即“游程”</strong>，而不是按原始游程表示。</p><p>这在处理重复序列时特别有用，因为它显著减少了存储或传输数据所需的空间量。</p><p>RLE非常适合压缩基于调色板的位图图像，例如计算机图标和动画。一个著名的例子是Microsoft Windows 3.x的启动屏幕，它就是使用RLE压缩的。</p><p>让我们考虑以下示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String INPUT = &quot;WWWWWWWWWWWWBAAACCDEEEEE&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们对上面的字符串应用游程编码数据压缩算法，它可以被渲染为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String RLE = &quot;12W1B3A2C1D5E&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在编码序列中，<strong>每个字符后面跟着它连续出现的次数</strong>。这个规则允许我们在解码期间轻松地重建原始数据。</p><p>值得注意的是，<strong>标准RLE仅适用于“文本”输入</strong>。如果输入包含数字，RLE无法以非歧义的方式对它们进行编码。</p><p>在本教程中，我们将探讨两种游程编码和解码方法。</p><h2 id="_3-基于字符数组的解决方案" tabindex="-1"><a class="header-anchor" href="#_3-基于字符数组的解决方案"><span>3. 基于字符数组的解决方案</span></a></h2><p>现在我们已经理解了RLE及其工作原理，实现游程编码和解码的一个经典方法是将输入字符串转换为_char_数组，然后对数组应用编码和解码规则。</p><h3 id="_3-1-创建编码方法" tabindex="-1"><a class="header-anchor" href="#_3-1-创建编码方法"><span>3.1. 创建编码方法</span></a></h3><p>实现游程编码的关键是<strong>识别每个游程并计算其长度</strong>。让我们首先看看实现，然后理解它的工作原理：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String runLengthEncode(String input) {
    StringBuilder result = new StringBuilder();
    int count = 1;
    char[] chars = input.toCharArray();
    for (int i = 0; i &lt; chars.length; i++) {
        char c = chars[i];
        if (i + 1 &lt; chars.length &amp;&amp; c == chars[i + 1]) {
            count++;
        } else {
            result.append(count).append(c);
            count = 1;
        }
    }
    return result.toString();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们快速浏览一下上面的代码并理解其逻辑。</p><p>首先，我们使用_StringBuilder_来存储每个步骤的结果，并将它们连接起来以获得更好的性能。</p><p>在初始化一个计数器并将输入字符串转换为_char_数组之后，该函数遍历输入字符串中的每个字符。</p><p>对于每个字符：</p><ul><li>如果<strong>当前字符与下一个字符相同，并且我们不在字符串的末尾</strong>，则增加计数。</li><li>如果<strong>当前字符与下一个字符不同，或者我们在字符串的末尾</strong>，则将计数和当前字符追加到结果_StringBuilder_。然后，计数重置为_1_，以用于下一个唯一字符。</li></ul><p>最后，使用_toString()_将_StringBuilder_转换为字符串，并将其作为编码过程的结果返回。</p><p>当我们使用此编码方法测试我们的_INPUT_时，我们得到了预期的结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>assertEquals(RLE, runLengthEncode(INPUT));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-2-创建解码方法" tabindex="-1"><a class="header-anchor" href="#_3-2-创建解码方法"><span>3.2. 创建解码方法</span></a></h3><p>识别每个游程仍然是解码RLE字符串的关键。一个游程包括<strong>字符及其连续出现的次数，例如“12W”或“2C”</strong>。</p><p>现在，让我们创建一个解码方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String runLengthDecode(String rle) {
    StringBuilder result = new StringBuilder();
    char[] chars = rle.toCharArray();
    
    int count = 0;
    for (char c : chars) {
        if (Character.isDigit(c)) {
            count = 10 * count + Character.getNumericValue(c);
        } else {
            result.append(String.join(&quot;&quot;, Collections.nCopies(count, String.valueOf(c))));
            count = 0;
        }
    }
    return result.toString();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们逐步分解代码并理解它的工作原理。</p><p>首先，我们创建一个_StringBuilder_对象来保存步骤结果，并将_rle_字符串转换为char数组以供后续处理。</p><p>此外，我们初始化了一个整数变量_count_来跟踪连续出现的次数。</p><p>然后，我们遍历RLE编码字符串中的每个字符。对于每个字符：</p><ul><li><strong>如果字符是数字，它就有助于计数</strong>。通过使用公式_10 * count + Character.getNumericValue(c)_来更新计数。<strong>这是为了处理多位数字的计数</strong>。</li><li><strong>如果字符不是数字，遇到了一个新的字符</strong>。然后，当前字符被追加到结果_StringBuilder_中，重复计数次，使用_Collections.nCopies()<em>。然后，计数重置为_0</em>，用于下一组连续出现。</li></ul><p>值得一提的是，<strong>如果我们使用Java 11或更高版本，_String.valueOf(c).repeat(count)<em>是重复字符_c</em> _count_次的更好选择</strong>。</p><p>当我们使用我们的例子验证解码方法时，测试通过了：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>assertEquals(INPUT, runLengthDecode(RLE));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-基于正则表达式的解决方案" tabindex="-1"><a class="header-anchor" href="#_4-基于正则表达式的解决方案"><span>4. 基于正则表达式的解决方案</span></a></h2><p>正则表达式是处理字符和字符串的强大工具。让我们看看我们是否可以使用正则表达式执行游程编码和解码。</p><h3 id="_4-1-创建编码方法" tabindex="-1"><a class="header-anchor" href="#_4-1-创建编码方法"><span>4.1. 创建编码方法</span></a></h3><p>让我们首先看看输入字符串。如果我们能够将其分割成一个“游程数组”，那么问题就可以很容易地解决：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Input     : &quot;WWWWWWWWWWWWBAAACCDEEEEE&quot;
Run Array : [&quot;WWWWWWWWWWWW&quot;, &quot;B&quot;, &quot;AAA&quot;, &quot;CC&quot;, &quot;D&quot;, &quot;EEEEE&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们不能通过字符来分割输入字符串来实现这一点。相反，我们必须通过零宽位置来分割，例如在‘W’和‘B’之间、‘B’和‘A’之间等的位置。</p><p>不难发现这些位置的规则：<strong>位置前后的字符是不同的</strong>。因此，我们可以使用<strong>环视和反向引用</strong>构建一个正则表达式来匹配所需的位置：“(?&lt;=(\\D))(?!\\1)”。让我们快速了解这个正则表达式的含义：</p><ul><li>(?&lt;=(\\D)) – 正向环视断言确保<strong>匹配是在非数字字符之后</strong>（\\D代表非数字字符）。</li><li>(?!\\1) – 负向前瞻断言确保<strong>匹配的位置不在与正向环视中相同的字符之前</strong>。\\1引用先前匹配的非数字字符。</li></ul><p>这些断言的组合确保了分割发生在连续相同字符的边界处。</p><p>接下来，让我们创建编码方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String runLengthEncodeByRegEx(String input) {
    String[] arr = input.split(&quot;(?&lt;=(\\\\D))(?!\\\\1)&quot;);
    StringBuilder result = new StringBuilder();
    for (String run : arr) {
        result.append(run.length()).append(run.charAt(0));
    }
    return result.toString();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，在我们获得游程数组之后，其余的任务只是简单地将每个游程的长度和字符追加到准备好的_StringBuilder_。</p><p>_runLengthEncodeByRegEx()_方法通过了我们的测试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>assertEquals(RLE, runLengthEncodeByRegEx(INPUT));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-2-创建解码方法" tabindex="-1"><a class="header-anchor" href="#_4-2-创建解码方法"><span>4.2. 创建解码方法</span></a></h3><p>我们可以遵循类似的想法来解码一个RLE编码的字符串。首先，我们需要分割编码的字符串并获得以下数组：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>RLE String: &quot;12W1B3A2C1D5E&quot;
Array     : [&quot;12&quot;, &quot;W&quot;, &quot;1&quot;, &quot;B&quot;, &quot;3&quot;, &quot;A&quot;, &quot;2&quot;, &quot;C&quot;, &quot;1&quot;, &quot;D&quot;, &quot;5&quot;, &quot;E&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦我们获得这个数组，我们就可以通过简单地重复每个字符，例如‘W’重复12次，‘B’重复1次等，来生成解码后的字符串。</p><p>我们将<strong>再次使用环视技术</strong>来创建正则表达式来分割输入字符串：“(?&lt;=\\D)|\\|(?=\\D+)”。</p><p>在这个正则表达式中：</p><ul><li>(?&lt;=\\D) – 正向环视断言确保分割发生在非数字字符之后。</li><li>\\| – 表示“或”关系</li><li>(?=\\D+) – 正向前瞻断言确保分割发生在一个或多个非数字字符之前。</li></ul><p><strong>这种组合允许分割在RLE编码字符串中连续计数和字符的边界处发生</strong>。</p><p>接下来，让我们基于基于正则表达式的分割构建解码方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String runLengthDecodeByRegEx(String rle) {
    if (rle.isEmpty()) {
        return &quot;&quot;;
    }
    String[] arr = rle.split(&quot;(?&lt;=\\\\D)|(?=\\\\D+)&quot;);
    if (arr.length % 2 != 0) {
        throw new IllegalArgumentException(&quot;Not a RLE string&quot;);
    }
    StringBuilder result = new StringBuilder</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,64),l=[r];function s(d,u){return t(),n("div",null,l)}const p=e(a,[["render",s],["__file","2024-06-23-Run Length Encoding and Decoding in Java.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Run%20Length%20Encoding%20and%20Decoding%20in%20Java.html","title":"Java中的游程编码及其解码","lang":"zh-CN","frontmatter":{"category":["Java","数据压缩"],"tag":["Run-Length Encoding","Java"],"head":[["meta",{"name":"keywords","content":"数据压缩，Run-Length Encoding，Java实现"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Run%20Length%20Encoding%20and%20Decoding%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的游程编码及其解码"}],["meta",{"property":"og:description","content":"Java中的游程编码及其解码 1. 概述 在计算机科学中，数据压缩技术在优化存储和传输效率方面扮演着重要角色。其中一种历经时间考验的技术是游程编码（Run-length Encoding，简称RLE）。 在本教程中，我们将理解RLE，并探索如何在Java中实现编码和解码。 2. 理解游程编码 游程编码是一种简单但有效的无损数据压缩形式。RLE的基本思想..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T01:46:18.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Run-Length Encoding"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:modified_time","content":"2024-06-23T01:46:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的游程编码及其解码\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-23T01:46:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的游程编码及其解码 1. 概述 在计算机科学中，数据压缩技术在优化存储和传输效率方面扮演着重要角色。其中一种历经时间考验的技术是游程编码（Run-length Encoding，简称RLE）。 在本教程中，我们将理解RLE，并探索如何在Java中实现编码和解码。 2. 理解游程编码 游程编码是一种简单但有效的无损数据压缩形式。RLE的基本思想..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 理解游程编码","slug":"_2-理解游程编码","link":"#_2-理解游程编码","children":[]},{"level":2,"title":"3. 基于字符数组的解决方案","slug":"_3-基于字符数组的解决方案","link":"#_3-基于字符数组的解决方案","children":[{"level":3,"title":"3.1. 创建编码方法","slug":"_3-1-创建编码方法","link":"#_3-1-创建编码方法","children":[]},{"level":3,"title":"3.2. 创建解码方法","slug":"_3-2-创建解码方法","link":"#_3-2-创建解码方法","children":[]}]},{"level":2,"title":"4. 基于正则表达式的解决方案","slug":"_4-基于正则表达式的解决方案","link":"#_4-基于正则表达式的解决方案","children":[{"level":3,"title":"4.1. 创建编码方法","slug":"_4-1-创建编码方法","link":"#_4-1-创建编码方法","children":[]},{"level":3,"title":"4.2. 创建解码方法","slug":"_4-2-创建解码方法","link":"#_4-2-创建解码方法","children":[]}]}],"git":{"createdTime":1719107178000,"updatedTime":1719107178000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.46,"words":1939},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Run Length Encoding and Decoding in Java.md","localizedDate":"2024年6月23日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在计算机科学中，数据压缩技术在优化存储和传输效率方面扮演着重要角色。其中一种历经时间考验的技术是游程编码（Run-length Encoding，简称RLE）。</p>\\n<p>在本教程中，我们将理解RLE，并探索如何在Java中实现编码和解码。</p>\\n<h2>2. 理解游程编码</h2>\\n<p>游程编码是一种简单但有效的无损数据压缩形式。RLE的基本思想是<strong>通过单个值及其计数来表示数据流中连续相同的元素，即“游程”</strong>，而不是按原始游程表示。</p>\\n<p>这在处理重复序列时特别有用，因为它显著减少了存储或传输数据所需的空间量。</p>","autoDesc":true}');export{p as comp,g as data};
