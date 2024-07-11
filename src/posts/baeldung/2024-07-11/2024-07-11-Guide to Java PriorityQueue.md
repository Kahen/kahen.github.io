---
date: 2022-04-01
category:
  - Java
  - PriorityQueue
tag:
  - Java
  - PriorityQueue
head:
  - - meta
    - name: keywords
      content: Java, PriorityQueue, 优先队列, 排序
---
# Java优先队列指南

在这篇简短的教程中，我们将讨论Java优先队列的实现。首先，我们将看到标准用法，并展示一些通过自然顺序和逆序排序队列的示例。最后，我们将看到如何使用Java _Comparator_ 定义自定义顺序。

## **2. java.util.PriorityQueue**

java.util.PriorityQueue 类从JDK 1.5开始提供，它还包含其他 _AbstractQueue_ 的实现。**正如我们从它的名字可以推断的，我们使用 _PriorityQueue_ 来维持给定集合中的一个定义好的顺序：队列的第一个元素（_head_）是根据我们指定的顺序来说最小的元素。** 队列的每个检索操作（_poll_, _remove_, 或 _peek_）读取队列的头部。

在内部，_PriorityQueue_ 依赖于一个对象数组。如果初始指定的容量（在JDK 17中默认为11）不足以存储所有项目，则此数组会自动调整大小。虽然给 _PriorityQueue_ 一个初始容量不是必须的，但如果我们已经知道我们的 _collection_ 的大小，我们可以避免自动调整大小，这会消耗我们最好节省的CPU周期。

在Javadoc中，它指定这个实现对入队和出队方法（_offer_, _poll_, _remove_ 和 _add_）需要O(log(n))时间。这要归功于不断维护的平衡二叉堆数据结构，它对 _Queue_ 的每次编辑都进行维护。它保证 _remove(Object)_ 和 _contains(Object)_ 方法的线性时间，以及检索方法（_peek_, _element_, 和 _size_）的常数时间。

## **3. 自然顺序和逆序排序**

在之前的文章中，我们展示了如何根据自然顺序对插入到_PriorityQueue_中的元素进行排序。这是因为用null _Comparator_ 初始化优先队列将直接使用 _compare_ 操作对元素进行排序。

**例如，现在让我们看看通过提供一个标准的 _Integer_ 自然排序比较器或null，队列将以相同的方式排序**：

```java
PriorityQueue```<Integer>``` integerQueue = new PriorityQueue<>();
PriorityQueue```<Integer>``` integerQueueWithComparator = new PriorityQueue<>(Integer::compare);

integerQueueWithComparator.add(3);
integerQueue.add(3);

integerQueueWithComparator.add(2);
integerQueue.add(2);

integerQueueWithComparator.add(1);
integerQueue.add(1);

assertThat(integerQueue.poll())
      .isEqualTo(1)
      .isEqualTo(integerQueueWithComparator.poll());

assertThat(integerQueue.poll())
      .isEqualTo(2)
      .isEqualTo(integerQueueWithComparator.poll());

assertThat(integerQueue.poll())
      .isEqualTo(3)
      .isEqualTo(integerQueueWithComparator.poll());
```

现在让我们创建一个以逆自然顺序排序的 _PriorityQueue_。我们可以通过使用 _静态_ 方法 _java.util.Collections.reverseOrder()_ 来实现：

```java
PriorityQueue```<Integer>``` reversedQueue = new PriorityQueue<>(Collections.reverseOrder());

reversedQueue.add(1);
reversedQueue.add(2);
reversedQueue.add(3);

assertThat(reversedQueue.poll()).isEqualTo(3);
assertThat(reversedQueue.poll()).isEqualTo(2);
assertThat(reversedQueue.poll()).isEqualTo(1);
```

## **4. 自定义排序**

现在让我们尝试为自定义类定义一个特殊的排序。首先，该类应该实现 _Comparable_ 接口，或者我们应该在 _Queue_ 的实例化中提供 _Comparator_，否则将抛出 _ClassCastException_。

例如，让我们创建一个 _ColoredNumber_ 类来演示这种行为：

```java
public class ColoredNumber {

   private int value;
   private String color;

   public ColoredNumber(int value, String color) {
       this.value = value;
       this.color = color;
   }
   // getters and setters...
}
```

**当我们尝试在 _PriorityQueue_ 中使用这个类时，它会抛出异常**：

```java
PriorityQueue`<ColoredNumber>` queue = new PriorityQueue<>();
queue.add(new ColoredNumber(3,"red"));
queue.add(new ColoredNumber(2, "blue"));
```

**这是因为 _PriorityQueue_ 不知道如何通过比较将 _ColoredNumber_ 对象与其他同一类的对象进行排序**。

我们可以通过在构造函数中提供 _Comparator_ 来提供排序，就像我们在前面的例子中所做的，或者我们可以实现 _Comparable_ 接口：

```java
public final class ColoredNumberComparable implements Comparable``<ColoredNumberComparable>`` {
// ...

@Override
public int compareTo(ColoredNumberComparable o) {
   if ((this.color.equals("red") && o.color.equals("red")) ||
           (!this.color.equals("red") && !o.color.equals("red"))) {
       return Integer.compare(this.value, o.value);
   }
   else if (this.color.equals("red")) {
       return -1;
   }
   else {
       return 1;
   }
}
```

这将保证每个项目都将根据“红色”颜色首先排序，然后是自然排序的值，这意味着所有红色对象将首先返回：

```java
PriorityQueue``<ColoredNumberComparable>`` queue = new PriorityQueue<>();
queue.add(new ColoredNumberComparable(10, "red"));
queue.add(new ColoredNumberComparable(20, "red"));
queue.add(new ColoredNumberComparable(1, "blue"));
queue.add(new ColoredNumberComparable(2, "blue"));

ColoredNumberComparable first = queue.poll();
assertThat(first.getColor()).isEqualTo("red");
assertThat(first.getValue()).isEqualTo(10);

queue.poll();

ColoredNumberComparable third = queue.poll();
assertThat(third.getColor()).isEqualTo("blue");
assertThat(third.getValue()).isEqualTo(1);
```

关于多线程的最后说明：这个Java实现的优先队列不是 _synchronized_，这意味着多个线程不应该同时使用同一个Java _PriorityQueue_ 实例。

如果多个线程需要访问 _PriorityQueue_ 实例，我们应该使用线程安全的 _java.util.concurrent.PriorityBlockingQueue_ 类。 

## **5. 结论**

在这篇文章中，我们已经看到了Java _PriorityQueue_ 实现是如何工作的。我们从JDK内部的类和它们的性能开始，然后展示了具有自然排序和逆序排序的 _PriorityQueue_。最后，我们提供了一个自定义类的用户定义 _Comparable_ 实现，并验证了其排序行为。

如往常一样，代码可以在GitHub上找到。