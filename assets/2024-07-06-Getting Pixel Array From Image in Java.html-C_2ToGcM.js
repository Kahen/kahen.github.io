import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-8nJ1rqSf.js";const p={},e=t(`<h1 id="在java中从图像获取像素数组" tabindex="-1"><a class="header-anchor" href="#在java中从图像获取像素数组"><span>在Java中从图像获取像素数组</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将学习如何在Java中从一个BufferedImage实例获取包含图像信息（RGB值）的像素数组。</p><h2 id="_2-bufferedimage类是什么" tabindex="-1"><a class="header-anchor" href="#_2-bufferedimage类是什么"><span>2. BufferedImage类是什么？</span></a></h2><p>BufferedImage类是Image的一个子类，它描述了一个具有可访问缓冲区的图形图像。BufferedImage由ColorModel和Raster组成。</p><p>ColorModel描述了如何使用组件的组合作为值的元组来表示颜色。Java中的ColorModel类包含可以为特定像素返回颜色值的方法。例如，_getBlue(int pixel)_返回给定像素的蓝色值。</p><p>此外，Raster类包含了像素数组形式的图像数据。Raster类由DataBuffer组成，它存储图像值，以及描述像素如何在DataBuffer中存储的SampleModel。</p><h2 id="_3-使用-getrgb" tabindex="-1"><a class="header-anchor" href="#_3-使用-getrgb"><span>3. 使用_getRGB()_</span></a></h2><p>第一种方法是使用BufferedImage类的_getRGB()_实例方法。</p><p><strong>_getRGB()_方法将指定像素的RGB值合并为一个整数并返回结果</strong>。这个整数包含可以使用实例的ColorModel访问的RGB值。此外，要获取图像中每个像素的结果，我们必须遍历它们并对每个像素单独调用该方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">get2DPixelArraySlow</span><span class="token punctuation">(</span><span class="token class-name">BufferedImage</span> sampleImage<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> width <span class="token operator">=</span> sampleImage<span class="token punctuation">.</span><span class="token function">getWidth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> height <span class="token operator">=</span> sampleImage<span class="token punctuation">.</span><span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>height<span class="token punctuation">]</span><span class="token punctuation">[</span>width<span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> row <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> row <span class="token operator">&lt;</span> height<span class="token punctuation">;</span> row<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> col <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> col <span class="token operator">&lt;</span> width<span class="token punctuation">;</span> col<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            result<span class="token punctuation">[</span>row<span class="token punctuation">]</span><span class="token punctuation">[</span>col<span class="token punctuation">]</span> <span class="token operator">=</span> sampleImage<span class="token punctuation">.</span><span class="token function">getRGB</span><span class="token punctuation">(</span>col<span class="token punctuation">,</span> row<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码片段中，_result_数组是一个二维数组，包含图像中每个像素的RGB值。这种方法更简单，但也不如下一种方法高效。</p><h2 id="_4-直接从-databuffer-获取值" tabindex="-1"><a class="header-anchor" href="#_4-直接从-databuffer-获取值"><span>4. 直接从_DataBuffer_获取值</span></a></h2><p><strong>在这种方法中，我们首先分别获取图像中的所有RGB值，然后手动将它们组合成一个整数</strong>。之后，我们像第一种方法一样填充包含像素值的二维数组。这种方法更复杂，但比第一种方法快得多：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">get2DPixelArrayFast</span><span class="token punctuation">(</span><span class="token class-name">BufferedImage</span> image<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> pixelData <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">DataBufferByte</span><span class="token punctuation">)</span> image<span class="token punctuation">.</span><span class="token function">getRaster</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDataBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> width <span class="token operator">=</span> image<span class="token punctuation">.</span><span class="token function">getWidth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> height <span class="token operator">=</span> image<span class="token punctuation">.</span><span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">boolean</span> hasAlphaChannel <span class="token operator">=</span> image<span class="token punctuation">.</span><span class="token function">getAlphaRaster</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>height<span class="token punctuation">]</span><span class="token punctuation">[</span>width<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>hasAlphaChannel<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> numberOfValues <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> valueIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> row <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> col <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> valueIndex <span class="token operator">+</span> numberOfValues <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">&lt;</span> pixelData<span class="token punctuation">.</span>length<span class="token punctuation">;</span> valueIndex <span class="token operator">+=</span> numberOfValues<span class="token punctuation">)</span> <span class="token punctuation">{</span>

            <span class="token keyword">int</span> argb <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            argb <span class="token operator">+=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> pixelData<span class="token punctuation">[</span>valueIndex<span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">0xff</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> <span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// alpha值</span>
            argb <span class="token operator">+=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> pixelData<span class="token punctuation">[</span>valueIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">0xff</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 蓝色值</span>
            argb <span class="token operator">+=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> pixelData<span class="token punctuation">[</span>valueIndex <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">0xff</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 绿色值</span>
            argb <span class="token operator">+=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> pixelData<span class="token punctuation">[</span>valueIndex <span class="token operator">+</span> <span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">0xff</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 红色值</span>
            result<span class="token punctuation">[</span>row<span class="token punctuation">]</span><span class="token punctuation">[</span>col<span class="token punctuation">]</span> <span class="token operator">=</span> argb<span class="token punctuation">;</span>

            col<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>col <span class="token operator">==</span> width<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                col <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
                row<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> numberOfValues <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> valueIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> row <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> col <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> valueIndex <span class="token operator">+</span> numberOfValues <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">&lt;</span> pixelData<span class="token punctuation">.</span>length<span class="token punctuation">;</span> valueIndex <span class="token operator">+=</span> numberOfValues<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> argb <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            argb <span class="token operator">+=</span> <span class="token operator">-</span><span class="token number">16777216</span><span class="token punctuation">;</span> <span class="token comment">// 255 alpha值（完全不透明）</span>
            argb <span class="token operator">+=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> pixelData<span class="token punctuation">[</span>valueIndex<span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">0xff</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 蓝色值</span>
            argb <span class="token operator">+=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> pixelData<span class="token punctuation">[</span>valueIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">0xff</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 绿色值</span>
            argb <span class="token operator">+=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> pixelData<span class="token punctuation">[</span>valueIndex <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">0xff</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 红色值</span>
            result<span class="token punctuation">[</span>row<span class="token punctuation">]</span><span class="token punctuation">[</span>col<span class="token punctuation">]</span> <span class="token operator">=</span> argb<span class="token punctuation">;</span>

            col<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>col <span class="token operator">==</span> width<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                col <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
                row<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码片段中，我们首先获取图像中每个像素的单独RGB值，并将它们存储在名为_pixelData_的字节数组中。</p><p>例如，假设图像没有alpha通道（alpha通道包含图片的透明度信息），_pixelData[0]_包含图像中第一个像素的蓝色值，而_pixelData[1]_和_pixelData[2]_分别包含绿色和红色值。同样，_pixelData[3]_到_pixelData[5]_包含第二个图像像素的RGB值，以此类推。</p><p>获取这些值后，我们必须将它们组合成每个像素的一个整数。但在此之前，我们需要找出图像是否有alpha通道。如果图像有alpha通道，我们需要将四个值（红色、绿色、蓝色和透明度信息）组合成一个整数。如果没有，我们只需要组合RGB值。</p><p>将所有值组合成一个整数后，我们将整数放入二维数组中的正确位置。</p><h2 id="_5-总结" tabindex="-1"><a class="header-anchor" href="#_5-总结"><span>5. 总结</span></a></h2><p>在这篇短文中，我们学习了如何在Java中获取一个二维数组，该数组包含图像中每个像素的组合RGB值。</p><p>正如往常一样，本文中使用的代码片段可以在GitHub上找到。</p><p>OK</p>`,23),o=[e];function c(l,u){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-06-Getting Pixel Array From Image in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Getting%20Pixel%20Array%20From%20Image%20in%20Java.html","title":"在Java中从图像获取像素数组","lang":"zh-CN","frontmatter":{"date":"2024-07-06T00:00:00.000Z","category":["Java","图像处理"],"tag":["BufferedImage","像素数组","图像数据"],"head":[["meta",{"name":"keywords","content":"Java, BufferedImage, 像素数组, 图像数据, 像素值, RGB"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Getting%20Pixel%20Array%20From%20Image%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中从图像获取像素数组"}],["meta",{"property":"og:description","content":"在Java中从图像获取像素数组 1. 概述 在本教程中，我们将学习如何在Java中从一个BufferedImage实例获取包含图像信息（RGB值）的像素数组。 2. BufferedImage类是什么？ BufferedImage类是Image的一个子类，它描述了一个具有可访问缓冲区的图形图像。BufferedImage由ColorModel和Rast..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T10:57:35.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"BufferedImage"}],["meta",{"property":"article:tag","content":"像素数组"}],["meta",{"property":"article:tag","content":"图像数据"}],["meta",{"property":"article:published_time","content":"2024-07-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T10:57:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中从图像获取像素数组\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T10:57:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中从图像获取像素数组 1. 概述 在本教程中，我们将学习如何在Java中从一个BufferedImage实例获取包含图像信息（RGB值）的像素数组。 2. BufferedImage类是什么？ BufferedImage类是Image的一个子类，它描述了一个具有可访问缓冲区的图形图像。BufferedImage由ColorModel和Rast..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. BufferedImage类是什么？","slug":"_2-bufferedimage类是什么","link":"#_2-bufferedimage类是什么","children":[]},{"level":2,"title":"3. 使用_getRGB()_","slug":"_3-使用-getrgb","link":"#_3-使用-getrgb","children":[]},{"level":2,"title":"4. 直接从_DataBuffer_获取值","slug":"_4-直接从-databuffer-获取值","link":"#_4-直接从-databuffer-获取值","children":[]},{"level":2,"title":"5. 总结","slug":"_5-总结","link":"#_5-总结","children":[]}],"git":{"createdTime":1720263455000,"updatedTime":1720263455000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.36,"words":1007},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Getting Pixel Array From Image in Java.md","localizedDate":"2024年7月6日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将学习如何在Java中从一个BufferedImage实例获取包含图像信息（RGB值）的像素数组。</p>\\n<h2>2. BufferedImage类是什么？</h2>\\n<p>BufferedImage类是Image的一个子类，它描述了一个具有可访问缓冲区的图形图像。BufferedImage由ColorModel和Raster组成。</p>\\n<p>ColorModel描述了如何使用组件的组合作为值的元组来表示颜色。Java中的ColorModel类包含可以为特定像素返回颜色值的方法。例如，_getBlue(int pixel)_返回给定像素的蓝色值。</p>","autoDesc":true}');export{k as comp,d as data};
