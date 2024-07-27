import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CJGTm_7y.js";const e={},p=t('<h1 id="使用junit对system-in进行单元测试" tabindex="-1"><a class="header-anchor" href="#使用junit对system-in进行单元测试"><span>使用JUnit对System.in进行单元测试</span></a></h1><p>当涉及到测试依赖于控制台用户输入的代码时，这个过程可能会变得相当具有挑战性。此外，测试用户输入场景是控制台基础或独立应用程序的一个关键部分，因为我们需要确保正确处理不同的输入。</p><p>在本教程中，我们将探讨如何使用JUnit测试_System.in_。</p><h2 id="_2-理解-system-类" tabindex="-1"><a class="header-anchor" href="#_2-理解-system-类"><span>2. 理解_System_类</span></a></h2><p>在我们深入研究之前，让我们先看看_System_类。它是一个来自_java.lang_包的最终类。</p><p>该类通过_in_和_out_变量提供了对标准输入和输出流的访问。与_out_变量类似，_System_类还有一个_err_变量，代表标准错误输出流。</p><p>此外，这些变量允许我们从控制台读取和写入。使用这些流，我们允许用户从控制台与我们的应用程序进行交互。</p><p>接下来，<em>System.in_返回一个_InputStream</em>，该流已经打开，可以从标准输入读取数据。使用_System.in_，我们可以将从键盘到CPU的输入流重定向到我们的应用程序。</p><h2 id="_3-示例输入" tabindex="-1"><a class="header-anchor" href="#_3-示例输入"><span>3. 示例输入</span></a></h2><p>让我们从我们将在整个教程中使用的简单示例开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">NAME</span> <span class="token operator">=</span> <span class="token string">&quot;Name: &quot;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">readName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">String</span> input <span class="token operator">=</span> scanner<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token constant">NAME</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Java提供了_Scanner_类，它允许我们从各种来源读取输入，包括标准键盘输入。此外，它提供了读取用户输入的最简单方式。使用_Scanner_，我们可以读取任何原始数据类型或_String_。</p><p>在我们的示例方法中，我们使用_next()_方法从用户读取输入。此外，该方法将输入中的下一个单词作为_String_读取。</p><h2 id="_4-使用核心java" tabindex="-1"><a class="header-anchor" href="#_4-使用核心java"><span>4. 使用核心Java</span></a></h2><p>测试标准输入的第一个方法包括Java API提供的功能。</p><p><strong>我们可以利用_System.in_创建自定义_InputStream_并在测试期间模拟用户输入。</strong></p><p>然而，在编写单元测试之前，让我们在我们的测试类中编写_provideInput()_辅助方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">provideInput</span><span class="token punctuation">(</span><span class="token class-name">String</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ByteArrayInputStream</span> testIn <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayInputStream</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setIn</span><span class="token punctuation">(</span>testIn<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在方法内部，我们创建一个新的_ByteArrayInputStream_并将我们期望的输入作为_byte_数组传递。</p><p><strong>此外，我们使用_System.setIn()_方法将自定义输入流设置为_System.in_的输入。</strong></p><p>现在，让我们为我们的示例方法编写一个单元测试。我们可以调用我们的应用程序类的_readName()_方法，它现在读取我们的自定义输入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenName_whenReadFromInput_thenReturnCorrectResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">provideInput</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token class-name">Application</span><span class="token punctuation">.</span><span class="token function">readName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">NAME</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> input<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用system-rules库和junit-4" tabindex="-1"><a class="header-anchor" href="#_5-使用system-rules库和junit-4"><span>5. 使用System Rules库和JUnit 4</span></a></h2><p>现在，让我们看看如何使用System Rules库和JUnit 4测试标准输入。</p><p>首先，让我们向我们的_pom.xml_添加所需的依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````com.github.stefanbirkner````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````system-rules````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````1.19.0````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>```test```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>```\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该库为依赖于_System.in_和_System.out_的代码提供了JUnit规则。</p><p>此外，它允许我们在测试执行期间重定向输入和输出流，这使得模拟用户输入变得容易。</p><p>其次，要测试_System.in_，我们需要定义一个新的_TextFromStandardInputStream_规则。我们将使用_emptyStandardInputStream()_方法来使用空输入流初始化变量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Rule</span>\n<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token class-name">TextFromStandardInputStream</span> systemIn <span class="token operator">=</span> <span class="token function">emptyStandardInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们编写单元测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenName_whenReadWithSystemRules_thenReturnCorrectResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    systemIn<span class="token punctuation">.</span><span class="token function">provideLines</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">NAME</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Application</span><span class="token punctuation">.</span><span class="token function">readName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们使用_accepts varargs_的_provideLines()_方法并将它们设置为输入。</p><p>此外，原始的_System.in_在测试执行后会恢复。</p><h2 id="_6-使用system-lambda库和junit-5" tabindex="-1"><a class="header-anchor" href="#_6-使用system-lambda库和junit-5"><span>6. 使用System Lambda库和JUnit 5</span></a></h2><p>重要的是要注意，System Rules默认不支持JUnit 5。然而，它们提供了一个System Lambda库，我们可以与JUnit 5一起使用。</p><p>我们需要在_pom.xml_中添加一个额外的依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````com.github.stefanbirkner````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````system-lambda````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````1.2.1````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>```test```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>```\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们在测试中使用System Lambda：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenName_whenReadWithSystemLambda_thenReturnCorrectResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n    <span class="token function">withTextFromSystemIn</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">NAME</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Application</span><span class="token punctuation">.</span><span class="token function">readName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用_SystemLambda_类中提供的_withTextFromSystemIn()_静态方法来设置将从_System.in_可用的输入行。</p><h2 id="_7-使用system-stubs库和junit-4" tabindex="-1"><a class="header-anchor" href="#_7-使用system-stubs库和junit-4"><span>7. 使用System Stubs库和JUnit 4</span></a></h2><p>此外，我们可以使用JUnit 4和System Stubs库测试标准输入。</p><p>让我们添加所需的依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````uk.org.webcompere````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````system-stubs-junit4````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````2.0.2````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>```test```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>```\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们创建_SystemInRule_并传递期望的输入值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Rule</span>\n<span class="token keyword">public</span> <span class="token class-name">SystemInRule</span> systemInRule <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SystemInRule</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以使用创建的规则在我们的单元测试中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenName_whenReadWithSystemStubs_thenReturnCorrectResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token class-name">Application</span><span class="token punctuation">.</span><span class="token function">readName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token constant">NAME</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-使用system-stubs库和junit-5" tabindex="-1"><a class="header-anchor" href="#_8-使用system-stubs库和junit-5"><span>8. 使用System Stubs库和JUnit 5</span></a></h2><p>要使用System Stubs和JUnit 5测试_System.in_，我们需要添加另一个依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````uk.org.webcompere````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````system-stubs-jupiter````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>````2.0.2````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>````\n````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了提供输入值，我们将使用_withTextFromSystemIn()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenName_whenReadWithSystemStubs_thenReturnCorrectResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n    <span class="token class-name">SystemStubs</span><span class="token punctuation">.</span><span class="token function">withTextFromSystemIn</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token class-name">Application</span><span class="token punctuation">.</span><span class="token function">readName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token constant">NAME</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-结论" tabindex="-1"><a class="header-anchor" href="#_9-结论"><span>9. 结论</span></a></h2><p>在本文中，我们学习了如何使用JUnit 4和JUnit 5测试_System.in_。</p><p>通过第一种方法，我们学习了如何使用Java核心特性自定义_System.in_。在第二种方法中，我们看到了如何使用System Rules库。接下来，我们学习了如何使用System Lambda库编写JUnit 5的测试。最后，我们看到了如何使用System Stubs库。</p><p>如常，本文的全部源代码可在GitHub上找到。</p>',58),c=[p];function o(i,l){return a(),s("div",null,c)}const k=n(e,[["render",o],["__file","2024-07-02-Unit Testing of System.in With JUnit.html.vue"]]),r=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-Unit%20Testing%20of%20System.in%20With%20JUnit.html","title":"使用JUnit对System.in进行单元测试","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","JUnit"],"tag":["System.in","Unit Testing"],"head":[["meta",{"name":"keywords","content":"Java, JUnit, System.in, Unit Testing, System Rules, System Lambda, System Stubs"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Unit%20Testing%20of%20System.in%20With%20JUnit.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用JUnit对System.in进行单元测试"}],["meta",{"property":"og:description","content":"使用JUnit对System.in进行单元测试 当涉及到测试依赖于控制台用户输入的代码时，这个过程可能会变得相当具有挑战性。此外，测试用户输入场景是控制台基础或独立应用程序的一个关键部分，因为我们需要确保正确处理不同的输入。 在本教程中，我们将探讨如何使用JUnit测试_System.in_。 2. 理解_System_类 在我们深入研究之前，让我们先..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T22:34:45.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"System.in"}],["meta",{"property":"article:tag","content":"Unit Testing"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T22:34:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用JUnit对System.in进行单元测试\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T22:34:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用JUnit对System.in进行单元测试 当涉及到测试依赖于控制台用户输入的代码时，这个过程可能会变得相当具有挑战性。此外，测试用户输入场景是控制台基础或独立应用程序的一个关键部分，因为我们需要确保正确处理不同的输入。 在本教程中，我们将探讨如何使用JUnit测试_System.in_。 2. 理解_System_类 在我们深入研究之前，让我们先..."},"headers":[{"level":2,"title":"2. 理解_System_类","slug":"_2-理解-system-类","link":"#_2-理解-system-类","children":[]},{"level":2,"title":"3. 示例输入","slug":"_3-示例输入","link":"#_3-示例输入","children":[]},{"level":2,"title":"4. 使用核心Java","slug":"_4-使用核心java","link":"#_4-使用核心java","children":[]},{"level":2,"title":"5. 使用System Rules库和JUnit 4","slug":"_5-使用system-rules库和junit-4","link":"#_5-使用system-rules库和junit-4","children":[]},{"level":2,"title":"6. 使用System Lambda库和JUnit 5","slug":"_6-使用system-lambda库和junit-5","link":"#_6-使用system-lambda库和junit-5","children":[]},{"level":2,"title":"7. 使用System Stubs库和JUnit 4","slug":"_7-使用system-stubs库和junit-4","link":"#_7-使用system-stubs库和junit-4","children":[]},{"level":2,"title":"8. 使用System Stubs库和JUnit 5","slug":"_8-使用system-stubs库和junit-5","link":"#_8-使用system-stubs库和junit-5","children":[]},{"level":2,"title":"9. 结论","slug":"_9-结论","link":"#_9-结论","children":[]}],"git":{"createdTime":1719959685000,"updatedTime":1719959685000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.56,"words":1368},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Unit Testing of System.in With JUnit.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>当涉及到测试依赖于控制台用户输入的代码时，这个过程可能会变得相当具有挑战性。此外，测试用户输入场景是控制台基础或独立应用程序的一个关键部分，因为我们需要确保正确处理不同的输入。</p>\\n<p>在本教程中，我们将探讨如何使用JUnit测试_System.in_。</p>\\n<h2>2. 理解_System_类</h2>\\n<p>在我们深入研究之前，让我们先看看_System_类。它是一个来自_java.lang_包的最终类。</p>\\n<p>该类通过_in_和_out_变量提供了对标准输入和输出流的访问。与_out_变量类似，_System_类还有一个_err_变量，代表标准错误输出流。</p>","autoDesc":true}');export{k as comp,r as data};
