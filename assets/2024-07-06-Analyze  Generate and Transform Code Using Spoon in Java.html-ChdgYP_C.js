import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a}from"./app-DRFG6C5y.js";const i={},s=a('<h1 id="使用spoon在java中分析、生成和转换代码" tabindex="-1"><a class="header-anchor" href="#使用spoon在java中分析、生成和转换代码"><span>使用Spoon在Java中分析、生成和转换代码</span></a></h1><p>在本教程中，我们将展示如何使用Spoon库来解析、分析和转换Java源代码。</p><h2 id="_2-spoon概述" tabindex="-1"><a class="header-anchor" href="#_2-spoon概述"><span>2. Spoon概述</span></a></h2><p>在处理大型代码库时，我们通常需要为了特定目的而消化它们。例如：</p><ul><li>生成聚合报告</li><li>查找给定类的用法，包括通过复杂的继承链间接使用</li><li>发现潜在的漏洞</li><li>自动重构</li></ul><p>这个列表可以继续下去，但它们都有一个共同的模式。首先，它们需要我们扫描现有代码并为其构建内部表示。其次，我们将使用访问者模式或查询机制来查找我们感兴趣的元素。最后，我们将生成所需的输出。</p><p>Spoon库专注于前两个步骤，这样我们就可以专注于产生所需的结果。</p><p>当然，一个简单的基于文本的shell或Python管道可以为某些用例完成工作。然而，这种方法缺乏对扫描代码的深入理解，因此限制了我们能做的分析类型。</p><p>另一方面，Spoon创建了一个完整的代码库内存模型，允许以多种方式遍历它。在幕后，Spoon使用Eclipse的JDT编译器来解析源代码，结果是一个“高保真度”模型，不仅包括类、方法等，还包括所有语句和注释。</p><p><strong>此外，Spoon可以处理语法无效的代码，并且不关心缺失的依赖</strong>，这很好，如果你必须深入到数百个git存储库的遗留代码中。</p><h3 id="_3-1-maven依赖" tabindex="-1"><a class="header-anchor" href="#_3-1-maven依赖"><span>3.1. Maven依赖</span></a></h3><p>要在我们的项目中使用Spoon库，我们需要将其添加为依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;dependency&gt;`\n    `&lt;groupId&gt;`fr.inria.gforge.spoon`&lt;/groupId&gt;`\n    `&lt;artifactId&gt;`spoon-core`&lt;/artifactId&gt;`\n    `&lt;version&gt;`10.3.0`&lt;/version&gt;`\n`&lt;/dependency&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最新版本可在Maven Central上找到。</p><p><strong>请注意，从版本10开始，Spoon需要Java 11或更高版本才能运行</strong>。尽管如此，它可以解析并从Java源代码创建模型，直到版本16（截至本文撰写时）。</p><h3 id="_3-2-解析代码" tabindex="-1"><a class="header-anchor" href="#_3-2-解析代码"><span>3.2. 解析代码</span></a></h3><p>让我们从一个简单的示例开始。我们将使用Spoon来解析一个单独的Java类，并创建一个报告，统计公共、私有和受保护方法的数量。</p><p>_SpoonAPI_接口作为使用该库的主要入口点。获取此接口具体实现的标准方法是创建一个新的_Launcher_实例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>SpoonAPI spoon = new Launcher();\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，我们将使用_addInputResource()_告知我们想要分析的源代码的位置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spoon.addInputResource(&quot;some/directory/SomeClass.java&quot;);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此方法接受单个类或目录的路径。在后一种情况下，将递归解析所有Java文件。此方法可以多次调用。例如，如果我们想一次解析多个存储库中的代码，就会这样调用。</p><p>现在，我们将使用_buildModel()_来创建_CtModel_实例，该实例保存有关所有处理过的代码的信息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>CtModel model = spoon.buildModel();\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一种思考_CtModel_类的方式是，它在XML处理中扮演类似于_Document_类的角色：它是从树的根，可以从中到达任何其他元素。在我们的情况下，一个元素可以是一个类、方法、包变量声明，甚至是语句。</p><p>_CtModel_具有允许我们查找给定类型的元素并使用访问者模式样式回调遍历它的方法。在我们的例子中，我们将使用这两种方法来获取方法计数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>MethodSummary report = new MethodSummary();\nmodel.filterChildren((el) -&gt; el instanceof CtClass````````&lt;?&gt;````````)\n  .forEach((CtClass````````&lt;?&gt;```````` clazz) -&gt; processMethods(report, clazz));\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们使用_filterChildren()_返回一个_CtQuery_实例，该实例仅匹配模型中的_CtClass_元素。接下来，我们使用_forEach()_处理每个匹配的条目。参数是一个lambda函数，调用_processMethods()_以类似模式评估类的方法是：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private void processMethods(MethodSummary report, CtClass````````&lt;?&gt;```````` ctClass) {\n    ctClass.filterChildren((c) -&gt; c instanceof CtMethod````````&lt;?&gt;````````)\n      .forEach((CtMethod````````&lt;?&gt;```````` m) -&gt; {\n          if (m.isPublic()) {\n              report.addPublicMethod();\n          } else if (m.isPrivate()) {\n              report.addPrivateMethod();\n          } else if (m.isProtected()) {\n              report.addProtectedMethod();\n          } else {\n              report.addPackagePrivateMethod();\n          }\n      });\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，根元素是正在分析的类，我们将遍历每个_CtMethod_，并根据其可见性更新报告计数器。</p><p>要测试此代码，我们将传递一个简单的类（可在线获取）并验证我们是否为每种方法可见性获得了正确的计数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\npublic void whenGenerateReport_thenSuccess() {\n    ClassReporter reporter = new ClassReporter();\n    MethodSummary report = reporter.generateMethodSummaryReport(&quot;src/test/resources/spoon/SpoonClassToTest.java&quot;);\n    assertThat(report).isNotNull();\n    assertThat(report.getPackagePrivateMethodCount()).isEqualTo(1);\n    assertThat(report.getPublicMethodCount()).isEqualTo(1);\n    assertThat(report.getPrivateMethodCount()).isEqualTo(1);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此代码也适用于解析的类具有语法错误。例如，给定这个语法无效的类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class BrokenClass {\n    // 语法错误\n    pluvic void brokenMethod() {}\n\n    // 语法错误\n    protected void protectedMethod() thraws Exception {}\n\n    // 有效方法\n    public void publicMethod() {}\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们仍然为公共、受保护和私有方法获得了正确的答案</strong>。至于破坏的方法，内部表示尝试获取尽可能多的信息。如果我们在_processMethods()_中设置断点，我们将能够看到_forEach()<em>最终将接收到一个_CtMethod</em>，其中包含有关无效方法的信息。</p><h3 id="_3-3-转换代码" tabindex="-1"><a class="header-anchor" href="#_3-3-转换代码"><span>3.3. 转换代码</span></a></h3><p>我们从_buildModel()_获得的_CtModel_实例直接支持转换。我们所要做的就是使用任何_CtElement_派生对象中可用的mutator方法。例如，我们可以通过使用_setSimpleName()_简单地重命名一个由_CtMethod_表示的方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>CtMethod method = ...\nmethod.setSimpleName(&quot;newname&quot;);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们编写一个简单的例子，在每个类中添加一个带有版权声明的标准Javadoc注释：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>CtModel model = // ... 省略模型创建逻辑\n\nmodel.filterChildren((el) -&gt; el instanceof CtClass````````&lt;?&gt;````````)\n  .forEach((CtClass````````&lt;?&gt;```````` cl) -&gt; {\n      CtComment comment = cl.getFactory()\n        .createComment(&quot;Copyright(c) 2023 etc&quot;, CommentType.JAVADOC);\n      cl.addComment(comment);\n  });\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>模型修改发生在传递给_forEach_的lambda中。我们使用当前元素的_getFactory()<em>并使用它来创建一个新的_CtComment</em>，它代表一个“分离”的元素。然后我们使用_addComment()_将此注释添加到类中。</p><p>更改其他代码方面的模式是相同的。我们可以首先创建相应的_CtElement_，然后使用可用的mutator之一将其插入到适当的位置。</p><p>一旦我们完成了转换，我们使用_setOutputDirectory()_和_prettyprint()_将模型写回到文件系统：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spoon.setSourceOutputDirectory(&quot;./target&quot;);\nspoon.prettyprint();\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在生成的代码将在类声明之前包含一个注释块：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>// ... 省略包和导入声明\n/**\n * Copyright(c) 2023 etc\n */\npublic class SpoonClassToTest {\n    // ... 省略类代码\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-使用处理器" tabindex="-1"><a class="header-anchor" href="#_3-4-使用处理器"><span>3.4. 使用处理器</span></a></h3><p>在前面的示例中，代码检查和修改以一种临时的方式发生：我们获得一个模型实例并开始处理它。<strong>Spoon支持一种更有结构化的方式来使用_Processor_遍历代码。</strong></p><p>这种方法的主要优点是它易于组合，允许主处理序列与分析/转换代码隔离。让我们通过将版权示例重写为_Processor_来展示这种方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class AddCopyrightProcessor extends AbstractProcessor&lt;CtClass````````&lt;?&gt;````````&gt; {\n    @Override\n    public void process(CtClass````````&lt;?&gt;```````` clazz) {\n        CtComment comment = getFactory().createComment(&quot;Copyright(c) 2023 etc&quot;, CommentType.JAVADOC);\n        clazz.addComment(comment);\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_Processor_接口有几个方法，但Spoon提供了一个方便的基类，我们可以扩展：<em>AbstractProcessor</em>。这个类实现了Spoon需要的所有内容，但我们仍然必须实现一个方法：<em>process()</em>。Spoon将在模型处理阶段为模型中的每个匹配元素调用此方法。</p><p>现在，我们必须使用SpoonAPI中的_addProcessor()_方法告知Spoon我们的处理器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spoon.addProcessor(new AddCopyrightProcessor());\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，我们可以像以前一样运行Spoon。这次，顶层代码不必显式调用处理代码：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spoon.addInputResource(&quot;src/test/resources/spoon/SpoonClassToTest.java&quot;);\nspoon.setSourceOutputDirectory(&quot;./target/spoon-processed&quot;);\nspoon.buildModel();\nspoon.process();\nspoon.prettyprint();\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际上，这段代码几乎与Spoon从命令行使用时的代码相同。</p><h3 id="_3-5-调整spoon的-环境" tabindex="-1"><a class="header-anchor" href="#_3-5-调整spoon的-环境"><span>3.5. 调整Spoon的_环境_</span></a></h3><p>Spoon有一些处理选项，我们可以调整以适应我们的需求。开箱即用，这些选项假设合理的默认值，因此通常我们可以不改变它们。这是这些选项的简要列表：</p><ul><li>启用/禁用严格的语法检查</li><li>Java合规级别</li><li>源文件编码</li><li>日志设置</li><li>源代码输出位置</li><li>Java输出编写器实现</li></ul><p>要更改这些选项中的任何一个，我们首先使用_getEnvironment()<em>访问Spoon的_环境</em>，然后使用它来修改我们想要自定义的选项。例如，这就是我们如何在生成的文件中使用制表符而不是空格的方式：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spoon.getEnvironment().useTabulations(true);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>另一个有趣的用例是替换默认的Java代码生成器。Spoon带有一个名为_SniperJavaPrettyPrinter_的替代生成器，它在生成输出时尽可能保留原始代码。</p><p>这个生成器的主要优点是它产生的代码与原始代码相比，只有在处理器进行更改的地方才会有所不同。要替换默认生成器，我们使用_setPrettyPrintGenerator()<em>，它接受一个_Supplier</em>，用于Spoon将使用的_PrettyPrinter_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spoon.getEnvironment().setPrettyPrinterCreator(() -&gt; new SniperJavaPrettyPrinter(spoon.getEnvironment()));\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们展示了如何使用Spoon库来分析和修改Java源代码。</p><p>像往常一样，完整的代码可以在GitHub上找到。</p><p><a href="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" target="_blank" rel="noopener noreferrer">Baeldung Logo</a><a href="https://secure.gravatar.com/avatar/8356e97cc1258253b4345b95412db68d?s=50&amp;r=g" target="_blank" rel="noopener noreferrer">Gravatar Image</a><a href="https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&amp;r=g" target="_blank" rel="noopener noreferrer">Gravatar Image</a><a href="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" target="_blank" rel="noopener noreferrer">Announcement Icon</a><a href="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" target="_blank" rel="noopener noreferrer">Baeldung REST API Post Footer</a><a href="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" target="_blank" rel="noopener noreferrer">Baeldung REST API Post Footer Icon</a></p><p>OK</p>',69),r=[s];function o(l,d){return n(),t("div",null,r)}const v=e(i,[["render",o],["__file","2024-07-06-Analyze  Generate and Transform Code Using Spoon in Java.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Analyze%20%20Generate%20and%20Transform%20Code%20Using%20Spoon%20in%20Java.html","title":"使用Spoon在Java中分析、生成和转换代码","lang":"zh-CN","frontmatter":{"date":"2024-07-06T00:00:00.000Z","category":["Java","编程"],"tag":["Spoon","Java代码分析","Java代码转换"],"head":[["meta",{"name":"keywords","content":"Java, Spoon, 代码分析, 代码生成, 代码转换"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Analyze%20%20Generate%20and%20Transform%20Code%20Using%20Spoon%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Spoon在Java中分析、生成和转换代码"}],["meta",{"property":"og:description","content":"使用Spoon在Java中分析、生成和转换代码 在本教程中，我们将展示如何使用Spoon库来解析、分析和转换Java源代码。 2. Spoon概述 在处理大型代码库时，我们通常需要为了特定目的而消化它们。例如： 生成聚合报告 查找给定类的用法，包括通过复杂的继承链间接使用 发现潜在的漏洞 自动重构 这个列表可以继续下去，但它们都有一个共同的模式。首先，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T15:36:37.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spoon"}],["meta",{"property":"article:tag","content":"Java代码分析"}],["meta",{"property":"article:tag","content":"Java代码转换"}],["meta",{"property":"article:published_time","content":"2024-07-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T15:36:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Spoon在Java中分析、生成和转换代码\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T15:36:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Spoon在Java中分析、生成和转换代码 在本教程中，我们将展示如何使用Spoon库来解析、分析和转换Java源代码。 2. Spoon概述 在处理大型代码库时，我们通常需要为了特定目的而消化它们。例如： 生成聚合报告 查找给定类的用法，包括通过复杂的继承链间接使用 发现潜在的漏洞 自动重构 这个列表可以继续下去，但它们都有一个共同的模式。首先，..."},"headers":[{"level":2,"title":"2. Spoon概述","slug":"_2-spoon概述","link":"#_2-spoon概述","children":[{"level":3,"title":"3.1. Maven依赖","slug":"_3-1-maven依赖","link":"#_3-1-maven依赖","children":[]},{"level":3,"title":"3.2. 解析代码","slug":"_3-2-解析代码","link":"#_3-2-解析代码","children":[]},{"level":3,"title":"3.3. 转换代码","slug":"_3-3-转换代码","link":"#_3-3-转换代码","children":[]},{"level":3,"title":"3.4. 使用处理器","slug":"_3-4-使用处理器","link":"#_3-4-使用处理器","children":[]},{"level":3,"title":"3.5. 调整Spoon的_环境_","slug":"_3-5-调整spoon的-环境","link":"#_3-5-调整spoon的-环境","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720280197000,"updatedTime":1720280197000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.8,"words":2340},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Analyze  Generate and Transform Code Using Spoon in Java.md","localizedDate":"2024年7月6日","excerpt":"\\n<p>在本教程中，我们将展示如何使用Spoon库来解析、分析和转换Java源代码。</p>\\n<h2>2. Spoon概述</h2>\\n<p>在处理大型代码库时，我们通常需要为了特定目的而消化它们。例如：</p>\\n<ul>\\n<li>生成聚合报告</li>\\n<li>查找给定类的用法，包括通过复杂的继承链间接使用</li>\\n<li>发现潜在的漏洞</li>\\n<li>自动重构</li>\\n</ul>\\n<p>这个列表可以继续下去，但它们都有一个共同的模式。首先，它们需要我们扫描现有代码并为其构建内部表示。其次，我们将使用访问者模式或查询机制来查找我们感兴趣的元素。最后，我们将生成所需的输出。</p>\\n<p>Spoon库专注于前两个步骤，这样我们就可以专注于产生所需的结果。</p>","autoDesc":true}');export{v as comp,u as data};
