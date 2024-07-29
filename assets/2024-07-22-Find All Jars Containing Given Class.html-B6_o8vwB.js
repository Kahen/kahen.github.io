import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as e,a as s}from"./app-BUAgDejY.js";const t={},c=s(`<hr><h1 id="查找包含特定类的jar文件" tabindex="-1"><a class="header-anchor" href="#查找包含特定类的jar文件"><span>查找包含特定类的JAR文件</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本文中，我们将学习如何查找包含特定类的JAR文件。我们将使用两种不同的方法来演示，即基于命令的方法和基于程序的方法。</p><h2 id="_2-基于命令的方法" tabindex="-1"><a class="header-anchor" href="#_2-基于命令的方法"><span><strong>2. 基于命令的方法</strong></span></a></h2><p>在这种方法中，我们将使用shell命令来识别本地Maven仓库中包含_ObjectMapper_类的JAR文件。让我们首先编写一个脚本来识别JAR中的类。该脚本使用_jar_和_grep_命令来打印相应的JAR：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>jar -tf $1 | grep $2 &amp;&amp; echo &quot;Found in : $1&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里$1是JAR文件路径，$2是类名。在这种情况下，类名始终是_com.fasterxml.jackson.databind.ObjectMapper_。让我们将上述命令保存在bash文件_findJar.sh_中。之后，我们将运行以下_find_命令在本地Maven仓库中，使用_findJar.sh_来获取结果JAR：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ find ~/.m2/repository -type f -name &#39;*.jar&#39; -exec ./findJar.sh {} com.fasterxml.jackson.databind.ObjectMapper \\;
com/spotify/docker/client/shaded/com/fasterxml/jackson/databind/ObjectMapper$1.class
com/spotify/docker/client/shaded/com/fasterxml/jackson/databind/ObjectMapper$2.class
com/spotify/docker/client/shaded/com/fasterxml/jackson/databind/ObjectMapper$3.class
com/spotify/docker/client/shaded/com/fasterxml/jackson/databind/ObjectMapper$DefaultTypeResolverBuilder.class
com/spotify/docker/client/shaded/com/fasterxml/jackson/databind/ObjectMapper$DefaultTyping.class
com/spotify/docker/client/shaded/com/fasterxml/jackson/databind/ObjectMapper.class
Found in : /home/user/.m2/repository/com/spotify/docker-client/8.16.0/docker-client-8.16.0-shaded.jar
com/fasterxml/jackson/databind/ObjectMapper$1.class
com/fasterxml/jackson/databind/ObjectMapper$2.class
com/fasterxml/jackson/databind/ObjectMapper$3.class
com/fasterxml/jackson/databind/ObjectMapper$DefaultTypeResolverBuilder.class
com/fasterxml/jackson/databind/ObjectMapper$DefaultTyping.class
com/fasterxml/jackson/databind/ObjectMapper.class
Found in : /home/user/.m2/repository/com/fasterxml/jackson/core/jackson-databind/2.12.3/jackson-databind-2.12.3.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-基于程序的方法" tabindex="-1"><a class="header-anchor" href="#_3-基于程序的方法"><span>3. 基于程序的方法</span></a></h2><p>在基于程序的方法中，<strong>我们将编写一个Java类来在Java类路径中查找_ObjectMapper_类。</strong> 我们可以像以下程序所示显示JAR：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Class</span> klass <span class="token operator">=</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">;</span>
        <span class="token class-name">URL</span> path <span class="token operator">=</span> klass<span class="token punctuation">.</span><span class="token function">getProtectionDomain</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getCodeSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getLocation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>file:/Users/home/.m2/repository/com/fasterxml/jackson/core/jackson-databind/2.12.3/jackson-databind-2.12.3.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里我们看到每个_Class_类都有_getProtectionDomain().getCodeSource().getLocation()_。这个方法提供了包含所需类的JAR文件。因此，我们可以使用它来获取包含类的JAR文件。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们学习了从JAR列表中查找类的命令和程序方法。</p><p>首先我们从一个示例开始。之后，我们探索了一种基于命令的方法来从本地Maven仓库中识别给定的类。然后，在第二种方法中，我们学习了如何编写程序来从运行时的类路径中找到用于实例化类的JAR。</p><p>两种方法都很有效，但它们各自有自己的用例。</p>`,19),i=[c];function o(p,l){return e(),n("div",null,i)}const u=a(t,[["render",o],["__file","2024-07-22-Find All Jars Containing Given Class.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-22/2024-07-22-Find%20All%20Jars%20Containing%20Given%20Class.html","title":"查找包含特定类的JAR文件","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Maven"],"tag":["Java","Maven","JAR","Classpath"],"head":[["meta",{"name":"keywords","content":"Java, Maven, JAR, Classpath"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-22/2024-07-22-Find%20All%20Jars%20Containing%20Given%20Class.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"查找包含特定类的JAR文件"}],["meta",{"property":"og:description","content":"查找包含特定类的JAR文件 1. 引言 在本文中，我们将学习如何查找包含特定类的JAR文件。我们将使用两种不同的方法来演示，即基于命令的方法和基于程序的方法。 2. 基于命令的方法 在这种方法中，我们将使用shell命令来识别本地Maven仓库中包含_ObjectMapper_类的JAR文件。让我们首先编写一个脚本来识别JAR中的类。该脚本使用_jar..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T14:43:10.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Maven"}],["meta",{"property":"article:tag","content":"JAR"}],["meta",{"property":"article:tag","content":"Classpath"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T14:43:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"查找包含特定类的JAR文件\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T14:43:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"查找包含特定类的JAR文件 1. 引言 在本文中，我们将学习如何查找包含特定类的JAR文件。我们将使用两种不同的方法来演示，即基于命令的方法和基于程序的方法。 2. 基于命令的方法 在这种方法中，我们将使用shell命令来识别本地Maven仓库中包含_ObjectMapper_类的JAR文件。让我们首先编写一个脚本来识别JAR中的类。该脚本使用_jar..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 基于命令的方法","slug":"_2-基于命令的方法","link":"#_2-基于命令的方法","children":[]},{"level":2,"title":"3. 基于程序的方法","slug":"_3-基于程序的方法","link":"#_3-基于程序的方法","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721659390000,"updatedTime":1721659390000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.8,"words":541},"filePathRelative":"posts/baeldung/2024-07-22/2024-07-22-Find All Jars Containing Given Class.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>查找包含特定类的JAR文件</h1>\\n<h2>1. 引言</h2>\\n<p>在本文中，我们将学习如何查找包含特定类的JAR文件。我们将使用两种不同的方法来演示，即基于命令的方法和基于程序的方法。</p>\\n<h2><strong>2. 基于命令的方法</strong></h2>\\n<p>在这种方法中，我们将使用shell命令来识别本地Maven仓库中包含_ObjectMapper_类的JAR文件。让我们首先编写一个脚本来识别JAR中的类。该脚本使用_jar_和_grep_命令来打印相应的JAR：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>jar -tf $1 | grep $2 &amp;&amp; echo \\"Found in : $1\\"\\n</code></pre></div>","autoDesc":true}');export{u as comp,m as data};
