---
date: 2023-06-08
category:
  - Java
  - 图像压缩
tag:
  - 图像压缩
  - Java
  - 教程
head:
  - - meta
    - name: keywords
      content: Java, 图像压缩, 教程, JPEG, PNG, 无损压缩, 有损压缩
---

# Java中使用有损和无损压缩技术压缩图像

## 1. 引言

在本教程中，我们将探讨如何使用Java来压缩图像。我们将从使用Java内置的图像压缩库开始，然后覆盖到Apache Commons Imaging替代库。

让我们首先了解一些有关图像压缩的知识。

## 2. 图像压缩是什么？

图像压缩允许我们在不显著损害视觉质量的情况下减小图像文件的大小。有两种类型的压缩。首先，我们使用**有损压缩**来接受降低的图像质量，同时实现更小的文件大小。例如，我们有JPEG和WebP格式用于有损压缩。其次，我们使用**无损压缩**来在压缩过程中保留数据和信息。例如，在无损压缩期间使用PNG和GIF格式。

现在，我们将专注于使用JPEG格式的有损压缩，因为它是互联网上使用最广泛的格式。之后，我们将检查如何压缩PNG图像，被称为PNG图像优化。

## 3. 使用Java图像I/O压缩图像

首先，我们将使用Java图像I/O的内置API来读取和写入图像。它支持包括JPEG、PNG、BMP和GIF在内的多种图像格式。让我们看看如何使用Java图像I/O压缩图像：

```
File inputFile = new File("input_image.jpg");
BufferedImage inputImage = ImageIO.read(inputFile);

Iterator`<ImageWriter>` writers = ImageIO.getImageWritersByFormatName("jpg");
ImageWriter writer = writers.next();

File outputFile = new File("output.jpg");
ImageOutputStream outputStream = ImageIO.createImageOutputStream(outputFile);
writer.setOutput(outputStream);

ImageWriteParam params = writer.getDefaultWriteParam();
params.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
params.setCompressionQuality(0.5f);

writer.write(null, new IIOImage(inputImage, null, null), params);

outputStream.close();
writer.dispose();
```

首先，我们从资源文件中读取图像。然后，我们为JPG格式创建一个_ImageWriter_，设置这个写入器的输出文件。在我们能够写入图像之前，我们创建_ImageWriteParam_对象来定义压缩模式和压缩质量为50%。最后，我们写入图像，关闭输出流，并清理写入器。

例如，通过将示例图像压缩50%，我们几乎将文件大小从790KB减少到656KB，略低于初始大小的83%。因此，图片质量的变化并不明显：

![img](https://www.baeldung.com/wp-content/uploads/2023/06/Screenshot-2023-05-30-at-21.36.41.png)

## 4. 使用Thumbnails库压缩图像

Thumbnails库是一个简单且多功能的库，用于调整图像大小和压缩图像。让我们首先将库添加到我们的_pom.xml_：

```
``<dependency>``
    ``<groupId>``net.coobird``</groupId>``
    ``<artifactId>``thumbnailator``</artifactId>``
    ``<version>``0.4.19``</version>``
``</dependency>``
```

让我们看看如何使用_Thumbnails_类来压缩图像：

```
File input = new File("input_image.jpg");
File output = new File("output.jpg");

Thumbnails.of(input)
  .scale(1)
  .outputQuality(0.5)
  .toFile(output);
```

在这里，_scale(1)_方法保持原始图像尺寸，而_outputQuality(0.5)_将输出质量设置为50%。

## 5. 使用Pngtastic库压缩图像

PNG优化是专为PNG图像设计的压缩类型。我们将使用Pngtastic库来优化PNG图像。首先，让我们将最新的仓库添加到我们的_pom.xml_：

```
``<dependency>``
    ``<groupId>``com.github.depsypher``</groupId>``
    ``<artifactId>``pngtastic``</artifactId>``
    ``<version>``1.7``</version>``
``</dependency>``
```

最后，我们可以使用_PngOptimizer_类来压缩PNG文件：

```
PngImage inputImage = new PngImage(Files.newInputStream(Paths.get(inputPath)));

PngOptimizer optimizer = new PngOptimizer();
PngImage optimized = optimizer.optimize(inputImage);

OutputStream output = Files.newOutputStream(Paths.get(outputPath));
optimized.writeDataOutputStream(output);
```

我们使用_.optimize()_方法让库决定最佳的压缩方式。作为一种无损压缩，很难显著减小图像的大小。在这里，我们将大小从500 KB减少到481 KB。

![img](https://www.baeldung.com/wp-content/uploads/2023/06/Screenshot-2023-06-08-at-17.59.55.png)

## 6. 结论

在本文中，我们涵盖了使用Java进行有损压缩的两种方法：内置的Java图像I/O API和Apache Commons Imaging库。然后，我们使用Pngtastic库对PNG图像进行了无损压缩。

如常，示例的完整源代码可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/5b5d0f130d2dfe9b982f545f9122eedb?s=50&r=g)![img](https://secure.gravatar.com/avatar/74d85e58eea7ae3bd05956bff5cb1b49?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)

OK