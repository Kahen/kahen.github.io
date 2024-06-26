---
date: 2024-06-26
category:
  - Java
  - Exception Handling
tag:
  - NullPointerException
  - findFirst()
  - Optional
head:
  - - meta
    - name: keywords
      content: Java, Exception Handling, NullPointerException, findFirst(), Optional
---
# 处理findFirst()方法中第一个元素为Null时的NullPointerException

在这个简短的教程中，我们将探讨在使用findFirst()方法时避免NullPointerException的不同方法。

首先，我们将解释导致该方法因NullPointerException失败的原因。然后，我们将通过实际示例演示如何重现并修复异常。

### 解释问题

简而言之，NullPointerException被抛出以表明我们在需要对象的地方使用了null进行了某些操作。

通常，我们使用findFirst()来返回一个包含给定流的第一个元素的Optional实例。然而，**根据文档，如果返回的第一个元素是null，该方法会抛出NullPointerException**。

因此，这里的主要问题是如何在流的第一个元素为null时避免NullPointerException异常。在深入解答我们的问题之前，让我们先重现异常。

### 重现NullPointerException

例如，假设我们有一个String对象列表：

```java
List````<String>```` inputs = Arrays.asList(null, "foo", "bar");
```

现在，让我们尝试使用findFirst()方法获取我们的列表的第一个元素：

```java
@Test(expected = NullPointerException.class)
public void givenStream_whenCallingFindFirst_thenThrowNullPointerException() {
    Optional````<String>```` firstElement = inputs.stream()
      .findFirst();
}
```

正如我们所见，测试用例因NullPointerException失败，因为我们列表中选定的第一个元素是null。

**Optional API声明，调用者有责任确保值不是null，因为它没有提供任何方法来区分“值存在但设置为null”和“值不存在”**。这就是为什么文档禁止在使用findFirst()时返回null的场景。

### 避免异常

在这种情况下，避免NullPointerException的最简单方法是在调用findFirst()方法之前对流进行过滤。

让我们看看如何在实践中做到这一点：

```java
@Test
public void givenStream_whenUsingFilterBeforeFindFirst_thenCorrect() {
    Optional````<String>```` firstNotNullElement = inputs.stream()
      .filter(Objects::nonNull)
      .findFirst();

    assertTrue(firstNotNullElement.isPresent());
}
```

在这里，我们使用Objects#nonNull方法来过滤所有非null的对象。**这样，我们确保选定的第一个元素不是null。因此，我们避免了NullPointerException**。

另一个选择是在调用findFirst()方法之前使用Optional#ofNullable方法。

**此方法如果指定的值不是null，则返回一个带有该值的Optional实例。否则，它返回一个空的Optional**。

让我们看看它在实际中的应用：

```java
@Test
public void givenStream_whenUsingOfNullableBeforeFindFirst_thenCorrect() {
    Optional````<String>```` firstElement = inputs.stream()
      .map(Optional::ofNullable)
      .findFirst()
      .flatMap(Function.identity());

    assertTrue(firstElement.isEmpty());
}
```

如上所示，我们使用ofNullable()方法将每个元素映射成一个接受null的Optional对象。然后，我们使用findFirst()获取第一个映射的元素。

返回的元素表示一个Optional的Optional，因为findFirst()返回一个Optional。这就是我们使用flatMap()来展平嵌套的Optional的原因。

请注意，Function#identity总是返回其输入参数。在我们的例子中，该方法返回null，因为它是我们列表中的第一个元素。

### 结论

在这篇短文中，我们解释了如何在使用findFirst()方法时避免NullPointerException。

在此过程中，我们展示了如何使用实际示例重现和解决异常。

如常，示例的完整源代码可在GitHub上找到。