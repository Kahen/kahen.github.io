import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as a,a as s}from"./app-LwwahXlT.js";const t={},p=s(`<hr><h1 id="在属性文件中设置-requestmapping值" tabindex="-1"><a class="header-anchor" href="#在属性文件中设置-requestmapping值"><span>在属性文件中设置@RequestMapping值</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，<strong>我们将探讨如何在属性文件中设置_@RequestMapping_的值</strong>。同时，我们将通过一个实际示例来解释所有必要的配置。</p><p>首先，让我们定义一个基本的_@RequestMapping_及其配置。</p><h2 id="_2-requestmapping-基础" tabindex="-1"><a class="header-anchor" href="#_2-requestmapping-基础"><span>2. @RequestMapping 基础</span></a></h2><p>首先，<strong>我们将创建并使用_@RequestMapping_注解我们的类_WelcomeController_以映射web请求</strong>。这个类将分配我们的处理器方法_getWelcomeMessage_()。</p><p>那么，让我们定义它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/welcome&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WelcomeController</span> <span class="token punctuation">{</span>

   <span class="token annotation punctuation">@GetMapping</span>
   <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getWelcomeMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token string">&quot;Welcome to Baeldung!&quot;</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，<strong>值得注意的是我们将使用_@GetMapping_注解_getWelcomeMessage_()以映射仅GET请求</strong>。正如我们所看到的，我们使用了硬编码的字符串作为路径，静态地指示我们想要访问的路径。通过这种配置，我们可以完美地访问我们感兴趣的资源，如下所示：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> http://localhost:9006/welcome
<span class="token operator">&gt;</span> Welcome to Baeldung<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>但是，如果我们想要使路径依赖于配置参数呢？正如我们接下来将看到的，我们可以利用_application.properties_。</p><p>首先，正如我们在文档中看到的，<strong>_@RequestMapping_注解中的模式支持\${…}占位符，针对本地属性和/或系统属性和环境变量</strong>。这样，我们可以将我们的属性文件链接到我们的控制器。</p><p>一方面，我们需要创建属性文件本身。<strong>我们将把它放在_resources_文件夹中，并将其命名为_application.properties_</strong>。然后，我们需要创建我们选择的属性名称。在我们的案例中，我们将设置名称_welcome-controller.path_并将我们想要作为请求端点的值设置为该值。现在我们的_application.properties_看起来像这样：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">welcome-controller.path</span><span class="token punctuation">=</span><span class="token value attr-value">welcome</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>另一方面，<strong>我们必须修改我们在_@RequestMapping_中静态建立的路径，以便它读取我们创建的新属性</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/\${welcome-controller.path}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WelcomeController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@GetMapping</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getWelcomeMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Welcome to Baeldung!&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，Spring就能够映射端点的值，当用户访问这个URL时，这个方法将负责处理它。我们可以在下面看到如何使用相同的请求显示相同的消息：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> http://localhost:9006/welcome
<span class="token operator">&gt;</span> Welcome to Baeldung<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在这篇简短的文章中，<strong>我们学会了如何在属性文件中设置_@RequestMapping_的值</strong>。此外，我们创建了一个完全功能的示例，帮助我们理解所解释的概念。</p><p>文章的完整源代码可以在GitHub上找到。</p>`,22),i=[p];function o(l,r){return a(),n("div",null,i)}const d=e(t,[["render",o],["__file","2024-07-18- RequestMapping Value in Properties File.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-%20RequestMapping%20Value%20in%20Properties%20File.html","title":"在属性文件中设置@RequestMapping值","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring","REST"],"tag":["Spring MVC","RequestMapping"],"head":[["meta",{"name":"keywords","content":"Spring MVC, RequestMapping, Properties File"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-%20RequestMapping%20Value%20in%20Properties%20File.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在属性文件中设置@RequestMapping值"}],["meta",{"property":"og:description","content":"在属性文件中设置@RequestMapping值 1. 概述 在本教程中，我们将探讨如何在属性文件中设置_@RequestMapping_的值。同时，我们将通过一个实际示例来解释所有必要的配置。 首先，让我们定义一个基本的_@RequestMapping_及其配置。 2. @RequestMapping 基础 首先，我们将创建并使用_@RequestM..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T09:33:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring MVC"}],["meta",{"property":"article:tag","content":"RequestMapping"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T09:33:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在属性文件中设置@RequestMapping值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T09:33:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在属性文件中设置@RequestMapping值 1. 概述 在本教程中，我们将探讨如何在属性文件中设置_@RequestMapping_的值。同时，我们将通过一个实际示例来解释所有必要的配置。 首先，让我们定义一个基本的_@RequestMapping_及其配置。 2. @RequestMapping 基础 首先，我们将创建并使用_@RequestM..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. @RequestMapping 基础","slug":"_2-requestmapping-基础","link":"#_2-requestmapping-基础","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721295186000,"updatedTime":1721295186000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.18,"words":654},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18- RequestMapping Value in Properties File.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>在属性文件中设置@RequestMapping值</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，<strong>我们将探讨如何在属性文件中设置_@RequestMapping_的值</strong>。同时，我们将通过一个实际示例来解释所有必要的配置。</p>\\n<p>首先，让我们定义一个基本的_@RequestMapping_及其配置。</p>\\n<h2>2. @RequestMapping 基础</h2>\\n<p>首先，<strong>我们将创建并使用_@RequestMapping_注解我们的类_WelcomeController_以映射web请求</strong>。这个类将分配我们的处理器方法_getWelcomeMessage_()。</p>","autoDesc":true}');export{d as comp,g as data};
