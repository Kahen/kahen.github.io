---
date: 2024-06-20
category:
  - Java
  - Set
tag:
  - Set Membership
  - Java Collection
head:
  - - meta
    - name: keywords
      content: Java, Set, Membership, Collection, Apache Commons, Collections, Stream API
---
# Java中检查集合中元素是否存在的方法

在这篇简短的教程中，我们将探讨如何在Java中检查一个元素是否存在于一个集合（Set）中。

首先，我们将通过使用Java核心开发工具包（JDK）来探索解决方案。然后，我们将阐明如何使用外部库，如Apache Commons，来实现相同的结果。

### 2.1 使用核心JDK的`Set#contains()`方法

顾名思义，这个方法检查特定的集合是否包含给定的元素。这是我们可以使用的最简单的解决方案之一，以回答我们的核心问题：

```java
@Test
void givenASet_whenUsingContainsMethod_thenCheck() {
    assertThat(CITIES.contains("London")).isTrue();
    assertThat(CITIES.contains("Madrid")).isFalse();
}
```

通常，`contains()`方法如果集合中存在给定元素，则返回`true`；否则返回`false`。

根据文档，该方法仅在以下情况下返回`true`：
```
object==null ? element==null : object.equals(element);
```

这就是为什么在集合对象所属的类中实现`equals()`方法很重要。这样，我们可以自定义等式逻辑，以适应类的所有或某些字段。

简而言之，与其他方法相比，`contains()`方法提供了最简洁直接的方式来检查一个给定集合中是否存在元素。

### 2.2 使用`Collections#disjoint()`方法

`Collections`实用工具类提供了另一种方法，称为`disjoint()`，我们可以使用它来检查集合是否包含给定的元素。

**这个方法接受两个集合作为参数，并在它们没有共同元素时返回true**：

```java
@Test
public void givenASet_whenUsingCollectionsDisjointMethod_thenCheck() {
    boolean isPresent = !Collections.disjoint(CITIES, Collections.singleton("Paris"));

    assertThat(isPresent).isTrue();
}
```

总的来说，我们创建了一个只包含给定字符串“Paris”的不可变集合。**此外，我们使用`disjoint()`方法和取反操作符来检查这两个集合是否有共同的元素**。

### 2.3 使用`Stream#anyMatch()`方法

Stream API提供了`anyMatch()`方法，我们可以使用它来验证给定集合的任何元素是否与提供的谓词匹配。

让我们看看它在实际中的应用：

```java
class CheckIfPresentInSetUnitTest {
    private static final Set``<String>`` CITIES = new HashSet<>();

    @BeforeAll
    static void setup() {
        CITIES.add("Paris");
        CITIES.add("London");
        CITIES.add("Tokyo");
        CITIES.add("Tamassint");
        CITIES.add("New york");
    }

    @Test
    void givenASet_whenUsingStreamAnyMatchMethod_thenCheck() {
        boolean isPresent = CITIES.stream()
          .anyMatch(city -> city.equals("London"));

        assertThat(isPresent).isTrue();
    }
}
```

如我们所见，我们使用了谓词`city.equals("London")`来检查流中是否有任何城市符合等于“London”的条件。

### 2.4 使用`Stream#filter()`方法

另一种解决方案是使用`filter()`方法。**它返回一个新流，其中包含满足提供条件的元素**。

换句话说，它根据指定的条件过滤流：

```java
@Test
void givenASet_whenUsingStreamFilterMethod_thenCheck() {
    long resultCount = CITIES.stream()
      .filter(city -> city.equals("Tamassint"))
      .count();

    assertThat(resultCount).isPositive();
}
```

如上所示，我们过滤了我们的集合，只包括等于值“Tamassint”的元素。然后，我们使用了终端操作`count()`来返回过滤元素的数量。

### 3. 使用Apache Commons Collections

如果我们想要检查一个给定的元素是否存在于集合中，Apache Commons Collections库是另一个可以考虑的选项。让我们首先通过向`pom.xml`文件添加它的依赖来开始：

```xml
`<dependency>`
    `<groupId>`org.apache.commons`</groupId>`
    `<artifactId>`commons-collections4`</artifactId>`
    `<version>`4.4`</version>`
`</dependency>`
```

### 3.1 使用`CollectionUtils#containsAny()`方法

`CollectionUtils`提供了一组实用方法来对集合执行常见操作。在这些方法中，我们找到了`containsAny(Collection``<?>`` coll1, Collection``<?>`` coll2)`。**如果第二个集合中至少有一个元素也包含在第一个集合中，则此方法返回true**。

让我们看看它在实际中的应用：

```java
@Test
void givenASet_whenUsingCollectionUtilsContainsAnyMethod_thenCheck() {
    boolean isPresent = CollectionUtils.containsAny(CITIES, Collections.singleton("Paris"));

    assertThat(isPresent).isTrue();
}
```

同样，我们创建了一个只包含一个元素“Paris”的单例集合。然后，我们使用了`containsAny()`方法来检查我们的集合`CITIES`是否包含给定的值“Paris”。

### 3.2 使用`SetUtils#intersection()`方法

或者，我们可以使用`SetUtils`实用工具类来解决我们的挑战。**这个类提供了`intersection(Set``<? extends E>`` a, Set``<? extends E>`` b)`方法，它返回一个新的集合，其中包含在指定的两个集合中都存在的元素**：

```java
@Test
void givenASet_whenUsingSetUtilsIntersectionMethod_thenCheck() {
    Set``<String>`` result = SetUtils.intersection(CITIES, Collections.singleton("Tamassint"));

    assertThat(result).isNotEmpty();
}
```

简而言之，这里的想法是通过检查`CITIES`和给定的单例集合之间的交集是否为空来验证城市“Tamassint”是否存在于`CITIES`中。

## 4. 结论

在这篇简短的文章中，我们探讨了如何在Java中检查一个集合是否包含给定的元素。

首先，我们看到了如何使用现成的JDK方法来做到这一点。然后，我们展示了如何使用Apache Commons Collections库来实现相同的目标。

正如往常一样，本文中使用的代码可以在GitHub上找到。

评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。翻译已经完成，以下是剩余部分的翻译：

## 4. 结论

在这篇简短的文章中，我们深入探讨了如何在Java中检查一个集合是否包含特定的元素。

首先，我们看到了如何使用Java开发工具包（JDK）中现成的方法来实现这一功能。然后，我们展示了如何使用Apache Commons Collections库来达到相同的目标。

一如既往，本文中使用的所有代码都可以在GitHub上找到。

文章发布后30天内开放评论。对于超过这个日期的任何问题，请使用网站上的联系表单。

OK