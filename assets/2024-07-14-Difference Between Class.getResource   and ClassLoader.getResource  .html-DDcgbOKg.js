import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as a,a as n}from"./app-C4eFoh0f.js";const t={},o=n(`<h1 id="class-getresource-和-classloader-getresource-之间的区别" tabindex="-1"><a class="header-anchor" href="#class-getresource-和-classloader-getresource-之间的区别"><span>Class.getResource() 和 ClassLoader.getResource() 之间的区别</span></a></h1><p>在这个简短的教程中，我们将探讨 Class.getResource() 和 ClassLoader.getResource() 方法之间的区别。</p><h2 id="_2-getresource-方法" tabindex="-1"><a class="header-anchor" href="#_2-getresource-方法"><span>2. getResource() 方法</span></a></h2><p>我们可以使用 Class 或 ClassLoader 实例上的 getResource() 方法来查找给定名称的资源。资源被认为是数据，例如图像、文本、音频等。作为路径分隔符，我们应该始终使用斜杠（&quot;/&quot;）。</p><p>该方法返回一个用于读取资源的 URL 对象，或者如果找不到资源或调用者没有权限检索资源，则返回 null 值。</p><p>现在，让我们看看如何使用 Class 实例获取资源。<strong>在使用 Class 对象定位资源时，我们可以传递绝对路径或相对路径。</strong></p><p>与给定类关联的资源搜索规则由类的类加载器实现。</p><p>寻找资源的过程将委托给类对象的类加载器。换句话说，定义在 Class 实例上的 getResource() 方法最终将调用 ClassLoader 的 getResource() 方法。</p><p>在委托之前，将从给定的资源名称中派生出绝对资源名称。在创建绝对资源名称时，将使用以下算法：</p><ul><li>如果资源名称以领先的斜杠（&quot;/&quot;）开头，它表示资源名称是绝对的。绝对资源名称将清除其前导斜杠，并且不进行任何修改就传递给适当的 ClassLoader 方法以定位资源。</li><li>如果提供的资源名称不以斜杠开头，则名称被视为相对于类的包。相对名称首先被转换为绝对名称，然后传递给 ClassLoader 方法。</li></ul><p>首先，让我们假设我们有在 <em>com/baeldung/resource</em> 目录中定义的 <em>example.txt</em> 资源。此外，让我们假设类 <em>ClassGetResourceExample</em> 定义在 <em>com.baeldung.resourc</em> e 包中。</p><p>现在，我们可以使用绝对路径检索资源：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">givenAbsoluteResourcePath_whenGetResource_thenReturnResource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">URL</span> resourceAbsolutePath <span class="token operator">=</span> <span class="token class-name">ClassGetResourceExample</span><span class="token punctuation">.</span><span class="token keyword">class</span>
        <span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token string">&quot;/com/baeldung/resource/example.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertNotNull</span><span class="token punctuation">(</span>resourceAbsolutePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用 Class.getResource() 时，绝对资源路径应该以领先的斜杠开头。</strong></p><p>此外，由于我们的资源与我们的类在同一个包中，我们也可以使用相对路径检索它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">givenRelativeResourcePath_whenGetResource_thenReturnResource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">URL</span> resourceRelativePath <span class="token operator">=</span> <span class="token class-name">ClassGetResourceExample</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token string">&quot;example.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertNotNull</span><span class="token punctuation">(</span>resourceRelativePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，重要的是要提到，我们只能使用相对路径获取资源，前提是资源定义在与类相同的包中。否则，我们将得到一个 null 作为值。</p><h2 id="_4-classloader-getresource" tabindex="-1"><a class="header-anchor" href="#_4-classloader-getresource"><span>4. ClassLoader.getResource()</span></a></h2><p>顾名思义，ClassLoader 表示负责加载类的类。每个 Class 实例都包含对其 ClassLoader 的引用。</p><p>ClassLoader 类使用委托模型搜索类和资源。此外，每个 ClassLoader 类的实例都有一个相关的父 ClassLoader。</p><p>当被要求查找资源时，ClassLoader 实例将首先将其父 ClassLoader 委托搜索，然后尝试自己找到资源。</p><p>如果父 ClassLoader 不存在，将搜索虚拟机内置的 ClassLoader 的路径，称为引导类加载器。引导类加载器没有父类加载器，但可以作为 ClassLoader 实例的父类加载器。</p><p>或者，如果之前的搜索失败，该方法将调用 findResource() 方法来查找资源。</p><p><strong>指定为输入的资源名称始终被视为绝对。</strong> 值得注意的是，Java 从类路径加载资源。</p><p>让我们使用绝对路径和 ClassLoader 实例获取资源：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">givenAbsoluteResourcePath_whenGetResource_thenReturnResource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">URL</span> resourceAbsolutePath <span class="token operator">=</span> <span class="token class-name">ClassLoaderGetResourceExample</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token string">&quot;com/baeldung/resource/example.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertNotNull</span><span class="token punctuation">(</span>resourceAbsolutePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>当我们调用 ClassLoader.getResource() 时，我们应该在定义绝对路径时省略领先的斜杠。</strong></p><p>使用 ClassLoader 实例，<strong>我们不能使用相对路径获取资源</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">givenRelativeResourcePath_whenGetResource_thenReturnNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">URL</span> resourceRelativePath <span class="token operator">=</span> <span class="token class-name">ClassLoaderGetResourceExample</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token string">&quot;example.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertNull</span><span class="token punctuation">(</span>resourceRelativePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述测试表明，该方法返回 null 值作为结果。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>这个简短的教程解释了从 Class 和 ClassLoader 实例调用 getResource() 方法的区别。总结起来，我们可以在使用 Class 实例调用方法时传递相对或绝对资源路径，但我们可以只能在调用 ClassLoader 上的方法时使用绝对路径。</p><p>如常，代码可以在 GitHub 上找到。</p>`,33),c=[o];function p(l,r){return a(),e("div",null,c)}const d=s(t,[["render",p],["__file","2024-07-14-Difference Between Class.getResource   and ClassLoader.getResource  .html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-14/2024-07-14-Difference%20Between%20Class.getResource%20%20%20and%20ClassLoader.getResource%20%20.html","title":"Class.getResource() 和 ClassLoader.getResource() 之间的区别","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["Class","ClassLoader","getResource"],"head":[["meta",{"name":"keywords","content":"Java, Class, ClassLoader, getResource, 资源加载"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-14/2024-07-14-Difference%20Between%20Class.getResource%20%20%20and%20ClassLoader.getResource%20%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Class.getResource() 和 ClassLoader.getResource() 之间的区别"}],["meta",{"property":"og:description","content":"Class.getResource() 和 ClassLoader.getResource() 之间的区别 在这个简短的教程中，我们将探讨 Class.getResource() 和 ClassLoader.getResource() 方法之间的区别。 2. getResource() 方法 我们可以使用 Class 或 ClassLoader 实例上..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-14T14:02:42.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Class"}],["meta",{"property":"article:tag","content":"ClassLoader"}],["meta",{"property":"article:tag","content":"getResource"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-14T14:02:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Class.getResource() 和 ClassLoader.getResource() 之间的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-14T14:02:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Class.getResource() 和 ClassLoader.getResource() 之间的区别 在这个简短的教程中，我们将探讨 Class.getResource() 和 ClassLoader.getResource() 方法之间的区别。 2. getResource() 方法 我们可以使用 Class 或 ClassLoader 实例上..."},"headers":[{"level":2,"title":"2. getResource() 方法","slug":"_2-getresource-方法","link":"#_2-getresource-方法","children":[]},{"level":2,"title":"4. ClassLoader.getResource()","slug":"_4-classloader-getresource","link":"#_4-classloader-getresource","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720965762000,"updatedTime":1720965762000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.33,"words":1000},"filePathRelative":"posts/baeldung/2024-07-14/2024-07-14-Difference Between Class.getResource   and ClassLoader.getResource  .md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这个简短的教程中，我们将探讨 Class.getResource() 和 ClassLoader.getResource() 方法之间的区别。</p>\\n<h2>2. getResource() 方法</h2>\\n<p>我们可以使用 Class 或 ClassLoader 实例上的 getResource() 方法来查找给定名称的资源。资源被认为是数据，例如图像、文本、音频等。作为路径分隔符，我们应该始终使用斜杠（\\"/\\"）。</p>\\n<p>该方法返回一个用于读取资源的 URL 对象，或者如果找不到资源或调用者没有权限检索资源，则返回 null 值。</p>\\n<p>现在，让我们看看如何使用 Class 实例获取资源。<strong>在使用 Class 对象定位资源时，我们可以传递绝对路径或相对路径。</strong></p>","autoDesc":true}');export{d as comp,g as data};
