import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as s,a as t}from"./app-8nJ1rqSf.js";const c={},p=t(`<hr><h1 id="java中类路径-classpath-和源路径-sourcepath-的区别" tabindex="-1"><a class="header-anchor" href="#java中类路径-classpath-和源路径-sourcepath-的区别"><span>Java中类路径（classpath）和源路径（sourcepath）的区别</span></a></h1><p>在Java中，我们经常遇到源路径（sourcepath）和类路径（classpath）这两个术语。尽管这两个术语乍一看可能很相似，但它们在程序的编译和执行中具有不同的功能。尽管它们都有助于定位文件，但它们有一些明显的区别。</p><p>在本教程中，我们将探讨源路径和类路径的细微差别，并了解它们在使用上的区别。</p><p>源路径是由编译器用来定位需要编译Java程序的源代码文件的。<strong>它指定了编译器在编译程序时应查找源文件的目录。</strong></p><p>如果源文件位于一个目录或多个目录中，它们在编译期间使用-sourcepath选项进行指定。</p><h3 id="_3-通过命令行指定sourcepath" tabindex="-1"><a class="header-anchor" href="#_3-通过命令行指定sourcepath"><span>3. 通过命令行指定sourcepath</span></a></h3><p>假设我们有一个具有以下目录结构的项目：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>my-project/
|-- src/
|   |-- Main.java
|   |-- Utils.java
|-- test/
|   |-- TestMain.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>源文件位于_src_目录中，测试文件位于_test_目录中。要编译项目，我们需要使用-sourcepath选项指定源文件的位置：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ javac <span class="token parameter variable">-sourcepath</span> ./src/ ./src/Main.java ./src/Utils.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此命令告诉Java编译器在“<em>src</em>”目录中查找源文件。然而，我们仍然需要指定要编译的每个单独源文件相对于源目录的路径。这对编译器来说是必须的，以便知道源目录内每个源文件的确切位置。</p><h3 id="_4-类路径-classpath" tabindex="-1"><a class="header-anchor" href="#_4-类路径-classpath"><span>4. 类路径（classpath）</span></a></h3><p>类路径是由JVM（Java虚拟机）用来定位运行Java程序所需的编译类和其他资源的。<strong>它指定了JVM在执行程序时应查找类文件的目录。</strong></p><p>在执行过程中，Java解释器使用类路径来定位运行程序所需的编译Java类文件。解释器读取类文件中的字节码并相应地执行程序。</p><p>如果编译后的类位于一个目录或多个目录中，它们在执行期间使用-classpath选项进行指定。</p><h3 id="_5-通过命令行指定classpath" tabindex="-1"><a class="header-anchor" href="#_5-通过命令行指定classpath"><span>5. 通过命令行指定classpath</span></a></h3><p>假设我们有一个具有下目录结构的项目：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>my-project/
|-- src/
|   |-- Main.java
|   |-- Utils.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，源文件位于_src_目录中。要编译并运行项目，我们需要指定classpath：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ javac <span class="token parameter variable">-classpath</span> ./src/ ./src/Main.java ./src/Utils.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此命令告诉编译器使用_src_目录中的任何外部依赖项。</p><p>代码编译后，我们可以使用相同的classpath运行程序：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">java</span> <span class="token parameter variable">-classpath</span> src Main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此命令告诉解释器使用位于_src_目录中编译后的_Main_类文件。</p><h3 id="_6-在javac和java命令中使用classpath" tabindex="-1"><a class="header-anchor" href="#_6-在javac和java命令中使用classpath"><span>6. 在javac和java命令中使用classpath</span></a></h3><p>javac命令使用-classpath选项来指定Java编译器所需的编译.class文件和外部库（例如JAR文件）的位置。</p><p>同样，java命令使用-classpath选项来指定Java程序在运行时需要访问的文件和外部库的位置。</p><h3 id="_7-省略sourcepath并仅使用classpath" tabindex="-1"><a class="header-anchor" href="#_7-省略sourcepath并仅使用classpath"><span>7. 省略sourcepath并仅使用classpath</span></a></h3><p>如果未指定-sourcepath选项，Java编译器将在用户类路径（使用-classpath选项指定）中以及当前工作目录中搜索源文件。</p><p>如果源文件位于已经包含在类路径中的目录中，可以省略-sourcepath选项。在这种情况下，编译器仍然能够找到并编译源文件。</p><h3 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h3><p>在本文中，我们学习了sourcepath和classpath之间的一些关键区别。我们还了解了它们在命令行中的使用。</p><p>我们可以得出结论，sourcepath主要用于编译器，而classpath主要用于Java解释器。</p>`,34),n=[p];function r(l,i){return s(),e("div",null,n)}const d=a(c,[["render",r],["__file","2024-07-07-Differences Between Classpath and Sourcepath.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-Differences%20Between%20Classpath%20and%20Sourcepath.html","title":"Java中类路径（classpath）和源路径（sourcepath）的区别","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Tutorial"],"tag":["classpath","sourcepath"],"head":[["meta",{"name":"keywords","content":"Java, classpath, sourcepath, compilation, execution"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-Differences%20Between%20Classpath%20and%20Sourcepath.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中类路径（classpath）和源路径（sourcepath）的区别"}],["meta",{"property":"og:description","content":"Java中类路径（classpath）和源路径（sourcepath）的区别 在Java中，我们经常遇到源路径（sourcepath）和类路径（classpath）这两个术语。尽管这两个术语乍一看可能很相似，但它们在程序的编译和执行中具有不同的功能。尽管它们都有助于定位文件，但它们有一些明显的区别。 在本教程中，我们将探讨源路径和类路径的细微差别，并了..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T14:58:18.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"classpath"}],["meta",{"property":"article:tag","content":"sourcepath"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T14:58:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中类路径（classpath）和源路径（sourcepath）的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T14:58:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中类路径（classpath）和源路径（sourcepath）的区别 在Java中，我们经常遇到源路径（sourcepath）和类路径（classpath）这两个术语。尽管这两个术语乍一看可能很相似，但它们在程序的编译和执行中具有不同的功能。尽管它们都有助于定位文件，但它们有一些明显的区别。 在本教程中，我们将探讨源路径和类路径的细微差别，并了..."},"headers":[{"level":3,"title":"3. 通过命令行指定sourcepath","slug":"_3-通过命令行指定sourcepath","link":"#_3-通过命令行指定sourcepath","children":[]},{"level":3,"title":"4. 类路径（classpath）","slug":"_4-类路径-classpath","link":"#_4-类路径-classpath","children":[]},{"level":3,"title":"5. 通过命令行指定classpath","slug":"_5-通过命令行指定classpath","link":"#_5-通过命令行指定classpath","children":[]},{"level":3,"title":"6. 在javac和java命令中使用classpath","slug":"_6-在javac和java命令中使用classpath","link":"#_6-在javac和java命令中使用classpath","children":[]},{"level":3,"title":"7. 省略sourcepath并仅使用classpath","slug":"_7-省略sourcepath并仅使用classpath","link":"#_7-省略sourcepath并仅使用classpath","children":[]},{"level":3,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1720364298000,"updatedTime":1720364298000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.03,"words":909},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-Differences Between Classpath and Sourcepath.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中类路径（classpath）和源路径（sourcepath）的区别</h1>\\n<p>在Java中，我们经常遇到源路径（sourcepath）和类路径（classpath）这两个术语。尽管这两个术语乍一看可能很相似，但它们在程序的编译和执行中具有不同的功能。尽管它们都有助于定位文件，但它们有一些明显的区别。</p>\\n<p>在本教程中，我们将探讨源路径和类路径的细微差别，并了解它们在使用上的区别。</p>\\n<p>源路径是由编译器用来定位需要编译Java程序的源代码文件的。<strong>它指定了编译器在编译程序时应查找源文件的目录。</strong></p>\\n<p>如果源文件位于一个目录或多个目录中，它们在编译期间使用-sourcepath选项进行指定。</p>","autoDesc":true}');export{d as comp,u as data};
