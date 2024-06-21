---
date: 2024-06-20
category:
  - Java
  - Collections
tag:
  - Immutable
  - Unmodifiable
head:
  - - meta
    - name: keywords
      content: Java, Collections, Immutable, Unmodifiable
---
# Java中的不可变与不可修改集合

在本教程中，我们将探讨Java中除了常见的_Collection_类之外的两种集合类型。众所周知，我们有三个核心集合类：_Map_、_List_和_Set_。它们有对应的**不可修改**和**不可变版本**。

在我们的示例中，我们涵盖了Java中的_Map_系列集合。_Collections.unmodifiableMap()_和_Map.of()_方法适用于_Map_，而_Collections.unmodifiableList()_、_Collections.unmodifiableSet()_、_List.of()_和_Set.of()_是_List_和_Set_集合类的相应实用方法。相同的概念也适用于_List_和_Set_集合类。

### 不可修改集合
不可修改集合是一个可变集合的包装器，它通过包装器引用阻止修改。我们可以通过使用实用方法来获得不可修改的引用，例如Java_Map_集合中的_unmodifiableMap()_：

```java
Map`````<String, String>````` modifiableMap = new HashMap<>();
modifiableMap.put("name1", "Michael");
modifiableMap.put("name2", "Harry");
```

这里，_modifiableMap_是对映射集合的引用。我们在映射中放入了两对键值对。接下来，我们使用_Collections.unmodifiableMap()_实用方法获得_unmodifiableMap_：

```java
Map`````<String, String>````` unmodifiableMap = Collections.unmodifiableMap(modifiableMap);
```

我们获得了对底层集合的新引用_unmodifiableMap_。这个不可修改的引用特别之处在于我们不能用它来添加或删除映射中的条目。但这并不影响底层集合或其他引用变量_modifiableMap_。我们仍然可以使用初始_modifiableMap_引用向集合中添加更多的键值对：

```java
modifiableMap.put("name3", "Micky");
```

集合的更改也会通过新引用变量_unmodifiableMap_反映出来：

```java
assertEquals(modifiableMap, unmodifiableMap);
assertTrue(unmodifiableMap.containsKey("name3"));
```

现在让我们尝试使用_unmodifiableMap_引用变量放入一个条目。预计操作将被禁止，并将抛出异常：

```java
assertThrows(UnsupportedOperationException.class, () -> unmodifiableMap.put("name3", "Micky"));
```

两个引用_modifiableMap_和_unModifiableMap_指向内存中的同一个映射，但它们的行为不同。一个可以自由地操作映射，而另一个不能执行任何通过添加或删除项目来修改集合的操作。

### 不可变集合
**不可变集合在其生命周期内保持不可变，没有任何可修改的引用指向它们**。不可变集合解决了我们能够使用其他引用修改不可修改集合的问题。要在Java中创建_Immutable_集合，我们有实用方法_Map.of()_或_List.of()_。我们创建的任何新引用也将始终是不可变的：

```java
@Test
public void givenImmutableMap_WhenPutNewEntry_ThenThrowsUnsupportedOperationException() {
    Map`````<String, String>````` immutableMap = Map.of("name1", "Michael", "name2", "Harry");

    assertThrows(UnsupportedOperationException.class, () -> immutableMap.put("name3", "Micky"));
}
```

当我们尝试向_immutableMap_放入一个条目时，我们会立即遇到_UnsupportedOperationException_异常。_Map.copyOf()_返回的引用指向底层映射，该映射也是不可变的：

```java
@Test
public void givenImmutableMap_WhenUsecopyOf_ThenExceptionOnPut() {
    Map`````<String, String>````` immutableMap = Map.of("name1", "Michael", "name2", "Harry");
    Map`````<String, String>````` copyOfImmutableMap = Map.copyOf(immutableMap);

    assertThrows(UnsupportedOperationException.class, () -> copyOfImmutableMap.put("name3", "Micky"));
}
```

因此，如果我们想确保没有任何其他引用可以修改我们的集合，我们必须在Java中使用_Immutable_集合。

### 不可变和不可修改集合的考虑
#### 4.1. 线程安全
不可变类原则上是线程安全的，因为多个线程可以同时访问它们而不必担心更改底层集合。使用不可变集合可以防止多个线程覆盖状态，从而实现线程安全的设计。线程安全意味着在使用并发环境中不需要显式的同步。这也简化了并发编程，消除了对任何锁等的需求。

#### 4.2. 性能
不可修改或不可变集合的性能与相应的可变集合相比较差。要更新，我们不能进行就地更新。相反，我们必须创建对象的新副本。这增加了开销，导致性能不佳。此外，由于创建了新实例，它们可能比可变对应物具有更高的内存使用率。然而，在频繁读取和不频繁写入的场景中，不可变集合表现出色。

#### 4.3. 可变对象
我们必须确保添加到不可变集合中的可变对象被防御性复制，以防止外部修改。在多线程环境中，将需要集合及其包含的可变对象的线程安全性。

### 结论
在本文中，我们仔细检查了_Map_、_List_和_Set_等集合类的_Immutable_和_Unmodifiable_版本。当我们需要通过特定引用保持集合不变但仍然希望原始集合是可变的时，不可修改集合是合适的。另一方面，当我们想要确保无论如何都不修改集合时，不可变集合是理想的选择。我们还讨论了一些常见的用例。如常，本文的源代码可以在GitHub上找到。

评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。翻译已经完成，以下是翻译的剩余部分：

### 不可变和不可修改集合的考虑

#### 4.1. 线程安全
不可变类从原则上来说是线程安全的，因为多个线程可以同时访问它们而不用担心底层集合被修改。使用不可变集合可以防止多个线程覆盖状态，实现线程安全的设计。线程安全意味着在并发环境中使用时不需要显式的同步。这也简化了并发编程，消除了对锁等的需求。

#### 4.2. 性能
与相应的可变集合相比，不可修改不可变集合的性能较差。要更新时，我们不能进行就地更新。相反，我们必须创建对象的新副本。这增加了开销，导致性能不佳。此外，由于创建了新实例，它们可能比可变对应物具有更高的内存使用率。然而，在频繁读取和不频繁写入的场景中，不可变集合表现出色。

#### 4.3. 可变对象
我们必须确保添加到不可变集合中的可变对象被防御性复制，以防止外部修改。在多线程环境中，需要集合及其包含的可变对象都是线程安全的。

### 结论
在本文中，我们详细检查了Map、List和Set等集合类的不可变和不可修改版本。不可修改集合适用于我们需要通过特定引用保持集合不变，但仍然希望原始集合是可变的情况。另一方面，不可变集合是在我们想要确保无论如何都不修改集合时的理想选择。我们还讨论了一些常见用例。如常，本文的源代码可以在GitHub上找到。

评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。

OK