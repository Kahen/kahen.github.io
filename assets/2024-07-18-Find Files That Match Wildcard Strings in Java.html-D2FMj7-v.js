import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as e,a,b as n}from"./app-DpYLEM_u.js";const p={},c=a(`<hr><h1 id="在java中使用通配符字符串查找文件" tabindex="-1"><a class="header-anchor" href="#在java中使用通配符字符串查找文件"><span>在Java中使用通配符字符串查找文件</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将学习如何在Java中使用通配符字符串查找文件。</p><h2 id="_2-引言" tabindex="-1"><a class="header-anchor" href="#_2-引言"><span>2. 引言</span></a></h2><p>在编程领域，<strong>glob 是一种带有通配符的模式，用于匹配文件名</strong>。我们将使用glob模式来过滤我们的示例中的文件名列表。我们将使用流行的通配符“*”和“？”。Java自Java SE 7以来就支持此功能。</p><p><strong>Java在其_FileSystem_类中提供了_getPathMatcher()_方法。它可以采用正则表达式（regex）或glob模式。</strong> 我们将在本示例中使用glob模式，因为与正则表达式相比，应用通配符更为简单。</p><p>让我们来看一个使用glob模式的此方法的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> pattern <span class="token operator">=</span> <span class="token string">&quot;myCustomPattern&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">PathMatcher</span> matcher <span class="token operator">=</span> <span class="token class-name">FileSystems</span><span class="token punctuation">.</span><span class="token function">getDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPathMatcher</span><span class="token punctuation">(</span><span class="token string">&quot;glob:&quot;</span> <span class="token operator">+</span> pattern<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>以下是Java中glob模式的一些示例：</p>`,10),o=n("table",null,[n("thead",null,[n("tr",null,[n("th",null,"Glob"),n("th",null,"描述")])]),n("tbody",null,[n("tr",null,[n("td",null,"*.java"),n("td",null,"匹配所有扩展名为“java”的文件")]),n("tr",null,[n("td",{"java,class":""},"*."),n("td",null,"匹配所有扩展名为“java”或“class”的文件")]),n("tr",null,[n("td",null,[n("em",null,".")]),n("td",null,"匹配文件名中某处有“.”的所有文件")]),n("tr",null,[n("td",null,"????"),n("td",null,"匹配文件名中有四个字符的所有文件")]),n("tr",null,[n("td",null,"[test].docx"),n("td",null,"匹配文件名为‘t’, ‘e’, ‘s’, 或 ‘t’和“docx”扩展名的所有文件")]),n("tr",null,[n("td",null,"[0-4].csv"),n("td",null,"匹配文件名为‘0’, ‘1’, ‘2’, ‘3’, 或 ‘4’和“csv”扩展名的所有文件")]),n("tr",null,[n("td",null,"C:\\temp\\*"),n("td",null,"在Windows系统上匹配“C:\\temp”目录中的所有文件")]),n("tr",null,[n("td",null,"src/test/*"),n("td",null,"在基于Unix的系统上匹配“src/test/”目录中的所有文件")])])],-1),l=a('<h2 id="_3-实现" tabindex="-1"><a class="header-anchor" href="#_3-实现"><span>3. 实现</span></a></h2><p>让我们深入了解实现此解决方案的细节。完成此任务有两个步骤。</p><p><strong>首先，我们创建一个方法，它接受两个参数——要搜索的根目录和一个通配符模式。</strong> 此方法将包含访问每个文件和目录的编程逻辑，使用glob模式，并最终返回匹配文件名的列表。</p><p><strong>其次，我们使用Java提供的_Files_类的_walkFileTree_方法来调用我们的搜索过程。</strong></p><p>首先，让我们创建我们的_SearchFileByWildcard_类，其中包含一个_searchWithWc()_方法，它接受_Path_和_String_模式作为参数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">SearchFileByWildcard</span> <span class="token punctuation">{</span>\n    <span class="token keyword">static</span> <span class="token class-name">List</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````` matchesList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">List</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````` <span class="token function">searchWithWc</span><span class="token punctuation">(</span><span class="token class-name">Path</span> rootDir<span class="token punctuation">,</span> <span class="token class-name">String</span> pattern<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n        matchesList<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">FileVisitor</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Path</span><span class="token punctuation">&gt;</span></span>`` matcherVisitor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleFileVisitor</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Path</span><span class="token punctuation">&gt;</span></span>``<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token annotation punctuation">@Override</span>\n            <span class="token keyword">public</span> <span class="token class-name">FileVisitResult</span> <span class="token function">visitFile</span><span class="token punctuation">(</span><span class="token class-name">Path</span> file<span class="token punctuation">,</span> <span class="token class-name">BasicFileAttributes</span> attribs<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n                <span class="token class-name">FileSystem</span> fs <span class="token operator">=</span> <span class="token class-name">FileSystems</span><span class="token punctuation">.</span><span class="token function">getDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                <span class="token class-name">PathMatcher</span> matcher <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">getPathMatcher</span><span class="token punctuation">(</span><span class="token string">&quot;glob:&quot;</span> <span class="token operator">+</span> pattern<span class="token punctuation">)</span><span class="token punctuation">;</span>\n                <span class="token class-name">Path</span> name <span class="token operator">=</span> file<span class="token punctuation">.</span><span class="token function">getFileName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                <span class="token keyword">if</span> <span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                    matchesList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>name<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                <span class="token punctuation">}</span>\n                <span class="token keyword">return</span> <span class="token class-name">FileVisitResult</span><span class="token punctuation">.</span><span class="token constant">CONTINUE</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span><span class="token punctuation">;</span>\n        <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">walkFileTree</span><span class="token punctuation">(</span>rootDir<span class="token punctuation">,</span> matcherVisitor<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> matchesList<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要访问_rootDir_中的文件，我们使用_FileVisitor_接口。一旦我们通过调用_getDefault()_方法获得文件系统的接口，我们就使用_FileSystem_类的_getPathMatcher()_方法。这就是我们在_rootDir_中的各个文件路径上应用glob模式的地方。</p><p>在我们的情况下，我们可以使用结果的_PathMatcher_来获取匹配文件名的_ArrayList_。</p><p>最后，我们调用NIO _Files_类的_walkFileTree_方法。文件遍历从_rootDir_开始，以深度优先的方式递归访问树中的每个节点。_matcherVisitor_包含_SimpleFileVisitor_类中_visitFile_方法的实现。</p><p>现在我们已经讨论了基于通配符的文件搜索的实现，让我们看看一些示例输出。我们将使用以下文件结构作为我们的示例：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/05/fileStructureUnix.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>如果我们传递一个带有“glob:*.{txt,docx}”模式的_String_，我们的代码输出三个扩展名为“txt”的文件名和一个扩展名为“docx”的文件名：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">SearchFileByWildcard</span> sfbw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SearchFileByWildcard</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````` actual <span class="token operator">=</span> sfbw<span class="token punctuation">.</span><span class="token function">searchWithWc</span><span class="token punctuation">(</span><span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;src/test/resources/sfbw&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;glob:*.{txt,docx}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">HashSet</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````<span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;six.txt&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three.txt&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two.docx&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;one.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token keyword">new</span> <span class="token class-name">HashSet</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````<span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们传递一个带有“glob:????.{csv}”模式的_String_，我们的代码输出一个文件名，该文件名有四个字符，后面跟着一个“.”和扩展名“csv”：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">SearchFileByWildcard</span> sfbw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SearchFileByWildcard</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````` actual <span class="token operator">=</span> sfbw<span class="token punctuation">.</span><span class="token function">searchWithWc</span><span class="token punctuation">(</span><span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;src/test/resources/sfbw&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;glob:????.{csv}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">HashSet</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````<span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;five.csv&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````<span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本教程中，我们学习了如何在Java中使用通配符模式搜索文件。</p><p>源代码可在GitHub上获得。</p>',18),i=[c,o,l];function u(r,k){return e(),t("div",null,i)}const g=s(p,[["render",u],["__file","2024-07-18-Find Files That Match Wildcard Strings in Java.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Find%20Files%20That%20Match%20Wildcard%20Strings%20in%20Java.html","title":"在Java中使用通配符字符串查找文件","lang":"zh-CN","frontmatter":{"date":"2022-05-01T00:00:00.000Z","category":["Java","文件操作"],"tag":["Java","文件搜索","通配符"],"head":[["meta",{"name":"keywords","content":"Java, 文件搜索, 通配符, glob模式"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Find%20Files%20That%20Match%20Wildcard%20Strings%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中使用通配符字符串查找文件"}],["meta",{"property":"og:description","content":"在Java中使用通配符字符串查找文件 1. 概述 在本教程中，我们将学习如何在Java中使用通配符字符串查找文件。 2. 引言 在编程领域，glob 是一种带有通配符的模式，用于匹配文件名。我们将使用glob模式来过滤我们的示例中的文件名列表。我们将使用流行的通配符“*”和“？”。Java自Java SE 7以来就支持此功能。 Java在其_FileS..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/05/fileStructureUnix.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T18:09:31.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"文件搜索"}],["meta",{"property":"article:tag","content":"通配符"}],["meta",{"property":"article:published_time","content":"2022-05-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T18:09:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中使用通配符字符串查找文件\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/05/fileStructureUnix.jpg\\"],\\"datePublished\\":\\"2022-05-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T18:09:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中使用通配符字符串查找文件 1. 概述 在本教程中，我们将学习如何在Java中使用通配符字符串查找文件。 2. 引言 在编程领域，glob 是一种带有通配符的模式，用于匹配文件名。我们将使用glob模式来过滤我们的示例中的文件名列表。我们将使用流行的通配符“*”和“？”。Java自Java SE 7以来就支持此功能。 Java在其_FileS..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 引言","slug":"_2-引言","link":"#_2-引言","children":[]},{"level":2,"title":"3. 实现","slug":"_3-实现","link":"#_3-实现","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721326171000,"updatedTime":1721326171000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.41,"words":1022},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Find Files That Match Wildcard Strings in Java.md","localizedDate":"2022年5月1日","excerpt":"<hr>\\n<h1>在Java中使用通配符字符串查找文件</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将学习如何在Java中使用通配符字符串查找文件。</p>\\n<h2>2. 引言</h2>\\n<p>在编程领域，<strong>glob 是一种带有通配符的模式，用于匹配文件名</strong>。我们将使用glob模式来过滤我们的示例中的文件名列表。我们将使用流行的通配符“*”和“？”。Java自Java SE 7以来就支持此功能。</p>\\n<p><strong>Java在其_FileSystem_类中提供了_getPathMatcher()_方法。它可以采用正则表达式（regex）或glob模式。</strong> 我们将在本示例中使用glob模式，因为与正则表达式相比，应用通配符更为简单。</p>","autoDesc":true}');export{g as comp,v as data};
