---
date: 2024-06-27
category:
  - Java
  - 编程技巧
tag:
  - Java
  - Optional
  - 非空
head:
  - - meta
    - name: keywords
      content: Java, 非空, Optional, 编程技巧
---
# Java中返回第一个非空值

在本教程中，我们将学习如何**从一个列表或数据序列中返回第一个非空元素**。

我们还将探索在返回一系列昂贵方法的第一个非空值时的惰性评估。最后，我们将发现使用_Optional_类将要求我们**返回第一个非空的_Optional_**。

## 2. for循环

在Java 8引入函数式编程之前，通常使用_for_循环来从列表中返回第一个非空元素。

假设我们有一个列表，第一个元素为_null_：

```java
List`````<String>````` objects = Arrays.asList(
    null,
    "第一个非空",
    "第二个非空"
);
```

**要返回第一个非空元素，我们可以使用传统的_for_循环来迭代并检查每个元素是否为null，通过一个简单的_if_语句：**

```java
String object = null;
for (int i = 0; i < objects.size(); i++) {
    if (objects.get(i) != null) {
        object = objects.get(i);
        break;
    }
}
```

## 3. Stream API

随着Java 8中Stream API的引入，我们现在能够以更易读、更简洁、更声明式的方式来完成许多常见模式。

**要找到第一个非空元素，我们通过调用_stream()_方法顺序地流化我们的列表，并搜索第一个非空元素：**

```java
Optional`````<String>````` object = objects
  .stream()
  .filter(o -> o != null)
  .findFirst();
```

**我们使用中间_filter()_操作来根据_Predicate_过滤我们的流，在我们的情况下是一个简单的null检查lambda表达式_o -> o != null_。** 最后，我们调用终端_findFirst()_操作来返回满足前面操作的第一个元素或者一个空的_Optional_。

为了提高可读性，我们可以使用_Objects.nonNull()_作为方法引用来代替lambda表达式：

```java
Optional`````<String>````` object = objects
  .stream()
  .filter(Objects::nonNull)
  .findFirst();
```

## 4. 可能返回_null_的方法的惰性评估

在本文中，我们假设我们想要从一个现成的数据序列中返回第一个非空项。但是，如果我们用来获取值的方法计算成本很高怎么办？相反，我们可能想要**出于性能原因，惰性评估一个方法序列，直到我们获得第一个非空**。

让我们考虑以下方法，我们将假装它们计算成本很高：

```java
String methodA() {
    return null;
}

String methodB() {
    return "第一个非空";
}

String methodC() {
    return "第二个非空";
}
```

在Java 8之前，我们可能使用了一系列_if_语句：

```java
String object = methodA();
if (object == null) {
    object = methodB();
}

if (object == null) {
    object = methodC();
}
```

使用Stream API，我们可以利用**功能接口_Supplier_来实现我们方法的惰性评估**：

```java
Optional`````<String>````` object = Stream
  .<Supplier`````<String>`````>of(
      this::methodA,
      this::methodB,
      this::methodC)
  .map(Supplier::get)
  .filter(Objects::nonNull)
  .findFirst();
```

在我们的流管道中，一个昂贵的方法只有在作为_map()_操作的一部分调用_Supplier_函数对象的_get()_时才被评估。我们通过使用顺序流来确保惰性评估。每个流元素都由中间_filter()_条件进行检查，一旦我们找到满足条件的第一个非空元素，流就会终止。

## 5. 外部库

除了编写我们自己的实现之外，我们还可以利用解决这个问题的流行外部库。

### 5.1. Apache Commons Lang 3

要使用Apache Commons Lang 3，我们需要将以下依赖项添加到我们的_pom.xml_：

```xml
``<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-lang3``</artifactId>``
    ``<version>``3.14.0``</version>``
``</dependency>``
```

给定一个可能为_null_的单个引用，**我们可以使用_ObjectUtils.getIfNull()_来获得它的值，如果它不是_null_，或者返回一个替代方法的值，该方法是惰性评估的：**

```java
ObjectUtils.getIfNull(object, this::methodB);
```

**给定一个对象列表，我们可以利用_ObjectUtils.firstNonNull()_，它接受可变参数：**

```java
@Test
void givenListOfObjects_whenUsingApacheCommonsLang3_thenReturnFirstNonNull() {
    String object = ObjectUtils.firstNonNull(objects.toArray(new String[0]));

    assertEquals("第一个非空", object);
}
```

如果所有参数都是_null_，则返回_null_。

**此外，我们还可以使用_ObjectUtils.getFirstNonNull()_来惰性评估我们的可空方法：**

```java
ObjectUtils.getFirstNonNull(this::methodA, this::methodB, this::methodC);
```

### 5.2. Google Guava

要使用Google Guava，我们需要将以下依赖项添加到我们的_pom.xml_：

```xml
``<dependency>``
    ``<groupId>``com.google.guava``</groupId>``
    ``<artifactId>``guava``</artifactId>``
    ``<version>``32.1.3-jre``</version>``
``</dependency>``
```

**给定两个引用，我们可以使用_MoreObjects.firstNonNull()_：**

```java
@Test
void givenTwoObjects_whenUsingGoogleGuavaMoreObjects_thenReturnFirstNonNull() {
    String nullObject = null;
    String nonNullObject = "第一个非空";
    String object = MoreObjects.firstNonNull(nullObject, nonNullObject);

    assertEquals("第一个非空", object);
}
```

然而，如果两个参数都是_null_，则会抛出_NullPointerExecption_。

**给定一个列表，我们可以使用_Iterables.find()_与_Predicates.nonNull()_来返回第一个非空：**

```java
@Test
void givenListOfObjects_whenUsingGoogleGuavaIterables_thenReturnFirstNonNull() {
    String object = Iterables.find(objects, Predicates.notNull());

    assertEquals("第一个非空", object);
}
```

## 6. Optional

如果本文没有提到_Optional_类型的使用，那将是不完整的。这个类在Java 8中被特别引入，以解决_null_引用的不足。

**_Optional_类型允许开发人员明确表示一个方法或变量可能有或可能没有值。** 因此，我们之前返回_null_或值的方法现在改为返回_Optional_。

因此，我们之前的问题“返回第一个非空值”转变成了一个微妙不同的问题。我们如何返回第一个非空的_Optional_？

让我们考虑以下列表，它有一个空的第一个元素：

```java
List<Optional`````<String>`````> optionals = Arrays.asList(
    Optional.`````<String>`````empty(),
    Optional.of("第一个非空"),
    Optional.of("第二个非空")
);
```

我们可以流化我们的列表并搜索第一个非空元素：

```java
@Test
void givenListOfOptionals_whenStreaming_thenReturnFirstNonEmpty() {
    Optional`````<String>````` object = optionals.stream()
      .filter(Optional::isPresent)
      .map(Optional::get)
      .findFirst();

    assertThat(object).contains("第一个非空");
}
```

**我们使用_ifPresent()_方法检查每个给定的_Optional_是否有值。如果一个元素满足这个谓词，那么我们就可以安全地使用_get()_作为_map()_中间操作的一部分来获取值。**

## 7. 结论

在本文中，我们探讨了如何使用我们自己的实现以及外部库来返回第一个非空值。

我们还考虑了当我们想要从一个昂贵方法链中返回第一个非空时的惰性评估。

最后，我们还展示了如何返回第一个非空的_Optional_，因为自从Java 8引入以来，这可能是一个更合适的用例。

本文中使用的所有代码示例可以在GitHub上找到。