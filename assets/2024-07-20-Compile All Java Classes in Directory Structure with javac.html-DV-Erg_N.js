import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as s,a as n}from"./app-CBerKIce.js";const t={},i=n(`<h1 id="使用javac命令编译目录结构中的所有java类" tabindex="-1"><a class="header-anchor" href="#使用javac命令编译目录结构中的所有java类"><span>使用javac命令编译目录结构中的所有Java类</span></a></h1><p>在某些特殊情况下，我们可能没有安装第三方构建工具，例如Ant或Maven。然而，我们仍然需要编译一个包含许多包和类的项目。</p><p>在本教程中，我们将使用_javac_命令来完成这项任务，并探讨不同的场景。</p><h2 id="_2-使用文件名" tabindex="-1"><a class="header-anchor" href="#_2-使用文件名"><span>2. 使用文件名</span></a></h2><p>假设当前目录下有两个目录：<em>src_和_out</em>。_src_目录包含我们的Java源文件，而_out_目录将包含相应的编译后的类文件。</p><p>让我们从一个简单的场景开始。_src_目录包含一个名为_com/baeldung/MyClass.java_的Java源文件：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/03/2_javac-compile-all-java-source-files-in-a-directory-structure-01.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>然后，让我们使用_javac_将_MyClass.java_文件编译到_out_目录：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ javac <span class="token parameter variable">-d</span> ./out/ ./src/com/baeldung/MyClass.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在上面的命令中，-d选项指定了类文件的目标目录。同时，我们应该注意到_MyClass.java_文件的确切代码并不是那么重要，我们只需要确保它是一个语法正确的Java文件。</p><p>让我们稍微复杂一点，再添加三个Java文件——<em>YourClass.java</em>、<em>HerClass.java_和_HisClass.java</em>：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/03/javac-compile-all-java-source-files-in-a-directory-structure-02.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>要编译上述四个Java文件，我们可以在命令行中列出它们：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ javac <span class="token parameter variable">-d</span> ./out/ <span class="token punctuation">\\</span>
./src/com/baeldung/MyClass.java <span class="token punctuation">\\</span>
./src/com/baeldung/YourClass.java <span class="token punctuation">\\</span>
./src/com/baeldung/HerClass.java <span class="token punctuation">\\</span>
./src/com/baeldung/HisClass.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，让我们添加一个新的_Main.java_文件，它引用了其他四个Java文件，例如，通过调用方法或创建对象实例：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/03/2_javac-compile-all-java-source-files-in-a-directory-structure-03.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在这种情况下，我们只需要编译_Main.java_文件：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ javac <span class="token parameter variable">-sourcepath</span> ./src/ <span class="token parameter variable">-d</span> ./out/ ./src/com/baeldung/Main.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行上述命令后，其他四个类文件也将被编译。这是因为javac默认会搜索所需的类型并编译相应的源文件。如果我们不想编译所需的类型，我们可以添加_-implicit:none_选项。</p><p>-sourcepath选项告诉Java编译器在哪里找到输入的源文件。如果未指定-sourcepath选项，javac将使用用户类路径搜索类文件和源文件。因此，我们可以将-sourcepath选项替换为-classpath或-cp选项：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ javac <span class="token parameter variable">-cp</span> ./src/ <span class="token parameter variable">-d</span> ./out/ ./src/com/baeldung/Main.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，这种方法有其局限性：javac命令仅编译所需的类型，并省略其他源文件。例如，如果我们添加了一个新的_ItsClass.java_，而_Main.java_没有引用它，那么_ItsClass.java_将不会被编译：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/03/2_javac-compile-all-java-source-files-in-a-directory-structure-04.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>总结来说，有两种场景适合在javac命令行中列出文件名：当只有少数Java源文件时，以及当有一个启动类递归引用其他类时。</p><h2 id="_3-使用通配符" tabindex="-1"><a class="header-anchor" href="#_3-使用通配符"><span>3. 使用通配符</span></a></h2><p>javac命令还支持使用通配符（*）编译同一目录中的多个源文件。</p><p>例如，我们可以使用通配符编译上述源文件：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ javac <span class="token parameter variable">-d</span> ./out/ ./src/com/baeldung/*.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们进一步复杂化场景，添加四个子包（<em>spring</em>、<em>summer</em>、<em>autumn_和_winter</em>）和相应的类：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/03/javac-compile-all-java-source-files-in-a-directory-structure-05.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>现在，在命令行中，我们可以使用通配符列出每个包来编译它们：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ javac <span class="token parameter variable">-d</span> ./out/ <span class="token punctuation">\\</span>
./src/com/baeldung/*.java <span class="token punctuation">\\</span>
./src/com/baeldung/spring/*.java <span class="token punctuation">\\</span>
./src/com/baeldung/summer/*.java <span class="token punctuation">\\</span>
./src/com/baeldung/autumn/*.java <span class="token punctuation">\\</span>
./src/com/baeldung/winter/*.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当只有少数几个包时，无论源文件数量如何，使用这种通配符方法都是合适的。</p><h2 id="_4-使用参数文件" tabindex="-1"><a class="header-anchor" href="#_4-使用参数文件"><span>4. 使用参数文件</span></a></h2><p>当有多个包需要编译时，使用参数文件的javac命令就非常方便了。参数文件可以包含javac选项和源文件名。</p><p>要使用参数文件，我们需要在参数文件名前加上@符号：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ javac <span class="token parameter variable">-d</span> ./out/ @sources.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是我们如何生成这样的@sources.txt文件呢？这取决于我们使用的操作系统。在Linux或macOS中，我们可以使用_find_命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">find</span> ./src/ <span class="token parameter variable">-type</span> f <span class="token parameter variable">-name</span> <span class="token string">&quot;*.java&quot;</span> <span class="token operator">&gt;</span> sources.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在上面的命令行中，./src/是我们的搜索起始目录，-type f选项仅过滤常规文件，-name &quot;*.java&quot;选项匹配所有以.java扩展名结尾的文件名。</p><p>然而，在Windows中，我们可以使用_dir_命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> <span class="token function">dir</span> src /b /s *.java <span class="token operator">&gt;</span> sources.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在上面的命令行中，src文件夹是我们的搜索路径，/b开关显示目录和文件名而不附加其他信息，/s选项列出指定目录及其所有子目录中的所有文件。</p><p>这种方法的缺点是，每当我们添加一个新的或删除一个现有的Java源文件时，我们需要重新生成sources.txt文件。</p><h2 id="_5-其他方法" tabindex="-1"><a class="header-anchor" href="#_5-其他方法"><span>5. 其他方法</span></a></h2><p>除了上述常见的方法外，还存在其他依赖于操作系统的方法，例如使用_globstar_或管道。</p><h3 id="_5-1-使用globstar" tabindex="-1"><a class="header-anchor" href="#_5-1-使用globstar"><span>5.1. 使用Globstar</span></a></h3><p>Bash 4.0版本增加了一个名为_globstar_的新globbing选项，它将双通配符（**）视为不同。启用此选项后，Bash将遍历多级目录；否则，Bash只会搜索单级目录。</p><p>然而，此选项默认是禁用的。我们可以使用_shopt_（sh + opt，shell选项）命令来检查Bash选项设置。如果我们不带任何参数执行_shopt_命令，它将输出一个长列表的选项及其状态（<em>on_或_off</em>）。</p><p>目前，我们只关心_globstar_选项：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">shopt</span> globstar
globstar        off
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>要启用它，我们使用带有-s选项的_shopt_命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">shopt</span> <span class="token parameter variable">-s</span> globstar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>要禁用它，我们使用带有-u选项的_shopt_命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">shopt</span> <span class="token parameter variable">-u</span> globstar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启用此选项后，我们可以<strong>使用双通配符调用javac</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ javac <span class="token parameter variable">-d</span> ./out/ ./src/**/*.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-2-使用管道" tabindex="-1"><a class="header-anchor" href="#_5-2-使用管道"><span>5.2. 使用管道</span></a></h3><p>从概念上讲，管道是两个进程之间的连接。我们可以利用这个管道机制将多个命令连接起来以产生我们期望的结果。</p><p>要编译我们的Java源文件，我们可以将_find_、_xargs_和_javac_命令结合起来：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">find</span> ./src/ <span class="token parameter variable">-type</span> f <span class="token parameter variable">-name</span> <span class="token string">&quot;*.java&quot;</span> <span class="token operator">|</span> <span class="token function">xargs</span> javac <span class="token parameter variable">-cp</span> ./src/ <span class="token parameter variable">-d</span> ./out/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，_find_命令支持-exec动作：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">find</span> ./src/ <span class="token parameter variable">-type</span> f <span class="token parameter variable">-name</span> <span class="token string">&quot;*.java&quot;</span> <span class="token parameter variable">-exec</span> javac <span class="token parameter variable">-cp</span> ./src/ <span class="token parameter variable">-d</span> ./out/ <span class="token string">&#39;{}&#39;</span> <span class="token string">&#39;;&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述命令行可能会运行得有点慢。这是因为javac命令将为每个匹配的文件运行。有关更多信息，我们可以使用_man find_命令来阅读-exec选项的文档。</p><p><strong>为了更快一些，我们可以将分号（;）换成加号（+）</strong>。然后，javac命令将收集所有匹配的文件并只执行一次：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">find</span> ./src/ <span class="token parameter variable">-type</span> f <span class="token parameter variable">-name</span> <span class="token string">&quot;*.java&quot;</span> <span class="token parameter variable">-exec</span> javac <span class="token parameter variable">-cp</span> ./src/ <span class="token parameter variable">-d</span> ./out/ <span class="token string">&#39;{}&#39;</span> +
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们首先查看了一些编译目录结构中所有Java源文件的常见方法，如使用文件名、通配符和参数文件。然后，我们查看了一些依赖于操作系统的方法，如使用_globstar_和管道。</p>`,68),l=[i];function r(c,p){return s(),e("div",null,l)}const u=a(t,[["render",r],["__file","2024-07-20-Compile All Java Classes in Directory Structure with javac.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Compile%20All%20Java%20Classes%20in%20Directory%20Structure%20with%20javac.html","title":"使用javac命令编译目录结构中的所有Java类","lang":"zh-CN","frontmatter":{"date":"2022-03-01T00:00:00.000Z","category":["Java","Development"],"tag":["javac","compile","directory"],"head":[["meta",{"name":"keywords","content":"Java, javac, compile, directory, tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Compile%20All%20Java%20Classes%20in%20Directory%20Structure%20with%20javac.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用javac命令编译目录结构中的所有Java类"}],["meta",{"property":"og:description","content":"使用javac命令编译目录结构中的所有Java类 在某些特殊情况下，我们可能没有安装第三方构建工具，例如Ant或Maven。然而，我们仍然需要编译一个包含许多包和类的项目。 在本教程中，我们将使用_javac_命令来完成这项任务，并探讨不同的场景。 2. 使用文件名 假设当前目录下有两个目录：src_和_out。_src_目录包含我们的Java源文件，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/03/2_javac-compile-all-java-source-files-in-a-directory-structure-01.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T12:12:24.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"javac"}],["meta",{"property":"article:tag","content":"compile"}],["meta",{"property":"article:tag","content":"directory"}],["meta",{"property":"article:published_time","content":"2022-03-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T12:12:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用javac命令编译目录结构中的所有Java类\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/03/2_javac-compile-all-java-source-files-in-a-directory-structure-01.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/03/javac-compile-all-java-source-files-in-a-directory-structure-02.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/03/2_javac-compile-all-java-source-files-in-a-directory-structure-03.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/03/2_javac-compile-all-java-source-files-in-a-directory-structure-04.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/03/javac-compile-all-java-source-files-in-a-directory-structure-05.png\\"],\\"datePublished\\":\\"2022-03-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T12:12:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用javac命令编译目录结构中的所有Java类 在某些特殊情况下，我们可能没有安装第三方构建工具，例如Ant或Maven。然而，我们仍然需要编译一个包含许多包和类的项目。 在本教程中，我们将使用_javac_命令来完成这项任务，并探讨不同的场景。 2. 使用文件名 假设当前目录下有两个目录：src_和_out。_src_目录包含我们的Java源文件，..."},"headers":[{"level":2,"title":"2. 使用文件名","slug":"_2-使用文件名","link":"#_2-使用文件名","children":[]},{"level":2,"title":"3. 使用通配符","slug":"_3-使用通配符","link":"#_3-使用通配符","children":[]},{"level":2,"title":"4. 使用参数文件","slug":"_4-使用参数文件","link":"#_4-使用参数文件","children":[]},{"level":2,"title":"5. 其他方法","slug":"_5-其他方法","link":"#_5-其他方法","children":[{"level":3,"title":"5.1. 使用Globstar","slug":"_5-1-使用globstar","link":"#_5-1-使用globstar","children":[]},{"level":3,"title":"5.2. 使用管道","slug":"_5-2-使用管道","link":"#_5-2-使用管道","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721477544000,"updatedTime":1721477544000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.69,"words":1706},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Compile All Java Classes in Directory Structure with javac.md","localizedDate":"2022年3月1日","excerpt":"\\n<p>在某些特殊情况下，我们可能没有安装第三方构建工具，例如Ant或Maven。然而，我们仍然需要编译一个包含许多包和类的项目。</p>\\n<p>在本教程中，我们将使用_javac_命令来完成这项任务，并探讨不同的场景。</p>\\n<h2>2. 使用文件名</h2>\\n<p>假设当前目录下有两个目录：<em>src_和_out</em>。_src_目录包含我们的Java源文件，而_out_目录将包含相应的编译后的类文件。</p>\\n<p>让我们从一个简单的场景开始。_src_目录包含一个名为_com/baeldung/MyClass.java_的Java源文件：</p>\\n<figure><img src=\\"https://www.baeldung.com/wp-content/uploads/2022/03/2_javac-compile-all-java-source-files-in-a-directory-structure-01.png\\" alt=\\"img\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>img</figcaption></figure>","autoDesc":true}');export{u as comp,v as data};
