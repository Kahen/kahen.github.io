---
date: 2024-06-19
category:
  - Java
  - 图像处理
tag:
  - BufferedImage
  - 图像缩放
head:
  - - meta
    - name: keywords
      content: Java, BufferedImage, 图像处理, 图像缩放
---

# 如何在Java中缩放BufferedImage？

在本教程中，我们将介绍如何使用Java的基本API重新调整图像大小。我们将展示如何从文件加载和保存图像，并解释缩放过程中的一些技术细节。

## 2. 在Java中加载图像

对于本教程，我们将使用一个简单的JPG图像文件。我们将使用Java SDK中包含的_ImageIO_ API来加载它。这个API有一些预设的_ImageReaders_，用于读取如JPEG和PNG等格式。_ImageReaders_知道如何读取它们各自的图像格式，并从图像文件中获取位图。

我们将使用_ImageIO_的_read_方法。这个方法有几个重载版本，但我们将使用最简单的一个：

```java
BufferedImage srcImg = ImageIO.read(new File("src/main/resources/images/sampleImage.jpg"));
```

如我们所见，_read()_方法提供了一个_BufferedImage_对象，这是Java表示图像位图的主要方式。

## 3. 缩放图像

在我们缩放加载的图像之前，我们必须做一些准备工作。

### 3.1. 创建目标图像

首先，我们必须创建一个新的_BufferedImage_对象，代表内存中缩放后的图像，也称为目标图像。由于我们正在缩放，这意味着结果图像的宽度和高度将与原始图像不同。

**我们必须在新的_BufferedImage_中设置缩放大小：**

```java
float scaleW = 2.0f, scaleH = 2.0f;
int w = srcImg.getWidth() * (int) scaleW;
int h = srcImg.getHeight() * (int) scaleH;
BufferedImage dstImg = new BufferedImage(w, h, srcImg.getType());
```

如代码所示，宽度和高度的缩放因子不需要相同。然而，它们通常是相同的，因为使用不同的缩放因子会给我们扭曲的结果。

_BufferedImage_构造函数还需要一个_imageType_参数。这与图像文件格式（例如PNG或JPEG）不同；**图像类型决定了新的_BufferedImage_的颜色空间**。该类本身提供了支持值的_static int_成员，如_BufferedImage.TYPE_INT_RGB_和_BufferedImage.TYPE_BYTE_GRAY_分别用于彩色和灰度图像。在我们的情况下，我们将使用与源图像相同的类型，因为我们只是改变比例。

下一步是应用一个转换，将源图像带到我们的目标大小。

### 3.2. 应用_AffineTransform_

**我们将通过应用缩放仿射变换来缩放图像**。这些线性变换可以将一个2D平面上的点映射到另一个2D平面。根据变换，目标平面可以是原始平面的放大版，甚至是旋转版本。

在我们的情况下，我们只应用缩放。**最简单的思考方式是取构成图像的所有点，并通过缩放因子增加它们之间的距离**。

让我们创建一个_AffineTransform_及其相应的操作：

```java
AffineTransform scalingTransform = new AffineTransform();
scalingTransform.scale(scaleW, scaleH);
AffineTransformOp scaleOp = new AffineTransformOp(scalingTransform, AffineTransformOp.TYPE_BILINEAR);
```

**_AffineTransform_定义了我们将应用的操作，而_AffineTransformOp_定义了如何应用它。**我们创建了一个操作，将使用_scalingTransform_并使用双线性插值应用它。

**所选的插值算法是逐案确定的，它决定了新图像的像素值如何选择。这些插值算法的作用以及为什么它们是强制性的**超出了本文的范围。理解它们需要知道我们为什么使用这些线性变换以及它们如何应用于2D图像。

一旦_scaleOp_准备好了，我们可以将其应用于_srcImg_并将结果放入_dstImg_：

```java
dstImg = scaleOp.filter(srcImg, dstImg);
```

最后，我们可以将_dstImg_保存到文件中，以便我们可以查看结果：

```java
ImageIO.write(dstImg, "jpg", new File("src/main/resources/images/resized.jpg"));
```

## 4. 结论

在本文中，我们学习了如何通过任意缩放因子来缩放图像。我们展示了如何从文件系统加载/保存图像以及如何使用Java的_AffineTransform_来应用缩放操作。

正如往常一样，本文的源代码可在GitHub上找到。

文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。