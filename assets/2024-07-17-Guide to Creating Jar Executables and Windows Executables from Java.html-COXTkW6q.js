import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as n,a as i}from"./app-BMOUrRO4.js";const s={},t=i(`<hr><h1 id="从java创建jar可执行文件和windows可执行文件的指南" tabindex="-1"><a class="header-anchor" href="#从java创建jar可执行文件和windows可执行文件的指南"><span>从Java创建Jar可执行文件和Windows可执行文件的指南</span></a></h1><p>在本教程中，我们将首先学习如何将Java程序打包成一个可执行的Java ARchive (JAR) 文件。然后，我们将看到如何使用该可执行JAR生成一个受Microsoft Windows支持的可执行文件。</p><p>我们将使用Java附带的_jar_命令行工具来创建JAR文件。然后，我们将学习使用Java 16及更高版本中可用的_jpackage_工具，作为_jdk.jpackage_，来生成可执行文件。</p><p>JAR文件是一个包含编译后的Java类文件和其他资源的容器。它基于流行的ZIP文件格式。</p><p>可执行JAR文件也是一个JAR文件，但其中包含一个主类。主类在我们将很快讨论的清单文件中引用。</p><p>为了运行以JAR格式交付的应用程序，我们必须拥有Java Runtime Environment (JRE)。</p><p>与JAR文件不同，特定平台的可执行文件可以在其构建的平台上本地运行。例如，该平台可以是Microsoft Windows、Linux或Apple macOS。</p><p>为了获得良好的最终用户体验，最好为客户提供特定平台的可执行文件。</p><h3 id="_2-1-jar-命令的基础" tabindex="-1"><a class="header-anchor" href="#_2-1-jar-命令的基础"><span>2.1. _jar_命令的基础</span></a></h3><p>创建JAR文件的一般语法是：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>jar cf jar-file input-file<span class="token punctuation">(</span>s<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们了解一些在创建新归档时可以使用的选项：</p><ul><li><em>c</em> 指定我们想要创建一个JAR文件</li><li><em>f</em> 指定我们希望输出到一个文件</li><li><em>m</em> 用于从现有清单文件中包含清单信息</li><li><em>jar-file</em> 是我们想要的最终JAR文件的名称。JAR文件通常具有_.jar_扩展名，但这不是必须的。</li><li><em>input-file(s)</em> 是我们想要包含在我们JAR文件中的文件名列表，这些文件名由空格分隔。这里也可以使用通配符_*_。</li></ul><p>一旦我们创建了JAR文件，我们通常会检查其内容。要查看JAR文件包含的内容，我们使用以下语法：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>jar tf jar-file
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里，<em>t</em> 表示我们想要列出JAR文件的内容。<em>f</em> 选项表示我们想要检查的JAR文件在命令行中指定。</p><h3 id="_2-2-jpackage-命令" tabindex="-1"><a class="header-anchor" href="#_2-2-jpackage-命令"><span>2.2. _jpackage_命令</span></a></h3><p>_jpackage_命令行工具帮助我们为模块化和非模块化Java应用程序生成可安装的包。</p><p>它使用_jlink_命令为我们的应用程序生成Java运行时映像。结果，我们得到了一个特定平台的自包含应用程序包。</p><p>由于应用程序包是为目标平台构建的，因此该系统必须包含以下内容：</p><ul><li>应用程序本身</li><li>JDK</li><li>打包工具所需的软件。<strong>对于Windows，_jpackage_需要WiX 3.0或更高版本</strong>。</li></ul><p>这是_jpackage_命令的常用形式：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>jpackage <span class="token parameter variable">--input</span> <span class="token builtin class-name">.</span> --main-jar MyAppn.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-创建可执行文件" tabindex="-1"><a class="header-anchor" href="#_3-创建可执行文件"><span>3. 创建可执行文件</span></a></h2><p>现在，让我们经历创建一个可执行JAR文件的过程。准备好之后，我们将致力于生成Windows可执行文件。</p><h3 id="_3-1-创建可执行jar文件" tabindex="-1"><a class="header-anchor" href="#_3-1-创建可执行jar文件"><span>3.1. 创建可执行JAR文件</span></a></h3><p>创建可执行JAR相对简单。我们首先需要一个至少有一个具有_main()_方法的类的Java项目。我们为示例创建了一个名为_MySampleGUIAppn_的Java类。</p><p>第二步是创建一个清单文件。让我们将我们的清单文件创建为_MySampleGUIAppn.mf_：</p><div class="language-makefile line-numbers-mode" data-ext="makefile" data-title="makefile"><pre class="language-makefile"><code><span class="token target symbol">Manifest-Version</span><span class="token punctuation">:</span> 1.0
<span class="token target symbol">Main-Class</span><span class="token punctuation">:</span> MySampleGUIAppn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们必须确保在此清单文件的末尾有一个新行，以便它能够正确工作。</p><p>一旦清单文件准备好，我们将创建一个可执行JAR：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>jar cmf MySampleGUIAppn.mf MySampleGUIAppn.jar MySampleGUIAppn.class MySampleGUIAppn.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们查看我们创建的JAR的内容：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>jar tf MySampleGUIAppn.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这是一个示例输出：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>META-INF/
META-INF/MANIFEST.MF
MySampleGUIAppn.class
MySampleGUIAppn.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们可以通过命令行或在GUI中运行我们的JAR可执行文件。</p><p>让我们在命令行上运行它：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-jar</span> MySampleGUIAppn.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在GUI中，我们可以简单地双击相关的JAR文件。这应该会像任何其他应用程序一样正常启动它。</p><h3 id="_3-2-创建windows可执行文件" tabindex="-1"><a class="header-anchor" href="#_3-2-创建windows可执行文件"><span>3.2. 创建Windows可执行文件</span></a></h3><p>现在我们的可执行JAR已经准备好并可以使用了，让我们为我们的示例项目生成一个Windows可执行文件：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>jpackage <span class="token parameter variable">--input</span> <span class="token builtin class-name">.</span> --main-jar MySampleGUIAppn.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个命令需要一段时间才能完成。完成后，它会在当前工作文件夹中生成一个_exe_文件。可执行文件的文件名将与清单文件中提到的版本号连接起来。我们将能够像启动任何其他Windows应用程序一样启动它。</p><p>这里有一些我们可以与_jpackage_命令一起使用的特定于Windows的选项：</p><ul><li><em>–type</em>：指定_msi_而不是默认的_exe_格式</li><li><em>–win-console</em>：以控制台窗口启动我们的应用程序</li><li><em>–win-shortcut</em>：在Windows开始菜单中创建快捷方式文件</li><li><em>–win-dir-chooser</em>：让用户指定自定义目录以安装可执行文件</li><li><em>–win-menu –win-menu-group</em>：让用户在开始菜单中指定自定义目录</li></ul><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们学习了有关JAR文件和可执行JAR文件的一些基础知识。我们还看到了如何将Java程序转换为JAR可执行文件，然后转换为受Microsoft Windows支持的可执行文件。</p><p>如往常一样，示例的源代码可以在GitHub上找到。</p>`,50),l=[t];function p(r,d){return n(),e("div",null,l)}const m=a(s,[["render",p],["__file","2024-07-17-Guide to Creating Jar Executables and Windows Executables from Java.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Guide%20to%20Creating%20Jar%20Executables%20and%20Windows%20Executables%20from%20Java.html","title":"从Java创建Jar可执行文件和Windows可执行文件的指南","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Windows Executables"],"tag":["jar","jpackage","Java Applications"],"head":[["meta",{"name":"keywords","content":"Java, JAR, Executable, Windows, jpackage, jlink"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Guide%20to%20Creating%20Jar%20Executables%20and%20Windows%20Executables%20from%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"从Java创建Jar可执行文件和Windows可执行文件的指南"}],["meta",{"property":"og:description","content":"从Java创建Jar可执行文件和Windows可执行文件的指南 在本教程中，我们将首先学习如何将Java程序打包成一个可执行的Java ARchive (JAR) 文件。然后，我们将看到如何使用该可执行JAR生成一个受Microsoft Windows支持的可执行文件。 我们将使用Java附带的_jar_命令行工具来创建JAR文件。然后，我们将学习使用..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T07:30:35.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"jar"}],["meta",{"property":"article:tag","content":"jpackage"}],["meta",{"property":"article:tag","content":"Java Applications"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T07:30:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"从Java创建Jar可执行文件和Windows可执行文件的指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T07:30:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"从Java创建Jar可执行文件和Windows可执行文件的指南 在本教程中，我们将首先学习如何将Java程序打包成一个可执行的Java ARchive (JAR) 文件。然后，我们将看到如何使用该可执行JAR生成一个受Microsoft Windows支持的可执行文件。 我们将使用Java附带的_jar_命令行工具来创建JAR文件。然后，我们将学习使用..."},"headers":[{"level":3,"title":"2.1. _jar_命令的基础","slug":"_2-1-jar-命令的基础","link":"#_2-1-jar-命令的基础","children":[]},{"level":3,"title":"2.2. _jpackage_命令","slug":"_2-2-jpackage-命令","link":"#_2-2-jpackage-命令","children":[]},{"level":2,"title":"3. 创建可执行文件","slug":"_3-创建可执行文件","link":"#_3-创建可执行文件","children":[{"level":3,"title":"3.1. 创建可执行JAR文件","slug":"_3-1-创建可执行jar文件","link":"#_3-1-创建可执行jar文件","children":[]},{"level":3,"title":"3.2. 创建Windows可执行文件","slug":"_3-2-创建windows可执行文件","link":"#_3-2-创建windows可执行文件","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721201435000,"updatedTime":1721201435000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.67,"words":1400},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Guide to Creating Jar Executables and Windows Executables from Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>从Java创建Jar可执行文件和Windows可执行文件的指南</h1>\\n<p>在本教程中，我们将首先学习如何将Java程序打包成一个可执行的Java ARchive (JAR) 文件。然后，我们将看到如何使用该可执行JAR生成一个受Microsoft Windows支持的可执行文件。</p>\\n<p>我们将使用Java附带的_jar_命令行工具来创建JAR文件。然后，我们将学习使用Java 16及更高版本中可用的_jpackage_工具，作为_jdk.jpackage_，来生成可执行文件。</p>\\n<p>JAR文件是一个包含编译后的Java类文件和其他资源的容器。它基于流行的ZIP文件格式。</p>","autoDesc":true}');export{m as comp,u as data};
