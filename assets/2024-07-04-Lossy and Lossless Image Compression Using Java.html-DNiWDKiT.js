import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-D5kFWV-m.js";const i={},s=n('<h1 id="java中使用有损和无损压缩技术压缩图像" tabindex="-1"><a class="header-anchor" href="#java中使用有损和无损压缩技术压缩图像"><span>Java中使用有损和无损压缩技术压缩图像</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将探讨如何使用Java来压缩图像。我们将从使用Java内置的图像压缩库开始，然后覆盖到Apache Commons Imaging替代库。</p><p>让我们首先了解一些有关图像压缩的知识。</p><h2 id="_2-图像压缩是什么" tabindex="-1"><a class="header-anchor" href="#_2-图像压缩是什么"><span>2. 图像压缩是什么？</span></a></h2><p>图像压缩允许我们在不显著损害视觉质量的情况下减小图像文件的大小。有两种类型的压缩。首先，我们使用<strong>有损压缩</strong>来接受降低的图像质量，同时实现更小的文件大小。例如，我们有JPEG和WebP格式用于有损压缩。其次，我们使用<strong>无损压缩</strong>来在压缩过程中保留数据和信息。例如，在无损压缩期间使用PNG和GIF格式。</p><p>现在，我们将专注于使用JPEG格式的有损压缩，因为它是互联网上使用最广泛的格式。之后，我们将检查如何压缩PNG图像，被称为PNG图像优化。</p><h2 id="_3-使用java图像i-o压缩图像" tabindex="-1"><a class="header-anchor" href="#_3-使用java图像i-o压缩图像"><span>3. 使用Java图像I/O压缩图像</span></a></h2><p>首先，我们将使用Java图像I/O的内置API来读取和写入图像。它支持包括JPEG、PNG、BMP和GIF在内的多种图像格式。让我们看看如何使用Java图像I/O压缩图像：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>File inputFile = new File(&quot;input_image.jpg&quot;);\nBufferedImage inputImage = ImageIO.read(inputFile);\n\nIterator`&lt;ImageWriter&gt;` writers = ImageIO.getImageWritersByFormatName(&quot;jpg&quot;);\nImageWriter writer = writers.next();\n\nFile outputFile = new File(&quot;output.jpg&quot;);\nImageOutputStream outputStream = ImageIO.createImageOutputStream(outputFile);\nwriter.setOutput(outputStream);\n\nImageWriteParam params = writer.getDefaultWriteParam();\nparams.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);\nparams.setCompressionQuality(0.5f);\n\nwriter.write(null, new IIOImage(inputImage, null, null), params);\n\noutputStream.close();\nwriter.dispose();\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们从资源文件中读取图像。然后，我们为JPG格式创建一个_ImageWriter_，设置这个写入器的输出文件。在我们能够写入图像之前，我们创建_ImageWriteParam_对象来定义压缩模式和压缩质量为50%。最后，我们写入图像，关闭输出流，并清理写入器。</p><p>例如，通过将示例图像压缩50%，我们几乎将文件大小从790KB减少到656KB，略低于初始大小的83%。因此，图片质量的变化并不明显：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/06/Screenshot-2023-05-30-at-21.36.41.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_4-使用thumbnails库压缩图像" tabindex="-1"><a class="header-anchor" href="#_4-使用thumbnails库压缩图像"><span>4. 使用Thumbnails库压缩图像</span></a></h2><p>Thumbnails库是一个简单且多功能的库，用于调整图像大小和压缩图像。让我们首先将库添加到我们的_pom.xml_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n    ``&lt;groupId&gt;``net.coobird``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``thumbnailator``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``0.4.19``&lt;/version&gt;``\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看如何使用_Thumbnails_类来压缩图像：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>File input = new File(&quot;input_image.jpg&quot;);\nFile output = new File(&quot;output.jpg&quot;);\n\nThumbnails.of(input)\n  .scale(1)\n  .outputQuality(0.5)\n  .toFile(output);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，_scale(1)_方法保持原始图像尺寸，而_outputQuality(0.5)_将输出质量设置为50%。</p><h2 id="_5-使用pngtastic库压缩图像" tabindex="-1"><a class="header-anchor" href="#_5-使用pngtastic库压缩图像"><span>5. 使用Pngtastic库压缩图像</span></a></h2><p>PNG优化是专为PNG图像设计的压缩类型。我们将使用Pngtastic库来优化PNG图像。首先，让我们将最新的仓库添加到我们的_pom.xml_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n    ``&lt;groupId&gt;``com.github.depsypher``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``pngtastic``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``1.7``&lt;/version&gt;``\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们可以使用_PngOptimizer_类来压缩PNG文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>PngImage inputImage = new PngImage(Files.newInputStream(Paths.get(inputPath)));\n\nPngOptimizer optimizer = new PngOptimizer();\nPngImage optimized = optimizer.optimize(inputImage);\n\nOutputStream output = Files.newOutputStream(Paths.get(outputPath));\noptimized.writeDataOutputStream(output);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用_.optimize()_方法让库决定最佳的压缩方式。作为一种无损压缩，很难显著减小图像的大小。在这里，我们将大小从500 KB减少到481 KB。</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/06/Screenshot-2023-06-08-at-17.59.55.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们涵盖了使用Java进行有损压缩的两种方法：内置的Java图像I/O API和Apache Commons Imaging库。然后，我们使用Pngtastic库对PNG图像进行了无损压缩。</p><p>如常，示例的完整源代码可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/5b5d0f130d2dfe9b982f545f9122eedb?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/74d85e58eea7ae3bd05956bff5cb1b49?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"></p><p>OK</p>',31),l=[s];function r(d,o){return a(),t("div",null,l)}const c=e(i,[["render",r],["__file","2024-07-04-Lossy and Lossless Image Compression Using Java.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Lossy%20and%20Lossless%20Image%20Compression%20Using%20Java.html","title":"Java中使用有损和无损压缩技术压缩图像","lang":"zh-CN","frontmatter":{"date":"2023-06-08T00:00:00.000Z","category":["Java","图像压缩"],"tag":["图像压缩","Java","教程"],"head":[["meta",{"name":"keywords","content":"Java, 图像压缩, 教程, JPEG, PNG, 无损压缩, 有损压缩"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Lossy%20and%20Lossless%20Image%20Compression%20Using%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中使用有损和无损压缩技术压缩图像"}],["meta",{"property":"og:description","content":"Java中使用有损和无损压缩技术压缩图像 1. 引言 在本教程中，我们将探讨如何使用Java来压缩图像。我们将从使用Java内置的图像压缩库开始，然后覆盖到Apache Commons Imaging替代库。 让我们首先了解一些有关图像压缩的知识。 2. 图像压缩是什么？ 图像压缩允许我们在不显著损害视觉质量的情况下减小图像文件的大小。有两种类型的压缩..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/06/Screenshot-2023-05-30-at-21.36.41.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T10:56:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"图像压缩"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"教程"}],["meta",{"property":"article:published_time","content":"2023-06-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T10:56:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中使用有损和无损压缩技术压缩图像\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/06/Screenshot-2023-05-30-at-21.36.41.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/06/Screenshot-2023-06-08-at-17.59.55.png\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/5b5d0f130d2dfe9b982f545f9122eedb?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/74d85e58eea7ae3bd05956bff5cb1b49?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\"],\\"datePublished\\":\\"2023-06-08T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T10:56:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中使用有损和无损压缩技术压缩图像 1. 引言 在本教程中，我们将探讨如何使用Java来压缩图像。我们将从使用Java内置的图像压缩库开始，然后覆盖到Apache Commons Imaging替代库。 让我们首先了解一些有关图像压缩的知识。 2. 图像压缩是什么？ 图像压缩允许我们在不显著损害视觉质量的情况下减小图像文件的大小。有两种类型的压缩..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 图像压缩是什么？","slug":"_2-图像压缩是什么","link":"#_2-图像压缩是什么","children":[]},{"level":2,"title":"3. 使用Java图像I/O压缩图像","slug":"_3-使用java图像i-o压缩图像","link":"#_3-使用java图像i-o压缩图像","children":[]},{"level":2,"title":"4. 使用Thumbnails库压缩图像","slug":"_4-使用thumbnails库压缩图像","link":"#_4-使用thumbnails库压缩图像","children":[]},{"level":2,"title":"5. 使用Pngtastic库压缩图像","slug":"_5-使用pngtastic库压缩图像","link":"#_5-使用pngtastic库压缩图像","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720090566000,"updatedTime":1720090566000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.23,"words":969},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Lossy and Lossless Image Compression Using Java.md","localizedDate":"2023年6月8日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将探讨如何使用Java来压缩图像。我们将从使用Java内置的图像压缩库开始，然后覆盖到Apache Commons Imaging替代库。</p>\\n<p>让我们首先了解一些有关图像压缩的知识。</p>\\n<h2>2. 图像压缩是什么？</h2>\\n<p>图像压缩允许我们在不显著损害视觉质量的情况下减小图像文件的大小。有两种类型的压缩。首先，我们使用<strong>有损压缩</strong>来接受降低的图像质量，同时实现更小的文件大小。例如，我们有JPEG和WebP格式用于有损压缩。其次，我们使用<strong>无损压缩</strong>来在压缩过程中保留数据和信息。例如，在无损压缩期间使用PNG和GIF格式。</p>","autoDesc":true}');export{c as comp,u as data};
