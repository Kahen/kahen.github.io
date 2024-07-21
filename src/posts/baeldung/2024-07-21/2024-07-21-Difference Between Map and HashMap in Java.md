---
date: 2022-02-01
category:
  - Java
tag:
  - Map
  - HashMap
head:
  - - meta
    - name: keywords
      content: Java, Map, HashMap, 接口, 实现, 抽象
---
# Java中Map与HashMap的区别 | Baeldung

## 1. 概述

**Map和HashMap之间的区别在于，前者是一个接口，而后者是一个实现。**然而，在本文中，我们将更深入地探讨接口的用途。同时，我们将学习如何使用接口使代码更加灵活，以及为什么我们有相同接口的不同实现。

## 2. 接口的目的

接口是一个只定义行为的契约。**实现特定接口的每个类都应该满足这个契约。**为了更好地理解它，我们可以从现实生活中举一个例子。想象一下汽车。每个人脑海中都会有不同的形象。术语“汽车”暗示了某些品质和行为。任何具有这些品质的对象都可以被称为汽车。这就是为什么我们每个人想象的汽车都不同。

接口的工作原理相同。Map是一个抽象，定义了某些品质和行为。只有具有所有这些品质的类才能成为Map。

## 3. 不同的实现

我们有Map接口的不同实现，原因与我们有不同型号的汽车相同。所有实现都服务于不同的目的。**不可能找到总体上的最佳实现。只有针对某种目的的最佳实现。**尽管跑车速度快，看起来很酷，但它不是家庭野餐或去家具店旅行的最佳选择。

HashMap是Map接口最简单的实现，并提供了基本功能。大多数情况下，这种实现涵盖了所有需求。另外两个广泛使用的实现是TreeMap和LinkedHashMap，它们提供了额外的功能。

这里是一个更详细但不完整的层次结构：

## 4. 针对实现编程

想象一下，我们想在控制台打印HashMap的键和值：

```java
public class HashMapPrinter {
    public void printMap(final HashMap```````<?, ?>``````` map) {
        for (final Entry```````<?, ?>``````` entry : map.entrySet()) {
            System.out.println(entry.getKey() + " " + entry.getValue());
        }
    }
}
```

这是一个完成工作的小程序。然而，它存在一个问题。它只能与HashMap一起工作。因此，任何尝试将TreeMap或甚至是通过Map引用的HashMap传递到方法中都将导致编译错误：

```java
public class Main {
    public static void main(String[] args) {
        Map``````<String, String>`````` map = new HashMap<>();
        HashMap``````<String, String>`````` hashMap = new HashMap<>();
        TreeMap``````<String, String>`````` treeMap = new TreeMap<>();

        HashMapPrinter hashMapPrinter = new HashMapPrinter();
        hashMapPrinter.printMap(hashMap);
//        hashMapPrinter.printMap(treeMap); 编译时错误
//        hashMapPrinter.printMap(map); 编译时错误
    }
}
```

让我们尝试理解为什么会发生这种情况。在这两种情况下，编译器不能确定在该方法内部，是否会调用HashMap特定的方法。

TreeMap位于Map实现的不同分支上（无意双关），因此它可能缺少在HashMap中定义的某些方法。

在第二种情况下，尽管实际的底层对象类型是HashMap，但它是通过Map接口引用的。因此，这个对象只能公开定义在Map中而不是在HashMap中的方法。

**因此，即使我们的HashMapPrinter是一个非常简单的类，它也太具体了。**通过这种方法，我们将需要为每种Map实现创建一个特定的Printer。

## 5. 针对接口编程

通常，初学者对于“针对接口编程”或“对接口编码”的表达感到困惑。让我们考虑以下示例，这将使它更清晰一些。我们将参数的类型更改为尽可能通用的类型，即Map：

```java
public class MapPrinter {
    public void printMap(final Map```````<?, ?>``````` map) {
        for (final Entry```````<?, ?>``````` entry : map.entrySet()) {
            System.out.println(entry.getKey() + " " + entry.getValue());
        }
    }
}
```

正如我们所看到的，实际实现保持不变，唯一的变化是参数的类型。这表明方法没有使用HashMap的任何特定方法。所有需要的功能已经在Map接口中定义了，即entrySet()方法。

结果，这个小小的变化产生了巨的差异。现在，这个类可以与任何Map实现一起工作：

```java
public class Main {
    public static void main(String[] args) {
        Map``````<String, String>`````` map = new HashMap<>();
        HashMap``````<String, String>`````` hashMap = new HashMap<>();
        TreeMap``````<String, String>`````` treeMap = new TreeMap<>();

        MapPrinter mapPrinter = new MapPrinter();
        mapPrinter.printMap(hashMap);
        mapPrinter.printMap(treeMap);
        mapPrinter.printMap(map);
    }
}
```

**针对接口编码帮助我们创建了一个通用的类，它可以与Map接口的任何实现一起工作。**这种方法可以消除代码重复，并确保我们的类和方法具有明确定义的目的。

## 6. 接口的使用场合

总的来说，参数应该是尽可能通用的类型。我们在前面的例子中看到，方法签名的一个简单变化如何能够改善我们的代码。我们应该采用相同方法的另一个地方是构造函数：

```java
public class MapReporter {
    private final Map```````<?, ?>``````` map;

    public MapReporter(final Map```````<?, ?>``````` map) {
        this.map = map;
    }

    public void printMap() {
        for (final Entry```````<?, ?>``````` entry : this.map.entrySet()) {
            System.out.println(entry.getKey() + " " + entry.getValue());
        }
    }
}
```

这个类可以与任何Map实现一起工作，仅仅因为我们在构造函数中使用了正确的类型。

## 7. 结论

总结来说，在本教程中，我们讨论了为什么接口是抽象和定义契约的绝佳手段。使用尽可能通用的类型将使代码易于重用且易于阅读。同时，这种方法减少了代码量，这总是简化代码库的好方法。

如常，代码可以在GitHub上找到。