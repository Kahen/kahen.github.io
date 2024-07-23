import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-LwwahXlT.js";const e={},p=t('<h1 id="arraylist中不区分大小写的搜索" tabindex="-1"><a class="header-anchor" href="#arraylist中不区分大小写的搜索"><span>ArrayList中不区分大小写的搜索</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在处理ArrayList时，搜索列表中的元素是一项标准操作。contains()方法让我们知道列表对象是否包含我们正在寻找的元素。</p><p>在本教程中，我们将探讨如何在ArrayList<code>&lt;String&gt;</code>对象中不区分大小写地搜索字符串。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>ArrayList.contains()方法在内部使用equals()方法来确定列表是否包含给定的元素。如果ArrayList中的所有元素都是字符串，即在处理ArrayList<code>&lt;String&gt;</code>时，contains()方法会以区分大小写的方式搜索给定的字符串。让我们通过一个例子快速理解。</p><p>假设我们有一个List对象，包含六个字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````````` <span class="token constant">LANGUAGES</span> <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;Java&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Python&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Kotlin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Ruby&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Javascript&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Go&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当我们检查LANGUAGES是否包含&quot;jAvA&quot;时，contains()方法报告false，因为&quot;jAvA&quot;不等于&quot;Java&quot;：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> searchStr <span class="token operator">=</span> <span class="token string">&quot;jAvA&quot;</span><span class="token punctuation">;</span>\n<span class="token keyword">boolean</span> result <span class="token operator">=</span> <span class="token constant">LANGUAGES</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>searchStr<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertFalse</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在本教程中，让我们学习几种在ArrayList<code>&lt;String&gt;</code>实例中搜索字符串的方法，而不考虑大小写。</p><p>为了简单起见，我们将使用单元测试断言来验证解决方案是否按预期工作。</p><p>接下来，让我们看看它们是如何工作的。</p><h2 id="_3-使用stream-api" tabindex="-1"><a class="header-anchor" href="#_3-使用stream-api"><span>3. 使用Stream API</span></a></h2><p>Java Stream API提供了许多方便的接口，允许我们轻松地将集合作为流处理。它在Java 8及更高版本中可用。</p><p>例如，我们可以使用Stream的anyMatch()方法进行不区分大小写的字符串搜索：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> searchStr <span class="token operator">=</span> <span class="token string">&quot;koTliN&quot;</span><span class="token punctuation">;</span>\n<span class="token keyword">boolean</span> result <span class="token operator">=</span> <span class="token constant">LANGUAGES</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">anyMatch</span><span class="token punctuation">(</span>searchStr<span class="token operator">::</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的例子所示，我们在LANGUAGES列表中搜索字符串&quot;koTliN&quot;。然后，如果我们运行它，测试就会通过。</p><p>值得一提的是，我们传递给anyMatch()方法的searchStr::equalsIgnoreCase是一个方法引用。searchStr.equalsIgnoreCase()方法将为流中的每个字符串元素调用。</p><h2 id="_4-创建实用工具方法" tabindex="-1"><a class="header-anchor" href="#_4-创建实用工具方法"><span>4. 创建实用工具方法</span></a></h2><p>我们已经看到Stream API可以直截了当地解决问题。但是，如果我们的Java版本早于8，我们就不能使用Stream API。在这种情况下，解决这个问题的经典方法是创建一个实用工具方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IgnoreCaseSearchUtil</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">ignoreCaseContains</span><span class="token punctuation">(</span><span class="token class-name">List</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````````` theList<span class="token punctuation">,</span> <span class="token class-name">String</span> searchStr<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> s <span class="token operator">:</span> theList<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span>searchStr<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，我们在给定列表中的每个字符串元素上进行for循环检查。一旦一个元素与_searchStr_不区分大小写地相等，该方法就会立即返回_true_，而不再检查列表中的其他元素。</p><p>接下来，让我们创建一个测试来验证它是否按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> searchStr <span class="token operator">=</span> <span class="token string">&quot;ruBY&quot;</span><span class="token punctuation">;</span>\n<span class="token keyword">boolean</span> result <span class="token operator">=</span> <span class="token class-name">IgnoreCaseSearchUtil</span><span class="token punctuation">.</span><span class="token function">ignoreCaseContains</span><span class="token punctuation">(</span><span class="token constant">LANGUAGES</span><span class="token punctuation">,</span> searchStr<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这次，我们在列表中搜索字符串&quot;ruBY&quot;。再次，如果我们运行它，测试就会通过。</p><h2 id="_5-创建arraylist-string-的子类" tabindex="-1"><a class="header-anchor" href="#_5-创建arraylist-string-的子类"><span>5. 创建ArrayList<code>&lt;String&gt;</code>的子类</span></a></h2><p>到目前为止，我们已经学习了两种确定ArrayList<code>&lt;String&gt;</code>对象是否包含给定字符串的方法，而不考虑大小写。这两种解决方案都很容易理解。然而，如果我们的项目中需要频繁执行此操作，我们必须多次调用实用工具方法或Stream API的anyMatch()方法。</p><p>如果是这种情况，我们可能想要创建一个特定的ArrayList<code>&lt;String&gt;</code>类型，它原生支持不区分大小写的contains()方法。</p><p>接下来，让我们创建一个ArrayList<code>&lt;String&gt;</code>的子类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IgnoreCaseStringList</span> <span class="token keyword">extends</span> <span class="token class-name">ArrayList</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````````` <span class="token punctuation">{</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">IgnoreCaseStringList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">IgnoreCaseStringList</span><span class="token punctuation">(</span><span class="token class-name">Collection</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>` c<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">super</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">contains</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">String</span> searchStr <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> o<span class="token punctuation">;</span>\n        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> s <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span>searchStr<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，IgnoreCaseStringList类继承了ArrayList<code>&lt;String&gt;</code>。我们创建了两个构造函数，以便更容易地初始化IgnoreCaseStringList实例。此外，为了使IgnoreCaseStringList支持不区分大小写的contains()，我们重写了_contains()_方法。实现对我们来说并不新鲜。它与我们学到的实用工具方法非常相似。</p><p>接下来，让我们测试IgnoreCaseStringList是否有效：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> searchStr <span class="token operator">=</span> <span class="token string">&quot;pYtHoN&quot;</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````````````` ignoreCaseList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IgnoreCaseStringList</span><span class="token punctuation">(</span><span class="token constant">LANGUAGES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">boolean</span> result <span class="token operator">=</span> ignoreCaseList<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>searchStr<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，在初始化了一个IgnoreCaseList实例之后，我们可以简单地调用contains()方法来不区分大小写地搜索给定的字符串。当我们执行上面的测试时，它通过了。所以，IgnoreCaseStringList做得很好。</p><p>值得一提的是，IgnoreCaseList方法还带来了另一个好处。它使_containsAll()_方法也变成了不区分大小写。这是因为_containsAll()_方法是在ArrayList的超类_AbstractCollection_中实现的。进一步来说，它内部调用了_contains()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">containsAll</span><span class="token punctuation">(</span><span class="token class-name">Collection</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>` c<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Iterator</span> var2 <span class="token operator">=</span> c<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Object</span> e<span class="token punctuation">;</span>\n    <span class="token keyword">do</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>var2<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        e <span class="token operator">=</span> var2<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们编写一个测试来验证它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> resultContainAll <span class="token operator">=</span> ignoreCaseList<span class="token punctuation">.</span><span class="token function">containsAll</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;pYtHon&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;jAvA&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;koTliN&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ruBY&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>resultContainAll<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>另一方面，如果我们希望Stream API和实用工具方法方法也支持区分大小写的_containsAll()_特性，我们必须自己实现它，例如，通过添加另一个实用工具方法。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了如何在ArrayList<code>&lt;String&gt;</code>中执行不区分大小写的搜索。我们通过示例学习了三种解决问题的方法。</p><p>像往常一样，文章中呈现的所有代码片段都在GitHub上可用。</p>',43),o=[p];function c(i,l){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-10-Case Insensitive Searching in ArrayList.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Case%20Insensitive%20Searching%20in%20ArrayList.html","title":"ArrayList中不区分大小写的搜索","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","ArrayList"],"tag":["Case-Insensitive","Search"],"head":[["meta",{"name":"keywords","content":"Java, ArrayList, Case-Insensitive Search"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Case%20Insensitive%20Searching%20in%20ArrayList.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"ArrayList中不区分大小写的搜索"}],["meta",{"property":"og:description","content":"ArrayList中不区分大小写的搜索 1. 概述 在处理ArrayList时，搜索列表中的元素是一项标准操作。contains()方法让我们知道列表对象是否包含我们正在寻找的元素。 在本教程中，我们将探讨如何在ArrayList<String>对象中不区分大小写地搜索字符串。 2. 问题介绍 ArrayList.contains()方法在内部使用eq..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T16:01:43.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Case-Insensitive"}],["meta",{"property":"article:tag","content":"Search"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T16:01:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ArrayList中不区分大小写的搜索\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T16:01:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"ArrayList中不区分大小写的搜索 1. 概述 在处理ArrayList时，搜索列表中的元素是一项标准操作。contains()方法让我们知道列表对象是否包含我们正在寻找的元素。 在本教程中，我们将探讨如何在ArrayList<String>对象中不区分大小写地搜索字符串。 2. 问题介绍 ArrayList.contains()方法在内部使用eq..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用Stream API","slug":"_3-使用stream-api","link":"#_3-使用stream-api","children":[]},{"level":2,"title":"4. 创建实用工具方法","slug":"_4-创建实用工具方法","link":"#_4-创建实用工具方法","children":[]},{"level":2,"title":"5. 创建ArrayList<String>的子类","slug":"_5-创建arraylist-string-的子类","link":"#_5-创建arraylist-string-的子类","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720627303000,"updatedTime":1720627303000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.55,"words":1366},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Case Insensitive Searching in ArrayList.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在处理ArrayList时，搜索列表中的元素是一项标准操作。contains()方法让我们知道列表对象是否包含我们正在寻找的元素。</p>\\n<p>在本教程中，我们将探讨如何在ArrayList<code>&lt;String&gt;</code>对象中不区分大小写地搜索字符串。</p>\\n<h2>2. 问题介绍</h2>\\n<p>ArrayList.contains()方法在内部使用equals()方法来确定列表是否包含给定的元素。如果ArrayList中的所有元素都是字符串，即在处理ArrayList<code>&lt;String&gt;</code>时，contains()方法会以区分大小写的方式搜索给定的字符串。让我们通过一个例子快速理解。</p>","autoDesc":true}');export{k as comp,d as data};
