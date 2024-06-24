---
date: 2024-06-24
category:
  - Java
  - PriorityQueue
tag:
  - PriorityQueue
  - iterator
  - Java
head:
  - - meta
    - name: keywords
      content: PriorityQueue, iterator, Java, 优先队列, 迭代器

---
# Java 中 PriorityQueue 的 iterator() 方法

1. 引言

在 PriorityQueue 中，一个关键的方法是 iterator() 方法。这个方法允许我们无缝地遍历存储在队列中的元素。在本教程中，我们将探索 iterator() 方法的功能，并展示其在不同场景中的有效使用。

2. PriorityQueue 概述

Java 中的 PriorityQueue 类作为一个数据结构，允许我们根据元素的优先级将元素存储在队列中。

PriorityQueue 内部使用二叉堆，这是一种树状结构，元素根据优先级进行排列。最高优先级的元素位于根节点，子节点继承其父节点的优先级。**这种排列确保了最高优先级的元素位于队列的最前面，而最低优先级的元素则位于队列的最后。**

此外，PriorityQueue 类实现了 Queue 接口，并提供了一系列方法来操作队列中的元素，包括 iterator() 方法。iterator() 方法是 Iterable 接口的一部分，用于获取集合元素的迭代器。iterator() 方法的定义如下：

```java
public Iterator`<E>` iterator()
```

iterator() 方法返回一个覆盖队列中元素的 Iterator。参数类型 E 指定了队列中元素的类型。这个方法不接受任何参数。

3. Iterator 特性

让我们深入了解迭代器的关键特性：

3.1. **快速失败保证**

由 iterator() 方法返回的迭代器是一个快速失败（fail-fast）迭代器。这意味着，如果在使用迭代器的过程中尝试修改队列（添加或删除元素），将会抛出 ConcurrentModificationException。这种行为确保了迭代器始终反映队列的当前状态。

在代码中，我们在获取迭代器后，通过添加一个额外的元素来修改 PriorityQueue：

```java
PriorityQueue````<Integer>```` numbers = new PriorityQueue<>();
numbers.add(3);
numbers.add(1);
numbers.add(2);

Iterator````<Integer>```` iterator = numbers.iterator();
numbers.add(4);

try {
    while (iterator.hasNext()) {
        System.out.println(iterator.next());
    }
} catch (ConcurrentModificationException e) {
    System.out.println("迭代期间发生了 ConcurrentModificationException。");
}
```

这个程序的输出将是：

```java
迭代期间发生了 ConcurrentModificationException。
```

3.2. 遍历顺序

iterator() 方法以特定的方式遍历堆结构，通常基于层次遍历方法。这意味着它按层次访问元素，从堆的顶部开始，然后向下工作。**这种方法对访问元素是高效的，但可能不总是产生严格的基于优先级的顺序。**

让我们看一个如何使用 iterator() 方法来迭代 PriorityQueue 中的元素的例子：

```java
PriorityQueue````<Integer>```` queue = new PriorityQueue<>();
queue.add(3);
queue.add(1);
queue.add(2);

Iterator````<Integer>```` iterator = queue.iterator();
while (iterator.hasNext()) {
    Integer element = iterator.next();
    System.out.println(element);
}
```

在这个例子中，我们创建了一个整数的 PriorityQueue 并添加了三个元素。然后我们获取了队列元素的迭代器，并使用 while 循环来迭代元素，将每一个元素打印到控制台。这个程序的输出将是：

```java
1
3
2
```

内部，PriorityQueue 看起来像：

```java
   1
  / \
 3   2
```

**在迭代期间，迭代器按层次顺序遍历元素，产生顺序 1, 3 和 2。**虽然这个顺序保持了堆的一般结构，但它并不严格遵循基于优先级的排序。

4. **Comparator 接口**

在某些情况下，我们可能想要根据自定义标准来对 PriorityQueue 中的元素进行排序。这可以通过使用 Comparator 接口来实现。这个接口允许我们定义一个比较函数，用于对队列中的元素进行排序。

Comparator 接口有一个单一的 compare() 方法，它接受两个相同类型的参数，并返回一个整数值。compare() 方法返回的值决定了队列中元素的排序。

让我们考虑以下例子，我们有一个 Person 类，要求是根据他们的年龄来优先排序。为此，我们将创建一个自定义比较器：

```java
class PersonAgeComparator implements Comparator```<Person>``` {
    @Override
    public int compare(Person p1, Person p2) {
        return p1.age - p2.age;
    }
}
```

随后，我们将创建一个自定义排序的 PriorityQueue。我们需要将 PersonAgeComparator 接口的实例传递给 PriorityQueue 的构造函数。然后队列中的元素将根据 Comparator 定义的比较函数进行排序：

```java
PriorityQueue```<Person>``` priorityQueue = new PriorityQueue<>(new PersonAgeComparator());

priorityQueue.add(new Person("Alice", 25));
priorityQueue.add(new Person("Bob", 30));
priorityQueue.add(new Person("Charlie", 22));

Iterator```<Person>``` iterator = priorityQueue.iterator();

while (iterator.hasNext()) {
    Person person = iterator.next();
    System.out.println("Name: " + person.name + ", Age: " + person.age);
}
```

这个程序的输出将是：

```java
Name: Charlie, Age: 22
Name: Bob, Age: 30
Name: Alice, Age: 25
```

5. **有序检索**

上一个例子中，即使我们使用了自定义的 Comparator，也没有显示出元素按照严格的升序年龄顺序排列。PriorityQueue 的内部结构在直接迭代时可能会导致意外的结果。**这是因为迭代器遵循层次遍历，这会在迭代期间产生不同的序列，因为它按层次访问元素。**

为了确保元素按照它们的优先级顺序被检索，我们可以使用 poll() 方法。这个方法专门从 PriorityQueue 中移除最高优先级的元素（在这种情况下是最小的年龄）并返回它。

让我们看看如何使用 poll() 方法按顺序检索元素：

```java
while (!priorityQueue.isEmpty()) {
    Person person = priorityQueue.poll();
    System.out.println("Name: " + person.name + ", Age: " + person.age);
}
```

现在这个程序的输出将是：

```java
Name: Charlie, Age: 22
Name: Alice, Age: 25
Name: Bob, Age: 30
```

6. **使用场景**

尽管 iterator() 可能不是严格有序检索的理想选择，但它在优先级顺序不重要的场景中表现出色 —— 例如，在 PriorityQueue 中大写人的名字或计算平均年龄，无论优先级如何。让我们用一个例子来说明使用场景：

```java
while (iterator.hasNext()) {
    Person person = iterator.next();
    person.setName(person.getName().toUpperCase());
}
```

7. **结论**

在本文中，我们探讨了 Java 中的 PriorityQueue 类，强调了 iterator() 方法的作用。需要注意的是，尽管 PriorityQueue 在内部保持了排序顺序，但 iterator() 方法并不保证以该顺序遍历。因此，我们使用 iterator() 方法来执行不依赖于优先级顺序的操作。

如常，代码可在 GitHub 上找到。

OK