---
date: 2024-07-08
category:
  - Java
  - Stream API
tag:
  - Stream.collect()
  - null
head:
  - - meta
    - name: keywords
      content: Java, Stream API, collect, null, 空值处理
---
# Stream.collect() 可以返回 null 值吗？

在Java 8中引入的一个显著新特性是Stream API。它还附带了一系列的_收集器_（Collectors），允许我们调用_Stream.collect()_方法将流中的元素收集到所需的集合中，比如_List_、_Set_、_Map_等。

在本教程中，我们将讨论_collect()_方法是否可以返回_null_值。

## 2. 问题介绍

“Stream的_collect()_方法可以返回_null_吗？”这个问题有两个含义：

- 当我们使用标准收集器时，是否需要对_null_进行检查？
- 如果我们真的希望_collect()_方法返回_null_，是否可能？

我们的讨论将涵盖这两个视角。

首先，让我们创建一个字符串列表作为稍后演示的输入数据：

```java
final List````````<String>```````` LANGUAGES = Arrays.asList("Kotlin", null, null, "Java", "Python", "Rust");
```

如我们所见，列表_LANGUAGES_包含六个字符串元素。值得一提的是，列表中有两个元素是_null_值。

稍后，我们将使用这个列表作为输入构建流。同样，为了简单起见，我们将使用单元测试断言来验证_collect()_方法调用是否返回_null_值。

## 3. 标准库附带的_收集器_不会返回_null_

我们知道Java Stream API引入了一套标准收集器。首先，让我们看看标准收集器是否可以返回_null_。

### 3.1. _null_元素不会导致_collect()_方法返回_null_

如果流包含_null_元素，**它们将作为_null_值包含在_collect()_操作的结果中，而不是导致_collect()_方法本身返回_null_**。让我们编写一个小测试来验证它：

```java
List````````<String>```````` result = LANGUAGES.stream()
  .filter(Objects::isNull)
  .collect(toList());
assertNotNull(result);
assertEquals(Arrays.asList(null, null), result);
```

如上述测试所示，我们首先使用_filter()_方法仅获取_null_元素。然后，我们将过滤后的_null_值收集到一个列表中。结果表明，这两个_null_元素成功地收集在结果列表中。因此，**流中的_null_元素不会导致_collect()_方法返回_null_**。

### 3.2. 空流不会导致_collect()_方法返回_null_

**即使流为空，使用标准收集器时，Java Stream API的_collect()_方法也不会返回_null_**。

假设要收集的流为空。在这种情况下，_collect()_方法将返回一个空的结果容器，比如一个空的_List_、一个空的_Map_或一个空的_array_，具体取决于_collect()_方法中使用的收集器。

接下来，让我们用三个常用的收集器来验证这一点：

```java
List````````<String>```````` result = LANGUAGES.stream()
  .filter(s -> s != null && s.length() == 1)
  .collect(toList());
assertNotNull(result);
assertTrue(result.isEmpty());

Map`<Character, String>` result2 = LANGUAGES.stream()
  .filter(s -> s != null && s.length() == 1)
  .collect(toMap(s -> s.charAt(0), Function.identity()));
assertNotNull(result2);
assertTrue(result2.isEmpty());

Map<Character, List````````<String>````````> result3 = LANGUAGES.stream()
  .filter(s -> s != null && s.length() == 1)
  .collect(groupingBy(s -> s.charAt(0)));
assertNotNull(result3);
assertTrue(result3.isEmpty());
```

在上述测试中，_filter(s -> s != null && s.length() == 1)_方法将返回一个空流，因为没有元素符合条件。然后，我们可以看到_toList()_、_toMap()_和_groupingBy()_收集器不会返回_null_。相反，它们生成了一个空的列表或映射作为它们的结果。

**所以，所有标准收集器都不会返回_null_**。

## 4. 是否可能使_Stream.collect()_方法返回_null_？

我们已经了解到标准收集器不会使_collect()_方法返回_null_。那么现在，让我们转到问题，如果我们希望_Stream.collect()_方法返回_null_，是否可能？简短的答案是：是的。

接下来，让我们看看如何做到这一点。

### 4.1. 创建自定义收集器

标准收集器不会返回_null_。因此，_Stream.collect()_方法也不会返回_null_。然而，**如果我们能够创建一个返回可空结果的自定义收集器，Stream.collect()_也可能返回_null_**。

Stream API提供了静态_Collector.of()_方法，允许我们创建自定义收集器。_Collector.of()_方法接受四个参数：

- 一个_Supplier_函数 - 为collect操作返回一个可变的容器。
- 一个累加器函数 - 修改可变容器以包含当前元素。
- 一个组合器函数 - 当流以并行方式处理时，将中间结果合并到单个最终结果容器中。
- 一个可选的整理器函数 - 取得可变结果容器，并在返回collect操作的最终结果之前对其进行所需的最终转换。

我们应该注意到，最后一个参数，整理器函数是可选的。这是因为许多收集器可以简单地使用可变容器作为最终结果。然而，**我们可以利用这个整理器函数要求收集器返回一个可空的容器**。

接下来，让我们创建一个名为_emptyListToNullCollector_的自定义收集器。顾名思义，我们希望收集器的工作方式与标准的_toList()_收集器几乎相同，只是当结果列表为空时，收集器将返回_null_而不是空列表：

```java
Collector<String, ArrayList````````<String>````````, ArrayList````````<String>````````> emptyListToNullCollector = Collector.of(ArrayList::new, ArrayList::add, (a, b) -> {
    a.addAll(b);
    return a;
}, a -> a.isEmpty() ? null : a);
```

现在，让我们用_LANGUAGES_输入测试我们的_emptyListToNullCollector_收集器：

```java
List````````<String>```````` notNullResult = LANGUAGES.stream()
  .filter(Objects::isNull)
  .collect(emptyListToNullCollector);
assertNotNull(notNullResult);
assertEquals(Arrays.asList(null, null), notNullResult);

List````````<String>```````` nullResult = LANGUAGES.stream()
  .filter(s -> s != null && s.length() == 1)
  .collect(emptyListToNullCollector);
assertNull(nullResult);
```

正如我们在上面的测试中看到的，当流不为空时，我们的_emptyListToNullCollector_的工作方式与标准的_toList()_收集器相同。但如果流为空，它返回_null_而不是空列表。

### 4.2. 使用_collectingAndThen()_方法

Java Stream API提供了_collectingAndThen()_方法。**这个方法允许我们对收集器的结果应用一个整理函数**。它接受两个参数：

- 一个收集器对象 - 例如，标准的_toList()_
- 一个整理函数 - 取得collect操作的结果，并在返回流操作的结果之前对其进行任何最终转换

例如，我们可以使用_collectingAndThen()_函数使返回的列表不可修改：

```java
List````````<String>```````` notNullResult = LANGUAGES.stream()
  .filter(Objects::nonNull)
  .collect(collectingAndThen(toList(), Collections::unmodifiableList));
assertNotNull(notNullResult);
assertEquals(Arrays.asList("Kotlin", "Java", "Python", "Rust"), notNullResult);

// 结果列表变为不可变
assertThrows(UnsupportedOperationException.class, () -> notNullResult.add("Oops"));
```

我们刚刚学习了如何使用_Collector.of()_创建自定义收集器。这种方法允许我们自由地实现收集逻辑。此外，我们知道如果整理器函数参数返回_null_，_Stream.collect(ourCustomCollector)_也可以返回_null_。

如果我们想要通过添加整理器函数来扩展标准收集器，我们也可以使用方法_collectingAndThen()_。它比创建自定义收集器更简单。

接下来，让我们使用_collectingAndThen()_方法实现_emptyListToNullCollector_的功能：

```java
List````````<String>```````` nullResult = LANGUAGES.stream()
  .filter(s -> s != null && s.length() == 1)
  .collect(collectingAndThen(toList(), strings -> strings.isEmpty() ? null : strings));
assertNull(nullResult);
```

通过使用_collectingAndThen()_方法和整理器函数，我们可以看到_Stream.collect()_方法在流为空时返回_null_。

### 4.3. 关于可空_收集器_的说明

我们已经看到了两种方法使收集器返回_null_，以便_Stream.collect()_也返回_null_。然而，我们可能需要三思是否必须使收集器可空。

通常，**除非有充分的理由，否则避免使用可空收集器被认为是一个好的实践**。这是因为_null_值可能会引入意外的行为，使代码的行为更难以理解。**如果使用了可空收集器，重要的是确保它的使用是一致的，并且任何下游处理都能够适当地处理_null_值**。

因此，所有标准收集器都不会返回_null_。

## 5. 结论

在本文中，我们讨论了_Stream.collect()_是否可以返回_null_。

我们已经了解到所有标准收集器都不会返回_null_。此外，如果需要，我们可以使用_Collector.of()_或collectingAndThen()_使_Stream.collect()_返回_null_。然而，一般而言，我们应避免使用可空收集器，除非我们确实需要这么做。

正如往常，这里展示的所有代码片段都可以在GitHub上找到。

[Baeldung Logo](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)[Gravatar](https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&r=g)[Eric Martin](https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg)[Announcement](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)[REST API](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)[RSS Feed](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK