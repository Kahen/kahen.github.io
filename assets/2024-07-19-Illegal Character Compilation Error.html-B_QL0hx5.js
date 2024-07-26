import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-DpYLEM_u.js";const t={},p=e(`<hr><h1 id="java-非法字符编译错误" tabindex="-1"><a class="header-anchor" href="#java-非法字符编译错误"><span>Java 非法字符编译错误</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>非法字符编译错误是一种文件类型编码错误。当我们在创建文件时使用了错误的编码，就会产生这种错误。因此，在像 Java 这样的语言中，当我们尝试编译项目时可能会遇到这种类型的错误。在本教程中，我们将详细描述问题，并展示一些可能遇到这种情况的场景，然后提供一些解决此问题的示例。</p><h3 id="_2-1-字节顺序标记-bom" tabindex="-1"><a class="header-anchor" href="#_2-1-字节顺序标记-bom"><span>2.1. 字节顺序标记 (BOM)</span></a></h3><p>在我们深入字节顺序标记之前，需要快速了解一下 UCS（Unicode）转换格式（UTF）。<strong>UTF 是一种字符编码格式，可以编码 Unicode 中所有可能的字符代码点</strong>。在所有这些编码中，UTF-8 是最常用的。</p><p>UTF-8 使用 8 位可变宽度编码，以最大化与 ASCII 的兼容性。当我们在文件中使用这种编码时，我们可能会发现一些字节代表 Unicode 代码点。因此，我们的文件以 U+FEFF 字节顺序标记 (BOM) 开始。这个标记在正确使用时是不可见的。然而，在某些情况下，它可能会导致数据错误。</p><p><strong>在 UTF-8 编码中，BOM 的存在并不是根本性的</strong>。尽管它不是必需的，BOM 仍可能出现在 UTF-8 编码的文本中。BOM 的添加可能发生在编码转换过程中，或者由标记内容为 UTF-8 的文本编辑器完成。</p><p>像 Windows 上的记事本这样的文本编辑器可能会产生这种添加。因此，当我们使用类似记事本的文本编辑器创建代码示例并尝试运行它时，我们可能会得到编译错误。相比之下，现代 IDE 在创建文件时会将其编码为不带 BOM 的 UTF-8。接下来的部分将展示这个问题的一些示例。</p><h3 id="_2-2-包含非法字符的类的编译错误" tabindex="-1"><a class="header-anchor" href="#_2-2-包含非法字符的类的编译错误"><span>2.2. 包含非法字符的类的编译错误</span></a></h3><p>通常，我们使用高级 IDE，但有时我们也会使用文本编辑器。不幸的是，正如我们所了解到的，一些文本编辑器可能会比解决方案带来更多问题，因为保存带有 BOM 的文件可能会导致 Java 中的编译错误。<strong>“非法字符”错误发生在编译阶段，因此很容易检测到</strong>。下一个示例向我们展示了它的工作原理。</p><p>首先，让我们在文本编辑器中编写一个简单的类，比如记事本。这个类只是一个表示——我们可以编写任何代码进行测试。接下来，我们将文件保存为带有 BOM 的格式以进行测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestBOM</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>args<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;BOM Test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，当我们尝试使用 <em>javac</em> 命令编译此文件时：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ javac ./TestBOM.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因此，我们得到错误消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>∩╗┐public class TestBOM {
 ^
.\\\\TestBOM.java:1: error: illegal character: &#39;\\u00bf&#39;
∩╗┐public class TestBOM {
  ^
2 errors
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>理想情况下，要解决这个问题，唯一要做的就是将文件保存为不带 BOM 编码的 UTF-8。之后，问题就解决了。<strong>我们应该始终检查我们的文件是否保存时不带 BOM</strong>。</p><p><strong>另一种解决这个问题的方法是使用像 <em>dos2unix</em> 这样的工具</strong>。这个工具将删除 BOM，并且还会处理 Windows 文本文件的其他特性。</p><h2 id="_3-读取文件" tabindex="-1"><a class="header-anchor" href="#_3-读取文件"><span>3. 读取文件</span></a></h2><p>此外，让我们分析一些使用 BOM 编码的文件的示例。</p><p>最初，我们需要创建一个带有 BOM 的文件以用于我们的测试。这个文件包含我们的示例文本，“Hello world with BOM.”——这将是我们期望的字符串。接下来，让我们开始测试。</p><h3 id="_3-1-使用-bufferedreader-读取文件" tabindex="-1"><a class="header-anchor" href="#_3-1-使用-bufferedreader-读取文件"><span>3.1. 使用 BufferedReader 读取文件</span></a></h3><p>首先，我们将使用 <em>BufferedReader</em> 类测试文件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenInputFileHasBOM_thenUseInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> line<span class="token punctuation">;</span>
    <span class="token class-name">String</span> actual <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">BufferedReader</span> br <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>line <span class="token operator">=</span> br<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            actual <span class="token operator">+=</span> line<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> actual<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，当我们尝试断言字符串相等时，<strong>我们得到一个错误</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>org.opentest4j.AssertionFailedError: expected: \`\`&lt;Hello world with BOM.&gt;\`\` but was: \`\`&lt;Hello world with BOM.&gt;\`\`
Expected :Hello world with BOM.
Actual   :Hello world with BOM.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际上，如果我们浏览测试响应，两个字符串看起来显然相等。尽管如此，字符串的实际值包含 BOM。因此，字符串不相等。</p><p>此外，<strong>一个快速的解决方法是替换 BOM 字符</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenInputFileHasBOM_thenUseInputStreamWithReplace</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> line<span class="token punctuation">;</span>
    <span class="token class-name">String</span> actual <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">BufferedReader</span> br <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>line <span class="token operator">=</span> br<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            actual <span class="token operator">+=</span> line<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">&quot;\\uFEFF&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> actual<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>replace</em> 方法从我们的字符串中清除了 BOM，因此我们的测试通过了。我们需要小心使用 <em>replace</em> 方法。处理大量文件可能会导致性能问题。</p><h3 id="_3-2-使用-apache-commons-io-读取文件" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-apache-commons-io-读取文件"><span>3.2. 使用 Apache Commons IO 读取文件</span></a></h3><p>此外，<strong>Apache Commons IO 库提供了 <em>BOMInputStream</em> 类</strong>。这个类是一个包装器，包含编码的 <em>ByteOrderMark</em> 作为其第一个字节。让我们看看它是如何工作的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenInputFileHasBOM_thenUseBOMInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> line<span class="token punctuation">;</span>
    <span class="token class-name">String</span> actual <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">ByteOrderMark</span><span class="token punctuation">[</span><span class="token punctuation">]</span> byteOrderMarks <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteOrderMark</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
      <span class="token class-name">ByteOrderMark</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">,</span> <span class="token class-name">ByteOrderMark</span><span class="token punctuation">.</span><span class="token constant">UTF_16BE</span><span class="token punctuation">,</span> <span class="token class-name">ByteOrderMark</span><span class="token punctuation">.</span><span class="token constant">UTF_16LE</span><span class="token punctuation">,</span> <span class="token class-name">ByteOrderMark</span><span class="token punctuation">.</span><span class="token constant">UTF_32BE</span><span class="token punctuation">,</span> <span class="token class-name">ByteOrderMark</span><span class="token punctuation">.</span><span class="token constant">UTF_32LE</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BOMInputStream</span><span class="token punctuation">(</span>ioStream<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> byteOrderMarks<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Reader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">BufferedReader</span> br <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span>reader<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>line <span class="token operator">=</span> br<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        actual <span class="token operator">+=</span> line<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> actual<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码与前面的示例类似，但我们将 <em>BOMInputStream</em> 作为参数传递到 <em>InputStreamReader</em> 中。</p><h3 id="_3-3-使用-google-data-gdata-读取文件" tabindex="-1"><a class="header-anchor" href="#_3-3-使用-google-data-gdata-读取文件"><span>3.3. 使用 Google Data (GData) 读取文件</span></a></h3><p>另一方面，<strong>另一个处理 BOM 的有用库是 Google Data (GData)</strong>。这是一个较旧的库，但它帮助管理文件中的 BOM。它使用 XML 作为其底层格式。让我们看看它是如何工作的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenInputFileHasBOM_thenUseGoogleGdata</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> actual <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token number">21</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Reader</span> r <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UnicodeReader</span><span class="token punctuation">(</span>ioStream<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        r<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，正如我们在前面的示例中观察到的，从文件中删除 BOM 是重要的。如果我们不适当地处理它，当数据被读取时会发生意外的结果。这就是为什么我们需要意识到我们文件中存在这个标记。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们涵盖了有关 Java 中非法字符编译错误的几个主题。首先，我们了解了 UTF 是什么以及 BOM 如何集成到其中。其次，我们展示了使用文本编辑器（在这种情况下是 Windows 记事本）创建的示例类。生成的类抛出了非法字符的编译错误。最后，我们提供了一些代码示例，说明如何读取带有 BOM 的文件。</p><p>像往常一样，所有用于这个示例的代码都可以在 GitHub 上找到。</p>`,42),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(t,[["render",c],["__file","2024-07-19-Illegal Character Compilation Error.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Illegal%20Character%20Compilation%20Error.html","title":"Java 非法字符编译错误","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["编码","编译错误"],"head":[["meta",{"name":"keywords","content":"Java, 编码, 编译错误"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Illegal%20Character%20Compilation%20Error.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 非法字符编译错误"}],["meta",{"property":"og:description","content":"Java 非法字符编译错误 1. 概述 非法字符编译错误是一种文件类型编码错误。当我们在创建文件时使用了错误的编码，就会产生这种错误。因此，在像 Java 这样的语言中，当我们尝试编译项目时可能会遇到这种类型的错误。在本教程中，我们将详细描述问题，并展示一些可能遇到这种情况的场景，然后提供一些解决此问题的示例。 2.1. 字节顺序标记 (BOM) 在我..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T12:11:23.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"编码"}],["meta",{"property":"article:tag","content":"编译错误"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T12:11:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 非法字符编译错误\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T12:11:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 非法字符编译错误 1. 概述 非法字符编译错误是一种文件类型编码错误。当我们在创建文件时使用了错误的编码，就会产生这种错误。因此，在像 Java 这样的语言中，当我们尝试编译项目时可能会遇到这种类型的错误。在本教程中，我们将详细描述问题，并展示一些可能遇到这种情况的场景，然后提供一些解决此问题的示例。 2.1. 字节顺序标记 (BOM) 在我..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[{"level":3,"title":"2.1. 字节顺序标记 (BOM)","slug":"_2-1-字节顺序标记-bom","link":"#_2-1-字节顺序标记-bom","children":[]},{"level":3,"title":"2.2. 包含非法字符的类的编译错误","slug":"_2-2-包含非法字符的类的编译错误","link":"#_2-2-包含非法字符的类的编译错误","children":[]}]},{"level":2,"title":"3. 读取文件","slug":"_3-读取文件","link":"#_3-读取文件","children":[{"level":3,"title":"3.1. 使用 BufferedReader 读取文件","slug":"_3-1-使用-bufferedreader-读取文件","link":"#_3-1-使用-bufferedreader-读取文件","children":[]},{"level":3,"title":"3.2. 使用 Apache Commons IO 读取文件","slug":"_3-2-使用-apache-commons-io-读取文件","link":"#_3-2-使用-apache-commons-io-读取文件","children":[]},{"level":3,"title":"3.3. 使用 Google Data (GData) 读取文件","slug":"_3-3-使用-google-data-gdata-读取文件","link":"#_3-3-使用-google-data-gdata-读取文件","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721391083000,"updatedTime":1721391083000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.55,"words":1665},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Illegal Character Compilation Error.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java 非法字符编译错误</h1>\\n<h2>1. 概述</h2>\\n<p>非法字符编译错误是一种文件类型编码错误。当我们在创建文件时使用了错误的编码，就会产生这种错误。因此，在像 Java 这样的语言中，当我们尝试编译项目时可能会遇到这种类型的错误。在本教程中，我们将详细描述问题，并展示一些可能遇到这种情况的场景，然后提供一些解决此问题的示例。</p>\\n<h3>2.1. 字节顺序标记 (BOM)</h3>\\n<p>在我们深入字节顺序标记之前，需要快速了解一下 UCS（Unicode）转换格式（UTF）。<strong>UTF 是一种字符编码格式，可以编码 Unicode 中所有可能的字符代码点</strong>。在所有这些编码中，UTF-8 是最常用的。</p>","autoDesc":true}');export{d as comp,k as data};
