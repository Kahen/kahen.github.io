import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-C6rqSDgP.js";const p={},e=t('<hr><h1 id="使用mapstruct为枚举映射时抛出异常处理意外输入" tabindex="-1"><a class="header-anchor" href="#使用mapstruct为枚举映射时抛出异常处理意外输入"><span>使用MapStruct为枚举映射时抛出异常处理意外输入</span></a></h1><p>在这个教程中，我们将看到如何使用MapStruct将一个枚举的值映射到另一个枚举的值。我们还将学习当另一个枚举中没有对应的值时如何抛出异常。</p><h2 id="_2-mapstruct库" tabindex="-1"><a class="header-anchor" href="#_2-mapstruct库"><span>2. MapStruct库</span></a></h2><p><strong>MapStruct是一个代码生成工具，简化了Java Bean的映射。</strong> 最新版本的MapStruct库可以在Maven中央仓库中找到。</p><p>让我们将依赖项添加到我们的_pom.xml_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.mapstruct```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```mapstruct```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```1.6.0.Beta1```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们需要在_maven-compiler-plugin_插件中添加_annotationProcessorPaths_以自动生成项目_target_文件夹中的方法：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.apache.maven.plugins```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```maven-compiler-plugin```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```3.5.1```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span><span class="token punctuation">&gt;</span></span>`1.8`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>source</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>target</span><span class="token punctuation">&gt;</span></span>`1.8`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>target</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>annotationProcessorPaths</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span><span class="token punctuation">&gt;</span></span>`\n                ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.mapstruct```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n                ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```mapstruct```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n                ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```1.6.0.Beta1```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>path</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>annotationProcessorPaths</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-问题介绍" tabindex="-1"><a class="header-anchor" href="#_3-问题介绍"><span>3. 问题介绍</span></a></h2><p>首先，让我们创建我们的源枚举。我们将命名为_InputLevel_，它将有三个可能的值：<em>LOW</em>，<em>MEDIUM_和_HIGH</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">enum</span> <span class="token class-name">InputLevel</span> <span class="token punctuation">{</span>\n    <span class="token constant">LOW</span><span class="token punctuation">,</span> <span class="token constant">MEDIUM</span><span class="token punctuation">,</span> <span class="token constant">HIGH</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以添加目标枚举。这个只包含两个值_HIGH_和_LOW_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">enum</span> <span class="token class-name">OutputLevel</span> <span class="token punctuation">{</span>\n    <span class="token constant">LOW</span><span class="token punctuation">,</span> <span class="token constant">HIGH</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的目标是将_InputLevel_转换为_OutputLevel_。例如，输入_InputLevel.LOW_给我们_OutputLevel.LOW_。<strong>然而，没有匹配的值对应于_MEDIUM_。</strong> 因此，在这种情况下，我们想要抛出一个异常。</p><h2 id="_4-当源没有对应的目标时抛出异常" tabindex="-1"><a class="header-anchor" href="#_4-当源没有对应的目标时抛出异常"><span>4. 当源没有对应的目标时抛出异常</span></a></h2><p>我们将使用_Mapper_注解并创建一个映射器接口。<strong>从MapStruct库的1.5.0.Beta1版本开始，我们可以使用_@ValueMapping_注解来实现我们的目标：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Mapper</span>\n<span class="token keyword">interface</span> <span class="token class-name">LevelMapper</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@ValueMapping</span><span class="token punctuation">(</span>source <span class="token operator">=</span> <span class="token class-name">MappingConstants</span><span class="token punctuation">.</span><span class="token constant">ANY_REMAINING</span><span class="token punctuation">,</span> target <span class="token operator">=</span> <span class="token class-name">MappingConstants</span><span class="token punctuation">.</span><span class="token constant">THROW_EXCEPTION</span><span class="token punctuation">)</span>\n    <span class="token class-name">OutputLevel</span> <span class="token function">inputLevelToOutputLevel</span><span class="token punctuation">(</span><span class="token class-name">InputLevel</span> inputLevel<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们配置了注解，以便在源中映射任何没有对应目标的值将导致一个异常。</p><p>现在让我们快速检查一下，当给定_InputLevel.HIGH_时，该方法是否正确返回_OutputLevel.HIGH_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">LevelMapper</span> levelMapper <span class="token operator">=</span> <span class="token class-name">Mappers</span><span class="token punctuation">.</span><span class="token function">getMapper</span><span class="token punctuation">(</span><span class="token class-name">LevelMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenHighInputLevel_WhenInputLevelToOutputLevel_ThenHighOutputLevel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">OutputLevel</span><span class="token punctuation">.</span><span class="token constant">HIGH</span><span class="token punctuation">,</span> levelMapper<span class="token punctuation">.</span><span class="token function">inputLevelToOutputLevel</span><span class="token punctuation">(</span><span class="token class-name">InputLevel</span><span class="token punctuation">.</span><span class="token constant">HIGH</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们将确认当我们尝试将_InputLevel.MEDIUM_转换为_OutputLevel_时，会抛出一个异常。具体来说，它抛出了一个_IllegalArgumentException_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenMediumInputLevel_WhenInputLevelToOutputLevel_ThenThrows</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> levelMapper<span class="token punctuation">.</span><span class="token function">inputLevelToOutputLevel</span><span class="token punctuation">(</span><span class="token class-name">InputLevel</span><span class="token punctuation">.</span><span class="token constant">MEDIUM</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们使用MapStruct库将源枚举的值映射到目标枚举。此外，我们配置了我们的映射器，如果源值在目标枚举中没有匹配项，则抛出一个异常。</p><p>像往常一样，代码可以在GitHub上找到。</p>',26),c=[e];function o(l,u){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","2024-07-04-Throw Exception for Unexpected Input for Enum With MapStruct.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Throw%20Exception%20for%20Unexpected%20Input%20for%20Enum%20With%20MapStruct.html","title":"使用MapStruct为枚举映射时抛出异常处理意外输入","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","MapStruct"],"tag":["Enum Mapping","Exception Handling"],"head":[["meta",{"name":"keywords","content":"MapStruct, Enum, Java, Exception"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Throw%20Exception%20for%20Unexpected%20Input%20for%20Enum%20With%20MapStruct.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用MapStruct为枚举映射时抛出异常处理意外输入"}],["meta",{"property":"og:description","content":"使用MapStruct为枚举映射时抛出异常处理意外输入 在这个教程中，我们将看到如何使用MapStruct将一个枚举的值映射到另一个枚举的值。我们还将学习当另一个枚举中没有对应的值时如何抛出异常。 2. MapStruct库 MapStruct是一个代码生成工具，简化了Java Bean的映射。 最新版本的MapStruct库可以在Maven中央仓库中..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T03:36:19.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Enum Mapping"}],["meta",{"property":"article:tag","content":"Exception Handling"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T03:36:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用MapStruct为枚举映射时抛出异常处理意外输入\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T03:36:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用MapStruct为枚举映射时抛出异常处理意外输入 在这个教程中，我们将看到如何使用MapStruct将一个枚举的值映射到另一个枚举的值。我们还将学习当另一个枚举中没有对应的值时如何抛出异常。 2. MapStruct库 MapStruct是一个代码生成工具，简化了Java Bean的映射。 最新版本的MapStruct库可以在Maven中央仓库中..."},"headers":[{"level":2,"title":"2. MapStruct库","slug":"_2-mapstruct库","link":"#_2-mapstruct库","children":[]},{"level":2,"title":"3. 问题介绍","slug":"_3-问题介绍","link":"#_3-问题介绍","children":[]},{"level":2,"title":"4. 当源没有对应的目标时抛出异常","slug":"_4-当源没有对应的目标时抛出异常","link":"#_4-当源没有对应的目标时抛出异常","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720064179000,"updatedTime":1720064179000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.07,"words":622},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Throw Exception for Unexpected Input for Enum With MapStruct.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>使用MapStruct为枚举映射时抛出异常处理意外输入</h1>\\n<p>在这个教程中，我们将看到如何使用MapStruct将一个枚举的值映射到另一个枚举的值。我们还将学习当另一个枚举中没有对应的值时如何抛出异常。</p>\\n<h2>2. MapStruct库</h2>\\n<p><strong>MapStruct是一个代码生成工具，简化了Java Bean的映射。</strong> 最新版本的MapStruct库可以在Maven中央仓库中找到。</p>\\n<p>让我们将依赖项添加到我们的_pom.xml_：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    ```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>```org.mapstruct```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n    ```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>```mapstruct```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n    ```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>```1.6.0.Beta1```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
