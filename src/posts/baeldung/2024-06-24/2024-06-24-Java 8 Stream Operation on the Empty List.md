---
date: 2024-06-25
category:
  - Java
  - Stream API
tag:
  - Java 8
  - Stream操作
head:
  - - meta
    - name: keywords
      content: Java 8, Stream API, 空列表, 数据流操作
---

# Java 8 空列表上的 Stream 操作 | Baeldung

## 1. 引言

Java 8 通过引入 Stream API，改变了我们处理集合和数据操作的方式，带来了范式的转变。Stream API 提供了一种简洁而富有表现力的方式来对数据执行操作，使开发者能够编写更易读、更健壮、更高效的代码。

在本教程中，我们将深入探讨 Stream 操作的有趣世界，重点关注空列表。虽然使用空列表工作可能看起来微不足道，但它揭示了 Stream API 的一些强大方面。

## 2. 将空列表转换为 Stream

我们可以很容易地使用 stream() 方法从空列表中获得 Stream：

```java
List```````<String>``````` emptyList = new ArrayList<>();
Stream```````<String>``````` emptyStream = emptyList.stream();
```

这使我们能够像对非空列表一样对空列表执行各种 Stream 操作。然而，**我们必须注意，由于 Stream 的来源是空的，操作的结果可能是空的。** 此外，探索在 Java 中使用空 Stream 可能更有趣。

## 3. 空 Stream 在处理 NullPointerException 中的重要性

使用空列表的 Stream 的一个显著优点是防止 NullPointerException。让我们考虑以下示例，其中 getList() 方法可能返回 null：

```java
List```````<String>``````` nameList = getList(); // 假设 getList() 可能返回 null

// 非 Stream 方法
if (nameList != null) {
    for (String str : nameList) {
        System.out.println("Length of " + name + ": " + name.length());
    }
}
```

在这里，非 Stream 方法中，我们必须在迭代列表之前检查 null，以避免 NullPointerException。

另一方面，**使用 Optional 和 Stream，我们可以执行一系列操作，而无需特别处理 null 检查，也避免了 NullPointerException**：

```java
// 使用 Stream
Optional.ofNullable(nameList)
  .ifPresent(list -> list.stream()
    .map(name -> "Length of " + name + ": " + name.length())
    .forEach(System.out::println));
```

在这里，我们使用 Optional.ofNullable() 包装 nameList，如果 nameList 是 null，则防止 NullPointerException。然后我们使用 ifPresent() 方法仅在列表不是 null 时执行 Stream 操作。

**这确保了仅当列表非 null 时才应用 Stream 操作，防止任何潜在的 NullPointerException。** 此外，**代码更简洁，对空 Stream 的操作不会导致任何异常或错误。**

然而，如果 getList() 方法返回一个空列表而不是 null，那么使用空 Stream，map() 操作将没有东西可以操作。因此，它将产生一个新的空 Stream，留下 nothing 来在 forEach() 调用中打印。

总之，传统和 Stream 方法都旨在打印列表中名称的长度。**然而，Stream 方法利用 Optional 和 Stream 操作，提供了一种更功能化和简洁的方式来处理潜在的 null 值和空列表。** 这导致代码更安全、更有表现力。

## 4. 将空列表的 Stream 收集到另一个列表中

Stream 提供了一种清晰的方式来执行操作和收集结果。即使使用空列表，我们也可以有效地使用 Stream 操作和收集器。以下是一个通过 Stream 将元素从空列表收集到另一个列表的简单示例：

```java
List```````<String>``````` emptyList = new ArrayList<>();
List```````<String>``````` collectedList = emptyList.stream().collect(Collectors.toList());

System.out.println(collectedList); // 输出: []
```

在这里，collect() 是一个终端操作，它对 Stream 的元素执行可变归约。

类似地，执行像 filter() 这样的中间操作，并将结果收集到任何集合中，将得到一个空的 Stream：

```java
List```````<String>``````` emptyList = new ArrayList<>();
List```````<String>``````` collectedList = emptyList.stream()
  .filter(s -> s.startsWith("a"))
  .collect(Collectors.toList());
```

**这表明即使在空列表上，Stream 操作也可以无缝集成到收集结果中，没有任何问题。**

## 5. 结论

总之，Java 8 在空列表上的 Stream 操作展示了 Stream API 的优雅和健壮性。轻松地将空列表转换为 Stream，更优雅地处理潜在的 NullPointerException，以及无缝执行如收集到另一个列表等操作，使 Stream 成为开发者的强大工具。

通过理解和利用这些特性，开发者可以编写更简洁、更有表现力的代码，充分利用 Stream API，即使是在处理空列表时也是如此。

如常，文章附带的源代码可在 GitHub 上找到。

OK