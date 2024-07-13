import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DkA39C0B.js";const p={},o=t(`<h1 id="如何在java中使用自定义字体" tabindex="-1"><a class="header-anchor" href="#如何在java中使用自定义字体"><span>如何在Java中使用自定义字体</span></a></h1><ol><li>引言</li></ol><p>当我们开发Java应用程序时，我们可能需要设计它们使用自定义字体以使GUI中的显示更加清晰。幸运的是，Java默认提供了广泛的字体，使用自定义字体使设计师能够在开发有吸引力的应用程序时发挥创意。</p><p><strong>在本教程中，我们将探索如何在Java应用程序中使用自定义字体。</strong></p><ol start="2"><li>配置自定义字体</li></ol><p>Java支持集成TrueType字体（TTF）和OpenType字体（OTF）进行自定义字体使用。</p><p><strong>实际上，这些字体并不包含在标准的Java字体库中，需要我们显式地将它们加载到应用程序中。</strong></p><p>让我们深入了解使用以下代码片段在Java中加载自定义字体所需的步骤：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">usingCustomFonts</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">GraphicsEnvironment</span> <span class="token constant">GE</span> <span class="token operator">=</span> <span class="token class-name">GraphicsEnvironment</span><span class="token punctuation">.</span><span class="token function">getLocalGraphicsEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` <span class="token constant">AVAILABLE_FONT_FAMILY_NAMES</span> <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token constant">GE</span><span class="token punctuation">.</span><span class="token function">getAvailableFontFamilyNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">File</span><span class="token punctuation">&gt;</span></span>\` <span class="token constant">LIST</span> <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>
              <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;font/JetBrainsMono/JetBrainsMono-Thin.ttf&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
              <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;font/JetBrainsMono/JetBrainsMono-Light.ttf&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
              <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;font/Roboto/Roboto-Light.ttf&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
              <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;font/Roboto/Roboto-Regular.ttf&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
              <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;font/Roboto/Roboto-Medium.ttf&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">File</span> <span class="token constant">LIST_ITEM</span> <span class="token operator">:</span> <span class="token constant">LIST</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token constant">LIST_ITEM</span><span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">Font</span> <span class="token constant">FONT</span> <span class="token operator">=</span> <span class="token class-name">Font</span><span class="token punctuation">.</span><span class="token function">createFont</span><span class="token punctuation">(</span><span class="token class-name">Font</span><span class="token punctuation">.</span><span class="token constant">TRUETYPE_FONT</span><span class="token punctuation">,</span> <span class="token constant">LIST_ITEM</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token constant">AVAILABLE_FONT_FAMILY_NAMES</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token constant">FONT</span><span class="token punctuation">.</span><span class="token function">getFontName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token constant">GE</span><span class="token punctuation">.</span><span class="token function">registerFont</span><span class="token punctuation">(</span><span class="token constant">FONT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">FontFormatException</span> <span class="token operator">|</span> <span class="token class-name">IOException</span> exception<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">JOptionPane</span><span class="token punctuation">.</span><span class="token function">showMessageDialog</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> exception<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码段中，我们利用<code>GraphicsEnvironment.getLocalGraphicsEnvironment()</code>访问本地图形环境，从而访问系统字体。此外，我们使用<code>GE.getAvailableFontFamilyNames()</code>方法从系统中获取可用的字体系列名称。</p><p>代码还使用<code>Font.createFont()</code>在循环中动态加载指定的字体（例如，不同粗细的JetBrains Mono和Roboto），并且使用<code>AVAILABLE_FONT_FAMILY_NAMES.contains(FONT.getFontName())</code>将这些加载的字体与系统可用字体进行交叉检查。</p><ol start="3"><li>使用自定义字体</li></ol><p>让我们在Java Swing应用程序中使用GUI实现这些加载的字体：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">JFrame</span> frame <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JFrame</span><span class="token punctuation">(</span><span class="token string">&quot;自定义字体示例&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
frame<span class="token punctuation">.</span><span class="token function">setDefaultCloseOperation</span><span class="token punctuation">(</span><span class="token class-name">JFrame</span><span class="token punctuation">.</span><span class="token constant">EXIT_ON_CLOSE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
frame<span class="token punctuation">.</span><span class="token function">setLayout</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FlowLayout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">JLabel</span> label1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JLabel</span><span class="token punctuation">(</span><span class="token string">&quot;文本1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
label1<span class="token punctuation">.</span><span class="token function">setFont</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Font</span><span class="token punctuation">(</span><span class="token string">&quot;Roboto Medium&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Font</span><span class="token punctuation">.</span><span class="token constant">PLAIN</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">JLabel</span> label2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JLabel</span><span class="token punctuation">(</span><span class="token string">&quot;文本2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
label2<span class="token punctuation">.</span><span class="token function">setFont</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Font</span><span class="token punctuation">(</span><span class="token string">&quot;JetBrainsMono-Thin&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Font</span><span class="token punctuation">.</span><span class="token constant">PLAIN</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

frame<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>label1<span class="token punctuation">)</span><span class="token punctuation">;</span>
frame<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>label2<span class="token punctuation">)</span><span class="token punctuation">;</span>

frame<span class="token punctuation">.</span><span class="token function">pack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
frame<span class="token punctuation">.</span><span class="token function">setVisible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，GUI代码演示了如何在<code>JLabel</code>组件中使用加载的自定义字体，通过指定相应的字体名称和样式。下图显示了使用默认字体和自定义字体的区别：</p><ol start="4"><li>结论</li></ol><p>总之，在Java应用程序中加入自定义字体增强了视觉吸引力，并允许我们创建独特的用户界面。</p><p>通过遵循概述的步骤并利用提供的代码示例，开发者可以无缝地将自定义字体集成到他们的Java GUI应用程序中，从而创造出更美观和独特的用户体验。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p>`,19),e=[o];function c(l,i){return s(),a("div",null,e)}const r=n(p,[["render",c],["__file","2024-06-26-How to Use a Custom Font in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-How%20to%20Use%20a%20Custom%20Font%20in%20Java.html","title":"如何在Java中使用自定义字体","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","GUI"],"tag":["Java","字体","GUI"],"head":[["meta",{"name":"keywords","content":"Java, 字体, GUI, 自定义字体"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-How%20to%20Use%20a%20Custom%20Font%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Java中使用自定义字体"}],["meta",{"property":"og:description","content":"如何在Java中使用自定义字体 引言 当我们开发Java应用程序时，我们可能需要设计它们使用自定义字体以使GUI中的显示更加清晰。幸运的是，Java默认提供了广泛的字体，使用自定义字体使设计师能够在开发有吸引力的应用程序时发挥创意。 在本教程中，我们将探索如何在Java应用程序中使用自定义字体。 配置自定义字体 Java支持集成TrueType字体（T..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T18:51:24.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"字体"}],["meta",{"property":"article:tag","content":"GUI"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T18:51:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Java中使用自定义字体\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T18:51:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Java中使用自定义字体 引言 当我们开发Java应用程序时，我们可能需要设计它们使用自定义字体以使GUI中的显示更加清晰。幸运的是，Java默认提供了广泛的字体，使用自定义字体使设计师能够在开发有吸引力的应用程序时发挥创意。 在本教程中，我们将探索如何在Java应用程序中使用自定义字体。 配置自定义字体 Java支持集成TrueType字体（T..."},"headers":[],"git":{"createdTime":1719427884000,"updatedTime":1719427884000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.27,"words":682},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-How to Use a Custom Font in Java.md","localizedDate":"2024年6月27日","excerpt":"\\n<ol>\\n<li>引言</li>\\n</ol>\\n<p>当我们开发Java应用程序时，我们可能需要设计它们使用自定义字体以使GUI中的显示更加清晰。幸运的是，Java默认提供了广泛的字体，使用自定义字体使设计师能够在开发有吸引力的应用程序时发挥创意。</p>\\n<p><strong>在本教程中，我们将探索如何在Java应用程序中使用自定义字体。</strong></p>\\n<ol start=\\"2\\">\\n<li>配置自定义字体</li>\\n</ol>\\n<p>Java支持集成TrueType字体（TTF）和OpenType字体（OTF）进行自定义字体使用。</p>\\n<p><strong>实际上，这些字体并不包含在标准的Java字体库中，需要我们显式地将它们加载到应用程序中。</strong></p>","autoDesc":true}');export{r as comp,d as data};
