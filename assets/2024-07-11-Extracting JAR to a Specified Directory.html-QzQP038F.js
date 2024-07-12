import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-hKdmvNM4.js";const i={},t=e(`<h1 id="提取jar文件到指定目录" tabindex="-1"><a class="header-anchor" href="#提取jar文件到指定目录"><span>提取JAR文件到指定目录</span></a></h1><p>通常，当我们在Java项目中需要JAR文件时，我们会将它们作为外部库放在类路径中而不解压缩。然而，有时我们可能需要将它们解压到文件系统中。</p><p>在本教程中，我们将探讨如何在命令行中将JAR文件解压到指定目录。<strong>我们将以Linux和Bash为例来介绍每种方法</strong>。</p><h3 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h3><p>我们将以Guava的JAR文件为例，在本教程中。在编写本文时，最新版本是guava-31.1-jre.jar。</p><p>Java提供了_jar_命令来创建、更新、查看和解压JAR文件。接下来，让我们使用_jar_命令解压Guava的JAR文件：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ tree /tmp/test/jarTest
/tmp/test/jarTest
└── guava-31.1-jre.jar

<span class="token number">0</span> directories, <span class="token number">1</span> <span class="token function">file</span>

$ <span class="token builtin class-name">pwd</span>
/tmp/test/jarTest

$ jar xf guava-31.1-jre.jar

$ tree /tmp/test/jarTest
/tmp/test/jarTest
├── com
│   └── google
│       ├── common
│       │   ├── annotations
│       │   │   ├── Beta.class
<span class="token punctuation">..</span>.
<span class="token number">27</span> directories, <span class="token number">2027</span> files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上输出所示，<strong>我们可以使用_jar xf_解压JAR文件</strong>，并且_jar_命令默认将其解压到当前目录。</p><p>然而，<strong>_jar_命令不支持将文件解压到指定目录</strong>。</p><p>接下来，让我们看看实际操作中如何实现这一点。</p><p>我们已经知道_jar_命令默认将给定的JAR文件解压到当前工作目录。</p><p>因此，解决这个问题的一个想法产生了：如果我们想要将JAR文件解压到指定的目标目录，<strong>我们可以首先进入目标目录，然后启动_jar_命令</strong>。</p><p>接下来，让我们确定这个想法是否如预期那样工作。</p><h3 id="_3-1-测试这个想法" tabindex="-1"><a class="header-anchor" href="#_3-1-测试这个想法"><span>3.1. 测试这个想法</span></a></h3><p>首先，让我们创建一个新的目录_/tmp/test/newTarget_：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">mkdir</span> /tmp/test/newTarget

$ tree /tmp/test/newTarget
/tmp/test/newTarget
<span class="token number">0</span> directories, <span class="token number">0</span> files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们进入目标目录，然后解压Guava的JAR文件：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">cd</span> /tmp/test/newTarget <span class="token operator">&amp;&amp;</span> jar xf /tmp/test/jarTest/guava-31.1-jre.jar
$ tree /tmp/test/newTarget
/tmp/test/newTarget
├── com
│   └── google
│       ├── common
│       │   ├── annotations
│       │   │   ├── Beta.class
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上例所示，这个想法是有效的。我们已经将Guava的JAR文件解压到我们期望的目录。</p><p>然而，如果我们重新审视我们执行的命令，我们意识到有一些不便之处：</p><ul><li>如果是一个新的目标目录，我们必须手动先创建它。</li><li>由于_cd_命令更改了我们的当前工作目录，我们必须使用JAR文件的绝对路径。</li><li>执行命令后，我们会留在目标目录而不是我们开始的地方。</li></ul><p>接下来，让我们看看如何改进我们的解决方案。</p><h3 id="_3-2-创建-xjarto-函数" tabindex="-1"><a class="header-anchor" href="#_3-2-创建-xjarto-函数"><span>3.2. 创建_xJarTo()_函数</span></a></h3><p>我们可以创建一个shell函数来自动创建目录并适应JAR文件的路径。让我们首先看看这个函数，然后理解它的工作原理：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token function-name function">xJarTo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token assign-left variable">the_pwd</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>
    <span class="token assign-left variable">the_jar</span><span class="token operator">=</span><span class="token variable">$1</span>
    <span class="token assign-left variable">the_dir</span><span class="token operator">=</span><span class="token variable">$2</span>

    <span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$the_jar</span>&quot;</span> <span class="token operator">=~</span> ^<span class="token punctuation">[</span>^/<span class="token punctuation">]</span>.* <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">the_jar</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${the_pwd}</span>/<span class="token variable">$the_jar</span>&quot;</span>
    <span class="token keyword">fi</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;Extracting <span class="token variable">$the_jar</span> to <span class="token variable">$the_dir</span> ...&quot;</span>
    <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;<span class="token variable">$the_dir</span>&quot;</span>
    <span class="token builtin class-name">cd</span> <span class="token string">&quot;<span class="token variable">$the_dir</span>&quot;</span> <span class="token operator">&amp;&amp;</span> jar xf <span class="token string">&quot;<span class="token variable">$the_jar</span>&quot;</span>
    <span class="token builtin class-name">cd</span> <span class="token string">&quot;<span class="token variable">$the_pwd</span>&quot;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该函数首将用户的当前工作目录（<em>pwd</em>）存储在_the_pwd_变量中。</p><p>然后，它检查JAR文件的路径：</p><ul><li>如果它以“<em>/</em>”开头 - 绝对路径，所以我们直接使用用户输入</li><li>否则 - 相对路径。我们需要将用户的当前工作目录添加到前面以构建要使用的绝对路径</li></ul><p>因此，该函数适应了绝对和相对JAR路径。</p><p>接下来，在进入目标目录之前，我们执行_mkdir -p_命令。<strong>_p_选项告诉_mkdir_命令如果在给定路径中缺少目录，则创建它们</strong>。</p><p>然后，我们使用_cd_进入目标目录，并使用准备好的JAR文件路径执行_jar xf_命令。</p><p>最后，我们导航回用户的当前工作目录。</p><h3 id="_3-3-测试函数" tabindex="-1"><a class="header-anchor" href="#_3-3-测试函数"><span>3.3. 测试函数</span></a></h3><p>现在我们已经了解了_xJarTo()_函数的工作原理，让我们_source_这个函数并测试它是否按预期工作。</p><p>首先，让我们测试目标目录是新的，JAR文件是绝对路径的场景：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">pwd</span>
/tmp/test

$ xJarTo /tmp/test/jarTest/guava-31.1-jre.jar /tmp/a_new_dir
Extracting /tmp/test/jarTest/guava-31.1-jre.jar to /tmp/a_new_dir <span class="token punctuation">..</span>.

$ tree /tmp/a_new_dir
/tmp/a_new_dir
├── com
│   └── google
│       ├── common
│       │   ├── annotations
│       │   │   ├── Beta.class
<span class="token punctuation">..</span>.
$ <span class="token builtin class-name">pwd</span>
/tmp/test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上输出所示，该函数按预期工作。新目录已即时创建，提取的内容位于_/tmp/a_new_dir_下。此外，在调用函数后，我们仍然在_/tmp/test_下。</p><p>接下来，让我们测试相对JAR路径的场景：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">pwd</span>
/tmp/test/jarTest

$ xJarTo guava-31.1-jre.jar /tmp/another_new_dir
Extracting /tmp/test/jarTest/guava-31.1-jre.jar to /tmp/another_new_dir <span class="token punctuation">..</span>.

$ tree /tmp/another_new_dir
/tmp/another_new_dir
├── com
│   └── google
│       ├── common
│       │   ├── annotations
│       │   │   ├── Beta.class
<span class="token punctuation">..</span>.

$ <span class="token builtin class-name">pwd</span>
/tmp/test/jarTest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这次，由于我在_/tmp/test/jarTest_下，我们直接将_guava-31.1-jre.jar_传递给函数。结果表明，该函数也能完成工作。</p><h2 id="_4-使用其他解压缩命令" tabindex="-1"><a class="header-anchor" href="#_4-使用其他解压缩命令"><span>4. 使用其他解压缩命令</span></a></h2><p>JAR文件使用ZIP压缩。因此，<strong>所有解压缩工具都可以解压JAR文件</strong>。如果一个解压缩工具支持解压到指定目录，它就解决了这个问题。</p><p>这种方法要求我们的系统上至少有一个解压缩工具可用。否则，我们需要安装它。值得一提的是，<strong>在系统上安装软件包通常需要_root_或_sudo_权限</strong>。</p><p>接下来，让我们以_unzip_为例，展示在流行的_yum_和_apt_包管理器上安装的命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># apt</span>
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token function">unzip</span>

<span class="token comment"># yum</span>
<span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token function">unzip</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>_unzip_命令支持-d选项，将ZIP归档解压到不同的目录</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">unzip</span> guava-31.1-jre.jar <span class="token parameter variable">-d</span> /tmp/unzip_new_dir
$ tree /tmp/unzip_new_dir
/tmp/unzip_new_dir
├── com
│   └── google
│       ├── common
│       │   ├── annotations
│       │   │   ├── Beta.class
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，_unzip -d_将JAR文件解压到指定的目录。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了将JAR文件解压到指定目录的两种方法。</p><p>为了实现这一点，我们可以创建一个shell函数来包装标准的JAR命令。或者，如果我们的系统上有其他可用的解压缩工具，如_unzip_，我们可以使用它们的相应选项将JAR内容解压到所需的目录。</p>`,51),l=[t];function r(p,d){return s(),a("div",null,l)}const u=n(i,[["render",r],["__file","2024-07-11-Extracting JAR to a Specified Directory.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Extracting%20JAR%20to%20a%20Specified%20Directory.html","title":"提取JAR文件到指定目录","lang":"zh-CN","frontmatter":{"date":"2024-07-11T00:00:00.000Z","category":["Java","Linux"],"tag":["JAR","Bash","unzip"],"head":[["meta",{"name":"keywords","content":"JAR文件, 解压, Linux, Bash, unzip"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Extracting%20JAR%20to%20a%20Specified%20Directory.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"提取JAR文件到指定目录"}],["meta",{"property":"og:description","content":"提取JAR文件到指定目录 通常，当我们在Java项目中需要JAR文件时，我们会将它们作为外部库放在类路径中而不解压缩。然而，有时我们可能需要将它们解压到文件系统中。 在本教程中，我们将探讨如何在命令行中将JAR文件解压到指定目录。我们将以Linux和Bash为例来介绍每种方法。 2. 问题介绍 我们将以Guava的JAR文件为例，在本教程中。在编写本文..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T03:06:24.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JAR"}],["meta",{"property":"article:tag","content":"Bash"}],["meta",{"property":"article:tag","content":"unzip"}],["meta",{"property":"article:published_time","content":"2024-07-11T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T03:06:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"提取JAR文件到指定目录\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-11T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T03:06:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"提取JAR文件到指定目录 通常，当我们在Java项目中需要JAR文件时，我们会将它们作为外部库放在类路径中而不解压缩。然而，有时我们可能需要将它们解压到文件系统中。 在本教程中，我们将探讨如何在命令行中将JAR文件解压到指定目录。我们将以Linux和Bash为例来介绍每种方法。 2. 问题介绍 我们将以Guava的JAR文件为例，在本教程中。在编写本文..."},"headers":[{"level":3,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":3,"title":"3.1. 测试这个想法","slug":"_3-1-测试这个想法","link":"#_3-1-测试这个想法","children":[]},{"level":3,"title":"3.2. 创建_xJarTo()_函数","slug":"_3-2-创建-xjarto-函数","link":"#_3-2-创建-xjarto-函数","children":[]},{"level":3,"title":"3.3. 测试函数","slug":"_3-3-测试函数","link":"#_3-3-测试函数","children":[]},{"level":2,"title":"4. 使用其他解压缩命令","slug":"_4-使用其他解压缩命令","link":"#_4-使用其他解压缩命令","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720667184000,"updatedTime":1720667184000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.89,"words":1468},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Extracting JAR to a Specified Directory.md","localizedDate":"2024年7月11日","excerpt":"\\n<p>通常，当我们在Java项目中需要JAR文件时，我们会将它们作为外部库放在类路径中而不解压缩。然而，有时我们可能需要将它们解压到文件系统中。</p>\\n<p>在本教程中，我们将探讨如何在命令行中将JAR文件解压到指定目录。<strong>我们将以Linux和Bash为例来介绍每种方法</strong>。</p>\\n<h3>2. 问题介绍</h3>\\n<p>我们将以Guava的JAR文件为例，在本教程中。在编写本文时，最新版本是guava-31.1-jre.jar。</p>\\n<p>Java提供了_jar_命令来创建、更新、查看和解压JAR文件。接下来，让我们使用_jar_命令解压Guava的JAR文件：</p>","autoDesc":true}');export{u as comp,v as data};
