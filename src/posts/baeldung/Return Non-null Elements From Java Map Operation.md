---
date: 2024-06-14
category:
  - Java
  - Programming
tag:
  - Java Stream API
  - map
  - filter
  - Optional
---
# Java流中从map操作返回非空元素

Java Stream API引入了许多特性，显著增强了我们代码的功能和可读性。其中，map()方法作为一个强大的工具，用于转换集合中的元素，尤为突出。一个常见的需求是确保这些换结果不包含空(null)元素。

在本教程中，我们将探讨如何有效地从Stream的map()方法中收集非空元素。

## 2. 问题介绍

map()方法提供了一个高层次的抽象，用于处理元素序列。它是一个中间操作，将映射函数应用于Stream的每个元素，生成一个新的转换后的元素Stream。

有时，映射函数可能会返回空值。然而，我们希望从转换结果中排除这些空值。例如，假设我们有一个字符串列表：

```java
static final List\<String\> INPUT = List.of("f o o", "a,b,c,d", "b a r", "w,x,y,z", "w,o,w");
```

我们希望使用以下映射函数来转换INPUT中的字符串元素：

```java
String commaToSpace(String input) {
    if (input.contains(",")) {
        return input.replaceAll(",", " ");
    } else {
        return null;
    }
}
```

如我们所见，commaToSpace()方法简单地将所有逗号替换为空白，并返回结果。然而，如果输入字符串不包含逗号，该方法返回空值。

现在，我们想使用commaToSpace()来转换我们的INPUT，并确保结果中不包含空值。这是我们期望的结果：

```java
static final List\<String\> EXPECTED = List.of("a b c d", "w x y z", "w o w");
```

如我们所见，INPUT列表有五个元素，但EXPECTED列表有三个。

值得一提的是，在实践中，我们可能会采取更直接的方法来完成这项任务。例如，我们可以先过滤掉不包含任何逗号的字符串元素，然后执行逗号到空格的替换。然而，由于我们想展示如何从Stream的map()方法调用中收集非空元素，我们将使用commaToSpace()方法作为映射函数，并用Stream.map()调用它。

接下来，让我们看看如何使用Stream API和map()方法来实现它。

## 3. 使用map() + filter()方法

我们已经提到map()方法应用映射函数，在这个例子中是commaToSpace()，来完成转换。

映射函数**接受一个输入并产生一个转换后的输出，而map()方法不执行任何过滤。**因此，map()产生的Stream始终与原始Stream大小相同。换句话说，如果映射函数返回空值，这些空值就在转换后的Stream中。然而，我们可以结合使用filter()方法和map()方法来从结果Stream中移除空元素。

接下来，让我们通过一个测试来看看这是如何完成的：

```java
List\<String\> result = INPUT.stream()
  .map(str -\> commaToSpace(str))
  .filter(Objects::nonNull)
  .collect(Collectors.toList());

assertEquals(EXPECTED, result);
```

在上述代码中，我们使用带有Objects::nonNull方法引用的filter()方法来从结果Stream中移除所有空元素。

## 4. 使用Optional处理空值怎么样？

当涉及到处理空值时，有些人可能会考虑利用Optional类，该类旨在不显式使用空值来处理可选值：

```java
List\<String\> result = INPUT.stream()
  .map(str -\> Optional.ofNullable(commaToSpace(str)))
  .filter(Optional::isPresent)
  .map(Optional::get)
  .collect(Collectors.toList());

assertEquals(EXPECTED, result);
```

如上述示例所示，我们首先**将可空值包装在Optional对象中，结果是一个Stream\<Optional\<String\>\>**。然后，我们使用filter()方法从Stream中移除所有不存在的Optional。最后，为了获得Stream\<Optional\<String\>\>中包含的字符串值，我们需要**一个额外的步骤来使用map(Optional::get)提取值**。

因此，正如我们所见，**Optional方法对于这个问题来说并不高效，因为不必要的包装和解包Stream中的元素**。

## 5. 如果映射函数返回Optional怎么办？

我们已经讨论了使用Optional来处理空元素对于这个问题来说是低效的。然而，在某些情况下，**映射函数返回一个Optional对象而不是可空结果**，例如：

```java
Optional\<String\> commaToSpaceOptional(String input) {
    if (input.contains(",")) {
        return Optional.of(input.replaceAll(",", " "));
    } else {
        return Optional.empty();
    }
}
```

在这种情况下，我们可以使用Optional.orElse(null)来从映射函数返回的Optional中提取元素值。**这允许我们将不存在的Optional转换为map()方法中的空元素**：

```java
List\<String\> result = INPUT.stream()
  .map(str -\> commaToSpaceOptional(str).orElse(null))
  .filter(Objects::nonNull)
  .collect(Collectors.toList());

assertEquals(EXPECTED, result);
```

正如代码所示，**map()方法执行两个任务**：

- 使用映射函数转换Stream
- 解包每个转换后的Optional对象

其余步骤与“map() + filter()”方法相同。

## 6. 结论

在本文中，我们探讨了如何有效地从Stream的map()中收集非空元素。此外，我们还讨论了为什么将映射函数的结果包装在Optional中可能会导致效率低下。

如往常一样，示例的完整源代码可在GitHub上找到。
