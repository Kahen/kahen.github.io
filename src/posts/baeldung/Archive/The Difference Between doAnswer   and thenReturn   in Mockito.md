---
date: 2024-06-15
category:
  - Testing
  - Java
tag:
  - Mockito
  - JUnit
  - doAnswer
  - thenReturn
---

# Mockito中doAnswer()和thenReturn()的区别 | Baeldung

Mockito是一个广泛使用的Java应用程序单元测试框架。它提供了各种API来模拟对象的行为。在本教程中，我们将探讨doAnswer()和thenReturn()存根技术的用法，并进行比较。我们可以在某些情况下使用这两种API来存根或模拟方法，但在某些情况下，我们只能使用其中之一。

我们的代码将结合使用Mockito和JUnit 5作为我们的代码示例，并且我们需要在我们的pom.xml文件中添加一些依赖项：

```xml
```<dependency>```
    ```<groupId>```org.junit.jupiter```</groupId>```
    ```<artifactId>```junit-jupiter-api```</artifactId>```
    ```<version>```5.10.0```</version>```
    ```<scope>```test```</scope>```
```</dependency>```
```

```xml
```<dependency>```
    ```<groupId>```org.junit.jupiter```</groupId>```
    ```<artifactId>```junit-jupiter-engine```</artifactId>```
    ```<version>```5.10.0```</version>```
    ```<scope>```test```</scope>```
```</dependency>```
```

```xml
```<dependency>```
    ```<groupId>```org.mockito```</groupId>```
    ```<artifactId>```mockito-core```</artifactId>```
    ```<version>```5.11.0```</version>```
    ```<scope>```test```</scope>```
```</dependency>```
```

我们可以在Maven中央仓库中找到JUnit 5 API库、JUnit 5引擎库和Mockito库。

使用thenReturn()存根方法
我们可以在Mockito中使用thenReturn()存根技术来存根返回值的方法。为了演示，我们将使用thenReturn()和doAnswer()测试列表的get()和add()操作：

```java
public class BaeldungList extends AbstractList`<String>` {
    @Override
    public String get(final int index) {
        return null;
    }

    @Override
    public void add(int index, String element) {
        // 无操作
    }

    @Override
    public int size() {
        return 0;
    }
}
```

在上面的示例代码中，get()方法返回一个String。首先，我们将使用thenReturn()存根get()方法，并通过断言其返回值与存根方法相同来验证调用：

```java
@Test
void givenThenReturn_whenGetCalled_thenValue() {
    BaeldungList myList = mock(BaeldungList.class);

    when(myList.get(anyInt()))
      .thenReturn("answer me");

    assertEquals("answer me", myList.get(1));
}
```

### 3.1 使用thenReturn()存根方法返回多个值
除此之外，thenReturn() API允许在连续调用中返回不同的值。我们可以链式调用其返回多个值。此外，我们可以在单个方法调用中传递多个值：

```java
@Test
void givenThenReturn_whenGetCalled_thenReturnChaining() {
    BaeldungList myList = mock(BaeldungList.class);

    when(myList.get(anyInt()))
      .thenReturn("answer one")
      .thenReturn("answer two");

    assertEquals("answer one", myList.get(1));
    assertEquals("answer two", myList.get(1));
}

@Test
void givenThenReturn_whenGetCalled_thenMultipleValues() {
    BaeldungList myList = mock(BaeldungList.class);

    when(myList.get(anyInt()))
      .thenReturn("answer one", "answer two");

    assertEquals("answer one", myList.get(1));
    assertEquals("answer two", myList.get(1));
}
```

使用doAnswer()存根void方法
add()方法是一个void方法，不返回任何内容。我们不能使用thenReturn()存根add()方法，因为thenReturn()存根不能用于void方法。**相反，我们将使用doAnswer()，它允许存根void方法。**所以，我们将使用doAnswer()存根add()方法，当调用add()方法时，存根中提供的Answer将被调用：

```java
@Test
void givenDoAnswer_whenAddCalled_thenAnswered() {
    BaeldungList myList = mock(BaeldungList.class);

    doAnswer(invocation -> {
        Object index = invocation.getArgument(0);
        Object element = invocation.getArgument(1);

        // 验证调用是否使用正确的索引和元素调用
        assertEquals(3, index);
        assertEquals("answer", element);

        // 返回null，因为这是一个void方法
        return null;
    }).when(myList)
      .add(any(Integer.class), any(String.class));
    myList.add(3, "answer");
}
```

在doAnswer()中，我们验证对add()方法的调用，并断言它被调用时使用的参数是预期的。

### 4.1 使用doAnswer()存根非void方法
由于我们可以使用返回值的Answer来存根方法，而不是null，我们可以使用doAnswer()方法来存根非void方法。例如，我们将通过使用doAnswer()存根get()方法并返回一个返回String的Answer来测试get()方法：

```java
@Test
void givenDoAnswer_whenGetCalled_thenAnswered() {
    BaeldungList myList = mock(BaeldungList.class);

    doAnswer(invocation -> {
        Object index = invocation.getArgument(0);

        // 验证调用是否使用索引调用
        assertEquals(1, index);

        // 返回我们想要的值
        return "answer me";
    }).when(myList)
      .get(any(Integer.class));

    assertEquals("answer me", myList.get(1));
}
```

### 4.2 使用doAnswer()存根方法返回多个值
我们必须注意，在doAnswer()方法中，我们只能返回一个Answer。然而，我们可以在doAnswer()方法中放置条件逻辑，根据调用的参数返回不同的值。因此，在下面的示例代码中，我们将根据调用get()方法时使用的索引返回不同的值：

```java
@Test
void givenDoAnswer_whenGetCalled_thenAnsweredConditionally() {
    BaeldungList myList = mock(BaeldungList.class);

    doAnswer(invocation -> {
        Integer index = invocation.getArgument(0);
        switch (index) {
            case 1:
                return "answer one";
            case 2:
                return "answer two";
            default:
                return "answer " + index;
        }
    }).when(myList)
      .get(anyInt());

    assertEquals("answer one", myList.get(1));
    assertEquals("answer two", myList.get(2));
    assertEquals("answer 3", myList.get(3));
}
```

# 5. 结论
Mockito框架提供了许多存根/模拟技术，如doAnswer()、doReturn()、thenReturn()、thenAnswer()等，以促进各种类型和风格的Java代码及其测试。我们已经使用doAnswer()和thenReturn()来存根非void方法并执行类似的测试。**然而，我们只能使用doAnswer()来存根void方法，因为thenReturn()方法无法执行此功能。**像往常一样，我们所有的代码示例都在GitHub上提供。

OK
