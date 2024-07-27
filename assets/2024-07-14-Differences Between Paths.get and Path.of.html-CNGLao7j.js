import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as e,a as n}from"./app-CBerKIce.js";const s={},p=n(`<h1 id="java中paths-get-和path-of-的区别" tabindex="-1"><a class="header-anchor" href="#java中paths-get-和path-of-的区别"><span>Java中Paths.get()和Path.of()的区别</span></a></h1><p>在这篇文章中，我们将讨论Paths.get()和Path.of()方法之间的相似之处和差异。</p><h2 id="_2-相同的行为" tabindex="-1"><a class="header-anchor" href="#_2-相同的行为"><span>2. 相同的行为</span></a></h2><p>Path.of()方法接受一个URI作为参数，并将其转换为相关对象的Path。</p><p>现在让我们来看看Paths.get()的代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">Paths</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Path</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">URI</span> uri<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Path</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>uri<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>正如我们所看到的，Paths.get()所做的就是调用Path.of()。因此，这两种方法返回相同的结果。</strong></p><h2 id="_3-两种方法之间的区别" tabindex="-1"><a class="header-anchor" href="#_3-两种方法之间的区别"><span>3. 两种方法之间的区别</span></a></h2><p>现在我们将讨论这两种方法之间的区别。</p><h3 id="_3-1-引入版本" tabindex="-1"><a class="header-anchor" href="#_3-1-引入版本"><span>3.1. 引入版本</span></a></h3><p>**在Java 8之前，接口中不能定义默认的静态方法。**因此Path需要一个伴侣接口Paths。所有工厂方法当时都在Paths中定义。</p><p>然后这个限制被移除，在Java 11中，工厂方法的代码最终被移动到了Path接口。此外，Paths.get()的代码也更新为调用Path.of()。Paths.get()确实被保留以确保向后兼容。</p><h3 id="_3-2-命名模式" tabindex="-1"><a class="header-anchor" href="#_3-2-命名模式"><span>3.2. 命名模式</span></a></h3><p>代码不仅被移动，工厂方法的名称也发生了变化。原始名称的问题在于它看起来像是一个getter。然而，Paths.get()并没有获取Paths对象所拥有的任何东西。**Java中静态工厂方法的标准名称是of。**例如，EnumSet.of()遵循这个模式。因此，新方法被命名为Path.of()以保持一致性。</p><h2 id="_4-我们应该使用哪一个" tabindex="-1"><a class="header-anchor" href="#_4-我们应该使用哪一个"><span>4. 我们应该使用哪一个？</span></a></h2><p>如果我们使用的是Java 7到10之间的版本，我们别无选择，只能使用Paths.get()。**否则，如果我们使用的是更高版本，我们应该选择Path.of()。**Paths类可能确实会在未来的Java版本中被弃用，正如类注释中所提到的。此外，直接使用Path的工厂方法可以节省一个额外的输入。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们理解了这两个相同的方法Paths.get()和Path.of()由于一些历史原因而共存。我们分析了它们的差异，并根据我们的情况得出了最合适的选择。</p>`,18),o=[p];function c(l,h){return e(),t("div",null,o)}const d=a(s,[["render",c],["__file","2024-07-14-Differences Between Paths.get and Path.of.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-14/2024-07-14-Differences%20Between%20Paths.get%20and%20Path.of.html","title":"Java中Paths.get()和Path.of()的区别","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","NIO"],"tag":["Paths.get","Path.of"],"head":[["meta",{"name":"keywords","content":"Java, NIO, Paths.get, Path.of"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-14/2024-07-14-Differences%20Between%20Paths.get%20and%20Path.of.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中Paths.get()和Path.of()的区别"}],["meta",{"property":"og:description","content":"Java中Paths.get()和Path.of()的区别 在这篇文章中，我们将讨论Paths.get()和Path.of()方法之间的相似之处和差异。 2. 相同的行为 Path.of()方法接受一个URI作为参数，并将其转换为相关对象的Path。 现在让我们来看看Paths.get()的代码： 正如我们所看到的，Paths.get()所做的就是调用..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-14T07:42:21.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Paths.get"}],["meta",{"property":"article:tag","content":"Path.of"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-14T07:42:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中Paths.get()和Path.of()的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-14T07:42:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中Paths.get()和Path.of()的区别 在这篇文章中，我们将讨论Paths.get()和Path.of()方法之间的相似之处和差异。 2. 相同的行为 Path.of()方法接受一个URI作为参数，并将其转换为相关对象的Path。 现在让我们来看看Paths.get()的代码： 正如我们所看到的，Paths.get()所做的就是调用..."},"headers":[{"level":2,"title":"2. 相同的行为","slug":"_2-相同的行为","link":"#_2-相同的行为","children":[]},{"level":2,"title":"3. 两种方法之间的区别","slug":"_3-两种方法之间的区别","link":"#_3-两种方法之间的区别","children":[{"level":3,"title":"3.1. 引入版本","slug":"_3-1-引入版本","link":"#_3-1-引入版本","children":[]},{"level":3,"title":"3.2. 命名模式","slug":"_3-2-命名模式","link":"#_3-2-命名模式","children":[]}]},{"level":2,"title":"4. 我们应该使用哪一个？","slug":"_4-我们应该使用哪一个","link":"#_4-我们应该使用哪一个","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720942941000,"updatedTime":1720942941000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.82,"words":547},"filePathRelative":"posts/baeldung/2024-07-14/2024-07-14-Differences Between Paths.get and Path.of.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这篇文章中，我们将讨论Paths.get()和Path.of()方法之间的相似之处和差异。</p>\\n<h2>2. 相同的行为</h2>\\n<p>Path.of()方法接受一个URI作为参数，并将其转换为相关对象的Path。</p>\\n<p>现在让我们来看看Paths.get()的代码：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">final</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Paths</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token class-name\\">Path</span> <span class=\\"token function\\">get</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">URI</span> uri<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token class-name\\">Path</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">of</span><span class=\\"token punctuation\\">(</span>uri<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,u as data};
