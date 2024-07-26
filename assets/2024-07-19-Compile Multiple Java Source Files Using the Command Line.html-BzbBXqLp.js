import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-8nJ1rqSf.js";const t={},p=e(`<h1 id="使用命令行编译多个java源文件" tabindex="-1"><a class="header-anchor" href="#使用命令行编译多个java源文件"><span>使用命令行编译多个Java源文件</span></a></h1><p>在本教程中，我们将学习如何通过命令行界面与Java编译器进行交互。</p><p>作为先决条件，我们需要在机器上下载Java并配置JAVA_HOME环境变量。</p><h3 id="_2-编译单个java源代码文件" tabindex="-1"><a class="header-anchor" href="#_2-编译单个java源代码文件"><span>2. 编译单个Java源代码文件</span></a></h3><p>Java提供了一个简单的工具——javac，用于编译Java源代码文件。让我们从编译一个小类Car.java开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Car</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> make<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> model<span class="token punctuation">;</span>

    <span class="token comment">// 标准setter和getter方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以在包含此文件的目录中使用以下单个命令进行编译：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>javac Car.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果一切顺利，没有错误，将不会有任何输出。编译器将在当前工作目录中创建Car.class，其中包含字节码。</p><h3 id="_3-编译多个源代码文件" tabindex="-1"><a class="header-anchor" href="#_3-编译多个源代码文件"><span>3. 编译多个源代码文件</span></a></h3><p>通常，我们的程序使用不止一个类文件。现在，让我们看看如何编译一个包含多个类的简单程序。</p><p>首先，我们添加两个新类型，Owner.java和History.java：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Car</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> make<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> model<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Owner</span> owner<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">History</span> history<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Owner</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">History</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> details<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们需要运行以下命令进行编译：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>javac Owner.java Car.java History.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>我们应该注意，由于Car类使用的类位于同一目录中，实际上无论我们是否指定它们都是可选的。</strong> 我们仍然可以只编译Car.java。</p><h3 id="_4-必要的java编译器选项" tabindex="-1"><a class="header-anchor" href="#_4-必要的java编译器选项"><span>4. 必要的Java编译器选项</span></a></h3><p>到目前为止，我们只是使用了javac命令，没有使用任何额外的选项，只是将类名作为参数传递。然而，我们也可以自定义它。我们可以告诉Java编译器在哪里找到我们的库类，我们的代码的基本路径在哪里，以及最终结果的生成位置。</p><p>让我们更仔细地看看其中的一些选项。</p><ul><li>-cp或-classpath</li><li>-sourcepath</li><li>-d（目录）</li></ul><h4 id="_4-1-cp或-classpath选项是什么" tabindex="-1"><a class="header-anchor" href="#_4-1-cp或-classpath选项是什么"><span>4.1. -cp或-classpath选项是什么？</span></a></h4><p>使用类路径，我们可以定义一组目录或文件，例如*.jar，*.zip，这些是我们的源代码在编译期间依赖的。或者，我们可以设置CLASSPATH环境变量。</p><p>我们应该注意到<strong>类路径选项比环境变量具有更高的优先级</strong>。</p><p>如果两者都没有指定，那么类路径被假定为当前目录。当我们希望指定多个目录时，路径分隔符对于大多数操作系统是‘:’，而在Windows上是‘;’。</p><h4 id="_4-2-sourcepath选项是什么" tabindex="-1"><a class="header-anchor" href="#_4-2-sourcepath选项是什么"><span>4.2. -sourcepath选项是什么？</span></a></h4><p>此选项使我们能够指定所有需要编译的源代码所在的顶级目录。</p><p>如果没有指定，类路径将被扫描以查找源代码。</p><h4 id="_4-3-d选项是什么" tabindex="-1"><a class="header-anchor" href="#_4-3-d选项是什么"><span>4.3. -d选项是什么？</span></a></h4><p>当我们希望将所有编译结果放在一个地方，与源代码分开时，我们使用此选项。<strong>我们需要记住，我们想要指定的路径必须事先存在</strong>。</p><p>在编译期间，此路径被用作根目录，并根据类的包结构自动创建子文件夹。如果没有指定此选项，每个*.class文件将被写入其对应的源代码*.java文件旁边。</p><h3 id="_5-使用外部库进行编译" tabindex="-1"><a class="header-anchor" href="#_5-使用外部库进行编译"><span>5. 使用外部库进行编译</span></a></h3><p>除了我们创建的类之外，我们的程序还需要使用外部库。现在，让我们看看一个更复杂的例子：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>libs/
├─ guava-31.1-jre.jar
model/
├─ Car.java
├─ History.java
├─ Owner.java
service/
├─ CarService.java
target/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们将类组织成包。此外，我们引入了target和libs目录，分别放置编译结果和库。</p><p>假设我们想使用Guava库提供的ImmutableSet类。我们下载并将其放在libs文件夹下。然后，在service包下，我们在CarService.java中引入了一个使用外部库的新类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">service</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">model<span class="token punctuation">.</span></span><span class="token class-name">Car</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Set</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>google<span class="token punctuation">.</span>common<span class="token punctuation">.</span>collect<span class="token punctuation">.</span></span><span class="token class-name">ImmutableSet</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CarService</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">Set</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Car</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token function">getCars</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token class-name">Car</span> car1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Car</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Car</span> car2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Car</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">ImmutableSet</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Car</span><span class="token punctuation">&gt;</span></span>\`\`\` cars <span class="token operator">=</span> <span class="token class-name">ImmutableSet</span><span class="token punctuation">.</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Car</span><span class="token punctuation">&gt;</span></span>\`\`\`<span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>car1<span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>car2<span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> cars<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，是时候编译我们的项目了：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>javac <span class="token parameter variable">-classpath</span> libs/*:. <span class="token parameter variable">-d</span> target <span class="token parameter variable">-sourcepath</span> <span class="token builtin class-name">.</span> service/CarService.java model/*.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们已经使用-cp将libs文件夹包含在我们的类路径中。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>libs/
├─ guava-31.1-jre.jar
model/
├─ Car.class
├─ History.class
├─ Owner.class
service/
├─ CarService.class
target/
├─ model/
│   ├─ Car.class
│   ├─ History.class
│   ├─ Owner.class
├─ service/
│   ─ CarService.class
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，javac成功解析了外部的ImmutableSet类，并将编译后的类放置在target文件夹中。</p><h3 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h3><p>在本文中，我们学习了如何编译多个源代码文件，即使我们有对外部库的依赖。</p><p>此外，我们还快速查看了在复杂编译任务中可以利用的一些基本选项。</p>`,44),l=[p];function i(c,o){return s(),n("div",null,l)}const u=a(t,[["render",i],["__file","2024-07-19-Compile Multiple Java Source Files Using the Command Line.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Compile%20Multiple%20Java%20Source%20Files%20Using%20the%20Command%20Line.html","title":"使用命令行编译多个Java源文件","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","编程"],"tag":["Java编译","命令行"],"head":[["meta",{"name":"keywords","content":"Java, 编译, 命令行, 多文件"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Compile%20Multiple%20Java%20Source%20Files%20Using%20the%20Command%20Line.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用命令行编译多个Java源文件"}],["meta",{"property":"og:description","content":"使用命令行编译多个Java源文件 在本教程中，我们将学习如何通过命令行界面与Java编译器进行交互。 作为先决条件，我们需要在机器上下载Java并配置JAVA_HOME环境变量。 2. 编译单个Java源代码文件 Java提供了一个简单的工具——javac，用于编译Java源代码文件。让我们从编译一个小类Car.java开始： 我们可以在包含此文件的目..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T06:09:49.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java编译"}],["meta",{"property":"article:tag","content":"命令行"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T06:09:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用命令行编译多个Java源文件\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T06:09:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用命令行编译多个Java源文件 在本教程中，我们将学习如何通过命令行界面与Java编译器进行交互。 作为先决条件，我们需要在机器上下载Java并配置JAVA_HOME环境变量。 2. 编译单个Java源代码文件 Java提供了一个简单的工具——javac，用于编译Java源代码文件。让我们从编译一个小类Car.java开始： 我们可以在包含此文件的目..."},"headers":[{"level":3,"title":"2. 编译单个Java源代码文件","slug":"_2-编译单个java源代码文件","link":"#_2-编译单个java源代码文件","children":[]},{"level":3,"title":"3. 编译多个源代码文件","slug":"_3-编译多个源代码文件","link":"#_3-编译多个源代码文件","children":[]},{"level":3,"title":"4. 必要的Java编译器选项","slug":"_4-必要的java编译器选项","link":"#_4-必要的java编译器选项","children":[]},{"level":3,"title":"5. 使用外部库进行编译","slug":"_5-使用外部库进行编译","link":"#_5-使用外部库进行编译","children":[]},{"level":3,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721369389000,"updatedTime":1721369389000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.9,"words":1169},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Compile Multiple Java Source Files Using the Command Line.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将学习如何通过命令行界面与Java编译器进行交互。</p>\\n<p>作为先决条件，我们需要在机器上下载Java并配置JAVA_HOME环境变量。</p>\\n<h3>2. 编译单个Java源代码文件</h3>\\n<p>Java提供了一个简单的工具——javac，用于编译Java源代码文件。让我们从编译一个小类Car.java开始：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Car</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> make<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> model<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">// 标准setter和getter方法</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{u as comp,v as data};
