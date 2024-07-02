---
date: 2022-04-01
category:
  - Java
  - Collections
tag:
  - Set
  - Java
  - LinkedHashSet
head:
  - - meta
    - name: keywords
      content: Java, Set, LinkedHashSet, first item
------
# 如何从Java Set中获取第一个元素

## 1. 概述

_Set_ 是一个不允许重复项的集合。Java 提供了 _Set_ 接口以及几个该接口的实现供我们使用。本教程将探讨如何从 _Set_ 中获取第一个元素。Java _Set_ 按定义是无序的，但有些实现确实保持了顺序，例如 _LinkedHashSet_，我们将在这里重点讨论。

## 2. 使用 _Iterator_

**我们可以使用 _Iterator_ 来检索 _Set_ 中的第一个元素。** _Set_ 接口允许我们使用 _iterator()_ 方法为所有实现获取 _Iterator_。然后我们可以调用 _Iterator_ 上的 _next()_ 来获取第一个项目：

```java
@Test
void givenASet_whenUsingIterator_thenRetrieveAnItem() {
    Set```<Integer>``` set = new LinkedHashSet<>(Arrays.asList(1, 2, 3, 4, 5));
    Iterator iterator = set.iterator();
    if (iterator.hasNext()) {
        int retrieved = (int) iterator.next();
        assertEquals(retrieved, 1);
    }
}
```

我们这里实例化了一个填充了五个 _Integer_ 的 _LinkedHashSet_。我们最后的断言显示我们已成功从 _Set_ 中检索到第一个元素。

如果我们的 _Set_ 是空的，或者我们的 _Iterator_ 中没有更多元素，_next()_ 将抛出 _NoSuchElementException_。我们在这里通过使用 _Iterators_ 的 _hasNext()_ 方法来防止这种情况，尝试获取下一个项目之前。如果我们的使用情况仅仅是获取第一个且仅有第一个项目，我们可以在不使用 _Iterator_ 之前检查 _Set_ 是否为空。

## 3. 使用 _Streams_

从 _Set_ 中获取第一个项目的第二个选项是使用 _Streams_。我们可以使用 _stream()_ 方法将 _Set_ 转换为 _Stream_。然后，我们可以使用 Streams 的 _findFirst()_ 方法，它将返回一个 _Optional_。最后，我们在 _Optional_ 上调用 _get()_ 来检索我们的项目：

```java
@Test
void givenASet_whenUsingStreams_thenRetrieveAnItem() {
    Set```<Integer>``` set = new LinkedHashSet<>(Arrays.asList(1, 2, 3, 4, 5));
    Optional```<Integer>``` optional = set.stream().findFirst();
    if (optional.isPresent()) {
        int retrieved = optional.get();
        assertEquals(retrieved, 1);
    }
}
```

这段代码和我们之前看到的一样，如果 _Set_ 中没有项目，我们在调用 _Optional_ 上的 _get()_ 时会得到 _NoSuchElementException_。为了防止这种情况，我们在尝试检索值之前使用了 _Optional_ 上的 _ifPresent()_。

**使用 _Streams_ 像这样为我们打开了更多对从 _Set_ 中检索的项目进行后处理的选项。** 例如，我们可以立即将 _ifPresent()_ 链接到 _findFirst()_ 并传递一个 _Consumer_ 来处理项目。我们也可以使用 _Streams_ 的 _sorted()_ 方法重新定义顺序，因此第一个项目将是什么。

## 4. 结论

在本文中，我们看到了两种从 _Set_ 中获取第一个项目的方法，特别是 _LinkedHashSet_ 实现，因为它是有序的。使用 _Iterator_ 提供了一种简单的方式来检索第一个项目，如果需要，我们可以循环遍历所有目。使用 _Streams_ 提供了相同的功能，但为我们提供了更多直接使用检索到的项目并允许我们控制查看项目顺序的选项。

如常，示例的完整代码可在 GitHub 上找到。