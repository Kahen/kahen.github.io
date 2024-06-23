import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-j3liftxp.js";const t={},p=e(`<h1 id="如何在java中缩放bufferedimage" tabindex="-1"><a class="header-anchor" href="#如何在java中缩放bufferedimage"><span>如何在Java中缩放BufferedImage？</span></a></h1><p>在本教程中，我们将介绍如何使用Java的基本API重新调整图像大小。我们将展示如何从文件加载和保存图像，并解释缩放过程中的一些技术细节。</p><h2 id="_2-在java中加载图像" tabindex="-1"><a class="header-anchor" href="#_2-在java中加载图像"><span>2. 在Java中加载图像</span></a></h2><p>对于本教程，我们将使用一个简单的JPG图像文件。我们将使用Java SDK中包含的_ImageIO_ API来加载它。这个API有一些预设的_ImageReaders_，用于读取如JPEG和PNG等格式。_ImageReaders_知道如何读取它们各自的图像格式，并从图像文件中获取位图。</p><p>我们将使用_ImageIO_的_read_方法。这个方法有几个重载版本，但我们将使用最简单的一个：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">BufferedImage</span> srcImg <span class="token operator">=</span> <span class="token class-name">ImageIO</span><span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;src/main/resources/images/sampleImage.jpg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如我们所见，_read()_方法提供了一个_BufferedImage_对象，这是Java表示图像位图的主要方式。</p><h2 id="_3-缩放图像" tabindex="-1"><a class="header-anchor" href="#_3-缩放图像"><span>3. 缩放图像</span></a></h2><p>在我们缩放加载的图像之前，我们必须做一些准备工作。</p><h3 id="_3-1-创建目标图像" tabindex="-1"><a class="header-anchor" href="#_3-1-创建目标图像"><span>3.1. 创建目标图像</span></a></h3><p>首先，我们必须创建一个新的_BufferedImage_对象，代表内存中缩放后的图像，也称为目标图像。由于我们正在缩放，这意味着结果图像的宽度和高度将与原始图像不同。</p><p><strong>我们必须在新的_BufferedImage_中设置缩放大小：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">float</span> scaleW <span class="token operator">=</span> <span class="token number">2.0f</span><span class="token punctuation">,</span> scaleH <span class="token operator">=</span> <span class="token number">2.0f</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> w <span class="token operator">=</span> srcImg<span class="token punctuation">.</span><span class="token function">getWidth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> scaleW<span class="token punctuation">;</span>
<span class="token keyword">int</span> h <span class="token operator">=</span> srcImg<span class="token punctuation">.</span><span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> scaleH<span class="token punctuation">;</span>
<span class="token class-name">BufferedImage</span> dstImg <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedImage</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> h<span class="token punctuation">,</span> srcImg<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如代码所示，宽度和高度的缩放因子不需要相同。然而，它们通常是相同的，因为使用不同的缩放因子会给我们扭曲的结果。</p><p>_BufferedImage_构造函数还需要一个_imageType_参数。这与图像文件格式（例如PNG或JPEG）不同；<strong>图像类型决定了新的_BufferedImage_的颜色空间</strong>。该类本身提供了支持值的_static int_成员，如_BufferedImage.TYPE_INT_RGB_和_BufferedImage.TYPE_BYTE_GRAY_分别用于彩色和灰度图像。在我们的情况下，我们将使用与源图像相同的类型，因为我们只是改变比例。</p><p>下一步是应用一个转换，将源图像带到我们的目标大小。</p><h3 id="_3-2-应用-affinetransform" tabindex="-1"><a class="header-anchor" href="#_3-2-应用-affinetransform"><span>3.2. 应用_AffineTransform_</span></a></h3><p><strong>我们将通过应用缩放仿射变换来缩放图像</strong>。这些线性变换可以将一个2D平面上的点映射到另一个2D平面。根据变换，目标平面可以是原始平面的放大版，甚至是旋转版本。</p><p>在我们的情况下，我们只应用缩放。<strong>最简单的思考方式是取构成图像的所有点，并通过缩放因子增加它们之间的距离</strong>。</p><p>让我们创建一个_AffineTransform_及其相应的操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">AffineTransform</span> scalingTransform <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AffineTransform</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
scalingTransform<span class="token punctuation">.</span><span class="token function">scale</span><span class="token punctuation">(</span>scaleW<span class="token punctuation">,</span> scaleH<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">AffineTransformOp</span> scaleOp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AffineTransformOp</span><span class="token punctuation">(</span>scalingTransform<span class="token punctuation">,</span> <span class="token class-name">AffineTransformOp</span><span class="token punctuation">.</span><span class="token constant">TYPE_BILINEAR</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**_AffineTransform_定义了我们将应用的操作，而_AffineTransformOp_定义了如何应用它。**我们创建了一个操作，将使用_scalingTransform_并使用双线性插值应用它。</p><p><strong>所选的插值算法是逐案确定的，它决定了新图像的像素值如何选择。这些插值算法的作用以及为什么它们是强制性的</strong>超出了本文的范围。理解它们需要知道我们为什么使用这些线性变换以及它们如何应用于2D图像。</p><p>一旦_scaleOp_准备好了，我们可以将其应用于_srcImg_并将结果放入_dstImg_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>dstImg <span class="token operator">=</span> scaleOp<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>srcImg<span class="token punctuation">,</span> dstImg<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，我们可以将_dstImg_保存到文件中，以便我们可以查看结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ImageIO</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>dstImg<span class="token punctuation">,</span> <span class="token string">&quot;jpg&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;src/main/resources/images/resized.jpg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们学习了如何通过任意缩放因子来缩放图像。我们展示了如何从文件系统加载/保存图像以及如何使用Java的_AffineTransform_来应用缩放操作。</p><p>正如往常一样，本文的源代码可在GitHub上找到。</p><p>文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,31),o=[p];function c(l,i){return s(),n("div",null,o)}const d=a(t,[["render",c],["__file","2024-06-19-How to Scale a Bufferedimage in Java .html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-19-How%20to%20Scale%20a%20Bufferedimage%20in%20Java%20.html","title":"如何在Java中缩放BufferedImage？","lang":"zh-CN","frontmatter":{"date":"2024-06-19T00:00:00.000Z","category":["Java","图像处理"],"tag":["BufferedImage","图像缩放"],"head":[["meta",{"name":"keywords","content":"Java, BufferedImage, 图像处理, 图像缩放"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-19-How%20to%20Scale%20a%20Bufferedimage%20in%20Java%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Java中缩放BufferedImage？"}],["meta",{"property":"og:description","content":"如何在Java中缩放BufferedImage？ 在本教程中，我们将介绍如何使用Java的基本API重新调整图像大小。我们将展示如何从文件加载和保存图像，并解释缩放过程中的一些技术细节。 2. 在Java中加载图像 对于本教程，我们将使用一个简单的JPG图像文件。我们将使用Java SDK中包含的_ImageIO_ API来加载它。这个API有一些预设..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"BufferedImage"}],["meta",{"property":"article:tag","content":"图像缩放"}],["meta",{"property":"article:published_time","content":"2024-06-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Java中缩放BufferedImage？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Java中缩放BufferedImage？ 在本教程中，我们将介绍如何使用Java的基本API重新调整图像大小。我们将展示如何从文件加载和保存图像，并解释缩放过程中的一些技术细节。 2. 在Java中加载图像 对于本教程，我们将使用一个简单的JPG图像文件。我们将使用Java SDK中包含的_ImageIO_ API来加载它。这个API有一些预设..."},"headers":[{"level":2,"title":"2. 在Java中加载图像","slug":"_2-在java中加载图像","link":"#_2-在java中加载图像","children":[]},{"level":2,"title":"3. 缩放图像","slug":"_3-缩放图像","link":"#_3-缩放图像","children":[{"level":3,"title":"3.1. 创建目标图像","slug":"_3-1-创建目标图像","link":"#_3-1-创建目标图像","children":[]},{"level":3,"title":"3.2. 应用_AffineTransform_","slug":"_3-2-应用-affinetransform","link":"#_3-2-应用-affinetransform","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.46,"words":1037},"filePathRelative":"posts/baeldung/Archive/2024-06-19-How to Scale a Bufferedimage in Java .md","localizedDate":"2024年6月19日","excerpt":"\\n<p>在本教程中，我们将介绍如何使用Java的基本API重新调整图像大小。我们将展示如何从文件加载和保存图像，并解释缩放过程中的一些技术细节。</p>\\n<h2>2. 在Java中加载图像</h2>\\n<p>对于本教程，我们将使用一个简单的JPG图像文件。我们将使用Java SDK中包含的_ImageIO_ API来加载它。这个API有一些预设的_ImageReaders_，用于读取如JPEG和PNG等格式。_ImageReaders_知道如何读取它们各自的图像格式，并从图像文件中获取位图。</p>\\n<p>我们将使用_ImageIO_的_read_方法。这个方法有几个重载版本，但我们将使用最简单的一个：</p>","autoDesc":true}');export{d as comp,m as data};
