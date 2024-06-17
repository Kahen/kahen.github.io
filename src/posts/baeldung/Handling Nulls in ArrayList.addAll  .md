---
date: 2024-06-17
category:
  - Java
  - Collections
tag:
  - ArrayList
  - Null Handling
---
# ArrayList中addAll()方法处理空值 | Baeldung### 概述

熟练使用集合API是Java开发者最关键的技能之一。本教程将重点介绍_ArrayList_及其_addAll()_方法。

尽管_addAll()_是向目标_ArrayList_添加一系列元素的最便捷方式，但它在处理空值时表现不佳。

### 空值和addAll()

正如前面所述，addAll()方法在处理空值时表现不佳。如果我们传递一个空引用，它将抛出_NullPointerException_：

```java
@ParameterizedTest
@NullSource
void givenNull_whenAddAll_thenAddThrowsNPE(List`````````````<String>````````````` list) {
    ArrayList`````````````<String>````````````` strings = new ArrayList<>();
    assertThatExceptionOfType(NullPointerException.class)
      .isThrownBy(() -> strings.addAll(list));
}
```

虽然这种异常是明确的，但直到运行时我们才可能发现问题，这并不是很好。

### 简单检查

我们可以确保不向addAll()方法传递空值的最基本方式是使用一个简单的if语句进行检查：

```java
@ParameterizedTest
@NullSource
void givenNull_whenAddAllWithCheck_thenNoNPE(List`````````````<String>````````````` list) {
    ArrayList`````````````<String>````````````` strings = new ArrayList<>();
    assertThatNoException().isThrownBy(() -> {
        if (list != null) {
            strings.addAll(list);
        }
    });
}
```

这是一种完全有效的方法来处理这种情况。然而，它可能被视为过于冗长和命令式。让我们尝试使这段代码更直接。

### 自定义检查方法

让我们对前面的解决方案进行重构。我们需要做的就是将空值检查逻辑提取到一个单独的方法中：

```java
private static void addIfNonNull(List`````````````<String>````````````` list, ArrayList`````````````<String>````````````` strings) {
    if (list != null) {
        strings.addAll(list);
    }
}
```

客户端代码看起来会更好，因为我们将实现逻辑移开了：

```java
@ParameterizedTest
@NullSource
void givenNull_whenAddAllWithExternalizedCheck_thenNoNPE(List`````````````<String>````````````` list) {
    ArrayList`````````````<String>````````````` strings = new ArrayList<>();
    assertThatNoException().isThrownBy(() -> {
        addIfNonNull(list, strings);
    });
}
```

然而，在这种情况下，我们正在将列表传递给一个方法并在内部进行修改。**这是这种情况下的权衡：代码更易读，但不清楚我们是如何修改_List_的。**

### 默认为空

另一种方法是透明地将空值转换为一个空的_List_。我们将使用Apache Commons库中的_CollectionUtils_。然而，由于逻辑很简单，我们也可以自己实现：

```java
@ParameterizedTest
@NullSource
void givenNull_whenAddAllWithCollectionCheck_thenNoNPE(List`````````````<String>````````````` list) {
    ArrayList`````````````<String>````````````` strings = new ArrayList<>();
    assertThatNoException().isThrownBy(() -> {
        strings.addAll(CollectionUtils.emptyIfNull(list));
    });
}
```

这可能是一种更好的方法，特别是如果我们在其他地方使用这个列表。**同时，使用这种转换的最佳方式是尽早应用它，防止在我们的应用程序中传递空值。**例如，Kotlin中的可空类型旨在解决这个问题。

### Optional

虽然Kotlin有可空类型，但Java使用_Optional_来处理这个问题。这只是一个包装类，它通知用户对象可能不存在。然而，它包含了一个处理空值的很好的API：

```java
@ParameterizedTest
@NullSource
void givenNull_whenAddAllWithOptional_thenNoNPE(List`````````````<String>````````````` list) {
    ArrayList`````````````<String>````````````` strings = new ArrayList<>();
    assertThatNoException().isThrownBy(() -> {
        Optional.ofNullable(list).ifPresent(strings::addAll);
    });
}
```

这是一种实现空值检查的简单解决方案。它不需要任何第三方库，逻辑易于阅读和理解。

### 流

如果我们正在处理一个可空_Lists_的集合，我们可以使用_filter()_方法来忽略空值：

```java
@ParameterizedTest
@MethodSource("listProvider")
void givenCollectionOfNullableLists_whenFilter_thenNoNPE(List<List`````````````<String>`````````````> listOfLists) {
    ArrayList`````````````<String>````````````` strings = new ArrayList<>();
    assertThatNoException().isThrownBy(() -> {
        listOfLists.stream().filter(Objects::nonNull).forEach(strings::addAll);
    });
}
```

API与_Optional_使用的类似，相对容易理解。

### 结论

在应用程序中跟踪空值可能具有挑战性。然而，考虑到我们可能会得到_NullPointerException_的情况至关重要，以确保应用程序的健壮性。

我们可以使用各种技术来解决这些问题，从简单的if语句和_Optionals_到第三方API解决方案。**然而，我们应该记住尽早考虑它们。**最好的方法是首先不允许空值。

如常，本教程的所有代码都可以在GitHub上找到。

文章发布后30天内开放评论。对于超过此日期的任何问题，请使用网站上的联系表单。

OK