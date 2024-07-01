---
date: 2024-07-01
category:
  - Java
  - 编程
tag:
  - 地理坐标
  - 距离计算
head:
  - - meta
    - name: keywords
      content: Java, 地理坐标, 距离计算, Haversine公式, Vincenty公式
------
# 在Java中计算两个坐标之间的距离

在这篇快速教程中，我们将实现计算两个地理坐标之间距离的方法。

特别是，我们首先实现距离的一个近似值。然后，我们将查看Haversine公式和Vincenty公式，这些公式提供更高的准确性。

## 2. 等距圆柱投影距离近似
让我们首先实现等距圆柱投影近似。详细来说，由于这个公式使用的数学运算最少，它非常快：

```java
double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
    double lat1Rad = Math.toRadians(lat1);
    double lat2Rad = Math.toRadians(lat2);
    double lon1Rad = Math.toRadians(lon1);
    double lon2Rad = Math.toRadians(lon2);

    double x = (lon2Rad - lon1Rad) * Math.cos((lat1Rad + lat2Rad) / 2);
    double y = (lat2Rad - lat1Rad);
    double distance = Math.sqrt(x * x + y * y) * EARTH_RADIUS;

    return distance;
}
```

上述中_EARTH_RADIUS_是一个常量，等于6371，这是地球半径的一个良好近似值，单位是千米。

尽管它看起来是一个简单的公式，**等距圆柱投影近似在计算长距离时并不是很准确**。实际上，它将地球视为一个完美的球体，并将球体映射到一个矩形网格上。

## 3. 使用Haversine公式计算距离
接下来，我们来看看Haversine公式。同样，它将地球视为一个完美的球体。尽管如此，它在计算长距离时更准确。

此外，**Haversine公式基于球面正弦定律**：

```java
double haversine(double val) {
    return Math.pow(Math.sin(val / 2), 2);
}
```

然后，使用这个辅助函数，我们可以实现计算距离的方法：

```java
double calculateDistance(double startLat, double startLong, double endLat, double endLong) {

    double dLat = Math.toRadians((endLat - startLat));
    double dLong = Math.toRadians((endLong - startLong));

    startLat = Math.toRadians(startLat);
    endLat = Math.toRadians(endLat);

    double a = haversine(dLat) + Math.cos(startLat) * Math.cos(endLat) * haversine(dLong);
    double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS * c;
}
```

尽管它提高了计算的准确性，但它仍然将地球视为一个扁平的形状。

## 4. 使用Vincenty公式计算距离
最后，如果我们想要最高的精度，我们必须使用Vincenty公式。详细来说，**Vincenty公式通过迭代计算距离，直到误差达到可接受的值**。此外，它还考虑了地球的椭圆形状。

首先，公式需要一些常数来描述地球的椭球模型：

```java
double SEMI_MAJOR_AXIS_MT = 6378137;
double SEMI_MINOR_AXIS_MT = 6356752.314245;
double FLATTENING = 1 / 298.257223563;
double ERROR_TOLERANCE = 1e-12;
```

显然，_ERROR_TOLERANCE_代表我们愿意接受的误差。进一步，我们将在Vincenty公式中使用这些值：

```java
double calculateDistance(double latitude1, double longitude1, double latitude2, double longitude2) {
    // 省略了具体的计算过程，以节省篇幅
}
```

这个公式计算量大。因此，我们可能想在精度是一个目标时使用它。否则，我们将坚持使用Haversine公式。

## 5. 测试准确性
最后，我们可以测试我们上面看到的所有方法的准确性：

```java
double lat1 = 40.714268; // 纽约
double lon1 = -74.005974;
double lat2 = 34.0522; // 洛杉矶
double lon2 = -118.2437;

double equirectangularDistance = EquirectangularApproximation.calculateDistance(lat1, lon1, lat2, lon2);
double haversineDistance = HaversineDistance.calculateDistance(lat1, lon1, lat2, lon2);
double vincentyDistance = VincentyDistance.calculateDistance(lat1, lon1, lat2, lon2);

double expectedDistance = 3944;
assertTrue(Math.abs(equirectangularDistance - expectedDistance) < 100);
assertTrue(Math.abs(haversineDistance - expectedDistance) < 10);
assertTrue(Math.abs(vincentyDistance - expectedDistance) < 0.5);
```

上述，我们计算了纽约和洛杉矶之间的距离，然后以千米为单位评估了准确性。

## 6. 结论
在这篇文章中，我们看到了三种在Java中计算两个地理点之间距离的方法。我们从最不准确的等距圆柱投影近似开始。然后我们看了更准确的Haversine公式。最后，我们使用了最准确的Vincenty公式。

正如往常一样，示例中使用的代码可以在GitHub上找到。