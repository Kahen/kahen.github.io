---
date: 2022-04-01
category:
  - Java
  - Collection Framework
tag:
  - Iterable
  - Iterator
head:
  - - meta
    - name: keywords
      content: Java, Iterable, Iterator, Collection Framework
---
# Java 中 Iterable 和 Iterator 接口的区别及使用方式

在本教程中，我们将探讨 Java 中 Iterable 和 Iterator 接口的用法以及它们之间的区别。

## 2. Iterable 接口

Iterable 接口属于 java.lang 包。它表示可以被迭代的数据结构。

Iterable 接口提供了一个方法来产生一个 Iterator。使用 Iterable 时，我们不能通过索引获取元素。同样，我们也不能从数据结构中获取第一个或最后一个元素。

所有 Java 集合都实现了 Iterable 接口。

### 2.1 迭代 Iterable

我们可以使用增强型 for 循环（也称为 for-each 循环）来迭代集合中的元素。然而，只有实现了 Iterable 接口的对象才能在此类语句中使用。同样，我们也可以结合使用 while 语句和 Iterator 来迭代元素。

让我们看一个使用 for-each 语句迭代 List 中元素的例子：

```java
List```````<Integer>``````` numbers = getNumbers();
for (Integer number : numbers) {
    System.out.println(number);
}
```

同样，我们可以使用 forEach() 方法结合 lambda 表达式：

```java
List```````<Integer>``````` numbers = getNumbers();
numbers.forEach(System.out::println);
```

### 2.2 实现 Iterable 接口

自定义实现 Iterable 接口在我们需要迭代自定义数据结构时非常有用。

让我们从一个表示购物车并使用数组存储元素的类开始。我们不会直接在数组上调用 for-each 循环。相反，我们将实现 Iterable 接口。我们不希望我们的客户端依赖于选择的数据结构。如果我们提供迭代的能力，我们可以轻松地使用不同的数据结构而不需要客户端更改代码。

ShoppingCart 类实现了 Iterable 接口并覆盖了它的 iterator() 方法：

```java
public class ShoppingCart````<E>```` implements Iterable````<E>```` {

    private E[] elementData;
    private int size;

    public void add(E element) {
        ensureCapacity(size + 1);
        elementData[size++] = element;
    }

    @Override
    public Iterator````<E>```` iterator() {
        return new ShoppingCartIterator();
    }
}
```

add() 方法将元素存储在数组中。由于数组的大小和容量是固定的，我们使用 ensureCapacity() 方法来扩展元素的最大数量。

每次对自定义数据结构调用 iterator() 方法都会产生一个新的 Iterator 实例。我们创建一个新实例，因为迭代器负责维护当前迭代状态。

通过提供 iterator() 方法的具体实现，我们可以使用增强型 for 语句来迭代实现类的实例。

现在，让我们在 ShoppingCart 类中创建一个内部类来表示我们的自定义迭代器：

```java
public class ShoppingCartIterator implements Iterator````<E>```` {
    int cursor;
    int lastReturned = -1;

    public boolean hasNext() {
        return cursor != size;
    }

    public E next() {
        return getNextElement();
    }

    private E getNextElement() {
        int current = cursor;
        exist(current);

        E[] elements = ShoppingCart.this.elementData;
        validate(elements, current);

        cursor = current + 1;
        lastReturned = current;
        return elements[lastReturned];
    }
}
```

最后，让我们创建一个可迭代类的实例，并在增强型 for 循环中使用它：

```java
ShoppingCart`<Product>` shoppingCart  = new ShoppingCart<>();
shoppingCart.add(new Product("Tuna", 42));
shoppingCart.add(new Product("Eggplant", 65));
shoppingCart.add(new Product("Salad", 45));
shoppingCart.add(new Product("Banana", 29));

for (Product product : shoppingCart) {
   System.out.println(product.getName());
}
```

## 3. Iterator 接口

Iterator 是 Java Collections Framework 的成员。它属于 java.util 包。这个接口允许我们在迭代过程中检索或从集合中移除元素。

此外，它还有两个方法来帮助我们迭代数据结构并检索其元素——next() 和 hasNext()。

此外，remove() 方法可以移除 Iterator 指向的当前元素。

最后，forEachRemaining(Consumer`<? super E>` action) 方法对数据结构中的每个剩余元素执行给定的操作。

### 3.1 迭代 Collection

让我们看看如何迭代一个 Integer 元素的 List。在示例中，我们将结合使用 while 循环和 hasNext() 和 next() 方法。

List 接口是 Collection 的一部分，因此它扩展了 Iterable 接口。要从集合中获取迭代器，我们只需要调用 iterator() 方法：

```java
List```````<Integer>``````` numbers = new ArrayList<>();
numbers.add(10);
numbers.add(20);
numbers.add(30);
numbers.add(40);

Iterator```````<Integer>``````` iterator = numbers.iterator();
```

此外，我们可以通过调用 hasNext() 方法来检查迭代器是否还有剩余元素。之后，我们可以通过调用 next() 方法来获取一个元素：

```java
while (iterator.hasNext()) {
   System.out.println(iterator.next());
}
```

next() 方法返回迭代中的下一个元素。另一方面，如果没有这样的元素，它会抛出 NoSuchElementException。

### 3.2 实现 Iterator 接口

现在，我们将实现 Iterator 接口。自定义实现在我们需要使用条件元素检索来迭代集合时非常有用。例如，我们可以使用自定义迭代器来迭代奇数或偶数。

为了说明，我们将从给定集合中迭代质数。我们知道，如果一个数字只能被1和自己整除，那么它被认为是质数。

首先，让我们创建一个包含数字元素集合的类：

```java
class Numbers {

    private static final List```````<Integer>``````` NUMBER_LIST =
      Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
}
```

此外，让我们定义 Iterator 接口的具体实现：

```java
private static class PrimeIterator implements Iterator```````<Integer>``````` {

    private int cursor;

    @Override
    public Integer next() {
        exist(cursor);
        return NUMBER_LIST.get(cursor++);
    }

    @Override
    public boolean hasNext() {
        if (cursor > NUMBER_LIST.size()) {
            return false;
        }

        for (int i = cursor; i < NUMBER_LIST.size(); i++) {
            if (isPrime(NUMBER_LIST.get(i))) {
                cursor = i;
                return true;
            }
        }

        return false;
    }
}
```

具体实现通常是作为内部类创建的。此外，它们负责维护当前迭代状态。在上面的例子中，我们在实例变量中存储了下一个质数的当前位置。每次我们调用 next() 方法时，该变量将包含下一个质数的索引。

任何 next() 方法的实现在没有更多元素时都应该抛出 NoSuchElementException 异常。否则，迭代可能会导致意外的行为。

让我们在 Number 类中定义一个方法，返回一个新的 PrimeIterator 类的实例：

```java
public static Iterator```````<Integer>``````` iterator() {
    return new PrimeIterator();
}
```

最后，我们可以在 while 语句中使用我们的自定义迭代器：

```java
Iterator```````<Integer>``````` iterator = Numbers.iterator();

while (iterator.hasNext()) {
   System.out.println(iterator.next());
}
```

总结来说，以下表格显示了 Iterable 和 Iterator 接口之间的主要区别：

| Iterable | Iterator |
| --- | --- |
| 表示可以使用 for-each 循环迭代的集合 | 表示可以用来迭代集合的接口 |
| 实现 Iterable 时，我们需要覆盖 iterator() 方法 | 实现 Iterator 时，我们需要覆盖 hasNext() 和 next() 方法 |
| 不存储迭代状态 | 存储迭代状态 |
| 迭代期间不允许移除元素 | 迭代期间允许移除元素 |

## 5. 结论

在本文中，我们探讨了 Java 中 Iterable 和 Iterator 接口的区别及其用法。

如常，示例的源代码可以在 GitHub 上找到。