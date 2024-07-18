import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CE5go3V-.js";const p={},e=t(`<hr><h1 id="程序化创建jar文件" tabindex="-1"><a class="header-anchor" href="#程序化创建jar文件"><span>程序化创建JAR文件</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span><strong>1. 引言</strong></span></a></h2><p>在这篇文章中，我们将介绍如何程序化地创建jar文件。在编写软件时，我们最终需要将其部署到生产状态。在某些情况下，使用类路径和单独的文件是可以接受的。通常，处理单个文件更为方便。在Java中，标准的方法是使用JAR、WAR或EAR文件。</p><p><strong>基本过程是编写清单文件，打开jar文件，添加内容，最后关闭jar文件。</strong></p><h2 id="_2-jar文件的解剖" tabindex="-1"><a class="header-anchor" href="#_2-jar文件的解剖"><span><strong>2. JAR文件的解剖</strong></span></a></h2><p>jar文件是ZIP文件格式的扩展，包含了一个清单文件。清单文件是特定于JAR文件的特殊文件，可能包含各种设置。其中一些是主类、可选数据（例如，作者、版本等）和代码签名信息。</p><p><strong>我们可以使用与zip兼容的工具，如WinRar，来查看和提取归档中的一些或全部文件。</strong> 我们还可以包括一个jars或libs子目录，用于包含依赖的jar文件。由于jar是zip文件的扩展，我们可以包含任何文件或目录。</p><p>为了简化创建JAR文件的过程，我们创建了一个单一的、普通的Java对象（POJO）类，封装了我们的操作。我们可以包括将条目放入清单文件、创建JAR文件、添加文件或目录。</p><p>我们还可以创建方法来从JAR中删除条目，甚至将条目追加到现有的JAR中，尽管这些操作需要完全读取和重写JAR。</p><h3 id="_3-1-jar清单" tabindex="-1"><a class="header-anchor" href="#_3-1-jar清单"><span><strong>3.1. JAR清单</strong></span></a></h3><p>为了创建一个JAR文件，我们首先必须开始编写清单：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JarTool</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Manifest</span> manifest <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Manifest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">startManifest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        manifest<span class="token punctuation">.</span><span class="token function">getMainAttributes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">Attributes<span class="token punctuation">.</span>Name</span><span class="token punctuation">.</span><span class="token constant">MANIFEST_VERSION</span><span class="token punctuation">,</span> <span class="token string">&quot;1.0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们希望jar可执行，我们必须设置主类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setMainClass</span><span class="token punctuation">(</span><span class="token class-name">String</span> mainFQCN<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>mainFQCN <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>mainFQCN<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        manifest<span class="token punctuation">.</span><span class="token function">getMainAttributes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">Attributes<span class="token punctuation">.</span>Name</span><span class="token punctuation">.</span><span class="token constant">MAIN_CLASS</span><span class="token punctuation">,</span> mainFQCN<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，如果我们想指定其他属性，我们可以将它们添加到清单中，例如：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">addToManifest</span><span class="token punctuation">(</span><span class="token string">&quot;Can-Redefine-Classes&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;true&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里是该方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addToManifest</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">String</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    manifest<span class="token punctuation">.</span><span class="token function">getMainAttributes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Attributes<span class="token punctuation">.</span>Name</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-打开jar进行写入" tabindex="-1"><a class="header-anchor" href="#_3-2-打开jar进行写入"><span><strong>3.2. 打开Jar进行写入</strong></span></a></h3><p>清单完成后，我们现在可以将条目写入JAR文件。为此，我们首先必须打开jar：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">JarOutputStream</span> <span class="token function">openJar</span><span class="token punctuation">(</span><span class="token class-name">String</span> jarFile<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">JarOutputStream</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>jarFile<span class="token punctuation">)</span><span class="token punctuation">,</span> manifest<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-向jar添加文件" tabindex="-1"><a class="header-anchor" href="#_3-3-向jar添加文件"><span><strong>3.3. 向Jar添加文件</strong></span></a></h3><p>在向JAR添加文件时，Java使用Solaris风格的文件名，使用正斜杠作为分隔符（/）。注意，<strong>我们可以添加任何类型的文件</strong>，包括其他JAR文件或空目录。这对于包含依赖项非常有用。</p><p>另外，因为JAR文件是类路径的一种形式，<strong>我们必须指定我们希望在JAR内部使用绝对路径的哪一部分</strong>。对我们来说，根路径将是我们项目的类路径。</p><p>理解这一点后，我们现在可以完成我们的_JarTool_类，用这个方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addFile</span><span class="token punctuation">(</span><span class="token class-name">JarOutputStream</span> target<span class="token punctuation">,</span> <span class="token class-name">String</span> rootPath<span class="token punctuation">,</span> <span class="token class-name">String</span> source<span class="token punctuation">)</span>
  <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> remaining <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>rootPath<span class="token punctuation">.</span><span class="token function">endsWith</span><span class="token punctuation">(</span><span class="token class-name">File</span><span class="token punctuation">.</span>separator<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        remaining <span class="token operator">=</span> source<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>rootPath<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        remaining <span class="token operator">=</span> source<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>rootPath<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">String</span> name <span class="token operator">=</span> remaining<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">JarEntry</span> entry <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JarEntry</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    entry<span class="token punctuation">.</span><span class="token function">setTime</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">lastModified</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    target<span class="token punctuation">.</span><span class="token function">putNextEntry</span><span class="token punctuation">(</span>entry<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">BufferedInputStream</span> in <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedInputStream</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> count <span class="token operator">=</span> in<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        target<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> count<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    target<span class="token punctuation">.</span><span class="token function">closeEntry</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    in<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-一个工作示例" tabindex="-1"><a class="header-anchor" href="#_4-一个工作示例"><span><strong>4. 一个工作示例</strong></span></a></h2><p>为了演示可执行jar的最低要求，我们将编写一个应用程序类，然后看看它是如何工作的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Driver</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">JarTool</span> tool <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JarTool</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        tool<span class="token punctuation">.</span><span class="token function">startManifest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        tool<span class="token punctuation">.</span><span class="token function">addToManifest</span><span class="token punctuation">(</span><span class="token string">&quot;Main-Class&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;com.baeldung.createjar.HelloWorld&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">JarOutputStream</span> target <span class="token operator">=</span> tool<span class="token punctuation">.</span><span class="token function">openJar</span><span class="token punctuation">(</span><span class="token string">&quot;HelloWorld.jar&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        tool<span class="token punctuation">.</span><span class="token function">addFile</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;user.dir&quot;</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;\\\\src\\\\main\\\\java&quot;</span><span class="token punctuation">,</span>
          <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;user.dir&quot;</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;\\\\src\\\\main\\\\java\\\\com\\\\baeldung\\\\createjar\\\\HelloWorld.class&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        target<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>HelloWorld类是一个非常简单的类，只有一个main()方法，打印出文本：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorld</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了演示它的工作，我们有这个示例：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ javac <span class="token parameter variable">-cp</span> src/main/java src/main/java/com/baeldung/createjar/HelloWorld.java
$ javac <span class="token parameter variable">-cp</span> src/main/java src/main/java/com/baeldung/createjar/JarTool.java
$ javac <span class="token parameter variable">-cp</span> src/main/java src/main/java/com/baeldung/createjar/Driver.java
$ <span class="token function">java</span> <span class="token parameter variable">-cp</span> src/main/java com/baeldung/createjar/Driver
$ <span class="token function">java</span> <span class="token parameter variable">-jar</span> HelloWorld.jar
Hello World<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们编译了每个类，然后执行了_Driver_类，这将创建_HelloWorld_ jar。最后，我们执行了jar，结果打印出“Hello World”消息。</p><p>上述命令应从项目位置执行。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span><strong>5. 结论</strong></span></a></h2><p>在本教程中，我们看到了如何程序化地创建一个jar文件，向其中添加文件，最后执行它。</p><p>当然，代码也可以在GitHub上找到。</p>`,39),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-17-Creating JAR Files Programmatically.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Creating%20JAR%20Files%20Programmatically.html","title":"程序化创建JAR文件","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","JAR文件"],"tag":["Java","JAR文件","编程"],"head":[["meta",{"name":"keywords","content":"Java, JAR文件, 编程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Creating%20JAR%20Files%20Programmatically.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"程序化创建JAR文件"}],["meta",{"property":"og:description","content":"程序化创建JAR文件 1. 引言 在这篇文章中，我们将介绍如何程序化地创建jar文件。在编写软件时，我们最终需要将其部署到生产状态。在某些情况下，使用类路径和单独的文件是可以接受的。通常，处理单个文件更为方便。在Java中，标准的方法是使用JAR、WAR或EAR文件。 基本过程是编写清单文件，打开jar文件，添加内容，最后关闭jar文件。 2. JAR..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T17:08:17.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"JAR文件"}],["meta",{"property":"article:tag","content":"编程"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T17:08:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"程序化创建JAR文件\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T17:08:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"程序化创建JAR文件 1. 引言 在这篇文章中，我们将介绍如何程序化地创建jar文件。在编写软件时，我们最终需要将其部署到生产状态。在某些情况下，使用类路径和单独的文件是可以接受的。通常，处理单个文件更为方便。在Java中，标准的方法是使用JAR、WAR或EAR文件。 基本过程是编写清单文件，打开jar文件，添加内容，最后关闭jar文件。 2. JAR..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. JAR文件的解剖","slug":"_2-jar文件的解剖","link":"#_2-jar文件的解剖","children":[{"level":3,"title":"3.1. JAR清单","slug":"_3-1-jar清单","link":"#_3-1-jar清单","children":[]},{"level":3,"title":"3.2. 打开Jar进行写入","slug":"_3-2-打开jar进行写入","link":"#_3-2-打开jar进行写入","children":[]},{"level":3,"title":"3.3. 向Jar添加文件","slug":"_3-3-向jar添加文件","link":"#_3-3-向jar添加文件","children":[]}]},{"level":2,"title":"4. 一个工作示例","slug":"_4-一个工作示例","link":"#_4-一个工作示例","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721236097000,"updatedTime":1721236097000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.65,"words":1096},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Creating JAR Files Programmatically.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>程序化创建JAR文件</h1>\\n<h2><strong>1. 引言</strong></h2>\\n<p>在这篇文章中，我们将介绍如何程序化地创建jar文件。在编写软件时，我们最终需要将其部署到生产状态。在某些情况下，使用类路径和单独的文件是可以接受的。通常，处理单个文件更为方便。在Java中，标准的方法是使用JAR、WAR或EAR文件。</p>\\n<p><strong>基本过程是编写清单文件，打开jar文件，添加内容，最后关闭jar文件。</strong></p>\\n<h2><strong>2. JAR文件的解剖</strong></h2>\\n<p>jar文件是ZIP文件格式的扩展，包含了一个清单文件。清单文件是特定于JAR文件的特殊文件，可能包含各种设置。其中一些是主类、可选数据（例如，作者、版本等）和代码签名信息。</p>","autoDesc":true}');export{k as comp,d as data};
