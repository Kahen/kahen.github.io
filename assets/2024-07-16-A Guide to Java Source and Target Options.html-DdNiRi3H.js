import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as n,a as s}from"./app-CtR6X2Br.js";const t={},o=s(`<h1 id="java源和目标选项指南" tabindex="-1"><a class="header-anchor" href="#java源和目标选项指南"><span>Java源和目标选项指南</span></a></h1><p>在本教程中，我们将探索Java提供的<code>-source</code>和<code>-target</code>选项。此外，我们还将学习这些选项在Java 8中的工作方式以及从Java 9开始它们是如何发展的。</p><h2 id="_2-与旧版java的向后兼容性" tabindex="-1"><a class="header-anchor" href="#_2-与旧版java的向后兼容性"><span>2. 与旧版Java的向后兼容性</span></a></h2><p>由于Java的频繁发布和更新，应用程序可能无法每次都迁移到新版本。有时，应用程序需要确保它们的代码与旧版本的Java向后兼容。<code>javac</code>中的<code>-source</code>和<code>-target</code>选项使这变得容易。</p><p>为了详细了解这一点，我们首先创建一个示例类，并使用Java 9中添加的<code>List.of()</code>方法，但在Java 8中不存在：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestForSourceAndTarget</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设我们使用Java 9编译代码，并希望与Java 8兼容。</p><p>我们可以使用<code>-source</code>和<code>-target</code>实现这一点：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>/jdk9path/bin/javac TestForSourceAndTarget.java <span class="token parameter variable">-source</span> <span class="token number">8</span> <span class="token parameter variable">-target</span> <span class="token number">8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，在编译时我们得到了一个警告，但编译成功：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>warning: <span class="token punctuation">[</span>options<span class="token punctuation">]</span> bootstrap class path not <span class="token builtin class-name">set</span> <span class="token keyword">in</span> conjunction with <span class="token parameter variable">-source</span> <span class="token number">8</span>
<span class="token number">1</span> warning
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们用Java 8运行代码，我们可以看到错误：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ /jdk8path/bin/java TestForSourceAndTarget
Exception <span class="token keyword">in</span> thread <span class="token string">&quot;main&quot;</span> java.lang.NoSuchMethodError: 
  java.util.List.of<span class="token punctuation">(</span>Ljava/lang/Object<span class="token punctuation">;</span>Ljava/lang/Object<span class="token punctuation">;</span><span class="token punctuation">)</span>Ljava/util/List<span class="token punctuation">;</span>
  at com.baeldung.TestForSourceAndTarget.main<span class="token punctuation">(</span>TestForSourceAndTarget.java:7<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Java 8中，<code>List.of()</code>不存在。理想情况下，Java应该在编译时抛出这个错误。然而，在编译期间，我们只得到了一个警告。</p><p>让我们来看一下我们在编译期间收到的警告。<code>javac</code>告诉我们，引导类路径没有与<code>-source 8</code>一起设置。事实证明，<strong>我们必须提供引导类文件路径，以便<code>javac</code>可以为交叉编译选择正确的文件。</strong> 在我们的例子中，我们希望与Java 8兼容，但Java 9的引导类默认被选中了。</p><p>为了使其工作，<strong>我们必须使用<code>-Xbootclasspath</code>指向所需交叉编译的Java版本的路径</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>/jdk9path/bin/javac TestForSourceAndTarget.java <span class="token parameter variable">-source</span> <span class="token number">8</span> <span class="token parameter variable">-target</span> <span class="token number">8</span> <span class="token parameter variable">-Xbootclasspath</span> <span class="token variable">\${jdk8path}</span>/jre/lib/rt.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们编译它，我们可以看到编译时的错误：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>TestForSourceAndTarget.java:7: error: cannot <span class="token function">find</span> symbol
        System.out.println<span class="token punctuation">(</span>List.of<span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span>, <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">))</span><span class="token punctuation">;</span>
                                ^
  symbol:   method of<span class="token punctuation">(</span>String,
String<span class="token punctuation">)</span>
  location: interface List
<span class="token number">1</span> error
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-源选项" tabindex="-1"><a class="header-anchor" href="#_3-源选项"><span>3. 源选项</span></a></h2><p><strong><code>-source</code>选项指定编译器接受的Java源代码版本：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>/jdk9path/bin/javac TestForSourceAndTarget.java <span class="token parameter variable">-source</span> <span class="token number">8</span> <span class="token parameter variable">-target</span> <span class="token number">8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果没有<code>-source</code>选项，编译器将根据使用的Java版本编译源代码。</p><p>在我们的示例中，如果没有提供<code>-source 8</code>，编译器将根据Java 9规范编译源代码。</p><p><code>-source</code>值8还意味着我们不能使用任何特定于Java 9的API。为了使用Java 9中引入的任何API，如<code>List.of()</code>，我们必须将源选项的值设置为9。</p><h2 id="_4-目标选项" tabindex="-1"><a class="header-anchor" href="#_4-目标选项"><span>4. 目标选项</span></a></h2><p><strong>目标选项指定要生成的类文件的Java版本。目标版本必须等于或高于源选项：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>/jdk9path/bin/javac TestForSourceAndTarget.java <span class="token parameter variable">-source</span> <span class="token number">8</span> <span class="token parameter variable">-target</span> <span class="token number">8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，<strong><code>-target</code>值8意味着这将生成一个需要Java 8或更高版本才能运行的类文件</strong>。</p><p>如果我们在Java 7上运行上述类文件，我们将得到一个错误。</p><h2 id="_5-java-8及更早版本中的源和目标" tabindex="-1"><a class="header-anchor" href="#_5-java-8及更早版本中的源和目标"><span>5. Java 8及更早版本中的源和目标</span></a></h2><p><strong>正如我们从示例中看到的，直到Java 8，要正确进行交叉编译，我们需要提供三个选项，即<code>-source</code>、<code>-target</code>和<code>-Xbootclasspath</code>。</strong> 例如，如果我们使用Java 9构建代码，但它需要与Java 8兼容：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>/jdk9path/bin/javac TestForSourceAndTarget.java <span class="token parameter variable">-source</span> <span class="token number">8</span> <span class="token parameter variable">-target</span> <span class="token number">8</span> <span class="token parameter variable">-Xbootclasspath</span> <span class="token variable">\${jdk8path}</span>/jre/lib/rt.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>从JDK 8开始，使用1.5或更早的源或目标已被弃用，在JDK 9中，对1.5或更早的源或目标的支持被完全移除。</p><h2 id="_6-java-9及更高版本中的源和目标" tabindex="-1"><a class="header-anchor" href="#_6-java-9及更高版本中的源和目标"><span>6. Java 9及更高版本中的源和目标</span></a></h2><p><strong>尽管在Java 8中交叉编译工作得很好，但需要三个命令行选项。</strong> 当我们有三个选项时，保持它们全部更新可能会很困难。</p><p><strong>作为Java 9的一部分，引入了<code>-release</code>选项以简化交叉编译过程。</strong> 使用<code>-release</code>选项，我们可以完成与之前选项相同的交叉编译。</p><p>让我们使用<code>-release</code>选项编译我们之前的示例类：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>/jdk9path/bin/javac TestForSourceAndTarget.java —release <span class="token number">8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>TestForSourceAndTarget.java:7: error: cannot <span class="token function">find</span> symbol
        System.out.println<span class="token punctuation">(</span>List.of<span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span>, <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">))</span><span class="token punctuation">;</span>
                                ^
  symbol:   method of<span class="token punctuation">(</span>String,String<span class="token punctuation">)</span>
  location: interface List
<span class="token number">1</span> error
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>显然，编译时只需要一个选项<code>-release</code>，错误表明<code>javac</code>内部为<code>-source</code>、<code>-target</code>和<code>-Xbootclasspath</code>分配了正确的值。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们学习了<code>javac</code>的<code>-source</code>和<code>-target</code>选项以及它们与交叉编译的关系。此外，我们还了解了它们在Java 8及以后版本中的使用方式。我们还学习了Java 9中引入的<code>-release</code>选项。</p>`,43),c=[o];function r(p,i){return n(),e("div",null,c)}const u=a(t,[["render",r],["__file","2024-07-16-A Guide to Java Source and Target Options.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-A%20Guide%20to%20Java%20Source%20and%20Target%20Options.html","title":"Java源和目标选项指南","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Java Source","Java Target"],"head":[["meta",{"name":"keywords","content":"Java, Java Source, Java Target, Cross-Compilation"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-A%20Guide%20to%20Java%20Source%20and%20Target%20Options.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java源和目标选项指南"}],["meta",{"property":"og:description","content":"Java源和目标选项指南 在本教程中，我们将探索Java提供的-source和-target选项。此外，我们还将学习这些选项在Java 8中的工作方式以及从Java 9开始它们是如何发展的。 2. 与旧版Java的向后兼容性 由于Java的频繁发布和更新，应用程序可能无法每次都迁移到新版本。有时，应用程序需要确保它们的代码与旧版本的Java向后兼容。j..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T00:07:37.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java Source"}],["meta",{"property":"article:tag","content":"Java Target"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T00:07:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java源和目标选项指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T00:07:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java源和目标选项指南 在本教程中，我们将探索Java提供的-source和-target选项。此外，我们还将学习这些选项在Java 8中的工作方式以及从Java 9开始它们是如何发展的。 2. 与旧版Java的向后兼容性 由于Java的频繁发布和更新，应用程序可能无法每次都迁移到新版本。有时，应用程序需要确保它们的代码与旧版本的Java向后兼容。j..."},"headers":[{"level":2,"title":"2. 与旧版Java的向后兼容性","slug":"_2-与旧版java的向后兼容性","link":"#_2-与旧版java的向后兼容性","children":[]},{"level":2,"title":"3. 源选项","slug":"_3-源选项","link":"#_3-源选项","children":[]},{"level":2,"title":"4. 目标选项","slug":"_4-目标选项","link":"#_4-目标选项","children":[]},{"level":2,"title":"5. Java 8及更早版本中的源和目标","slug":"_5-java-8及更早版本中的源和目标","link":"#_5-java-8及更早版本中的源和目标","children":[]},{"level":2,"title":"6. Java 9及更高版本中的源和目标","slug":"_6-java-9及更高版本中的源和目标","link":"#_6-java-9及更高版本中的源和目标","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1721174857000,"updatedTime":1721174857000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.89,"words":1167},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-A Guide to Java Source and Target Options.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将探索Java提供的<code>-source</code>和<code>-target</code>选项。此外，我们还将学习这些选项在Java 8中的工作方式以及从Java 9开始它们是如何发展的。</p>\\n<h2>2. 与旧版Java的向后兼容性</h2>\\n<p>由于Java的频繁发布和更新，应用程序可能无法每次都迁移到新版本。有时，应用程序需要确保它们的代码与旧版本的Java向后兼容。<code>javac</code>中的<code>-source</code>和<code>-target</code>选项使这变得容易。</p>\\n<p>为了详细了解这一点，我们首先创建一个示例类，并使用Java 9中添加的<code>List.of()</code>方法，但在Java 8中不存在：</p>","autoDesc":true}');export{u as comp,v as data};
