---
date: 2022-04-01
category:
  - Java
tag:
  - Enumeration
  - Iterator
head:
  - - meta
    - name: keywords
      content: Java, Enumeration, Iterator, 迭代器, 枚举
---

# Java中的枚举与迭代器的区别 | Baeldung

在本教程中，我们将学习Java中的_Enumeration_和_Iterator_。我们还将了解如何在代码中使用它们以及它们之间的差异。

### 2.1. _Enumeration_
_Enumeration_自Java 1.0版本以来就存在。它是一个接口，任何实现都**允许逐个访问元素**。简单来说，它用于迭代诸如_Vector_和_Hashtable_的对象集合。

让我们看一个_Enumeration_的例子：
```
Vector````<Person>```` people = new Vector<>(getPersons());
Enumeration````<Person>```` enumeration = people.elements();
while (enumeration.hasMoreElements()) {
    System.out.println("First Name = " + enumeration.nextElement().getFirstName());
}
```
这里，我们使用_Enumeration_打印_Person_的_firstName_。_elements()_方法提供了对_Enumeration_的引用，通过使用它我们可以逐个访问元素。

### 2.2. _Iterator_
_Iterator_自Java 1.2版本以来就存在，并且**用于迭代在同一版本中引入的集合**。

接下来，让我们使用_Iterator_打印_Person_的_firstName_。_iterator()_提供了对_Iterator_的引用，通过使用它我们可以逐个访问元素：
```
List````<Person>```` persons = getPersons();
Iterator````<Person>```` iterator = persons.iterator();
while (iterator.hasNext()) {
    System.out.println("First Name = " + iterator.next().getFirstName());
}
```
所以，我们可以看到**_Enumeration_和_Iterator_分别自Java 1.0和1.2以来就存在，并且都用于一次迭代一个对象集合**。

在这个表中，我们将理解_Enumeration_和_Iterator_之间的差异：

| Enumeration | Iterator |
| --- | --- |
| 自Java 1.0以来存在，用于枚举_Vectors_和_Hashtables_ | 自Java 1.2以来存在，用于迭代诸如_List_, _Set_, _Map_等集合 |
| 包含两个方法：_hasMoreElements()_和_nextElement()_ | 包含三个方法：_hasNext()_, _next()_ 和 _remove()_ |
| 方法名称较长 | 方法名称简短且简洁 |
| 在迭代时没有方法可以移除元素 | 有_remove()_方法可以在迭代时移除元素 |
| Java 9中添加的_asIterator()_在_Enumeration_之上提供了_Iterator_。然而，这个特定情况下的_remove()_会抛出_UnsupportedOperationException_ | Java 8中添加的_forEachRemaining()_对剩余元素执行操作 |

## 4. 结论
在本文中，我们理解了_Enumeration_和_Iterator_，如何使用代码示例使用它们，以及它们之间的各种差异。

本文中使用的所有代码示例都可以在GitHub上找到。