import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-C4eFoh0f.js";const e={},i=t(`<hr><h1 id="kotlin中确定操作系统" tabindex="-1"><a class="header-anchor" href="#kotlin中确定操作系统"><span>Kotlin中确定操作系统</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>了解操作系统（OS）对于实现特定于操作系统的行为至关重要。</p><p>在本教程中，我们将探讨Kotlin中检测当前操作系统的方法。</p><h2 id="_2-使用-system-getproperty-函数" tabindex="-1"><a class="header-anchor" href="#_2-使用-system-getproperty-函数"><span>2. 使用_System.getProperty()_函数</span></a></h2><p>当我们在JVM上运行Kotlin程序时，它从Java继承了强大的_System_类。这个类是我们访问与系统相关的信息的门户。具体来说，我们可以使用_System.getProperty()_方法来提取JVM正在运行的操作系统的详细信息。</p><p><strong>_os.name_属性指示操作系统名称</strong>，而**_os.version_保留操作系统版本信息**。</p><p>让我们通过读取这两个属性来创建一个测试函数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> osName <span class="token operator">=</span> System<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;os.name&quot;</span></span><span class="token punctuation">)</span>
<span class="token keyword">val</span> osVersion <span class="token operator">=</span> System<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;os.version&quot;</span></span><span class="token punctuation">)</span>
assertTrue <span class="token punctuation">{</span> osName<span class="token punctuation">.</span><span class="token function">isNotBlank</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
assertTrue <span class="token punctuation">{</span> osVersion<span class="token punctuation">.</span><span class="token function">isNotBlank</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>

log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>
    <span class="token string-literal multiline"><span class="token string">&quot;&quot;&quot;
    |
    |OS 信息
    |-----------------
    |操作系统名称: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">osName</span></span><span class="token string">
    |版本: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">osVersion</span></span><span class="token string">
    &quot;&quot;&quot;</span></span><span class="token punctuation">.</span><span class="token function">trimMargin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将在两个系统上测试这个函数，以验证其操作系统报告的准确性。</p><p>我们的第一个测试目标是Arch Linux系统。在我们开始测试函数之前，让我们使用_uname_命令<strong>检查其内核信息</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">uname</span> <span class="token parameter variable">-sr</span>
Linux <span class="token number">6.1</span>.35-1-lts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，如果我们运行测试函数，它将通过并产生以下输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>OS 信息
-----------------
操作系统名称: Linux
版本: 6.1.35-1-lts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们的函数正确地报告了操作系统信息。</p><p>接下来，让我们转到运行以下系统的MacBook：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ sw_vers
ProductName:            macOS
ProductVersion:         <span class="token number">14.2</span>.1
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们执行我们的函数，它将再次产生预期的操作系统数据：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>操作系统名称: Mac OS X
版本: 14.2.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，我们可以通过读取_os.name_和_os.version_属性来获取操作系统信息。</p><p>在实践中，我们通常通过检查_os.name_属性是否包含特定的关键字来<strong>确定操作系统</strong>。例如，我们可以使用Kotlin的_when_块来实现这一点：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> osName <span class="token operator">=</span> System<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;os.name&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">lowercase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
assertTrue <span class="token punctuation">{</span> osName<span class="token punctuation">.</span><span class="token function">isNotBlank</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>

<span class="token keyword">val</span> result <span class="token operator">=</span> <span class="token keyword">when</span> <span class="token punctuation">{</span>
    <span class="token string-literal singleline"><span class="token string">&quot;windows&quot;</span></span> <span class="token keyword">in</span> osName <span class="token operator">-&gt;</span> <span class="token string-literal singleline"><span class="token string">&quot;Windows&quot;</span></span>
    <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;mac&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;nix&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;sunos&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;solaris&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;bsd&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">any</span> <span class="token punctuation">{</span> it <span class="token keyword">in</span> osName <span class="token punctuation">}</span> <span class="token operator">-&gt;</span> <span class="token string-literal singleline"><span class="token string">&quot;*nix&quot;</span></span>
    <span class="token keyword">else</span> <span class="token operator">-&gt;</span> <span class="token string-literal singleline"><span class="token string">&quot;Other&quot;</span></span>
<span class="token punctuation">}</span>

log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">osName</span></span><span class="token string"> -&gt; </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">result</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们在Linux和Mac系统上运行这个。</p><p>在Linux上我们可以看到：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>linux -&gt; *nix
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在MacBook上我们可以看到：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>mac os x -&gt; *nix
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>代码示例很直接。然而，值得注意的是，为了全面覆盖*nix系统，我们必须手动填写列表中的系统名称，这是容易出错的。在这个例子中，AIX（&quot;aix&quot;）、HP-UX（&quot;hp-ux&quot;）和Irix（&quot;irix&quot;）没有包含在列表中。</p><p>此外，我们可能需要确定操作系统版本，例如，区分Windows 2000、Windows Vista和Windows 10。这通常<strong>涉及多个字符串匹配检查，容易出错</strong>。</p><p>因此，一些库提供了方便的实用类来检索操作系统信息。</p><p>接下来，让我们看一个例子。</p><h2 id="_3-使用apache-commons-lang-3中的-systemutils" tabindex="-1"><a class="header-anchor" href="#_3-使用apache-commons-lang-3中的-systemutils"><span>3. 使用Apache Commons Lang 3中的_SystemUtils_</span></a></h2><p>Apache Commons Lang 3是一个广泛使用的库。它的_SystemUtils_类作为一个中心枢纽，方便地检索各种操作系统信息和环境数据。<strong><em>SystemUtils_类在内部也读取系统属性，如_os.name_和_os.version</em>，以收集操作系统数据</strong>。</p><p>让我们使用它来检查我们正在运行的操作系统家族：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> osName <span class="token operator">=</span> SystemUtils<span class="token punctuation">.</span>OS_NAME
<span class="token keyword">val</span> osVersion <span class="token operator">=</span> SystemUtils<span class="token punctuation">.</span>OS_VERSION
assertTrue <span class="token punctuation">{</span> osName<span class="token punctuation">.</span><span class="token function">isNotBlank</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
assertTrue <span class="token punctuation">{</span> osVersion<span class="token punctuation">.</span><span class="token function">isNotBlank</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>

log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>
    <span class="token string-literal multiline"><span class="token string">&quot;&quot;&quot;
    |
    |OS 信息
    |-----------------
    |操作系统名称: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">osName</span></span><span class="token string">
    |版本: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">osVersion</span></span><span class="token string">
    |是Windows: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">SystemUtils<span class="token punctuation">.</span>IS_OS_WINDOWS</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
    |是*nix: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">SystemUtils<span class="token punctuation">.</span>IS_OS_UNIX</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
    |是Mac OS: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">SystemUtils<span class="token punctuation">.</span>IS_OS_MAC</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
    &quot;&quot;&quot;</span></span><span class="token punctuation">.</span><span class="token function">trimMargin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，我们可以直接访问_SystemUtils_中预定义的静态属性来获取所需的操作系统信息。例如，_IS_OS_UNIX_告诉我们系统是否是<em>nix，并且**它涵盖了我们之前提到的所有</em>nix系统**。_IS_OS_MAC_报告系统是否是macOS。同样，我们可以通过检查_IS_OS_WINDOWS_2000, IS_OS_WINDOWS_VISTA, IS_OS_WINDOWS_10_等来检查Windows版本。</p><p>在Linux系统和MacBook上执行这个测试函数后，我们可以看到_SystemUtils_产生了准确的结果。</p><p>这是我们在Linux上得到的结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>OS 信息
-----------------
操作系统名称: Linux
版本: 6.1.35-1-lts
是Windows: false
是*nix: true
是Mac OS: false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下是在MacBook上的结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>OS 信息
-----------------
操作系统名称: Mac OS X
版本: 14.2.1
是Windows: false
是*nix: true
是Mac OS: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们探讨了两种获取操作系统数据的方法：</p><ul><li>读取_os.name_和_os.version_系统属性</li><li>使用Apache Commons Lang 3中的_SystemUtils_</li></ul><p>如常，示例的完整源代码可在GitHub上获取。</p>`,46),o=[i];function p(l,c){return a(),s("div",null,o)}const d=n(e,[["render",p],["__file","2024-07-12-Determine Operating System in Kotlin.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Determine%20Operating%20System%20in%20Kotlin.html","title":"Kotlin中确定操作系统","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin"],"tag":["Operating System","SystemUtils"],"head":[["meta",{"name":"keywords","content":"Kotlin, Operating System, SystemUtils, JVM, OS detection"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Determine%20Operating%20System%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中确定操作系统"}],["meta",{"property":"og:description","content":"Kotlin中确定操作系统 1. 概述 了解操作系统（OS）对于实现特定于操作系统的行为至关重要。 在本教程中，我们将探讨Kotlin中检测当前操作系统的方法。 2. 使用_System.getProperty()_函数 当我们在JVM上运行Kotlin程序时，它从Java继承了强大的_System_类。这个类是我们访问与系统相关的信息的门户。具体来说..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T06:48:04.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Operating System"}],["meta",{"property":"article:tag","content":"SystemUtils"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T06:48:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中确定操作系统\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T06:48:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中确定操作系统 1. 概述 了解操作系统（OS）对于实现特定于操作系统的行为至关重要。 在本教程中，我们将探讨Kotlin中检测当前操作系统的方法。 2. 使用_System.getProperty()_函数 当我们在JVM上运行Kotlin程序时，它从Java继承了强大的_System_类。这个类是我们访问与系统相关的信息的门户。具体来说..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用_System.getProperty()_函数","slug":"_2-使用-system-getproperty-函数","link":"#_2-使用-system-getproperty-函数","children":[]},{"level":2,"title":"3. 使用Apache Commons Lang 3中的_SystemUtils_","slug":"_3-使用apache-commons-lang-3中的-systemutils","link":"#_3-使用apache-commons-lang-3中的-systemutils","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720766884000,"updatedTime":1720766884000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.75,"words":1126},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Determine Operating System in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"<hr>\\n<h1>Kotlin中确定操作系统</h1>\\n<h2>1. 概述</h2>\\n<p>了解操作系统（OS）对于实现特定于操作系统的行为至关重要。</p>\\n<p>在本教程中，我们将探讨Kotlin中检测当前操作系统的方法。</p>\\n<h2>2. 使用_System.getProperty()_函数</h2>\\n<p>当我们在JVM上运行Kotlin程序时，它从Java继承了强大的_System_类。这个类是我们访问与系统相关的信息的门户。具体来说，我们可以使用_System.getProperty()_方法来提取JVM正在运行的操作系统的详细信息。</p>\\n<p><strong>_os.name_属性指示操作系统名称</strong>，而**_os.version_保留操作系统版本信息**。</p>","autoDesc":true}');export{d as comp,m as data};
