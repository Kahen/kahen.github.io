import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BEmnZ9jQ.js";const e={},p=t('<hr><h1 id="在java中根据mime类型获取文件扩展名-baeldung" tabindex="-1"><a class="header-anchor" href="#在java中根据mime类型获取文件扩展名-baeldung"><span>在Java中根据MIME类型获取文件扩展名 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>MIME类型是用于指定互联网上数据类型和格式的标签。<strong>一个MIME类型可以与多个文件扩展名关联。例如，“<em>image/jpeg</em>” MIME类型包括像“. <em>jpg</em>“、“. <em>jpeg</em>”或“. <em>jpe</em>”这样的扩展名。</strong></p><p>在本教程中，我们将探索在Java中确定特定MIME类型的文件扩展名的不同方法。我们将重点关注四种主要的解决方法。</p><p>我们的一些实现将包括扩展名中的最后一个可选点。例如，如果我们的MIME类型名称是“<em>image/jpeg</em>”，那么“<em>jpg</em>”或“<em>.jpg</em>”将作为文件扩展名返回。</p><h2 id="_2-使用apache-tika" tabindex="-1"><a class="header-anchor" href="#_2-使用apache-tika"><span>2. 使用Apache Tika</span></a></h2><p>Apache Tika是一个可以检测和提取各种文件的元数据和文本的工具包。它包括一个丰富而强大的API，可用于检测MIME类型的文件扩展名。</p><p>让我们从配置Maven依赖开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>```&lt;dependency&gt;```\n    ```&lt;groupId&gt;```org.apache.tika```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```tika-core```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```2.9.0```&lt;/version&gt;```\n```&lt;/dependency&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如前所述，一个单一的MIME类型可以有多个扩展。为此，《MimeType》类提供了两个不同的方法：_getExtension()<em>和_getExtensions()</em>。</p><p><strong>_getExtension()_方法返回首选的文件扩展名，而_getExtensions()_返回该MIME类型所有已知文件扩展名的列表。</strong></p><p>接下来，我们将使用_MimeType_类中的两种方法来检索扩展名：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingTika_thenGetFileExtension</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` expectedExtensions <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;.jpg&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.jpeg&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.jpe&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.jif&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.jfif&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.jfi&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">MimeTypes</span> allTypes <span class="token operator">=</span> <span class="token class-name">MimeTypes</span><span class="token punctuation">.</span><span class="token function">getDefaultMimeTypes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">MimeType</span> type <span class="token operator">=</span> allTypes<span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">&quot;image/jpeg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">String</span> primaryExtension <span class="token operator">=</span> type<span class="token punctuation">.</span><span class="token function">getExtension</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;.jpg&quot;</span><span class="token punctuation">,</span> primaryExtension<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` detectedExtensions <span class="token operator">=</span> type<span class="token punctuation">.</span><span class="token function">getExtensions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>detectedExtensions<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactlyElementsOf</span><span class="token punctuation">(</span>expectedExtensions<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用jodd-util" tabindex="-1"><a class="header-anchor" href="#_3-使用jodd-util"><span>3. 使用Jodd Util</span></a></h2><p>我们也可以另外使用Jodd Util库，其中包含一个用于查找MIME类型的文件扩展名的实用工具。</p><p>让我们从添加Maven依赖开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>```&lt;dependency&gt;```\n    ```&lt;groupId&gt;```org.jodd```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```jodd-util```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```6.2.1```&lt;/version&gt;```\n```&lt;/dependency&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将<strong>使用_findExtensionsByMimeTypes()_方法获取所有支持的文件扩展名</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingJodd_thenGetFileExtension</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` expectedExtensions <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;jpeg&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;jpg&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;jpe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> detectedExtensions <span class="token operator">=</span> <span class="token class-name">MimeTypes</span><span class="token punctuation">.</span><span class="token function">findExtensionsByMimeTypes</span><span class="token punctuation">(</span><span class="token string">&quot;image/jpeg&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>detectedExtensions<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactlyElementsOf</span><span class="token punctuation">(</span>expectedExtensions<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Jodd Util提供了一组有限的识别文件类型和扩展名。它优先考虑简单性而不是全面覆盖。</p><p>在_findExtensionsByMimeTypes()_方法中，我们可以通过将第二个_boolean_参数设置为_true_来激活通配符模式。当提供通配符模式作为MIME类型时，我们将获得与指定通配符模式匹配的所有MIME类型的扩展名。</p><p>例如，当我们将MIME类型设置为_image/*_并启用通配符模式时，我们将获得_image_类别中所有MIME类型的扩展名。</p><h2 id="_4-使用simplemagic" tabindex="-1"><a class="header-anchor" href="#_4-使用simplemagic"><span>4. 使用SimpleMagic</span></a></h2><p>SimpleMagic是一个主要用于文件MIME类型检测的实用程序包。它还包含一种将MIME类型转换为文件扩展名的方法。</p><p>让我们从添加Maven依赖开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>```&lt;dependency&gt;```\n    ```&lt;groupId&gt;```com.j256.simplemagic```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```simplemagic```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```1.17```&lt;/version&gt;```\n```&lt;/dependency&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们将<strong>使用_ContentInfo_类的_getFileExtensions()_方法获取所有支持的文件扩展名</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingSimpleMagic_thenGetFileExtension</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` expectedExtensions <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;jpeg&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;jpg&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;jpe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> detectedExtensions <span class="token operator">=</span> <span class="token class-name">ContentType</span><span class="token punctuation">.</span><span class="token function">fromMimeType</span><span class="token punctuation">(</span><span class="token string">&quot;image/jpeg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getFileExtensions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>detectedExtensions<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactlyElementsOf</span><span class="token punctuation">(</span>expectedExtensions<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SimpleMagic库中有一个_ContentType_枚举，其中包含MIME类型及其相应的文件扩展名和简单名称的映射。_getFileExtensions()_使用这个枚举，使我们能够根据提供的MIME类型检索文件扩展名。</p><h2 id="_5-使用自定义的mime类型到扩展名的-map" tabindex="-1"><a class="header-anchor" href="#_5-使用自定义的mime类型到扩展名的-map"><span>5. 使用自定义的MIME类型到扩展名的_Map_</span></a></h2><p>我们也可以不依赖外部库从MIME类型中获取文件扩展名。我们将创建一个自定义的MIME类型到文件扩展名的映射来实现这一点。</p><p>让我们创建一个名为_mimeToExtensionMap_的_HashMap_来关联MIME类型及其相应的文件扩展名。<strong>_get()_方法允许我们在映射中查找为提供的MIME类型预配置的文件扩展名并返回它们：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingCustomMap_thenGetFileExtension</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Map</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Set</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````<span class="token operator">&gt;</span> mimeToExtensionMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` expectedExtensions <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;.jpg&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.jpe&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.jpeg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">addMimeExtensions</span><span class="token punctuation">(</span>mimeToExtensionMap<span class="token punctuation">,</span> <span class="token string">&quot;image/jpeg&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.jpg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">addMimeExtensions</span><span class="token punctuation">(</span>mimeToExtensionMap<span class="token punctuation">,</span> <span class="token string">&quot;image/jpeg&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.jpe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">addMimeExtensions</span><span class="token punctuation">(</span>mimeToExtensionMap<span class="token punctuation">,</span> <span class="token string">&quot;image/jpeg&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.jpeg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Set</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` detectedExtensions <span class="token operator">=</span> mimeToExtensionMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;image/jpeg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>detectedExtensions<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactlyElementsOf</span><span class="token punctuation">(</span>expectedExtensions<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">void</span> <span class="token function">addMimeExtensions</span><span class="token punctuation">(</span><span class="token class-name">Map</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Set</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````<span class="token operator">&gt;</span> map<span class="token punctuation">,</span> <span class="token class-name">String</span> mimeType<span class="token punctuation">,</span> <span class="token class-name">String</span> extension<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    map<span class="token punctuation">.</span><span class="token function">computeIfAbsent</span><span class="token punctuation">(</span>mimeType<span class="token punctuation">,</span> k <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>extension<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例映射包括一些示例，但可以根据需要轻松自定义，通过添加其他映射。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了从MIME类型中提取文件扩展名的不同方法。<strong>我们检查了两种不同的方法：利用现有库和制定符合我们需求的自定义逻辑。</strong></p><p>当处理有限的MIME类型集时，自定义逻辑是一个选项，尽管它可能存在维护挑战。相反，像<strong>Apache Tika或Jodd Util这样的库提供了广泛的MIME类型覆盖和易用性</strong>，使它们成为处理各种MIME类型的可靠选择。</p><p>如往常一样，本文中使用的源代码可在GitHub上获得。</p>',39),o=[p];function c(i,l){return a(),s("div",null,o)}const r=n(e,[["render",c],["__file","2024-06-29-Get File Extension From MIME Type in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-Get%20File%20Extension%20From%20MIME%20Type%20in%20Java.html","title":"在Java中根据MIME类型获取文件扩展名 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","MIME类型"],"tag":["Java","MIME类型","文件扩展名"],"head":[["meta",{"name":"keywords","content":"Java, MIME类型, 文件扩展名, Apache Tika, Jodd Util, SimpleMagic"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-Get%20File%20Extension%20From%20MIME%20Type%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中根据MIME类型获取文件扩展名 | Baeldung"}],["meta",{"property":"og:description","content":"在Java中根据MIME类型获取文件扩展名 | Baeldung 1. 概述 MIME类型是用于指定互联网上数据类型和格式的标签。一个MIME类型可以与多个文件扩展名关联。例如，“image/jpeg” MIME类型包括像“. jpg“、“. jpeg”或“. jpe”这样的扩展名。 在本教程中，我们将探索在Java中确定特定MIME类型的文件扩展名的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T18:34:32.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"MIME类型"}],["meta",{"property":"article:tag","content":"文件扩展名"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T18:34:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中根据MIME类型获取文件扩展名 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T18:34:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中根据MIME类型获取文件扩展名 | Baeldung 1. 概述 MIME类型是用于指定互联网上数据类型和格式的标签。一个MIME类型可以与多个文件扩展名关联。例如，“image/jpeg” MIME类型包括像“. jpg“、“. jpeg”或“. jpe”这样的扩展名。 在本教程中，我们将探索在Java中确定特定MIME类型的文件扩展名的..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用Apache Tika","slug":"_2-使用apache-tika","link":"#_2-使用apache-tika","children":[]},{"level":2,"title":"3. 使用Jodd Util","slug":"_3-使用jodd-util","link":"#_3-使用jodd-util","children":[]},{"level":2,"title":"4. 使用SimpleMagic","slug":"_4-使用simplemagic","link":"#_4-使用simplemagic","children":[]},{"level":2,"title":"5. 使用自定义的MIME类型到扩展名的_Map_","slug":"_5-使用自定义的mime类型到扩展名的-map","link":"#_5-使用自定义的mime类型到扩展名的-map","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719686072000,"updatedTime":1719686072000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.12,"words":1236},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-Get File Extension From MIME Type in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>在Java中根据MIME类型获取文件扩展名 | Baeldung</h1>\\n<h2>1. 概述</h2>\\n<p>MIME类型是用于指定互联网上数据类型和格式的标签。<strong>一个MIME类型可以与多个文件扩展名关联。例如，“<em>image/jpeg</em>” MIME类型包括像“. <em>jpg</em>“、“. <em>jpeg</em>”或“. <em>jpe</em>”这样的扩展名。</strong></p>\\n<p>在本教程中，我们将探索在Java中确定特定MIME类型的文件扩展名的不同方法。我们将重点关注四种主要的解决方法。</p>\\n<p>我们的一些实现将包括扩展名中的最后一个可选点。例如，如果我们的MIME类型名称是“<em>image/jpeg</em>”，那么“<em>jpg</em>”或“<em>.jpg</em>”将作为文件扩展名返回。</p>","autoDesc":true}');export{r as comp,k as data};
