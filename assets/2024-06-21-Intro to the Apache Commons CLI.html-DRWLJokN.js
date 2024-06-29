import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-CfEVMK0m.js";const t={},p=e(`<h1 id="apache-commons-cli-入门指南" tabindex="-1"><a class="header-anchor" href="#apache-commons-cli-入门指南"><span>Apache Commons CLI 入门指南</span></a></h1><p>在这个教程中，我们将探索 Java Apache Commons CLI 库。它是一个框架，通过帮助开发者以一种高效和标准化的方式构建现有软件工具的命令行界面（CLI），赋予了开发者能力。</p><p><strong>该库可以通过支持定义 CLI 选项和基本验证来加速 CLI 的开发。</strong> 它帮助解析命令行参数及其值。最后，参数值可以传递给实现工具的底层服务。</p><p><strong>值得注意的是，Apache Commons CLI 库也在 Apache 的多个产品中使用，包括 Kafka、Maven、Ant 和 Tomcat。</strong></p><p>我们将讨论 Apache Commons CLI 中的一些重要类，然后使用它们在示例程序中展示其功能。</p><h2 id="_2-cli-的关键关注点" tabindex="-1"><a class="header-anchor" href="#_2-cli-的关键关注点"><span>2. CLI 的关键关注点</span></a></h2><p>CLI 通过帮助自动化与其领域相关的一系列任务，为工具提供了优势。此外，在当今世界，DevOps 工程师无法想象没有 CLI 的工作。</p><p>除了工具的底层实现挑战外，所有 CLI 都需要处理一些基本要求：</p><ul><li>解析命令行参数，提取参数值，并将它们传递给底层服务</li><li>以一定格式显示帮助信息</li><li>显示版本</li><li>处理缺少必需选项的情况</li><li>处理未知选项</li><li>处理互斥选项</li></ul><h2 id="_3-重要类" tabindex="-1"><a class="header-anchor" href="#_3-重要类"><span>3. 重要类</span></a></h2><p>让我们看看 Apache Commons CLI 库中的重要类：</p><p><strong>类 <em>Option</em>、<em>OptionGroup</em> 和 <em>Options</em> 有助于定义 CLI。</strong> 所有 CLI 选项的定义都封装在 <em>Options</em> 类中。<em>CommandLineParser</em> 类的 <em>parse()</em> 方法使用 <em>Options</em> 类来解析命令行。如果有任何偏差，<em>parse()</em> 方法会抛出适当的异常。解析后，可以进一步探测 <em>CommandLine</em> 类以提取 CLI 选项的值（如果有）。</p><p>最后，提取的值可以传递给实现 CLI 工具的底层服务。</p><p><strong>类似于 <em>CommandLineParser</em> 类中的 <em>parse()</em> 方法，<em>HelpFormatter</em> 也使用 <em>Options</em> 类来显示 CLI 工具的帮助文本。</strong></p><h2 id="_4-实现" tabindex="-1"><a class="header-anchor" href="#_4-实现"><span>4. 实现</span></a></h2><p>让我们更深入地了解 Apache Commons CLI 库的类，并了解它们如何帮助一致且快速地创建 CLI 工具。</p><h3 id="_4-1-先决条件-maven-依赖性" tabindex="-1"><a class="header-anchor" href="#_4-1-先决条件-maven-依赖性"><span>4.1. 先决条件 Maven 依赖性</span></a></h3><p>首先，让我们在 <em>pom.xml</em> 文件中添加必要的 Maven 依赖性：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`commons-cli\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`commons-cli\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`1.6.0\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-定义、解析和探测命令行参数" tabindex="-1"><a class="header-anchor" href="#_4-2-定义、解析和探测命令行参数"><span>4.2. 定义、解析和探测命令行参数</span></a></h3><p>考虑使用其 <em>psql</em> CLI 连接到 PostgreSQL 数据库的命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>psql <span class="token parameter variable">-h</span> PGSERVER <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-d</span> empDB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>psql <span class="token parameter variable">--host</span> PGSERVER <span class="token parameter variable">--username</span> postgres <span class="token parameter variable">--dbName</span> empDB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>两个命令都需要输入数据库服务器主机、用户名和数据库名称的参数。第一个命令使用短选项名称，而第二个使用长选项名称。<em>username</em> 和 <em>dbName</em> 是必需的选项，而 <em>host</em> 是可选的。如果缺少主机，则默认将 localhost 视为主机值。</p><p>现在，让我们定义、解析和探测命令行参数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenCliOptionProvided_thenParseAndExtractOptionAndArgumentValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ParseException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Options</span> options <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 定义选项...</span>
    <span class="token comment">// 解析命令并处理...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要定义命令中的选项，我们通过调用方法 <em>createOption()</em> 创建了与每个输入选项相对应的 <em>Option</em> 对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Option</span> <span class="token function">createOption</span><span class="token punctuation">(</span><span class="token class-name">String</span> shortName<span class="token punctuation">,</span> <span class="token class-name">String</span> longName<span class="token punctuation">,</span> <span class="token class-name">String</span> argName<span class="token punctuation">,</span> <span class="token class-name">String</span> description<span class="token punctuation">,</span> <span class="token keyword">boolean</span> required<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Option</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span>shortName<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">longOpt</span><span class="token punctuation">(</span>longName<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">argName</span><span class="token punctuation">(</span>argName<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">desc</span><span class="token punctuation">(</span>description<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">hasArg</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">required</span><span class="token punctuation">(</span>required<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们使用 <em>Option.Builder</em> 类来设置 CLI 中输入选项的短名称、长名称、参数名称和描述。</strong> 此外，我们使用构建器类中的 <em>required()</em> 方法将前面定义的 <em>-U</em> 和 <em>-d</em> 选项视为强制选项。</p><p>最后，我们分别将短名称选项和长名称选项的参数传递给方法 <em>parseThenProcessCommand()</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">parseThenProcessCommand</span><span class="token punctuation">(</span><span class="token class-name">Options</span> options<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> commandArgs<span class="token punctuation">,</span> <span class="token class-name">String</span> hostOption<span class="token punctuation">,</span>
    <span class="token class-name">String</span> usernameOption<span class="token punctuation">,</span> <span class="token class-name">String</span> dbNameOption<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ParseException</span> <span class="token punctuation">{</span>
    <span class="token comment">// 解析命令行并处理...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有趣的是，该方法可以处理使用短名称和长名称选项的命令。<strong><em>CommandLineParser</em> 类解析参数，然后我们通过调用 <em>CommandLine</em> 对象的 <em>getOptionValue()</em> 方法来检索它们的值。</strong> 由于 <em>host</em> 是可选的，我们调用 <em>CommandLine</em> 类中的 <em>hasOption()</em> 方法来探测它是否存在。如果不存在，我们将其值替换为默认的 <em>localhost</em>。</p><p>最后，我们通过调用方法 <em>createConnection()</em> 将值传递给底层服务。</p><h3 id="_4-3-处理缺少的必选选项" tabindex="-1"><a class="header-anchor" href="#_4-3-处理缺少的必选选项"><span>4.3. 处理缺少的必选选项</span></a></h3><p>在大多数 CLI 中，当缺少必选选项时，应该显示错误。假设在 <em>psql</em> 命令中缺少必选的 <em>host</em> 选项：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>psql <span class="token parameter variable">-h</span> PGSERVER <span class="token parameter variable">-U</span> postgres
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们看看如何处理这个：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenMandatoryOptionMissing_thenThrowMissingOptionException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 定义选项...</span>
    <span class="token comment">// 解析命令并处理异常...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>当我们在 <em>CommandLineParser</em> 类中调用 <em>parse()</em> 方法时，它会抛出 <em>MissingOptionException</em> 表示缺少所需的选项 <em>d</em></strong>。随后，我们调用一个方法 <em>handleException()</em> 来管理异常。</p><p>假设选项 <em>-d</em> 存在，但其参数缺失：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>psql <span class="token parameter variable">-h</span> PGSERVER <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们看看如何处理这个：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenOptionArgumentIsMissing_thenThrowMissingArgumentException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 定义选项...</span>
    <span class="token comment">// 解析命令并处理异常...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当 <em>parse()</em> 方法在 <em>CommandLineParser</em> 上被调用时，由于 <em>-d</em> 选项旁边缺少参数，会抛出 <em>MissingArgumentException</em>。进一步，我们调用 <em>handleException()</em> 来管理异常。</p><h3 id="_4-4-处理无法识别的选项" tabindex="-1"><a class="header-anchor" href="#_4-4-处理无法识别的选项"><span>4.4. 处理无法识别的选项</span></a></h3><p>有时，在运行命令时，我们会提供无法识别的选项：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>psql <span class="token parameter variable">-h</span> PGSERVER <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-d</span> empDB <span class="token parameter variable">-y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们提供了一个不正确的不存在的 <em>-y</em> 选项。让我们看看如何在代码中处理它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUnrecognizedOptionProvided_thenThrowUnrecognizedOptionException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 定义选项...</span>
    <span class="token comment">// 解析命令并处理异常...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>当它遇到未知的 <em>-y</em> 选项时，<em>parse()</em> 方法会抛出 <em>UnrecognizedOptionException</em>。</strong> 之后，我们调用 <em>handleException()</em> 来管理运行时异常。</p><h3 id="_4-5-处理互斥选项" tabindex="-1"><a class="header-anchor" href="#_4-5-处理互斥选项"><span>4.5. 处理互斥选项</span></a></h3><p>考虑使用 Unix 平台上的 <em>cp</em> 命令复制文件的命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">cp</span> <span class="token parameter variable">-i</span> <span class="token parameter variable">-f</span> file1 file2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>i</em> 选项在覆盖文件之前提示用户；然而，<em>f</em> 选项在不提示的情况下覆盖文件。这两个选项是冲突的，因此不应该一起使用。</p><p>让我们尝试实现这个验证：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenMutuallyExclusiveOptionsProvidedTogether_thenThrowAlreadySelectedException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 定义互斥选项并处理异常...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们使用其构造函数而不是 <em>Option.Builder</em> 类创建了相关的 <em>Option</em> 对象。这是实例化 <em>Option</em> 类的另一种方式。</p><p><strong><em>OptionGroup</em> 类有助于将互斥选项分组。</strong> 因此，我们将这两个选项添加到 <em>OptionGroup</em> 对象中。然后，我们将 <em>OptionGroup</em> 对象添加到 <em>Options</em> 对象中。最后，当我们在 <em>CommandLineParser</em> 类上调用 <em>parse()</em> 方法时，它引发了 <em>AlreadySelectedException</em>，表明选项存在冲突。</p><h3 id="_4-6-显示帮助文本" tabindex="-1"><a class="header-anchor" href="#_4-6-显示帮助文本"><span>4.6. 显示帮助文本</span></a></h3><p>格式化帮助文本并在终端上显示是所有 CLI 工具的共同关注点。因此，Apache Commons CLI 也通过 <em>HelpFormatter</em> 类来解决这个问题。</p><p>让我们以 <em>psql</em> CLI 为例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenNeedHelp_thenPrintHelp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 打印帮助文本...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>类 <em>HelpFormatter</em> 中的 <em>printHelp()</em> 方法使用包含 CLI 定义的 <em>Options</em> 对象来显示帮助文本</strong>。该方法的第一个参数在顶部生成 CLI 的使用文本。</p><p>让我们看看 <em>HelpFormatter</em> 类生成的输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>usage: psql -U username -h host -d empDB
 -?,--help                  显示帮助信息
 -d,--dbName \`&lt;DBNAME&gt;\`       要连接的数据库名称
 -h,--host \`&lt;HOST&gt;\`           数据库服务器主机
 -U,--username \`&lt;USERNAME&gt;\`   数据库用户名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们讨论了 Apache Commons CLIlibrary 的能力，帮助以标准化的方式快速高效地创建 CLI。此外，该库简洁易懂。</p><p>值得注意的是，还有其他库如 JCommander、Airline 和 Picocli，它们同样高效，值得探索。与 Apache Commons CLI 不同的是，它们都支持注解。</p><p>像往常一样，使用的代码可以在 GitHub 上找到。</p><p>OK</p>`,71),i=[p];function o(l,c){return s(),a("div",null,i)}const d=n(t,[["render",o],["__file","2024-06-21-Intro to the Apache Commons CLI.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-21-Intro%20to%20the%20Apache%20Commons%20CLI.html","title":"Apache Commons CLI 入门指南","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Java Libraries","Apache Commons"],"tag":["Apache Commons CLI","CLI Development"],"head":[["meta",{"name":"keywords","content":"Java, Apache Commons CLI, Command Line Interface, Tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-21-Intro%20to%20the%20Apache%20Commons%20CLI.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Apache Commons CLI 入门指南"}],["meta",{"property":"og:description","content":"Apache Commons CLI 入门指南 在这个教程中，我们将探索 Java Apache Commons CLI 库。它是一个框架，通过帮助开发者以一种高效和标准化的方式构建现有软件工具的命令行界面（CLI），赋予了开发者能力。 该库可以通过支持定义 CLI 选项和基本验证来加速 CLI 的开发。 它帮助解析命令行参数及其值。最后，参数值可以传..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Apache Commons CLI"}],["meta",{"property":"article:tag","content":"CLI Development"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Apache Commons CLI 入门指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Apache Commons CLI 入门指南 在这个教程中，我们将探索 Java Apache Commons CLI 库。它是一个框架，通过帮助开发者以一种高效和标准化的方式构建现有软件工具的命令行界面（CLI），赋予了开发者能力。 该库可以通过支持定义 CLI 选项和基本验证来加速 CLI 的开发。 它帮助解析命令行参数及其值。最后，参数值可以传..."},"headers":[{"level":2,"title":"2. CLI 的关键关注点","slug":"_2-cli-的关键关注点","link":"#_2-cli-的关键关注点","children":[]},{"level":2,"title":"3. 重要类","slug":"_3-重要类","link":"#_3-重要类","children":[]},{"level":2,"title":"4. 实现","slug":"_4-实现","link":"#_4-实现","children":[{"level":3,"title":"4.1. 先决条件 Maven 依赖性","slug":"_4-1-先决条件-maven-依赖性","link":"#_4-1-先决条件-maven-依赖性","children":[]},{"level":3,"title":"4.2. 定义、解析和探测命令行参数","slug":"_4-2-定义、解析和探测命令行参数","link":"#_4-2-定义、解析和探测命令行参数","children":[]},{"level":3,"title":"4.3. 处理缺少的必选选项","slug":"_4-3-处理缺少的必选选项","link":"#_4-3-处理缺少的必选选项","children":[]},{"level":3,"title":"4.4. 处理无法识别的选项","slug":"_4-4-处理无法识别的选项","link":"#_4-4-处理无法识别的选项","children":[]},{"level":3,"title":"4.5. 处理互斥选项","slug":"_4-5-处理互斥选项","link":"#_4-5-处理互斥选项","children":[]},{"level":3,"title":"4.6. 显示帮助文本","slug":"_4-6-显示帮助文本","link":"#_4-6-显示帮助文本","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":6.38,"words":1915},"filePathRelative":"posts/baeldung/Archive/2024-06-21-Intro to the Apache Commons CLI.md","localizedDate":"2024年6月21日","excerpt":"\\n<p>在这个教程中，我们将探索 Java Apache Commons CLI 库。它是一个框架，通过帮助开发者以一种高效和标准化的方式构建现有软件工具的命令行界面（CLI），赋予了开发者能力。</p>\\n<p><strong>该库可以通过支持定义 CLI 选项和基本验证来加速 CLI 的开发。</strong> 它帮助解析命令行参数及其值。最后，参数值可以传递给实现工具的底层服务。</p>\\n<p><strong>值得注意的是，Apache Commons CLI 库也在 Apache 的多个产品中使用，包括 Kafka、Maven、Ant 和 Tomcat。</strong></p>\\n<p>我们将讨论 Apache Commons CLI 中的一些重要类，然后使用它们在示例程序中展示其功能。</p>","autoDesc":true}');export{d as comp,u as data};
