---
date: 2024-07-06
category:
  - Java
  - 图像处理
tag:
  - BufferedImage
  - 像素数组
  - 图像数据
head:
  - - meta
    - name: keywords
      content: Java, BufferedImage, 像素数组, 图像数据, 像素值, RGB
---

# 在Java中从图像获取像素数组

## 1. 概述

在本教程中，我们将学习如何在Java中从一个BufferedImage实例获取包含图像信息（RGB值）的像素数组。

## 2. BufferedImage类是什么？

BufferedImage类是Image的一个子类，它描述了一个具有可访问缓冲区的图形图像。BufferedImage由ColorModel和Raster组成。

ColorModel描述了如何使用组件的组合作为值的元组来表示颜色。Java中的ColorModel类包含可以为特定像素返回颜色值的方法。例如，_getBlue(int pixel)_返回给定像素的蓝色值。

此外，Raster类包含了像素数组形式的图像数据。Raster类由DataBuffer组成，它存储图像值，以及描述像素如何在DataBuffer中存储的SampleModel。

## 3. 使用_getRGB()_

第一种方法是使用BufferedImage类的_getRGB()_实例方法。

**_getRGB()_方法将指定像素的RGB值合并为一个整数并返回结果**。这个整数包含可以使用实例的ColorModel访问的RGB值。此外，要获取图像中每个像素的结果，我们必须遍历它们并对每个像素单独调用该方法：

```java
public int[][] get2DPixelArraySlow(BufferedImage sampleImage) {
    int width = sampleImage.getWidth();
    int height = sampleImage.getHeight();
    int[][] result = new int[height][width];

    for (int row = 0; row < height; row++) {
        for (int col = 0; col < width; col++) {
            result[row][col] = sampleImage.getRGB(col, row);
        }
    }

    return result;
}
```

在上面的代码片段中，_result_数组是一个二维数组，包含图像中每个像素的RGB值。这种方法更简单，但也不如下一种方法高效。

## 4. 直接从_DataBuffer_获取值

**在这种方法中，我们首先分别获取图像中的所有RGB值，然后手动将它们组合成一个整数**。之后，我们像第一种方法一样填充包含像素值的二维数组。这种方法更复杂，但比第一种方法快得多：

```java
public int[][] get2DPixelArrayFast(BufferedImage image) {
    byte[] pixelData = ((DataBufferByte) image.getRaster().getDataBuffer()).getData();
    int width = image.getWidth();
    int height = image.getHeight();
    boolean hasAlphaChannel = image.getAlphaRaster() != null;

    int[][] result = new int[height][width];
    if (hasAlphaChannel) {
        int numberOfValues = 4;
        for (int valueIndex = 0, row = 0, col = 0; valueIndex + numberOfValues - 1 < pixelData.length; valueIndex += numberOfValues) {

            int argb = 0;
            argb += (((int) pixelData[valueIndex] & 0xff) << 24); // alpha值
            argb += ((int) pixelData[valueIndex + 1] & 0xff); // 蓝色值
            argb += (((int) pixelData[valueIndex + 2] & 0xff) << 8); // 绿色值
            argb += (((int) pixelData[valueIndex + 3] & 0xff) << 16); // 红色值
            result[row][col] = argb;

            col++;
            if (col == width) {
                col = 0;
                row++;
            }
        }
    } else {
        int numberOfValues = 3;
        for (int valueIndex = 0, row = 0, col = 0; valueIndex + numberOfValues - 1 < pixelData.length; valueIndex += numberOfValues) {
            int argb = 0;
            argb += -16777216; // 255 alpha值（完全不透明）
            argb += ((int) pixelData[valueIndex] & 0xff); // 蓝色值
            argb += (((int) pixelData[valueIndex + 1] & 0xff) << 8); // 绿色值
            argb += (((int) pixelData[valueIndex + 2] & 0xff) << 16); // 红色值
            result[row][col] = argb;

            col++;
            if (col == width) {
                col = 0;
                row++;
            }
        }
    }

    return result;
}
```

在上面的代码片段中，我们首先获取图像中每个像素的单独RGB值，并将它们存储在名为_pixelData_的字节数组中。

例如，假设图像没有alpha通道（alpha通道包含图片的透明度信息），_pixelData[0]_包含图像中第一个像素的蓝色值，而_pixelData[1]_和_pixelData[2]_分别包含绿色和红色值。同样，_pixelData[3]_到_pixelData[5]_包含第二个图像像素的RGB值，以此类推。

获取这些值后，我们必须将它们组合成每个像素的一个整数。但在此之前，我们需要找出图像是否有alpha通道。如果图像有alpha通道，我们需要将四个值（红色、绿色、蓝色和透明度信息）组合成一个整数。如果没有，我们只需要组合RGB值。

将所有值组合成一个整数后，我们将整数放入二维数组中的正确位置。

## 5. 总结

在这篇短文中，我们学习了如何在Java中获取一个二维数组，该数组包含图像中每个像素的组合RGB值。

正如往常一样，本文中使用的代码片段可以在GitHub上找到。

OK