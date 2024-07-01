import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-D9dCgDEL.js";const e={},p=t('<h1 id="javaparser-简介-baeldung" tabindex="-1"><a class="header-anchor" href="#javaparser-简介-baeldung"><span>JavaParser 简介 | Baeldung</span></a></h1><p>在本文中，我们将了解 JavaParser 库。我们将看到它是什么，我们可以用它做什么，以及如何使用它。</p><h2 id="_2-javaparser-是什么" tabindex="-1"><a class="header-anchor" href="#_2-javaparser-是什么"><span><strong>2. JavaParser 是什么？</strong></span></a></h2><p>JavaParser 是一个用于处理 Java 源代码的开源库。<strong>它允许我们将 Java 源代码解析为抽象语法树（AST）。一旦我们完成这一步，我们可以分析解析后的代码，对其进行操作，甚至编写新的代码。</strong></p><p>使用 JavaParser，我们可以解析 Java 语言直到 Java 18 的源代码。这包括所有稳定的语言特性，但可能不包括任何预览特性。</p><h2 id="_3-依赖项" tabindex="-1"><a class="header-anchor" href="#_3-依赖项"><span><strong>3. 依赖项</strong></span></a></h2><p><strong>在我们可以使用 JavaParser 之前，我们需要在构建中包含最新版本，目前是 3.25.10。</strong></p><p>我们需要包含的主要依赖项是 <em>javaparser-core</em>。如果我们使用 Maven，我们可以在 <em>pom.xml</em> 文件中包含此依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`com.github.javaparser`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`javaparser-core`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`3.25.10`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者如果我们使用 Gradle，我们可以在 <em>build.gradle</em> 文件中包含它：</p><div class="language-gradle line-numbers-mode" data-ext="gradle" data-title="gradle"><pre class="language-gradle"><code><span class="token keyword">implementation</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;com.github.javaparser:javaparser-core:3.25.10&quot;</span></span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此时，我们已经准备好在我们的应用程序中使用它了。</p><p>还有两个额外的依赖项可用。依赖项 <em>com.github.javaparser:javaparser-symbol-solver-core</em> 提供了一种分析解析后的 AST 的方法，以找到 Java 元素及其声明之间的关系。依赖项 <em>com.github.javaparser:javaparser-core-serialization</em> 提供了一种将解析后的 AST 序列化和反序列化到 JSON 的方法。</p><h2 id="_4-解析-java-代码" tabindex="-1"><a class="header-anchor" href="#_4-解析-java-代码"><span><strong>4. 解析 Java 代码</strong></span></a></h2><p>一旦我们在应用程序中设置了依赖项，我们就可以开始了。<strong>Java 代码的解析总是从 <em>StaticJavaParser</em> 类开始的。</strong> 这为我们提供了几种不同的解析代码的机制，具体取决于我们正在解析的内容以及它来自何处。</p><h3 id="_4-1-解析源文件" tabindex="-1"><a class="header-anchor" href="#_4-1-解析源文件"><span><strong>4.1. 解析源文件</strong></span></a></h3><p><strong>我们将首先查看解析整个源文件。我们可以使用 <em>StaticJavaParser.parse()</em> 方法来实现。</strong> 有几个重载的版本允许我们以不同的方式提供源代码 - 直接作为字符串，作为本地文件系统中的 <em>File</em>，或者作为某些资源的 <em>InputStream</em> 或 <em>Reader</em>。所有这些的工作方式相同，只是提供要解析的代码的便捷方式。</p><p>让我们看看实际应用。这里，我们将尝试解析提供的源代码并生成一个 <em>CompilationUnit</em> 作为结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompilationUnit</span> parsed <span class="token operator">=</span> <span class="token class-name">StaticJavaParser</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;class TestClass {}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这代表了我们的 AST，并允许我们检查和操作解析后的代码。</p><h3 id="_4-2-解析语句" tabindex="-1"><a class="header-anchor" href="#_4-2-解析语句"><span><strong>4.2. 解析语句</strong></span></a></h3><p><strong>我们可以解析的代码的另一端是单独的语句。我们使用 <em>StaticJavaParser.parseStatement()</em> 方法来实现这一点。</strong> 与源文件不同，这里只有一个版本，它接受一个包含要解析的语句的单个字符串。</p><p>这个方法返回一个 <em>Statement</em> 对象，表示解析后的语句：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Statement</span> parsed <span class="token operator">=</span> <span class="token class-name">StaticJavaParser</span><span class="token punctuation">.</span><span class="token function">parseStatement</span><span class="token punctuation">(</span><span class="token string">&quot;final int answer = 42;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-3-解析其他结构" tabindex="-1"><a class="header-anchor" href="#_4-3-解析其他结构"><span><strong>4.3. 解析其他结构</strong></span></a></h3><p><strong>JavaParser 还可以解析许多其他结构，涵盖整个 Java 语言直到 Java 18。每种结构都有一个单独的专用解析方法，并返回一个适当的类型来表示解析后的代码。</strong> 例如，我们可以使用 <em>parseAnnotation()</em> 来解析注解，使用 <em>parseImport()</em> 来解析导入语句，使用 <em>parseBlock()</em> 来解析语句块等。</p><p>在内部，JavaParser 将使用完全相同的代码来解析我们代码的各个部分。例如，当使用 <em>parseBlock()</em> 解析一个块时，JavaParser 最终将调用与 <em>parseStatement()</em> 直接调用相同的代码。这意味着我们可以依赖这些不同的解析方法对相同的代码子集以相同的方式工作。</p><p><strong>我们需要确切知道我们正在解析的代码类型，以便选择正确的解析方法。</strong> 例如，使用 <em>parseStatement()</em> 方法来解析类定义将会失败。</p><h3 id="_4-4-格式错误的代码" tabindex="-1"><a class="header-anchor" href="#_4-4-格式错误的代码"><span><strong>4.4. 格式错误的代码</strong></span></a></h3><p><strong>如果解析失败，JavaParser 将抛出一个 <em>ParseProblemException</em>，指明代码出了什么问题。</strong> 例如，如果我们尝试解析一个格式错误的 <em>class</em> 定义，那么我们将得到类似这样的内容：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ParseProblemException</span> parseProblemException <span class="token operator">=</span> <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">ParseProblemException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>\n    <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">StaticJavaParser</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;class TestClass&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> parseProblemException<span class="token punctuation">.</span><span class="token function">getProblems</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Parse error. Found `&lt;EOF&gt;`, expected one of  \\&quot;`&lt;\\&quot; \\&quot;extends\\&quot; \\&quot;implements\\&quot; \\&quot;permits\\&quot; \\&quot;{\\&quot;&quot;</span><span class="token punctuation">,</span>\n    parseProblemException<span class="token punctuation">.</span><span class="token function">getProblems</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以从这个错误消息中看出，问题是 <em>class</em> 定义是错误的。在 Java 中，这样的语句必须跟在一个“ <em>&lt;“</em> - 用于泛型定义，<em>extends</em> 或 <em>implements</em> 关键字，或者是一个“ <em>{“</em> 来开始类的实际主体。</p><h2 id="_5-分析解析后的代码" tabindex="-1"><a class="header-anchor" href="#_5-分析解析后的代码"><span><strong>5. 分析解析后的代码</strong></span></a></h2><p><strong>一旦我们解析了一些代码，我们就可以开始分析它以从中学习。这类似于在运行应用程序中的反射，只是针对解析后的源代码而不是当前运行的代码。</strong></p><h3 id="_5-1-访问解析后的元素" tabindex="-1"><a class="header-anchor" href="#_5-1-访问解析后的元素"><span><strong>5.1. 访问解析后的元素</strong></span></a></h3><p><strong>一旦我们解析了一些源代码，我们可以查询 AST 以访问单个元素。</strong> 我们如何做到这一点取决于我们想要访问的元素以及我们解析的内容。</p><p>例如，如果我们将源文件解析为 <em>CompilationUnit</em>，那么我们可以使用 <em>getClassByName()</em> 访问我们期望存在的类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Optional</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ClassOrInterfaceDeclaration</span><span class="token punctuation">&gt;</span></span>`` cls <span class="token operator">=</span> compilationUnit<span class="token punctuation">.</span><span class="token function">getClassByName</span><span class="token punctuation">(</span><span class="token string">&quot;TestClass&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>请注意，这返回一个 <em>Optional<code>&lt;ClassOrInterfaceDeclaration&gt;</code></em>。使用 <em>Optional</em> 是因为我们不能保证在该编译单元中存在该类型。在其他情况下，我们可能能够保证元素的存在。例如，一个类总会有一个名称，所以 <em>ClassOrInterfaceDeclaration.getName()</em> 不需要返回一个 <em>Optional</em>。</p><p>在每个阶段，我们只能直接访问我们当前正在处理的元素中最外层的元素。例如，如果我们从解析源文件中得到了一个 <em>CompilationUnit</em>，那么我们可以访问 <em>package</em> 声明、<em>import</em> 语句和顶层类型，但我们不能访问这些类型内的成员。然而，一旦我们访问了这些类型之一，我们就可以访问其中的成员。</p><h3 id="_5-2-迭代解析后的元素" tabindex="-1"><a class="header-anchor" href="#_5-2-迭代解析后的元素"><span><strong>5.2. 迭代解析后的元素</strong></span></a></h3><p><strong>在某些情况下，我们可能不知道解析后的代码中确切存在哪些元素，或者我们只是想处理所有某种特定类型的元素而不是只有一个。</strong></p><p>我们的每种 AST 类型都可以访问一系列适当的嵌套元素。这如何工作取决于我们想要处理的内容。例如，我们可以从 <em>CompilationUnit</em> 中提取所有的 <em>import</em> 语句：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">NodeList</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ImportDeclaration</span><span class="token punctuation">&gt;</span></span>` imports <span class="token operator">=</span> compilationUnit<span class="token punctuation">.</span><span class="token function">getImports</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>不需要 <em>Optional</em>，因为这是保证返回结果的。然而，如果没有导入存在，这个结果可能是一个空列表。</p><p>一旦我们这样做了，我们可以像处理任何集合一样处理它。<em>NodeList</em> 类型正确实现了 <em>java.util.List</em>，所以我们可以像处理任何其他列表一样处理它。</p><h3 id="_5-3-迭代整个-ast" tabindex="-1"><a class="header-anchor" href="#_5-3-迭代整个-ast"><span><strong>5.3. 迭代整个 AST</strong></span></a></h3><p>除了从我们解析后的代码中提取确切的一种类型的元素之外，我们还可以遍历整个解析树。<strong>JavaParser 中的所有 AST 类型都实现了访问者模式，允许我们使用自定义访问者访问解析源代码中的每个元素：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>compilationUnit<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span>visitor<span class="token punctuation">,</span> arg<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后有两种标准类型的访问者可以使用。这两种都有一个 <em>visit()</em> 方法，用于每种可能的 AST 类型，它接受一个状态参数，该参数被传递到 <em>accept()</em> 调用中。</p><p><strong>最简单的是 <em>VoidVisitor<code>&lt;A&gt;</code></em>。</strong> 这有一个针对每种 AST 类型的方法，并且没有返回值。然后我们有一个适配器类型 - <em>VoidVisitorAdapter</em> - 它为我们提供了一个标准实现，以帮助确保整个树被正确调用。</p><p>然后我们只需要实现我们感兴趣的方法 - 例如：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>compilationUnit<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">VoidVisitorAdapter</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>``<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visit</span><span class="token punctuation">(</span><span class="token class-name">MethodDeclaration</span> n<span class="token punctuation">,</span> <span class="token class-name">Object</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">visit</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> arg<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Method: &quot;</span> <span class="token operator">+</span> n<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将输出源文件中每个方法名称的日志消息，无论它们在哪里。这个递归遍历整个树结构意味着这些方法可以是顶级类中的，内部类中的，甚至是其他方法中的匿名类中的。</p><p><strong>另一种选择是 <em>GenericVisitor<code>&lt;R, A&gt;</code></em>。</strong> 它的工作方式类似于 <em>VoidVisitor</em>，除了它的 <em>visit()</em> 方法有返回值。我们也有适配器类，取决于我们想要如何收集每个方法的返回值。例如，<em>GenericListVisitorAdaptor</em> 将强制我们每个方法的返回类型为 <em>List<code>&lt;R&gt;</code></em> 并将所有这些列表合并在一起：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` allMethods <span class="token operator">=</span> compilationUnit<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">GenericListVisitorAdapter</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>`<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` <span class="token function">visit</span><span class="token punctuation">(</span><span class="token class-name">MethodDeclaration</span> n<span class="token punctuation">,</span> <span class="token class-name">Object</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` result <span class="token operator">=</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">visit</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> arg<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">asString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> result<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将返回一个列表，其中包含整个树中每个方法的名称。</p><h2 id="_6-输出解析后的代码" tabindex="-1"><a class="header-anchor" href="#_6-输出解析后的代码"><span><strong>6. 输出解析后的代码</strong></span></a></h2><p><strong>除了解析和分析我们的代码之外，我们还可以将其再次输出为字符串。</strong> 这可能有很多用途 - 例如，如果我们想要提取并仅输出代码的特定部分。</p><p><strong>实现这一点的最简单方式是使用标准的 <em>toString()</em> 方法。</strong> 我们所有的 AST 类型都正确实现了这一点，并将产生格式化的代码。注意，这可能不会完全按照我们解析代码时的格式，但它仍然会遵循相对标准的习惯。</p><p>例如，如果我们解析了以下代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>javaparser</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>\n<span class="token keyword">class</span> <span class="token class-name">TestClass</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>\n    <span class="token keyword">private</span> <span class="token keyword">class</span> <span class="token class-name">Inner</span> <span class="token punctuation">{</span>\n        <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">other</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们格式化它时，我们将得到这样的输出：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>javaparser</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">TestClass</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">private</span> <span class="token keyword">class</span> <span class="token class-name">Inner</span> <span class="token punctuation">{</span>\n\n        <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">other</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们可以使用的另一种格式化代码的方法是使用 <em>DefaultPrettyPrinterVisitor</em>。</strong> 这是一个标准的访问者类，将处理格式化。这使我们能够配置输出格式化的一些方面。例如，如果我们想要使用两个空格而不是四个进行缩进，我们可以编写：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">DefaultPrinterConfiguration</span> printerConfiguration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultPrinterConfiguration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nprinterConfiguration<span class="token punctuation">.</span><span class="token function">addOption</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">DefaultConfigurationOption</span><span class="token punctuation">(</span><span class="token class-name">DefaultPrinterConfiguration<span class="token punctuation">.</span>ConfigOption</span><span class="token punctuation">.</span><span class="token constant">INDENTATION</span><span class="token punctuation">,</span>\n    <span class="token keyword">new</span> <span class="token class-name">Indentation</span><span class="token punctuation">(</span><span class="token class-name">Indentation<span class="token punctuation">.</span>IndentType</span><span class="token punctuation">.</span><span class="token constant">SPACES</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">DefaultPrettyPrinterVisitor</span> visitor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultPrettyPrinterVisitor</span><span class="token punctuation">(</span>printerConfiguration<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\ncompilationUnit<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span>visitor<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">String</span> formatted <span class="token operator">=</span> visitor<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-操作解析后的代码" tabindex="-1"><a class="header-anchor" href="#_7-操作解析后的代码"><span><strong>7. 操作解析后的代码</strong></span></a></h2><p><strong>一旦我们将一些代码解析为 AST，我们也能够对其进行更改。</strong> 由于这现在只是一个 Java 对象模型，我们可以像处理任何其他对象模型一样对待它，JavaParser 为我们提供了自由更改其大多数方面的能力。</p><p>结合将我们的 AST 重新输出为工作源代码的能力，这意味着我们可以操作解析后的代码，对其进行更改，并以某种形式提供输出。这对于 IDE 插件、代码编译步骤等非常有用。</p><p>我们可以以任何方式使用这一点，只要我们能够访问适当的 AST 元素 - 无论是直接访问它们，使用访问者迭代，还是其他有意义的方式。</p><p>例如，如果我们想要将代码中的每个方法名称都大写，我们可以这样做：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>compilationUnit<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">VoidVisitorAdapter</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>``<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visit</span><span class="token punctuation">(</span><span class="token class-name">MethodDeclaration</span> n<span class="token punctuation">,</span> <span class="token class-name">Object</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">visit</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> arg<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">String</span> oldName <span class="token operator">=</span> n<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">asString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        n<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span>oldName<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这使用一个简单的访问者访问我们源树中的每个方法声明，并使用 <em>setName()</em> 方法为每个方法赋予一个新名称。然后新名称就是旧名称的大写形式。</p><p>完成这些后，AST 就会就地更新。然后我们可以按照我们的意愿进行格式化，新格式化的代码将反映我们的更改。</p><h2 id="_8-总结" tabindex="-1"><a class="header-anchor" href="#_8-总结"><span><strong>8. 总结</strong></span></a></h2><p>在这里，我们快速介绍了 JavaParser。我们已经展示了如何开始使用它以及使用它可以实现的一些事项。下次你需要操作一些 Java 代码时，为什么不试试呢？</p><p>所有示例都可以在 GitHub 上找到。</p><p>文章发布后 30 天内开放评论。对于此日期之后的任何问题，请使用网站上的联系方式。</p><p>OK</p>',79),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","Introduction to JavaParser.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/Introduction%20to%20JavaParser.html","title":"JavaParser 简介 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-15T00:00:00.000Z","category":["Java","Libraries"],"tag":["JavaParser","AST"],"description":"JavaParser 简介 | Baeldung 在本文中，我们将了解 JavaParser 库。我们将看到它是什么，我们可以用它做什么，以及如何使用它。 2. JavaParser 是什么？ JavaParser 是一个用于处理 Java 源代码的开源库。它允许我们将 Java 源代码解析为抽象语法树（AST）。一旦我们完成这一步，我们可以分析解析后...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Introduction%20to%20JavaParser.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"JavaParser 简介 | Baeldung"}],["meta",{"property":"og:description","content":"JavaParser 简介 | Baeldung 在本文中，我们将了解 JavaParser 库。我们将看到它是什么，我们可以用它做什么，以及如何使用它。 2. JavaParser 是什么？ JavaParser 是一个用于处理 Java 源代码的开源库。它允许我们将 Java 源代码解析为抽象语法树（AST）。一旦我们完成这一步，我们可以分析解析后..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JavaParser"}],["meta",{"property":"article:tag","content":"AST"}],["meta",{"property":"article:published_time","content":"2024-06-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JavaParser 简介 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"2. JavaParser 是什么？","slug":"_2-javaparser-是什么","link":"#_2-javaparser-是什么","children":[]},{"level":2,"title":"3. 依赖项","slug":"_3-依赖项","link":"#_3-依赖项","children":[]},{"level":2,"title":"4. 解析 Java 代码","slug":"_4-解析-java-代码","link":"#_4-解析-java-代码","children":[{"level":3,"title":"4.1. 解析源文件","slug":"_4-1-解析源文件","link":"#_4-1-解析源文件","children":[]},{"level":3,"title":"4.2. 解析语句","slug":"_4-2-解析语句","link":"#_4-2-解析语句","children":[]},{"level":3,"title":"4.3. 解析其他结构","slug":"_4-3-解析其他结构","link":"#_4-3-解析其他结构","children":[]},{"level":3,"title":"4.4. 格式错误的代码","slug":"_4-4-格式错误的代码","link":"#_4-4-格式错误的代码","children":[]}]},{"level":2,"title":"5. 分析解析后的代码","slug":"_5-分析解析后的代码","link":"#_5-分析解析后的代码","children":[{"level":3,"title":"5.1. 访问解析后的元素","slug":"_5-1-访问解析后的元素","link":"#_5-1-访问解析后的元素","children":[]},{"level":3,"title":"5.2. 迭代解析后的元素","slug":"_5-2-迭代解析后的元素","link":"#_5-2-迭代解析后的元素","children":[]},{"level":3,"title":"5.3. 迭代整个 AST","slug":"_5-3-迭代整个-ast","link":"#_5-3-迭代整个-ast","children":[]}]},{"level":2,"title":"6. 输出解析后的代码","slug":"_6-输出解析后的代码","link":"#_6-输出解析后的代码","children":[]},{"level":2,"title":"7. 操作解析后的代码","slug":"_7-操作解析后的代码","link":"#_7-操作解析后的代码","children":[]},{"level":2,"title":"8. 总结","slug":"_8-总结","link":"#_8-总结","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":9.99,"words":2997},"filePathRelative":"posts/baeldung/Archive/Introduction to JavaParser.md","localizedDate":"2024年6月15日","excerpt":"\\n<p>在本文中，我们将了解 JavaParser 库。我们将看到它是什么，我们可以用它做什么，以及如何使用它。</p>\\n<h2><strong>2. JavaParser 是什么？</strong></h2>\\n<p>JavaParser 是一个用于处理 Java 源代码的开源库。<strong>它允许我们将 Java 源代码解析为抽象语法树（AST）。一旦我们完成这一步，我们可以分析解析后的代码，对其进行操作，甚至编写新的代码。</strong></p>\\n<p>使用 JavaParser，我们可以解析 Java 语言直到 Java 18 的源代码。这包括所有稳定的语言特性，但可能不包括任何预览特性。</p>","autoDesc":true}');export{d as comp,k as data};
