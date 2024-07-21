import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as n,a as e}from"./app-CXN34Kw1.js";const t={},p=e(`<h1 id="如何查找-java-class-文件的版本-baeldung" tabindex="-1"><a class="header-anchor" href="#如何查找-java-class-文件的版本-baeldung"><span>如何查找 Java .class 文件的版本 | Baeldung</span></a></h1><p>Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK 的 CRaC（在检查点协调恢复）项目可以通过创建应用程序在峰值性能时的检查点并恢复 JVM 实例到该点来帮助改善这些问题。</p><p>为了充分利用此功能，BellSoft 提供了高度优化的 Java 应用程序容器。这些容器打包了 Alpaquita Linux（一个为 Java 和云环境优化的全功能操作系统）和 Liberica JDK（基于 OpenJDK 的开源 Java 运行时）。</p><p>这些现成的镜像使我们能够轻松地在 Spring Boot 应用程序中集成 CRaC：</p><p><strong>使用 CRaC 支持提高 Java 应用程序的性能</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span><strong>1. 概述</strong></span></a></h2><p>在本教程中，我们将探讨如何找到 .class 文件的 Java 版本。此外，我们还将查看如何检查 jar 文件中的 Java 版本。</p><p>当 Java 文件被编译时，会生成一个 .class 文件。在某些情况下，我们需要找到编译后的类文件的 Java 版本。<strong>每个 Java 主要版本都会为其生成的 .class 文件分配一个主版本号。</strong></p><p>在这个表中，我们将 .class 的主版本号映射到引入该类版本的 JDK 版本，并显示该版本号的十六进制表示：</p><table><thead><tr><th>Java 版本</th><th>类主版本</th><th>十六进制</th></tr></thead><tbody><tr><td>Java SE 18</td><td>62</td><td>003e</td></tr><tr><td>Java SE 17</td><td>61</td><td>003d</td></tr><tr><td>Java SE 16</td><td>60</td><td>003c</td></tr><tr><td>...</td><td>...</td><td>...</td></tr></tbody></table><h2 id="_3-使用-javap-命令检查-class-版本" tabindex="-1"><a class="header-anchor" href="#_3-使用-javap-命令检查-class-版本"><span><strong>3. 使用 javap 命令检查 .class 版本</strong></span></a></h2><p>让我们创建一个简单的类，并使用 JDK 8 构建它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Sample</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung tutorials&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>为了识别类文件的版本，我们可以使用 Java 类文件反汇编工具 javap。</strong></p><p>这里是 javap 命令的语法：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>javap <span class="token punctuation">[</span>选项<span class="token punctuation">]</span> <span class="token punctuation">[</span>类名<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们以 Sample.class 为例检查版本：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>javap <span class="token parameter variable">-verbose</span> Sample

// 省略输出 <span class="token punctuation">..</span>.
Compiled from <span class="token string">&quot;Sample.java&quot;</span>
public class test.Sample
  minor version: <span class="token number">0</span>
  major version: <span class="token number">52</span>
// 省略 <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在 javap 命令的输出中看到的，主版本是 52，表明它是 JDK8 的。</p><p>虽然 javap 提供了许多详细信息，我们只关心主版本。</p><p>对于任何基于 Linux 的系统，我们可以使用以下命令仅获取主版本：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>javap <span class="token parameter variable">-verbose</span> Sample <span class="token operator">|</span> <span class="token function">grep</span> major
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>类似地，对于 Windows 系统，这是我们可以使用的命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>javap <span class="token parameter variable">-verbose</span> Sample <span class="token operator">|</span> findstr major
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这在我们的示例中给出了主版本 52。</p><p><strong>需要注意的是，此版本值并不表示应用程序是使用相应的 JDK 构建的。类文件版本可能与用于编译的 JDK 版本不同。</strong></p><p><strong>例如，如果我们使用 JDK11 构建代码，它应该产生一个版本为 55 的 .class 文件。但是，如果我们在编译期间传递 -target 8，那么 .class 文件的版本将是 52。</strong></p><h2 id="_4-使用-hexdump-检查-class-版本" tabindex="-1"><a class="header-anchor" href="#_4-使用-hexdump-检查-class-版本"><span><strong>4. 使用 hexdump 检查 .class 版本</strong></span></a></h2><p>也可以使用任何十六进制编辑器检查版本。Java 类文件遵循规范。让我们看看它的结构：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ClassFile</span> <span class="token punctuation">{</span>
    u4             magic<span class="token punctuation">;</span>
    u2             minor_version<span class="token punctuation">;</span>
    u2             major_version<span class="token punctuation">;</span>
    <span class="token comment">// 其他细节</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，类型 u1、u2 和 u4 分别表示一个无符号的一字节、两字节和四字节整数。</p><p>u4 是一个识别类文件格式的魔术数字。它的值是 0xCAFEBABE，u2 是主版本。</p><p><strong>对于基于 Linux 的系统，我们可以使用 hexdump 实用程序解析任何 .class 文件：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>hexdump <span class="token parameter variable">-v</span> Sample.class
0000000 ca fe ba be 00 00 00 <span class="token number">34</span> 00 <span class="token number">22</span> 07 00 02 01 00 0b
0000010 <span class="token number">74</span> <span class="token number">65</span> <span class="token number">73</span> <span class="token number">74</span> 2f <span class="token number">53</span> <span class="token number">61</span> 6d <span class="token number">70</span> 6c <span class="token number">65</span> 07 00 04 01 00
<span class="token punctuation">..</span>. 省略 <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们使用 JDK8 编译。第一行的索引 7 和 8 提供了类文件的主版本。因此，0034 是十六进制表示，JDK8 是相应的发布号（从我们之前看到的映射表）。</p><p>作为替代方案，<strong>我们可以直接使用 hexdump 获取主版本号作为十进制：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>hexdump <span class="token parameter variable">-s</span> <span class="token number">7</span> <span class="token parameter variable">-n</span> <span class="token number">1</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;&quot;%d&quot;&#39;</span> Sample.class
<span class="token number">52</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，输出 52 是对应于 JDK8 的类版本。</p><h2 id="_5-jar-文件的版本" tabindex="-1"><a class="header-anchor" href="#_5-jar-文件的版本"><span><strong>5. jar 文件的版本</strong></span></a></h2><p>Java 生态系统中的 jar 文件包含了捆绑在一起的一系列类文件。为了找出 jar 是用哪个 Java 版本构建或编译的，<strong>我们可以提取 jar 文件并使用 javap 或 hexdump 检查 .class 文件版本。</strong></p><p>jar 文件中还有一个 MANIFEST.MF 文件，其中包含有关使用的 JDK 的一些头信息。</p><p>例如，Build-Jdk 或 Created-By 头存储了 JDK 值，这取决于 jar 的构建方式：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Build-Jdk: 17.0.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Created-By: 17.0.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span><strong>5. 结论</strong></span></a></h2><p>在本文中，我们学习了如何查找 .class 文件的 Java 版本。我们看到了 javap 和 hexdump 命令及其用法，用于查找版本。此外，我们还查看了如何在 jar 文件中检查 Java 版本。</p>`,47),l=[p];function i(r,d){return n(),s("div",null,l)}const u=a(t,[["render",i],["__file","2024-07-14-Guide to Find the Java .class Version.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-14/2024-07-14-Guide%20to%20Find%20the%20Java%20.class%20Version.html","title":"如何查找 Java .class 文件的版本 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","CRaC"],"tag":["Java .class 版本","Javap","Hexdump"],"head":[["meta",{"name":"keywords","content":"Java .class 文件版本, Javap 命令, Hexdump 命令, Java 性能优化"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-14/2024-07-14-Guide%20to%20Find%20the%20Java%20.class%20Version.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何查找 Java .class 文件的版本 | Baeldung"}],["meta",{"property":"og:description","content":"如何查找 Java .class 文件的版本 | Baeldung Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK 的 CRaC（在检查点协调恢复）项目可以通过创建应用程序在峰值性能时的检查点并恢复 JVM 实例到该点来帮助改善这些问题。 为了充分利用此功能，BellSoft 提供了高度优化的 Java 应用程序容器。这些容器打包了 A..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-14T19:11:34.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java .class 版本"}],["meta",{"property":"article:tag","content":"Javap"}],["meta",{"property":"article:tag","content":"Hexdump"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-14T19:11:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何查找 Java .class 文件的版本 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-14T19:11:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何查找 Java .class 文件的版本 | Baeldung Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK 的 CRaC（在检查点协调恢复）项目可以通过创建应用程序在峰值性能时的检查点并恢复 JVM 实例到该点来帮助改善这些问题。 为了充分利用此功能，BellSoft 提供了高度优化的 Java 应用程序容器。这些容器打包了 A..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"3. 使用 javap 命令检查 .class 版本","slug":"_3-使用-javap-命令检查-class-版本","link":"#_3-使用-javap-命令检查-class-版本","children":[]},{"level":2,"title":"4. 使用 hexdump 检查 .class 版本","slug":"_4-使用-hexdump-检查-class-版本","link":"#_4-使用-hexdump-检查-class-版本","children":[]},{"level":2,"title":"5. jar 文件的版本","slug":"_5-jar-文件的版本","link":"#_5-jar-文件的版本","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720984294000,"updatedTime":1720984294000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.09,"words":1226},"filePathRelative":"posts/baeldung/2024-07-14/2024-07-14-Guide to Find the Java .class Version.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK 的 CRaC（在检查点协调恢复）项目可以通过创建应用程序在峰值性能时的检查点并恢复 JVM 实例到该点来帮助改善这些问题。</p>\\n<p>为了充分利用此功能，BellSoft 提供了高度优化的 Java 应用程序容器。这些容器打包了 Alpaquita Linux（一个为 Java 和云环境优化的全功能操作系统）和 Liberica JDK（基于 OpenJDK 的开源 Java 运行时）。</p>\\n<p>这些现成的镜像使我们能够轻松地在 Spring Boot 应用程序中集成 CRaC：</p>\\n<p><strong>使用 CRaC 支持提高 Java 应用程序的性能</strong></p>","autoDesc":true}');export{u as comp,v as data};
