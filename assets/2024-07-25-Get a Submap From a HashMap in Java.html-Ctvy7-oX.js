import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-BUAgDejY.js";const p={},e=t('<hr><h1 id="从java的hashmap中获取子映射" tabindex="-1"><a class="header-anchor" href="#从java的hashmap中获取子映射"><span>从Java的HashMap中获取子映射</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在我们之前的教程《Java HashMap指南》中，我们展示了如何在Java中使用_HashMap_。</p><p>在这个简短的教程中，我们将学习<strong>如何根据一组键从</strong><em><strong>HashMap</strong></em><strong>中获取一个子映射</strong>。</p><h2 id="_2-使用java-8-stream" tabindex="-1"><a class="header-anchor" href="#_2-使用java-8-stream"><span>2. 使用Java 8 Stream</span></a></h2><p>例如，假设我们有一个_HashMap_和一个键列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">&quot;C&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">&quot;D&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token string">&quot;E&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">List</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>` keyList <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以使用Java 8流来根据_keyList_获取一个子映射：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` subMap <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>x <span class="token operator">-&gt;</span> keyList<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getKey</span><span class="token punctuation">,</span> <span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getValue</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>subMap<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出将如下所示：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{1=A, 2=B, 3=C}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-使用-retainall-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用-retainall-方法"><span>3. 使用_retainAll()_方法</span></a></h2><p>我们可以获得映射的_keySet_并使用_retainAll()_方法来删除所有键不在_keyList_中的条目：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>map<span class="token punctuation">.</span><span class="token function">keySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">retainAll</span><span class="token punctuation">(</span>keyList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>注意这个方法将编辑原始映射</strong>。如果我们不想影响原始映射，我们可以首先使用_HashMap_的复制构造函数创建一个新的映射：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` newMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>map<span class="token punctuation">)</span><span class="token punctuation">;</span>\nnewMap<span class="token punctuation">.</span><span class="token function">keySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">retainAll</span><span class="token punctuation">(</span>keyList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>newMap<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出与上述相同。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>总之，我们学习了两种方法来<strong>从</strong><em><strong>HashMap</strong></em><strong>中基于一组键获取一个子映射</strong>。</p>',20),o=[e];function c(l,u){return s(),n("div",null,o)}const k=a(p,[["render",c],["__file","2024-07-25-Get a Submap From a HashMap in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-25/2024-07-25-Get%20a%20Submap%20From%20a%20HashMap%20in%20Java.html","title":"从Java的HashMap中获取子映射","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","HashMap"],"tag":["Java","HashMap","Submap"],"head":[["meta",{"name":"keywords","content":"Java, HashMap, Submap"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-25/2024-07-25-Get%20a%20Submap%20From%20a%20HashMap%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"从Java的HashMap中获取子映射"}],["meta",{"property":"og:description","content":"从Java的HashMap中获取子映射 1. 概述 在我们之前的教程《Java HashMap指南》中，我们展示了如何在Java中使用_HashMap_。 在这个简短的教程中，我们将学习如何根据一组键从HashMap中获取一个子映射。 2. 使用Java 8 Stream 例如，假设我们有一个_HashMap_和一个键列表： 我们可以使用Java 8流..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-25T20:53:44.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"HashMap"}],["meta",{"property":"article:tag","content":"Submap"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-25T20:53:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"从Java的HashMap中获取子映射\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-25T20:53:44.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"从Java的HashMap中获取子映射 1. 概述 在我们之前的教程《Java HashMap指南》中，我们展示了如何在Java中使用_HashMap_。 在这个简短的教程中，我们将学习如何根据一组键从HashMap中获取一个子映射。 2. 使用Java 8 Stream 例如，假设我们有一个_HashMap_和一个键列表： 我们可以使用Java 8流..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用Java 8 Stream","slug":"_2-使用java-8-stream","link":"#_2-使用java-8-stream","children":[]},{"level":2,"title":"3. 使用_retainAll()_方法","slug":"_3-使用-retainall-方法","link":"#_3-使用-retainall-方法","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721940824000,"updatedTime":1721940824000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.12,"words":336},"filePathRelative":"posts/baeldung/2024-07-25/2024-07-25-Get a Submap From a HashMap in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>从Java的HashMap中获取子映射</h1>\\n<h2>1. 概述</h2>\\n<p>在我们之前的教程《Java HashMap指南》中，我们展示了如何在Java中使用_HashMap_。</p>\\n<p>在这个简短的教程中，我们将学习<strong>如何根据一组键从</strong><em><strong>HashMap</strong></em><strong>中获取一个子映射</strong>。</p>\\n<h2>2. 使用Java 8 Stream</h2>\\n<p>例如，假设我们有一个_HashMap_和一个键列表：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">Map</span>```<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Integer</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>``` map <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">HashMap</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\nmap<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"A\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\nmap<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"B\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\nmap<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">3</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"C\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\nmap<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">4</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"D\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\nmap<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">5</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"E\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token class-name\\">List</span>`<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Integer</span><span class=\\"token punctuation\\">&gt;</span></span>` keyList <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Arrays</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">asList</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,m as data};
