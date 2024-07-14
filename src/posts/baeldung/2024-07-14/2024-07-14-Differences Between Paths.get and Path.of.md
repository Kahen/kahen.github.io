---
date: 2022-04-01
category:
  - Java
  - NIO
tag:
  - Paths.get
  - Path.of
head:
  - - meta
    - name: keywords
      content: Java, NIO, Paths.get, Path.of
---
# Java中Paths.get()和Path.of()的区别

在这篇文章中，我们将讨论Paths.get()和Path.of()方法之间的相似之处和差异。

## 2. 相同的行为
Path.of()方法接受一个URI作为参数，并将其转换为相关对象的Path。

现在让我们来看看Paths.get()的代码：
```java
public final class Paths {
    public static Path get(URI uri) {
        return Path.of(uri);
    }
}
```
**正如我们所看到的，Paths.get()所做的就是调用Path.of()。因此，这两种方法返回相同的结果。**

## 3. 两种方法之间的区别
现在我们将讨论这两种方法之间的区别。

### 3.1. 引入版本
**在Java 8之前，接口中不能定义默认的静态方法。**因此Path需要一个伴侣接口Paths。所有工厂方法当时都在Paths中定义。

然后这个限制被移除，在Java 11中，工厂方法的代码最终被移动到了Path接口。此外，Paths.get()的代码也更新为调用Path.of()。Paths.get()确实被保留以确保向后兼容。

### 3.2. 命名模式
代码不仅被移动，工厂方法的名称也发生了变化。原始名称的问题在于它看起来像是一个getter。然而，Paths.get()并没有获取Paths对象所拥有的任何东西。**Java中静态工厂方法的标准名称是of。**例如，EnumSet.of()遵循这个模式。因此，新方法被命名为Path.of()以保持一致性。

## 4. 我们应该使用哪一个？
如果我们使用的是Java 7到10之间的版本，我们别无选择，只能使用Paths.get()。**否则，如果我们使用的是更高版本，我们应该选择Path.of()。**Paths类可能确实会在未来的Java版本中被弃用，正如类注释中所提到的。此外，直接使用Path的工厂方法可以节省一个额外的输入。

## 5. 结论
在本教程中，我们理解了这两个相同的方法Paths.get()和Path.of()由于一些历史原因而共存。我们分析了它们的差异，并根据我们的情况得出了最合适的选择。