---
date: 2022-06-01
category:
  - Java
  - Testing
tag:
  - Unit Testing
  - Private Methods
  - Reflection
head:
  - - meta
    - name: keywords
      content: Java, Unit Testing, Private Methods, Reflection
------
# Java中单元测试私有方法

## 1. 概述

在本教程中，我们将简要解释为什么直接测试私有方法通常不是一个好主意。然后我们将展示如何在必要时测试Java中的私有方法。

## 2. 我们不应该测试私有方法的原因

**一般来说，我们编写的单元测试应该只检查我们的公共方法合约。** 私有方法是调用我们公共方法的人不知道的实现细节。此外，改变我们的实现细节不应该导致我们改变我们的测试。

一般来说，敦促测试私有方法突出了以下问题之一：

- 我们的私有方法中有死代码。
- 我们的私有方法太复杂了，应该属于另一个类。
- 我们的方法本来就不应该设置为私有。

因此，当我们觉得需要测试一个私有方法时，我们真正应该做的是修复潜在的设计问题。

## 3. 一个示例：从私有方法中移除死代码

让我们展示一个快速示例。

我们将编写一个私有方法，该方法将返回一个_Integer_的两倍。对于_null_值，我们希望返回_null_：

```java
private static Integer doubleInteger(Integer input) {
    if (input == null) {
        return null;
    }
    return 2 * input;
}
```

现在，让我们编写我们的公共方法。它将是外部进入类的唯一入口点。

这个方法接收一个_Integer_作为输入。它验证这个_Integer_不是_null_；否则，它抛出一个_IllegalArgumentException_。之后，它调用私有方法返回_Integer_的两倍值：

```java
public static Integer validateAndDouble(Integer input) {
    if (input == null) {
        throw new IllegalArgumentException("input should not be null");
    }
    return doubleInteger(input);
}
```

让我们遵循我们的良好实践并测试我们的公共方法合约。

首先，让我们编写一个测试，确保如果输入是_null_，则抛出_IllegalArgumentException_：

```java
@Test
void givenNull_WhenValidateAndDouble_ThenThrows() {
    assertThrows(IllegalArgumentException.class, () -> validateAndDouble(null));
}
```

现在让我们检查一个非_null_的_Integer_是否正确加倍：

```java
@Test
void givenANonNullInteger_WhenValidateAndDouble_ThenDoublesIt() {
    assertEquals(4, validateAndDouble(2));
}
```

让我们看看JaCoCo插件报告的覆盖率：

![img](https://www.baeldung.com/wp-content/uploads/2022/06/public-and-private-method-code-coverage.png) 正如我们所看到的，我们私有方法中的空检查没有被我们的单元测试覆盖。那么我们是否应该测试它呢？

答案是不。重要的是要理解，我们的私有方法并不是孤立存在的。它只会在公共方法中验证数据后被调用。**因此，我们私有方法中的空检查永远不会被达到；它是死代码，应该被移除。**

假设我们没有被吓倒，让我们具体解释如何测试我们的私有方法。

要测试它，**如果我们的私有方法有另一种可见性**将会很有帮助。好消息是**我们可以使用反射来模拟这一点。**

我们的封装类叫做_Utils_。的想法是访问名为_doubleInteger_的私有方法，该方法接受一个_Integer_作为参数。然后我们将修改其可见性，使其可以从_Utils_类外部访问。让我们看看我们如何做到这一点：

```java
private Method getDoubleIntegerMethod() throws NoSuchMethodException {
    Method method = Utils.class.getDeclaredMethod("doubleInteger", Integer.class);
    method.setAccessible(true);
    return method;
}
```

现在我们可以使用这个方法了。让我们编写一个测试，确保在给定一个_null_对象时，我们的私有方法返回_null_。我们需要将这个方法应用到一个将为_null_的参数上：

```java
@Test
void givenNull_WhenDoubleInteger_ThenNull() throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {
    assertEquals(null, getDoubleIntegerMethod().invoke(null, new Integer[] { null }));
}
```

让我们更详细地解释一下_invoke_方法的用法。第一个参数是我们应用方法的对象。由于_doubleInteger_是静态的，我们传入了一个_null_。第二个参数是参数数组。在这种情况下，我们只有一个参数，它是_null_。

最后，让我们演示我们如何也可以测试非_null_输入的情况：

```java
@Test
void givenANonNullInteger_WhenDoubleInteger_ThenDoubleIt() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
    assertEquals(74, getDoubleIntegerMethod().invoke(null, 37));
}
```

## 5. 结论

在本文中，我们学习了为什么一般不建议测试私有方法。然后我们演示了如何使用反射来测试Java中的私有方法。

一如既往，代码可以在GitHub上找到。