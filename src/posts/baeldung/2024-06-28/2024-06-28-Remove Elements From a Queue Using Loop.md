---
date: 2022-04-01
category:
  - Java
  - Tutorials
tag:
  - Queue
  - Java
head:
  - - meta
    - name: keywords
      content: Java, Queue, remove elements, loop
------
# 从队列中使用循环删除元素

## 1. 引言

计算机科学中的一种基本数据结构称为队列，它遵循先进先出（FIFO）的原则。此外，队列过程涉及将项目添加到尾部并在头部删除它们，这在Java的_Queue_接口中提供。

然而，在某些情况下，根据特定条件从队列中删除一些元素将是必需的。

**在本教程中，我们将讨论使用Java中的循环从队列中删除元素。**

## 2. 从队列中删除偶数

在删除元素时，可以根据自定义条件从队列中删除元素。如果它是一个只包含偶数值的整数队列，让我们尝试根除们。为此，我们将使用循环遍历队列并删除所有偶数，如下所示：

```java
@Test
public void givenQueueWithEvenAndOddNumbers_whenRemovingEvenNumbers_thenOddNumbersRemain() {
    Queue``<Integer>`` queue = new LinkedList<>();
    queue.add(1);
    queue.add(2);
    queue.add(3);
    queue.add(4);
    queue.add(5);

    Queue``<Integer>`` oddElementsQueue = new LinkedList<>();

    while (queue.peek() != null) {
        int element = queue.remove();
        if (element % 2 != 0) {
            oddElementsQueue.add(element);
        }
    }

    assertEquals(3, oddElementsQueue.size());
    assertTrue(oddElementsQueue.contains(1));
    assertTrue(oddElementsQueue.contains(3));
    assertTrue(oddElementsQueue.contains(5));
}
```

在上面的测试方法中，我们首先初始化一个包含数字（1、2、3、4和5）的新队列和一个名为_oddElementsQueue_的空队列。**此外，我们使用一个_while_循环一次一个地从队列中删除元素，直到它变空。如果元素是奇数，它将被添加到_oddElementsQueue_。**最后，测试_asserts_使用_assertTrue_方法断言_oddElementsQueue_包含三个元素，即奇数1、3和5。

## 3. 删除以特定字母开头的字符串

假设我们有一个字符串队列，我们希望删除以特定字母开头的字符串。让我们以以下示例为例：

```java
@Test
public void givenStringQueue_whenRemovingStringsThatStartWithA_thenStringElementsRemain() {
    Queue``<String>`` queue = new LinkedList<>();
    queue.add("Apple");
    queue.add("Banana");
    queue.add("Orange");
    queue.add("Grape");
    queue.add("Mango");

    Queue``<String>`` stringElementsQueue = new LinkedList<>();

    while (queue.peek() != null) {
        String element = queue.remove();
        if (!element.startsWith("A")) {
            stringElementsQueue.add(element);
        }
    }

    assertEquals(4, stringElementsQueue.size());
    assertTrue(stringElementsQueue.contains("Banana"));
    assertTrue(stringElementsQueue.contains("Orange"));
    assertTrue(stringElementsQueue.contains("Grape"));
    assertTrue(stringElementsQueue.contains("Mango"));
}
```

在上述代码中，我们遍历队列中的元素，直到它变空。我们还检查如果此元素不以字母“A”开头，它将被添加到_stringElementsQueue_队列中。最后，我们使用_asserts_来验证_stringElementsQueue_包含四个元素，特别是字符串（_“Apple”_、_“Banana”_、_“Orange”_、_“Grape”_和_“Mango”_）使用_assertTrue_方法。

## 4. 结论

在本教程中，我们通过while循环在Java中查看了如何从队列中删除元素。我们讨论了两种情况：如何在队列中取出偶数，以及另一种情况，即可以选择性地删除以特定字母开头的字符串。

学习如何操作队列在Java中非常重要，因为它是您整体编程知识的一部分。

如常，本文的完整代码示例可以在GitHub上找到。