---
date: 2024-07-05
category:
  - Java
  - 编程
tag:
  - Java List
  - 集合操作
head:
  - - meta
    - name: keywords
      content: Java, List, 集合操作, 元素检查
---

# Java中检查一个列表是否包含另一个列表中的元素

## 1. 概述

在本教程中，我们将探讨Java中几种检查一个列表中的元素是否也出现在另一个列表中的方法。我们将使用Java Stream、Collections的disjoint()方法以及Apache Commons来实现这一功能。

## 2. 检查基本等价性

这个问题最简单的版本是，如果我们想检查一个列表中的元素是否与另一个列表中的元素**等价**。这可以是原始值或对象，假设我们已经设置了对象的比较方式。让我们创建一些要比较的列表：

```java
List```<String>``` listOfLetters = Arrays.asList("a", "b", "c", "d");
List```<String>``` listOfLettersWithOverlap = Arrays.asList("d", "e", "f", "g");
List```<String>``` listOfCities = Arrays.asList("London", "Berlin", "Paris", "Brussels");
```

字符串“d”出现在前两个列表中，因此我们期望任何解决此问题的方案都能检测到这一点。我们还期望将前两个列表与listOfCities进行比较时返回一个否定的结果。

### 2.1. 使用Disjoints

我们将看到的第一个选项是Java Collections库中的disjoint()方法。**disjoint()方法返回true，如果两个指定的Collections没有共同的元素**。因此，由于我们要找到两个Collections确实有共同元素时，我们将使用非运算符来反转结果：

```java
@Test
void givenValuesToCompare_whenUsingCollectionsDisjoint_thenDetectElementsInTwoLists() {
    boolean shouldBeTrue = !Collections.disjoint(listOfLetters, listOfLettersWithOverlap);
    assertTrue(shouldBeTrue);

    boolean shouldBeFalse = !Collections.disjoint(listOfLetters, listOfCities);
    assertFalse(shouldBeFalse);
}
```

在上面，我们看到预期的重叠字母列表返回_true_，并且在与城市列表进行比较后返回_false_值。

### 2.2. 使用Streams

Java中我们可以使用的第二种方式是使用Streams。**特别是，我们将使用anyMatch()方法，如果Stream中的任何元素与给定的谓词匹配，则返回true**：

```java
@Test
void givenValuesToCompare_whenUsingStreams_thenDetectElementsInTwoLists() {
    boolean shouldBeTrue = listOfLetters.stream()
      .anyMatch(listOfLettersWithOverlap::contains);
    assertTrue(shouldBeTrue);

    boolean shouldBeFalse = listOfLetters.stream()
      .anyMatch(listOfCities::contains);
    assertFalse(shouldBeFalse);
}
```

提供给_anyMatch()_的谓词是对_Collections_的contains()方法的调用。如果Collections包含指定的元素，则返回_true_。

### 2.3. 使用Apache Commons

我们的最后一种方法是使用Apache Commons的CollectionUtils方法_containsAny()_。为了使用这个方法，我们首先需要将依赖项导入我们的_pom.xml_：

```xml
`<dependency>`
    `<groupId>`org.apache.commons`</groupId>`
    `<artifactId>`commons-collections4`</artifactId>`
    `<version>`4.4`</version>`
`</dependency>`
```

我们可以在Maven Repository中找到最新版本。准备好之后，我们就可以使用这个库：

```java
void givenValuesToCompare_whenUsingApacheCollectionUtils_thenDetectElementsInTwoLists() {
    boolean shouldBeTrue = CollectionUtils.containsAny(listOfLetters, listOfLettersWithOverlap);
    assertTrue(shouldBeTrue);

    boolean shouldBeFalse = CollectionUtils.containsAny(listOfLetters, listOfCities);
    assertFalse(shouldBeFalse);
}
```

这种方法简单易读。然而，我们可能只有在已经使用Apache导入的情况下才会使用它，因为Java有内置的方法。

## 3. 检查对象内的属性

这个问题的更复杂版本是，如果我们想检查两个列表中的任何对象是否具有匹配的属性。让我们创建一个示例对象，用于此：

```java
class Country {
    String name;
    String language;
    // 标准getter, setter和构造函数
}
```

然后，我们可以创建一些Country类的实例，并将它们放入两个列表中：

```java
Country france = new Country("France", "French");
Country mexico = new Country("Mexico", "Spanish");
Country spain = new Country("Spain", "Spanish");
List``<Country>`` franceAndMexico = Arrays.asList(france, mexico);
List``<Country>`` franceAndSpain = Arrays.asList(france, spain);
```

两个列表都有一个说西班牙语的国家，所以我们应该能够在比较它们时检测到这一点。

### 3.1. 使用Streams

让我们使用上述列表，检查我们是否在两个列表中都有说同一种语言的国家。我们可以使用Streams来完成这个任务，类似于我们在第2.2节中看到的方式。**主要的区别是我们使用map()来提取我们感兴趣的属性**，在这个例子中是语言：

```java
@Test
public void givenPropertiesInObjectsToCompare_whenUsingStreams_thenDetectElementsInTwoLists() {
    boolean shouldBeTrue = franceAndMexico.stream()
      .map(Country::getLanguage)
      .anyMatch(franceAndSpain.stream()
        .map(Country::getLanguage)
        .collect(toSet())::contains);

    assertTrue(shouldBeTrue);
}
```

我们再次使用_anyMatch()_。然而，这次我们把语言收集到一个_Set_中，并使用_contains()_来检查当前语言是否在_Set_中。如上所示，我们找到了一个匹配项，因为两个列表都包含了一个说西班牙语的国家。

## 4. 结论

在本文中，我们看到了Streams是解决这个问题最通用的解决方案。我们可以轻松地使用它们来比较整个对象或对象内的属性。此外，我们还看了Java的disjoint()和Apache的containsAny()的替代方案，它们都易于使用并产生可读的代码。

如往常一样，示例的完整代码可以在GitHub上找到。

OK