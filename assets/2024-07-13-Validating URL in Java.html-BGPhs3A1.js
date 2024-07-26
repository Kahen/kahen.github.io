import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-C4eFoh0f.js";const e={},p=t(`<h1 id="java中验证url的方法" tabindex="-1"><a class="header-anchor" href="#java中验证url的方法"><span>Java中验证URL的方法</span></a></h1><p>URL代表统一资源定位符，是指向网络上唯一资源的地址。</p><p>在本教程中，我们将讨论使用Java进行URL验证。在现代Web开发中，通过应用程序读取、写入或访问URL是非常常见的。因此，成功的验证确保了URL的有效性和合规性。</p><p>有多种库用于验证URL。我们将讨论两个类——来自JDK的java.net.Url和来自Apache Commons库的org.apache.commons.validator.routines.UrlValidator。</p><h3 id="_2-使用jdk验证url" tabindex="-1"><a class="header-anchor" href="#_2-使用jdk验证url"><span>2. 使用JDK验证URL</span></a></h3><p>让我们看看如何使用java.net.URL类来验证URL：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">isValidURL</span><span class="token punctuation">(</span><span class="token class-name">String</span> url<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">MalformedURLException</span><span class="token punctuation">,</span> <span class="token class-name">URISyntaxException</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">MalformedURLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">URISyntaxException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的方法中，new URL(url).toURI();尝试使用字符串参数创建URI。如果传递的字符串不符合URL语法，库将抛出异常。</p><p>内置的URL类在发现输入字符串对象的语法不正确时抛出MalformedURLException。当字符串的格式不符合时，内置类将抛出URISyntaxException。</p><p>现在，让我们通过一个小测试来验证我们的方法是否有效：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">isValidURL</span><span class="token punctuation">(</span><span class="token string">&quot;http://baeldung.com/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token function">isValidURL</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.baeldung.com/ java-%%$^&amp;&amp; iuyi&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们必须理解URL和URI之间的区别。toURI()方法在这里很重要，因为它确保任何符合RC 2396的URL字符串都被转换为URL。然而，如果我们只使用new URL(String value)，它不会确保创建的URL完全合规。</p><p>让我们通过一个例子来看看，如果我们只使用new URL(String url)，许多不符合规范的URL将通过验证：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">isValidUrl</span><span class="token punctuation">(</span><span class="token class-name">String</span> url<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">MalformedURLException</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token comment">// 它只会检查方案和非空输入</span>
        <span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">MalformedURLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看上述方法对不同URL的验证效果如何：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">isValidUrl</span><span class="token punctuation">(</span><span class="token string">&quot;http://baeldung.com/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">isValidUrl</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.baeldung.com/ java-%%$^&amp;&amp; iuyi&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token function">isValidUrl</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的方法中，new URL(url)只检查有效的协议和非空字符串作为输入。因此，如果协议正确，即使它不符合RC 2396，它也会返回一个URL对象。</p><p>因此，我们必须使用new URL(url).toURI()来确保URL有效且合规。</p><h3 id="_3-使用apache-commons验证url" tabindex="-1"><a class="header-anchor" href="#_3-使用apache-commons验证url"><span>3. 使用Apache Commons验证URL</span></a></h3><p>我们需要将commons-validator依赖项导入我们的pom.xml文件：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`commons-validator\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`commons-validator\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`1.7\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们使用这个库中的UrlValidator类来验证：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">isValidURL</span><span class="token punctuation">(</span><span class="token class-name">String</span> url<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">MalformedURLException</span> <span class="token punctuation">{</span>
    <span class="token class-name">UrlValidator</span> validator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UrlValidator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> validator<span class="token punctuation">.</span><span class="token function">isValid</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的方法中，我们创建了一个URLValidator，然后使用isValid()方法来检查字符串参数的URL有效性。</p><p>让我们检查上述方法对不同输入的行为：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token function">isValidURL</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.baeldung.com/ java-%%$^&amp;&amp; iuyi&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">isValidURL</span><span class="token punctuation">(</span><span class="token string">&quot;http://baeldung.com/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>URLValidator允许我们微调验证URL字符串的条件。例如，如果我们使用重载构造函数UrlValidator(String[] schemes)，它只会验证提供的方案列表中的URL（http、https、ftp等）。</p><p>同样，还有一些其他的标志——ALLOW_2_SLASHES、NO_FRAGMENT和ALLOW_ALL_SCHEMES可以根据需要设置。我们可以在官方文档中找到库提供的所有选项的详细信息。</p><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>在本文中，我们学习了两种不同的URL验证方法。我们还讨论了URL(String url)和URL.toURI()之间的区别。</p><p>如果我们只需要验证协议和非空字符串，那么我们可以使用URL(String url)构造函数。然而，当我们需要进行验证并通过合规性检查时，我们需要使用URL(url).toURI()。</p><p>此外，如果我们添加了Apache Commons依赖项，我们可以使用URLValidator类来进行验证，并且类中还有额外的选项可用于微调验证规则。</p><p>如常，本文示例的源代码可在GitHub上找到。</p>`,33),o=[p];function c(l,i){return s(),n("div",null,o)}const d=a(e,[["render",c],["__file","2024-07-13-Validating URL in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Validating%20URL%20in%20Java.html","title":"Java中验证URL的方法","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Web Development"],"tag":["URL Validation","Java"],"head":[["meta",{"name":"keywords","content":"Java, URL Validation, Web Development"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Validating%20URL%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中验证URL的方法"}],["meta",{"property":"og:description","content":"Java中验证URL的方法 URL代表统一资源定位符，是指向网络上唯一资源的地址。 在本教程中，我们将讨论使用Java进行URL验证。在现代Web开发中，通过应用程序读取、写入或访问URL是非常常见的。因此，成功的验证确保了URL的有效性和合规性。 有多种库用于验证URL。我们将讨论两个类——来自JDK的java.net.Url和来自Apache Co..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T18:04:20.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"URL Validation"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T18:04:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中验证URL的方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T18:04:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中验证URL的方法 URL代表统一资源定位符，是指向网络上唯一资源的地址。 在本教程中，我们将讨论使用Java进行URL验证。在现代Web开发中，通过应用程序读取、写入或访问URL是非常常见的。因此，成功的验证确保了URL的有效性和合规性。 有多种库用于验证URL。我们将讨论两个类——来自JDK的java.net.Url和来自Apache Co..."},"headers":[{"level":3,"title":"2. 使用JDK验证URL","slug":"_2-使用jdk验证url","link":"#_2-使用jdk验证url","children":[]},{"level":3,"title":"3. 使用Apache Commons验证URL","slug":"_3-使用apache-commons验证url","link":"#_3-使用apache-commons验证url","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720893860000,"updatedTime":1720893860000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.19,"words":956},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Validating URL in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>URL代表统一资源定位符，是指向网络上唯一资源的地址。</p>\\n<p>在本教程中，我们将讨论使用Java进行URL验证。在现代Web开发中，通过应用程序读取、写入或访问URL是非常常见的。因此，成功的验证确保了URL的有效性和合规性。</p>\\n<p>有多种库用于验证URL。我们将讨论两个类——来自JDK的java.net.Url和来自Apache Commons库的org.apache.commons.validator.routines.UrlValidator。</p>\\n<h3>2. 使用JDK验证URL</h3>\\n<p>让我们看看如何使用java.net.URL类来验证URL：</p>","autoDesc":true}');export{d as comp,k as data};
